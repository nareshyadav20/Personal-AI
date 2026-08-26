from fastapi import APIRouter

router = APIRouter(tags=["Templates"])

PREBUILT_TEMPLATES = [
    {
        "id": "internship_thank_you",
        "title": "Internship Completion",
        "platform": "linkedin",
        "content_type": "post",
        "tone": "professional",
        "audience": "recruiters",
        "length": "medium",
        "custom_prompt": "Thank my team and mentors for an incredible internship experience learning AI and Full-Stack development."
    },
    {
        "id": "project_showcase",
        "title": "AI Project Launch",
        "platform": "linkedin",
        "content_type": "post",
        "tone": "confident",
        "audience": "developers",
        "length": "medium",
        "custom_prompt": "Announce my new project Ghostwriter Bot built using React, FastAPI, and Gemini API."
    },
    {
        "id": "cold_email",
        "title": "Cold Email Outreach",
        "platform": "email",
        "content_type": "post",
        "tone": "formal",
        "audience": "recruiters",
        "length": "short",
        "custom_prompt": "Inquire about software engineering internship or full-time entry-level opportunities."
    },
    {
        "id": "startup_launch",
        "title": "Startup Announcement",
        "platform": "x",
        "content_type": "post",
        "tone": "motivational",
        "audience": "customers",
        "length": "short",
        "custom_prompt": "Announce the launch of our new AI startup Novaspire."
    }
]

@router.get("/templates")
def get_templates():
    return {"success": True, "data": PREBUILT_TEMPLATES}