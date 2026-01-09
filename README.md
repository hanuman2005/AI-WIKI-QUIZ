# 🧠 AI Wiki Quiz Generator

> Transform Wikipedia articles into engaging AI-generated quizzes!

## 🌐 Live Demo

| Platform        | URL           
| **Frontend**    | [https://ai-wiki-quiz.vercel.app](https://ai-wiki-quiz.vercel.app)                                       |
| **Backend API** | [https://ai-wiki-quiz-api-production.up.railway.app](https://ai-wiki-quiz-api-production.up.railway.app) |

---

## 📌 Project Overview

A full-stack application that transforms Wikipedia articles into AI-generated quizzes using FastAPI, Google Gemini, and React. Simply paste a Wikipedia URL and get an interactive quiz with questions, explanations, and scoring!

### ✨ Key Features

- 🔍 **Wikipedia Scraping** - Extract content from any English Wikipedia article
- 🤖 **AI Quiz Generation** - Generate intelligent questions using Google Gemini
- 📝 **Interactive Quiz Mode** - Take quizzes with real-time scoring
- 📚 **Quiz History** - Save and revisit previously generated quizzes
- 📱 **Responsive Design** - Works on desktop, tablet, and mobile

---

## 🛠️ Tech Stack

### Backend

| Technology                  | Purpose 
_________________________________________         
| **Python 3.11+**            |ProgrammingLanguage
| **FastAPI**                 | REST API Framework
| **SQLAlchemy**              | Database ORM      
| **SQLite**                  | Database          
| **BeautifulSoup4**          | Web Scraping    
| **LangChain**               | LLM Framework     
| **Google Gemini 2.5 Flash** | AI Model          

### Frontend

| Technology       | Purpose      |
| ---------------- | ------------ |
| **React 18**     | UI Framework |
| **Tailwind CSS** | Styling      |
| **Vite**         | Build Tool   |

### Deployment

| Service      | Platform |
| ------------ | -------- |
| **Frontend** | Vercel   |
| **Backend**  | Railway  |

---

## 📦 Installation & Setup

### Prerequisites

- Python 3.10+
- Node.js 18+
- Google Gemini API Key ([Get one here](https://aistudio.google.com/app/apikey))

### Backend Setup

```bash
# 1. Navigate to backend folder
cd backend

# 2. Create virtual environment
python -m venv venv

# 3. Activate virtual environment
# Windows:
venv\Scripts\activate
# Mac/Linux:
source venv/bin/activate

# 4. Install dependencies
pip install -r requirements.txt

# 5. Create .env file
echo "GEMINI_API_KEY=your_api_key_here" > .env

# 6. Run the server
python main.py
```

Backend will run on: http://localhost:8000

### Frontend Setup

```bash
# 1. Navigate to frontend folder
cd frontend

# 2. Install dependencies
npm install

# 3. Run development server
npm run dev
```

Frontend will run on: http://localhost:5173

---

## 🚀 Usage

1. **Open the App** - Navigate to http://localhost:5173 (or live demo)
2. **Generate Quiz Tab:**
   - Paste a Wikipedia URL (e.g., `https://en.wikipedia.org/wiki/Python_(programming_language)`)
   - Click "Generate Quiz"
   - Wait 20-30 seconds for AI to process
3. **View Quiz:**
   - See article summary and key entities
   - Toggle between "View Mode" (answers shown) and "Take Quiz Mode"
4. **Take Quiz:**
   - Answer all questions
   - Submit to see your score
   - Retry if you want to improve
5. **Quiz History Tab:**
   - View all previously generated quizzes
   - Click "View Details" to revisit any quiz

---

## 📡 API Endpoints

### Base URL

- **Local:** `http://localhost:8000`
- **Production:** `https://ai-wiki-quiz-api-production.up.railway.app`

### Endpoints

| Method | Endpoint          | Description                      |
| ------ | ----------------- | -------------------------------- |
| `GET`  | `/`               | API info and available endpoints |
| `POST` | `/generate_quiz`  | Generate quiz from Wikipedia URL |
| `GET`  | `/history`        | Get all generated quizzes        |
| `GET`  | `/quiz/{quiz_id}` | Get specific quiz details        |

### Example: Generate Quiz

**Request:**

```bash
curl -X POST "https://ai-wiki-quiz-api-production.up.railway.app/generate_quiz" \
  -H "Content-Type: application/json" \
  -d '{"url": "https://en.wikipedia.org/wiki/Python_(programming_language)"}'
```

**Response:**

```json
{
  "id": 1,
  "url": "https://en.wikipedia.org/wiki/Python_(programming_language)",
  "title": "Python (programming language)",
  "summary": "Python is a high-level programming language...",
  "key_entities": {
    "people": ["Guido van Rossum"],
    "organizations": ["Python Software Foundation"],
    "locations": ["Netherlands"]
  },
  "sections": ["History", "Features", "Syntax"],
  "quiz": [
    {
      "question": "Who created Python?",
      "options": [
        "A) Guido van Rossum",
        "B) James Gosling",
        "C) Bjarne Stroustrup",
        "D) Dennis Ritchie"
      ],
      "answer": "A) Guido van Rossum",
      "difficulty": "easy",
      "explanation": "Guido van Rossum created Python in 1991..."
    }
  ],
  "related_topics": ["Java", "JavaScript", "C++"],
  "date_generated": "2026-01-09T10:30:00"
}
```

---

## 🎯 Features Implemented

### Required Features ✅

- [x] Wikipedia URL scraping with BeautifulSoup
- [x] AI quiz generation using Gemini API via LangChain
- [x] SQLite database for storage
- [x] FastAPI backend with 3 endpoints
- [x] React frontend with 2 tabs
- [x] Structured quiz display
- [x] Quiz history with details modal
- [x] Error handling for invalid URLs
- [x] Loading states and user feedback

### Bonus Features ✅

- [x] **Take Quiz Mode** - Interactive quiz with scoring
- [x] **URL Validation** - Frontend and backend validation
- [x] **Store Raw Content** - Scraped HTML stored in database
- [x] **Responsive Design** - Mobile-friendly UI
- [x] **Mode Toggle** - Switch between View and Take Quiz modes
- [x] **Progress Tracking** - Shows answered questions count
- [x] **Retry Quiz** - Reset and retake quiz
- [x] **Live Deployment** - Frontend on Vercel, Backend on Railway

---

## 📊 Sample Wikipedia URLs to Test

| Topic                   | URL                                                         |
| ----------------------- | ----------------------------------------------------------- |
| Python                  | https://en.wikipedia.org/wiki/Python_(programming_language) |
| Artificial Intelligence | https://en.wikipedia.org/wiki/Artificial_intelligence       |
| Machine Learning        | https://en.wikipedia.org/wiki/Machine_learning              |
| Albert Einstein         | https://en.wikipedia.org/wiki/Albert_Einstein               |
| World War II            | https://en.wikipedia.org/wiki/World_War_II                  |

---

## 🗂️ Project Structure

```
AI-WIKI-QUIZ/
├── backend/
│   ├── main.py              # FastAPI application & routes
│   ├── database.py          # SQLAlchemy database setup
│   ├── models.py            # Pydantic models
│   ├── scraper.py           # Wikipedia scraping logic
│   ├── llm_quiz_generator.py # LangChain + Gemini integration
│   ├── requirements.txt     # Python dependencies
│   └── .env                 # Environment variables (not in git)
├── frontend/
│   ├── src/
│   │   ├── App.jsx          # Main React component
│   │   ├── components/      # Reusable components
│   │   │   ├── QuizDisplay.jsx
│   │   │   └── Modal.jsx
│   │   ├── tabs/            # Tab components
│   │   │   ├── GenerateQuizTab.jsx
│   │   │   └── HistoryTab.jsx
│   │   └── services/
│   │       └── api.js       # API client functions
│   ├── package.json
│   └── vercel.json          # Vercel deployment config
└── README.md
```

---

## 🔧 Environment Variables

### Backend (`backend/.env`)

```env
GEMINI_API_KEY=your_gemini_api_key_here
```

### Frontend (Vercel Dashboard)

```env
VITE_API_URL=https://ai-wiki-quiz-api-production.up.railway.app
```

---

## 📝 Database Schema

**Quiz Table:**
| Column | Type | Description |
|--------|------|-------------|
| `id` | Integer | Primary Key, Auto-increment |
| `url` | String | Wikipedia URL |
| `title` | String | Article title |
| `date_generated` | DateTime | When quiz was created |
| `scraped_content` | Text | Raw article content |
| `full_quiz_data` | Text | JSON string with complete quiz |

---

## 🐛 Troubleshooting

### Common Issues

| Problem             | Solution                                             |
| ------------------- | ---------------------------------------------------- |
| API key not found   | Ensure `.env` file exists with `GEMINI_API_KEY`      |
| Import errors       | Activate venv, run `pip install -r requirements.txt` |
| CORS errors         | Check backend CORS settings allow frontend URL       |
| Empty response      | Verify `VITE_API_URL` includes `https://`            |
| Quiz not generating | Check Railway logs for backend errors                |

---

## 🧪 Testing Checklist

- [ ] Generate quiz with valid Wikipedia URL
- [ ] Verify quiz displays correctly (summary, entities, questions)
- [ ] Test "Take Quiz Mode" - answer questions and submit
- [ ] Check score calculation works
- [ ] Test "Retry Quiz" functionality
- [ ] Navigate to History tab
- [ ] Click "View Details" on a saved quiz
- [ ] Test with invalid URL (should show error)
- [ ] Test on mobile device (responsive design)

---

## 👥 Author

**Madineni Hanumantha Rao**

- 📧 Email: madenenihanumanturao@gmail.com
- 📱 Phone: 9392852185
- 🔗 GitHub: [hanuman2005](https://github.com/hanuman2005)

---

## 📅 Project Timeline

- **Started:** November 2025
- **Completed:** January 2026
- **Last Updated:** January 9, 2026

---

## 📄 License

This project is created for educational purposes as part of an internship assignment.

---

## 🙏 Acknowledgments

- [Google Gemini](https://ai.google.dev/) - AI model for quiz generation
- [LangChain](https://langchain.com/) - LLM framework
- [FastAPI](https://fastapi.tiangolo.com/) - Backend framework
- [React](https://react.dev/) - Frontend framework
- [Tailwind CSS](https://tailwindcss.com/) - Styling
- [Vercel](https://vercel.com/) - Frontend hosting
- [Railway](https://railway.app/) - Backend hosting
