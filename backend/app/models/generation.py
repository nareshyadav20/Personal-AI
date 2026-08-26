from sqlalchemy import Column, String, DateTime, ForeignKey, Text, Boolean, Integer
from sqlalchemy.orm import relationship
from datetime import datetime, timezone
import uuid

from ..core.database import Base

class Generation(Base):
    """
    SQLAlchemy Model for content generation history, versions, and favorites.
    """
    __tablename__ = "generations"

    id = Column(String, primary_key=True, default=lambda: str(uuid.uuid4()))
    user_id = Column(String, ForeignKey("users.id"), default="default_user", nullable=False)
    
    # Input selections metadata
    platform = Column(String, nullable=False, index=True)      # e.g., 'linkedin', 'x', 'email'
    content_type = Column(String, nullable=False)              # e.g., 'post', 'cover_letter'
    tone = Column(String, nullable=False)                      # e.g., 'professional', 'casual'
    audience = Column(String, nullable=False)                  # e.g., 'recruiters', 'developers'
    length = Column(String, nullable=False)                    # e.g., 'medium', 'short'
    custom_prompt = Column(Text, nullable=True)                # User's extra instructions
    
    # Output content & version control
    generated_content = Column(Text, nullable=False)
    version = Column(Integer, default=1)
    parent_id = Column(String, nullable=True)                   # Refers to original generation if refined
    
    # Flags & Actions
    is_favorite = Column(Boolean, default=False, index=True)
    is_pinned = Column(Boolean, default=False)
    
    created_at = Column(DateTime, default=lambda: datetime.now(timezone.utc), index=True)

    # Relationship back to user
    user = relationship("User", back_populates="generations")