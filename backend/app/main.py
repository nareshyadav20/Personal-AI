from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

# Import database core items and seed models
from .core.database import Base, engine, SessionLocal
from .models.user import User
from .models.generation import Generation
from .models.memory import UserMemory

# Create database tables if they do not exist
Base.metadata.create_all(bind=engine)

# Seed default user for local testing and persistence
db = SessionLocal()
try:
    default_user = db.query(User).filter(User.id == "default_user").first()
    if not default_user:
        default_user = User(id="default_user", email="musa@example.com", username="Musa")
        db.add(default_user)
        db.commit()
finally:
    db.close()

# Import routers from api package
from .api import generate_router, history_router, memory_router, templates_router, refiner_router

# Explicitly enable docs_url and redoc_url
app = FastAPI(
    title="Personal AI Assistant API",
    version="1.0.0",
    docs_url="/docs",
    redoc_url="/redoc"
)

# CORS Middleware Setup
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include API Routers under /api prefix
app.include_router(generate_router, prefix="/api", tags=["Generation"])
app.include_router(history_router, prefix="/api", tags=["History"])
app.include_router(memory_router, prefix="/api", tags=["Memory"])
app.include_router(templates_router, prefix="/api", tags=["Templates"])
app.include_router(refiner_router, prefix="/api", tags=["Refiner"])

@app.get("/")
def read_root():
    return {"message": "Personal AI Assistant Backend is Running!"}