from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from typing import Optional

from ..core.database import get_db
from ..models.generation import Generation

router = APIRouter(tags=["History & Favorites"])

@router.get("/history")
def get_generation_history(
    limit: int = 20, 
    user_id: str = "default_user", 
    db: Session = Depends(get_db)
):
    history = (
        db.query(Generation)
        .filter(Generation.user_id == user_id)
        .order_by(Generation.created_at.desc())
        .limit(limit)
        .all()
    )
    return {"success": True, "count": len(history), "data": history}

@router.put("/history/{generation_id}/favorite")
def toggle_favorite(generation_id: str, db: Session = Depends(get_db)):
    item = db.query(Generation).filter(Generation.id == generation_id).first()
    if not item:
        raise HTTPException(status_code=404, detail="Generation item not found")
    
    item.is_favorite = not item.is_favorite
    db.commit()
    db.refresh(item)
    return {"success": True, "is_favorite": item.is_favorite, "data": item}

@router.delete("/history/{generation_id}")
def delete_history_item(generation_id: str, db: Session = Depends(get_db)):
    item = db.query(Generation).filter(Generation.id == generation_id).first()
    if not item:
        raise HTTPException(status_code=404, detail="Generation item not found")
    
    db.delete(item)
    db.commit()
    return {"success": True, "message": "History item deleted successfully"}