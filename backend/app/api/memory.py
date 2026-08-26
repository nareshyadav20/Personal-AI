from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from pydantic import BaseModel
from typing import Optional

from ..core.database import get_db
from ..services.memory_service import MemoryService

router = APIRouter(tags=["Memory System"])

class MemoryRequest(BaseModel):
    key: str
    value: str
    context_category: Optional[str] = "profile"
    user_id: Optional[str] = "default_user"

@router.get("/memory")
def get_user_memory(user_id: str = "default_user", db: Session = Depends(get_db)):
    memories = MemoryService.get_user_memory_context(db, user_id=user_id)
    return {"success": True, "data": memories}

@router.post("/memory")
def add_or_update_memory(request: MemoryRequest, db: Session = Depends(get_db)):
    saved_item = MemoryService.save_or_update_memory(
        db=db,
        key=request.key,
        value=request.value,
        context_category=request.context_category,
        user_id=request.user_id
    )
    return {"success": True, "data": saved_item}

@router.delete("/memory/{key}")
def delete_memory_item(key: str, user_id: str = "default_user", db: Session = Depends(get_db)):
    deleted = MemoryService.delete_memory_item(db=db, key=key, user_id=user_id)
    if not deleted:
        raise HTTPException(status_code=404, detail="Memory key not found")
    return {"success": True, "message": f"Memory key '{key}' deleted"}

@router.delete("/memory")
def clear_all_memory(user_id: str = "default_user", db: Session = Depends(get_db)):
    count = MemoryService.clear_all_memories(db=db, user_id=user_id)
    return {"success": True, "message": f"Wiped {count} memory items"}