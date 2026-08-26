from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from pydantic import BaseModel

from ..core.database import get_db
from ..models.generation import Generation
from ..services.prompt_builder import PromptBuilder
from ..services.llm_service import llm_service

router = APIRouter(tags=["Refinement"])

class RefineRequest(BaseModel):
    generation_id: str
    action: str  # e.g. 'make_shorter', 'add_emojis', 'make_professional'

@router.post("/refine")
async def refine_content(request: RefineRequest, db: Session = Depends(get_db)):
    # 1. Fetch existing generation
    original = db.query(Generation).filter(Generation.id == request.generation_id).first()
    if not original:
        raise HTTPException(status_code=404, detail="Original generation not found")

    # 2. Build refinement prompt
    refine_prompt = PromptBuilder.build_refinement_prompt(
        original_content=original.generated_content,
        action=request.action
    )

    # 3. Call Gemini
    refined_text = await llm_service.generate_response(refine_prompt)

    # 4. Save as a new version linked to parent
    new_version = Generation(
        user_id=original.user_id,
        platform=original.platform,
        content_type=original.content_type,
        tone=original.tone,
        audience=original.audience,
        length=original.length,
        custom_prompt=f"Refinement Action: {request.action}",
        generated_content=refined_text,
        version=original.version + 1,
        parent_id=original.id
    )
    db.add(new_version)
    db.commit()
    db.refresh(new_version)

    return {"success": True, "data": new_version}