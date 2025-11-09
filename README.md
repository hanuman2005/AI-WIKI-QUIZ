# AI Wiki Quiz Generator

## 📌 Project Overview
A full-stack application that transforms Wikipedia articles into AI-generated quizzes using FastAPI, Google Gemini, and React.

## 🛠️ Tech Stack

### Backend
- **Python 3.10+**
- **FastAPI** - REST API framework
- **SQLAlchemy** - Database ORM
- **SQLite** - Database
- **BeautifulSoup4** - Web scraping
- **LangChain** - LLM framework
- **Google Gemini 2.5 Flash** - AI model

### Frontend
- **React 18** - UI framework
- **Tailwind CSS** - Styling
- **Vite** - Build tool

## 📦 Installation & Setup

### Backend Setup

1. **Navigate to backend folder:**
```bash
cd backend
```

2. **Create virtual environment:**
```bash
python -m venv venv
```

3. **Activate virtual environment:**
   - Windows: `venv\Scripts\activate`
   - Mac/Linux: `source venv/bin/activate`

4. **Install dependencies:**
```bash
pip install -r requirements.txt
```

5. **Create `.env` file:**
```env
GEMINI_API_KEY=your_api_key_here
```

6. **Get Gemini API Key:**
   - Visit: https://aistudio.google.com/app/apikey
   - Create a new API key
   - Add to `.env` file

7. **Run the backend server:**
```bash
python main.py
```
Backend will run on: http://localhost:8000

### Frontend Setup

1. **Navigate to frontend folder:**
```bash
cd frontend
```

2. **Install dependencies:**
```bash
npm install
```

3. **Run development server:**
```bash
npm run dev
```
Frontend will run on: http://localhost:5173

## 🚀 Usage

1. **Start Backend:** Run `python main.py` in backend folder
2. **Start Frontend:** Run `npm run dev` in frontend folder
3. **Open Browser:** Navigate to http://localhost:5173
4. **Generate Quiz:**
   - Go to "Generate Quiz" tab
   - Enter Wikipedia URL (e.g., https://en.wikipedia.org/wiki/Python_(programming_language))
   - Click "Generate Quiz"
   - Wait 20-30 seconds
5. **View History:**
   - Go to "Quiz History" tab
   - See all generated quizzes
   - Click "View Details" to see full quiz

## 📡 API Endpoints

### `POST /generate_quiz`
Generates a quiz from a Wikipedia URL.

**Request Body:**
```json
{
  "url": "https://en.wikipedia.org/wiki/Python_(programming_language)"
}
```

**Response:**
```json
{
  "id": 1,
  "url": "...",
  "title": "...",
  "summary": "...",
  "key_entities": {...},
  "sections": [...],
  "quiz": [...],
  "related_topics": [...],
  "date_generated": "..."
}
```

### `GET /history`
Returns list of all generated quizzes.

**Response:**
```json
[
  {
    "id": 1,
    "url": "...",
    "title": "...",
    "date_generated": "..."
  }
]
```

### `GET /quiz/{quiz_id}`
Returns detailed quiz data by ID.

**Response:** Same as `/generate_quiz`

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

## 📊 Sample Data

Test with these Wikipedia URLs:
1. https://en.wikipedia.org/wiki/Python_(programming_language)
2. https://en.wikipedia.org/wiki/Artificial_intelligence
3. https://en.wikipedia.org/wiki/Machine_learning
4. https://en.wikipedia.org/wiki/Albert_Einstein
5. https://en.wikipedia.org/wiki/World_War_II

## 🧪 Testing Steps

1. **Test Quiz Generation:**
   - Enter valid Wikipedia URL
   - Verify quiz generates within 30 seconds
   - Check all components display correctly

2. **Test History:**
   - Generate multiple quizzes
   - Navigate to History tab
   - Verify all quizzes listed
   - Click "View Details" on each

3. **Test Take Quiz Mode:**
   - Generate a quiz
   - Click "Take Quiz Mode"
   - Answer questions
   - Submit and verify score
   - Retry quiz

4. **Test Error Handling:**
   - Enter invalid URL
   - Verify error message shows
   - Enter non-Wikipedia URL
   - Verify validation works

## 🎨 LangChain Prompt Template

The prompt used for quiz generation is defined in `llm_quiz_generator.py`:
```python
prompt_template = """You are an expert educational content creator...

ARTICLE TITLE: {title}
ARTICLE CONTENT: {article_text}

Generate a structured quiz with:
1. Summary (2-3 sentences)
2. Key Entities (people, organizations, locations)
3. Sections (3-5 main topics)
4. Quiz Questions (5-10 questions)
5. Related Topics (3-5 suggestions)

CRITICAL INSTRUCTIONS:
- Base ALL questions on article content
- No hallucination
- 4 options per question (A-D)
- Varying difficulty levels
- Clear explanations
..."""
```

## 🔧 Environment Variables

Create `.env` file in backend folder:
```env
GEMINI_API_KEY=your_actual_api_key_here
```

## 📝 Database Schema

**Quiz Table:**
- `id` (Integer, Primary Key)
- `url` (String, Not Null)
- `title` (String, Not Null)
- `date_generated` (DateTime, Default: now)
- `scraped_content` (Text, Nullable)
- `full_quiz_data` (Text, Not Null) - JSON string

## 🐛 Troubleshooting

### Backend Issues

**Problem:** API key not found
**Solution:** 
- Ensure `.env` file exists in backend folder
- Check `GEMINI_API_KEY` is spelled correctly
- Restart backend server

**Problem:** Import errors
**Solution:**
- Activate virtual environment
- Run `pip install -r requirements.txt`
- Check Python version (3.10+)

**Problem:** Model not found error
**Solution:**
- Update model name to `models/gemini-2.5-flash`
- Check API key is valid

### Frontend Issues

**Problem:** Network error
**Solution:**
- Ensure backend is running on port 8000
- Check CORS configuration
- Verify frontend API_BASE_URL

**Problem:** Build errors
**Solution:**
- Delete `node_modules` and `package-lock.json`
- Run `npm install` again
- Check Node.js version

## 👥 Author
[Your Name]
[Your Email/Contact]

## 📅 Date
[Submission Date]

## 📄 License
This project is for educational purposes as part of [Course Name/Assignment].
