from fastapi import APIRouter, Depends, HTTPException
from pydantic import BaseModel
from typing import Optional
from sqlalchemy.orm import Session

from ..core.database import get_db
from ..models.generation import Generation
from ..services.llm_service import llm_service
from ..services.prompt_builder import PromptBuilder
from ..services.memory_service import MemoryService

router = APIRouter()

class GenerateRequest(BaseModel):
    platform: str
    content_type: str
    tone: str
    audience: str
    length: str
    custom_prompt: Optional[str] = None
    user_id: Optional[str] = "default_user"

@router.post("/generate")
async def generate_text(request: GenerateRequest, db: Session = Depends(get_db)):
    try:
        # 1. Fetch user memories
        memories = MemoryService.get_user_memory_context(db, user_id=request.user_id)
        
        # 2. Build the detailed prompt using selections and memory
        prompt = PromptBuilder.build_generation_prompt(
            platform=request.platform,
            content_type=request.content_type,
            tone=request.tone,
            audience=request.audience,
            length=request.length,
            custom_prompt=request.custom_prompt,
            user_memory=memories
        )
        
        # 3. Call LLM Service to generate response
        generated_content = await llm_service.generate_response(prompt)
        
        # 4. Save to database
        db_gen = Generation(
            user_id=request.user_id,
            platform=request.platform,
            content_type=request.content_type,
            tone=request.tone,
            audience=request.audience,
            length=request.length,
            custom_prompt=request.custom_prompt,
            generated_content=generated_content,
            version=1
        )
        db.add(db_gen)
        db.commit()
        db.refresh(db_gen)
        
        return {"success": True, "data": db_gen}
    except Exception as e:
        print("Backend Error Trace:", str(e))
        raise HTTPException(status_code=500, detail=str(e))