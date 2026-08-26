import os
from pathlib import Path
from dotenv import load_dotenv

# Base backend directory ka path calculate karein
BASE_DIR = Path(__file__).resolve().parent.parent.parent
ENV_FILE = BASE_DIR / ".env"

# Explicitly load .env file
load_dotenv(dotenv_path=ENV_FILE)

class Settings:
    PROJECT_NAME: str = "Personal AI Assistant"
    PROJECT_VERSION: str = "1.0.0"

    # Gemini API Key fetch from .env
    GEMINI_API_KEY: str = os.getenv("GEMINI_API_KEY", "")

    DATABASE_URL: str = os.getenv("DATABASE_URL", "sqlite:///./sql_app.db")

settings = Settings()