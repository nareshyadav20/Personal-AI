# 🖋️ Ghostwriter Bot

> **AI-Powered Writing Assistant for High-Converting, Platform-Specific Content**

[![React](https://img.shields.io/badge/React-18+-61DAFB?logo=react&logoColor=white)](https://reactjs.org/)
[![FastAPI](https://img.shields.io/badge/FastAPI-0.100+-009688?logo=fastapi&logoColor=white)](https://fastapi.tiangolo.com/)
[![Python](https://img.shields.io/badge/Python-3.9+-3776AB?logo=python&logoColor=white)](https://www.python.org/)
[![Gemini API](https://img.shields.io/badge/Gemini-API-4285F4?logo=google&logoColor=white)](https://ai.google.dev/)
[![License](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)
[![Status](https://img.shields.io/badge/Status-Active-success)](https://github.com)

---

## 🎯 Overview

**Ghostwriter Bot** is a sophisticated AI-powered writing assistant that eliminates writer's block by generating high-quality, platform-specific content in seconds. Whether you're crafting a LinkedIn post, cold email, cover letter, or blog content, Ghostwriter Bot does the heavy lifting.

Unlike generic writing tools, Ghostwriter Bot combines:
- ✨ **Zero-Prompt Interface** – Dropdown-driven generation (no prompt writing needed)
- 🧠 **Persistent Memory** – Remembers your context like ChatGPT
- 📚 **Smart Templates** – Pre-built templates for common use cases
- 🎨 **One-Click Refinements** – Polish your content with a single click
- 📊 **Full Version History** – Track and compare all generations

---

## 🌟 Key Features

### 1. **Dual Generation Modes**

#### 🚀 Quick Generate Mode
100% dropdown-driven. No prompt writing required.

```
Platform: [LinkedIn ▼]
Content Type: [Post ▼]
Tone: [Professional ▼]
Audience: [Recruiters ▼]
Length: [Medium ▼]

[✨ Generate]
```

**What happens behind the scenes?**
- Backend intelligently constructs a detailed prompt from your selections
- Sends optimized prompt to Gemini API
- Returns polished, platform-ready content

#### ✍️ Custom Prompt Mode
For power users who want granular control:

```
Platform: LinkedIn | Content Type: Post | Tone: Professional

Additional Instructions:
"Mention my internship at XYZ Corp and keep it humble."

[✨ Generate]
```

---

### 2. **One-Click AI Templates**

Pre-built, ready-to-use templates for common scenarios:

```
✔ Internship Completion
✔ New Job Announcement
✔ AI/Tech Project Showcase
✔ Hackathon Winner Post
✔ Cold Email Outreach
✔ Cover Letter
✔ Resume Bullet Points
✔ Startup Launch
✔ GitHub Release
✔ Thank You Message
```

**Click → Auto-populate dropdowns → Generate → Done!**

---

### 3. **Smart Memory & Context System**

#### 📝 Persistent Memory (ChatGPT Style)
Bot remembers everything about you:

```
First Interaction:
You: "I'm Musa, an AI student at Tech University. My startup is Novaspire."
Bot: [Saves to memory]

Second Interaction (weeks later):
You: "Write my LinkedIn post."
Bot: [Automatically injects context from memory]

Generated Post:
"As an AI enthusiast at Tech University and founder of Novaspire, 
I've always believed in..."
```

#### 📚 Full History with Database Persistence
- Every generation is saved with metadata (timestamp, platform, tone, etc.)
- Access previous generations instantly from sidebar
- Search through past content
- Restore or reuse old versions

---

### 4. **Smart Refinement & One-Click Actions**

Once content is generated, refine it with single clicks:

```
Generated Content:
"I'm excited to announce..."

Quick Actions:
[Make More Professional] [Make Shorter] [Add Emojis] 
[Remove Emojis] [Make Funny] [Make Technical]

Each click = new version without regenerating
```

#### 🔄 Version Control
Compare multiple versions side-by-side:

```
Version 1: "I'm excited to share..."
Version 2: "I'm thrilled to announce..."
Version 3: "I'm proud to present..."

[Compare] [Pin Favorite] [Export]
```

---

### 5. **Export & Copy Options**

```
[📋 Copy to Clipboard]
[📄 Download as .TXT]
[📕 Download as .DOCX]
```

---

### 6. **Favorites & Pinning**

```
❤️ Star your best generations
📌 Pin top performers
📊 Track what works best
```

---

### 7. **LLM Flexibility**

Switch between multiple LLM providers:
- 🔵 **Google Gemini** (Default)
- 🟢 **OpenAI GPT** (Coming soon)
- 🟣 **Ollama Local Models** (Self-hosted)

Change provider in Settings → No code changes needed.

---

### 8. **Modern Dark Mode UI**

- **Theme Palette:** Black/Purple/Blue with minimal accents
- **Inspiration:** ChatGPT-style interface
- **Responsiveness:** Mobile-optimized
- **Performance:** Optimized React components, lazy loading

---

## 🛠️ Tech Stack

| Layer | Technology | Purpose |
|-------|-----------|---------|
| **Frontend** | React 18+ | Dynamic UI, state management |
| | Tailwind CSS | Utility-first styling |
| | Axios | API client |
| **Backend** | FastAPI (Python 3.9+) | High-performance REST API |
| | Pydantic | Data validation |
| | SQLAlchemy | ORM for database |
| **Database** | PostgreSQL / SQLite | Persistent storage (history, memory, favorites) |
| **AI/LLM** | Google Gemini API | Primary LLM for content generation |
| | OpenAI API | Alternative LLM provider |
| **Deployment** | Docker | Containerization |
| | | |

---

## 🏗️ System Architecture

```
┌─────────────────────────────────────────────────────────────────┐
│                      React Frontend                              │
│  ┌──────────────────────────────────────────────────────────┐   │
│  │  Dropdowns | Templates | Custom Prompt | Chat History   │   │
│  │  Copy/Export | Favorites | Settings | Version Compare   │   │
│  └──────────────────────────────────────────────────────────┘   │
└──────────────────────────┬──────────────────────────────────────┘
                           │ HTTPS
                           ↓
┌─────────────────────────────────────────────────────────────────┐
│                      FastAPI Backend                             │
│  ┌──────────────────────────────────────────────────────────┐   │
│  │  /api/generate    - Create content from dropdowns        │   │
│  │  /api/templates   - Fetch template data                  │   │
│  │  /api/history     - Retrieve past generations            │   │
│  │  /api/memory      - Manage user context & memory         │   │
│  │  /api/favorites   - Save/retrieve favorites              │   │
│  │  /api/refine      - One-click refinement (shorter, etc)  │   │
│  │  /api/settings    - LLM provider switching               │   │
│  └──────────────────────────────────────────────────────────┘   │
└──────────────────────────┬──────────────────────────────────────┘
                           │
        ┌──────────────────┼──────────────────┐
        ↓                  ↓                  ↓
┌──────────────────┐  ┌──────────────┐  ┌──────────────────┐
│  Gemini API      │  │  GPT API     │  │  Ollama Local    │
│  (Primary)       │  │  (Optional)  │  │  (Self-hosted)   │
└──────────────────┘  └──────────────┘  └──────────────────┘
        
        ↓  (All routes merge)
        
┌─────────────────────────────────────────────────────────────────┐
│               PostgreSQL / SQLite Database                       │
│  ┌──────────────────────────────────────────────────────────┐   │
│  │  users_table     | generations_table | memory_table      │   │
│  │  favorites_table | history_table     | templates_table   │   │
│  └──────────────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────────────┘
```

### Flow: User Interaction → Content Generation

```
User Input
    ↓
Dropdowns + Optional Custom Prompt
    ↓
Frontend validation
    ↓
POST /api/generate
    ↓
Backend prompt construction (LLM-specific optimization)
    ↓
Fetch user memory (context injection)
    ↓
Call selected LLM API
    ↓
Stream response to frontend
    ↓
Save to database (history + metadata)
    ↓
Display in UI + offer refinement actions
    ↓
User: Copy/Export/Favorite/Regenerate
```

---

## 📦 Installation & Setup

### Prerequisites

- **Node.js** 16+ & npm/yarn
- **Python** 3.9+
- **PostgreSQL** 12+ (or SQLite for development)
- **Git**

### Backend Setup

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/ghostwriter-bot.git
   cd ghostwriter-bot/backend
   ```

2. **Create Python virtual environment**
   ```bash
   python -m venv venv
   source venv/bin/activate  # On Windows: venv\Scripts\activate
   ```

3. **Install dependencies**
   ```bash
   pip install -r requirements.txt
   ```

4. **Set up environment variables**
   ```bash
   cp .env.example .env
   # Edit .env with your API keys and database URL
   ```

5. **Initialize database**
   ```bash
   alembic upgrade head
   ```

6. **Run FastAPI server**
   ```bash
   uvicorn main:app --reload --host 0.0.0.0 --port 8000
   ```

   ✅ Backend runs at: `http://localhost:8000`
   
   📚 API Documentation: `http://localhost:8000/docs` (Swagger UI)

---

### Frontend Setup

1. **Navigate to frontend directory**
   ```bash
   cd ../frontend
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   ```

3. **Create environment variables**
   ```bash
   cp .env.example .env.local
   ```

4. **Start development server**
   ```bash
   npm start
   # or
   yarn start
   ```

   ✅ Frontend runs at: `http://localhost:3000`

---

### Database Setup (PostgreSQL)

```bash
# Create database
createdb ghostwriter_bot

# Apply migrations
cd backend
alembic upgrade head
```

**For SQLite (Development):**
```python
# In .env
DATABASE_URL=sqlite:///./ghostwriter.db
```

---

## 🔐 Environment Variables

Create a `.env` file in the backend root:

```env
# Backend Configuration
DEBUG=True
SECRET_KEY=your-secret-key-here-change-in-production

# Database
DATABASE_URL=postgresql://user:password@localhost:5432/ghostwriter_bot
# OR for SQLite:
# DATABASE_URL=sqlite:///./ghostwriter.db

# LLM API Keys
GEMINI_API_KEY=your-gemini-api-key
OPENAI_API_KEY=your-openai-api-key (optional)
OLLAMA_BASE_URL=http://localhost:11434 (optional)

# CORS (Frontend URL)
FRONTEND_URL=http://localhost:3000

# Server
HOST=0.0.0.0
PORT=8000
```

---

## 🚀 Deployment

### Docker Compose (Full Stack)

```bash
docker-compose up --build
```

**docker-compose.yml** will orchestrate:
- FastAPI backend
- React frontend
- PostgreSQL database
- Nginx reverse proxy

### Cloud Deployment

**Recommended:**
- **Frontend:** Vercel / Netlify
- **Backend:** Railway / Render / AWS EC2
- **Database:** AWS RDS / Cloud SQL
- **Storage:** AWS S3 (for exported documents)

---

## 📊 Project Structure

```
ghostwriter-bot/
├── backend/
│   ├── app/
│   │   ├── main.py              # FastAPI entry point
│   │   ├── api/
│   │   │   ├── generate.py       # Content generation endpoint
│   │   │   ├── history.py        # Chat history management
│   │   │   ├── memory.py         # User memory/context system
│   │   │   ├── templates.py      # Template management
│   │   │   └── refinement.py     # One-click refinement actions
│   │   ├── models/
│   │   │   ├── user.py
│   │   │   ├── generation.py
│   │   │   └── memory.py
│   │   ├── services/
│   │   │   ├── llm_service.py    # LLM API integration
│   │   │   ├── prompt_builder.py # Intelligent prompt construction
│   │   │   └── memory_service.py
│   │   └── config.py
│   ├── requirements.txt
│   ├── .env.example
│   └── alembic/                  # Database migrations
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── GeneratorPanel.jsx    # Main UI
│   │   │   ├── Sidebar.jsx           # History & Templates
│   │   │   ├── OutputDisplay.jsx     # Generated content
│   │   │   └── Settings.jsx          # LLM provider selection
│   │   ├── pages/
│   │   │   ├── Home.jsx
│   │   │   └── Settings.jsx
│   │   ├── services/
│   │   │   └── api.js                # API client
│   │   ├── styles/
│   │   │   └── globals.css           # Dark mode theme
│   │   └── App.jsx
│   ├── package.json
│   ├── .env.example
│   └── tailwind.config.js
│
├── docker-compose.yml
└── README.md
```

---

## 🎯 Core Endpoints (API Reference)

### Generate Content
```bash
POST /api/generate
Content-Type: application/json

{
  "platform": "linkedin",
  "content_type": "post",
  "tone": "professional",
  "audience": "recruiters",
  "length": "medium",
  "custom_prompt": "Mention my internship at ABC Corp"
}

Response:
{
  "id": "gen_123",
  "content": "I'm excited to share that...",
  "platform": "linkedin",
  "created_at": "2024-01-15T10:30:00Z",
  "version": 1
}
```

### Get Chat History
```bash
GET /api/history?limit=10

Response:
{
  "generations": [
    {
      "id": "gen_123",
      "content": "...",
      "platform": "linkedin",
      "created_at": "2024-01-15T10:30:00Z"
    }
  ]
}
```

### Save to Memory
```bash
POST /api/memory
Content-Type: application/json

{
  "key": "company_name",
  "value": "TechCorp",
  "context": "user"
}
```

### One-Click Refinement
```bash
POST /api/refine
Content-Type: application/json

{
  "generation_id": "gen_123",
  "action": "make_shorter"
}

# Supported actions:
# - make_shorter
# - make_longer
# - make_professional
# - make_casual
# - add_emojis
# - remove_emojis
# - make_funny
# - make_technical
```

---

## 🌟 Why This Project Stands Out

### For Recruiters 👔

✅ **Full-Stack Proficiency**
- Frontend: React, state management, responsive design
- Backend: FastAPI, REST APIs, async operations
- Database: SQL, schema design, migrations
- API Integration: Third-party LLM APIs (Gemini, OpenAI)

✅ **Real-World Skills**
- Authentication & Authorization (future feature)
- Database persistence & query optimization
- Error handling & logging
- Scalable architecture

✅ **Production-Ready Code**
- Clean code architecture
- Type hints & validation (Pydantic)
- Comprehensive error handling
- Version control best practices

✅ **AI/ML Integration**
- Prompt engineering
- LLM API optimization
- Context management
- Streaming responses

---

## 🗺️ Roadmap

### Phase 1 (Current)
- ✅ Core generation engine
- ✅ Dropdown-driven UI
- ✅ Memory system
- ✅ History & favorites

### Phase 2 (Next)
- [ ] User authentication (OAuth2 / JWT)
- [ ] API rate limiting & quotas
- [ ] Export to file (PDF support)
- [ ] Bulk generation (CSV import)

### Phase 3 (Future)
- [ ] Browser Extension (Chrome/Firefox)
- [ ] Email integration (Gmail plugin)
- [ ] Slack bot integration
- [ ] Analytics dashboard (track what works)
- [ ] Team collaboration features
- [ ] Custom fine-tuned models

---

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 👨‍💻 Author

**Your Name**
- 🔗 [LinkedIn](https://linkedin.com/in/yourprofile)
- 🐙 [GitHub](https://github.com/yourusername)
- 🌐 [Portfolio](https://yourportfolio.com)

---

## 🙋 Support

Have questions or found a bug? 
- Open an [Issue](https://github.com/yourusername/ghostwriter-bot/issues)
- Check [Discussions](https://github.com/yourusername/ghostwriter-bot/discussions)

---

## 📚 Additional Resources

- [FastAPI Documentation](https://fastapi.tiangolo.com/)
- [React Documentation](https://react.dev)
- [Google Gemini API Guide](https://ai.google.dev/docs)
- [Tailwind CSS Docs](https://tailwindcss.com/docs)

---

<div align="center">

### ⭐ If this project helped you, please give it a star!

**Ghostwriter Bot** — Your AI-Powered Writing Companion

Built with ❤️ for writers, developers, and creators.

</div>
