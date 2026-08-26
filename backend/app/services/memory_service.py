from typing import Dict, Any, List, Optional
from sqlalchemy.orm import Session
from app.models.memory import UserMemory  # Database ORM Model

class MemoryService:
    """
    Service layer to manage persistent user memory and context.
    Acts as the 'memory bank' for personalized AI generation.
    """

    @staticmethod
    def get_user_memory_context(db: Session, user_id: str = "default_user") -> Dict[str, Any]:
        """
        Fetches all active memory key-value pairs for a user 
        and formats them as a clean dictionary for prompt injection.
        """
        memories = (
            db.query(UserMemory)
            .filter(UserMemory.user_id == user_id)
            .all()
        )

        memory_dict = {}
        for item in memories:
            memory_dict[item.key] = item.value
            
        return memory_dict

    @staticmethod
    def save_or_update_memory(
        db: Session, 
        key: str, 
        value: str, 
        context_category: Optional[str] = "profile", 
        user_id: str = "default_user"
    ) -> UserMemory:
        """
        Saves a new memory unit or updates an existing one if the key already exists.
        Example: key="startup_name", value="Novaspire"
        """
        # Key ko normalize karte hain (lowercase, clean spaces)
        clean_key = key.strip().lower().replace(" ", "_")
        clean_value = value.strip()

        existing_memory = (
            db.query(UserMemory)
            .filter(UserMemory.user_id == user_id, UserMemory.key == clean_key)
            .first()
        )

        if existing_memory:
            existing_memory.value = clean_value
            existing_memory.context_category = context_category
            db.commit()
            db.refresh(existing_memory)
            return existing_memory
        else:
            new_memory = UserMemory(
                user_id=user_id,
                key=clean_key,
                value=clean_value,
                context_category=context_category
            )
            db.add(new_memory)
            db.commit()
            db.refresh(new_memory)
            return new_memory

    @staticmethod
    def delete_memory_item(db: Session, key: str, user_id: str = "default_user") -> bool:
        """
        Deletes a specific memory item by key.
        """
        clean_key = key.strip().lower().replace(" ", "_")
        item = (
            db.query(UserMemory)
            .filter(UserMemory.user_id == user_id, UserMemory.key == clean_key)
            .first()
        )
        if item:
            db.delete(item)
            db.commit()
            return True
        return False

    @staticmethod
    def clear_all_memories(db: Session, user_id: str = "default_user") -> int:
        """
        Wipes out all memory for a user (Reset Memory feature).
        """
        deleted_count = (
            db.query(UserMemory)
            .filter(UserMemory.user_id == user_id)
            .delete()
        )
        db.commit()
        return deleted_count

# Class reference
memory_service = MemoryService()