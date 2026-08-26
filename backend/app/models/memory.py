from sqlalchemy import Column, String, DateTime, ForeignKey, Text
from sqlalchemy.orm import relationship
from datetime import datetime, timezone
import uuid

from ..core.database import Base

class UserMemory(Base):
    """
    SQLAlchemy Model for persistent user context / memory bank.
    Injects context automatically into future generations.
    """
    __tablename__ = "user_memories"

    id = Column(String, primary_key=True, default=lambda: str(uuid.uuid4()))
    user_id = Column(String, ForeignKey("users.id"), default="default_user", nullable=False)
    
    key = Column(String, index=True, nullable=False)  # e.g., 'college_name', 'tech_stack'
    value = Column(Text, nullable=False)              # e.g., 'Tech University', 'React + FastAPI'
    context_category = Column(String, default="profile")  # 'profile', 'work', 'project', 'preference'
    
    created_at = Column(DateTime, default=lambda: datetime.now(timezone.utc))
    updated_at = Column(DateTime, default=lambda: datetime.now(timezone.utc), onupdate=lambda: datetime.now(timezone.utc))

    # Relationship back to user
    user = relationship("User", back_populates="memories")