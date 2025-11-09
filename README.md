# AI Wiki Quiz Generator

A full-stack application that transforms Wikipedia articles into engaging, AI-generated quizzes using FastAPI, Google Gemini, and React.

## Features

- 🤖 *AI-Powered Quiz Generation*: Uses Google Gemini to create intelligent quizzes
- 📚 *Wikipedia Integration*: Scrapes and processes Wikipedia articles
- 💾 *SQLite Database*: Stores quiz history and generated content
- 🎨 *Beautiful UI*: Clean, modern interface built with React and Tailwind CSS
- 📊 *Quiz History*: View and access all previously generated quizzes
- ✅ *Structured Output*: Questions with multiple choice, difficulty levels, and explanations

## Project Structure


ai-quiz-generator/
├── backend/
│   ├── database.py              # SQLAlchemy database models
│   ├── models.py                # Pydantic schemas for validation
│   ├── scraper.py               # Wikipedia scraping logic
│   ├── llm_quiz_generator.py   # AI quiz generation with LangChain
│   ├── main.py                  # FastAPI application and endpoints
│   ├── requirements.txt         # Python dependencies
│   └── .env                     # Environment variables (API keys)
└── frontend/
    ├── src/
    │   ├── components/
    │   │   ├── QuizDisplay.jsx  # Reusable quiz display component
    │   │   └── Modal.jsx         # Modal component for quiz details
    │   ├── services/
    │   │   └── api.js            # API communication functions
    │   ├── tabs/
    │   │   ├── GenerateQuizTab.jsx
    │   │   └── HistoryTab.jsx
    │   ├── App.jsx               # Main application component
    │   ├── main.jsx              # React entry point
    │   └── index.css             # Tailwind styles
    ├── index.html
    ├── package.json
    └── tailwind.config.js


## Installation & Setup

### Prerequisites

- Python 3.10+
- Node.js 18+ and npm
- Google Gemini API Key

### Backend Setup

1. *Create project directory and navigate to backend:*
bash
mkdir ai-quiz-generator
cd ai-quiz-generator
mkdir backend
cd backend


2. *Create and activate virtual environment:*
bash
# Windows
python -m venv venv
venv\Scripts\activate

# Mac/Linux
python3 -m venv venv
source venv/bin/activate


3. *Install dependencies:*
bash
pip install -r requirements.txt


4. **Create .env file with your API key:**
env
GEMINI_API_KEY=your_gemini_api_key_here


Get your free API key from: https://makersuite.google.com/app/apikey

### Frontend Setup

1. *Navigate to project root and create frontend:*
bash
cd ..
npm create vite@latest frontend -- --template react
cd frontend


2. *Install dependencies:*
bash
npm install
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p


## Running the Application

### Start Backend (Terminal 1)

bash
cd backend
source venv/bin/activate  # or venv\Scripts\activate on Windows
uvicorn main:app --reload --port 8000


Backend API: http://localhost:8000

### Start Frontend (Terminal 2)

bash
cd frontend
npm run dev


Frontend UI: http://localhost:5173

## API Endpoints

### 1. Generate Quiz
*POST* /generate_quiz

*Request:*
json
{
  "url": "https://en.wikipedia.org/wiki/Python_(programming_language)"
}


*Response:*
json
{
  "id": 1,
  "url": "https://en.wikipedia.org/wiki/Python_(programming_language)",
  "title": "Python (programming language)",
  "summary": "Brief summary...",
  "key_entities": {
    "people": ["Guido van Rossum"],
    "organizations": ["Python Software Foundation"],
    "locations": ["Netherlands"]
  },
  "sections": ["History", "Features", "Syntax"],
  "quiz": [
    {
      "question": "Who created Python?",
      "options": ["Guido van Rossum", "James Gosling", "Dennis Ritchie", "Bjarne Stroustrup"],
      "answer": "Guido van Rossum",
      "difficulty": "easy",
      "explanation": "Python was created by Guido van Rossum in 1991."
    }
  ],
  "related_topics": ["Programming language", "Software development"],
  "date_generated": "2024-01-15T10:30:00"
}


### 2. Get Quiz History
*GET* /history

*Response:*
json
[
  {
    "id": 1,
    "url": "https://en.wikipedia.org/wiki/Python_(programming_language)",
    "title": "Python (programming language)",
    "date_generated": "2024-01-15T10:30:00"
  }
]


### 3. Get Quiz Details
*GET* /quiz/{quiz_id}

Returns complete quiz data for a specific ID.

## Testing the Application

### Recommended Wikipedia URLs for Testing:

1. *Computer Science:*
   - https://en.wikipedia.org/wiki/Python_(programming_language)
   - https://en.wikipedia.org/wiki/Artificial_intelligence
   - https://en.wikipedia.org/wiki/Machine_learning

2. *History:*
   - https://en.wikipedia.org/wiki/World_War_II
   - https://en.wikipedia.org/wiki/Ancient_Rome

3. *Science:*
   - https://en.wikipedia.org/wiki/Quantum_mechanics
   - https://en.wikipedia.org/wiki/Theory_of_relativity

4. *Biography:*
   - https://en.wikipedia.org/wiki/Albert_Einstein
   - https://en.wikipedia.org/wiki/Marie_Curie

### Expected Behavior:

1. Enter a Wikipedia URL in Tab 1
2. Click "Generate Quiz"
3. Wait 20-30 seconds for AI processing
4. View generated quiz with:
   - Article summary
   - Key entities (people, organizations, locations)
   - 5-10 questions with difficulty levels
   - Explanations for each answer
   - Related topics for further reading
5. Switch to Tab 2 to see quiz history
6. Click "View Details" to see any past quiz

## Technologies Used

### Backend
- *FastAPI*: Modern, fast web framework for building APIs
- *SQLAlchemy*: SQL toolkit and ORM
- *BeautifulSoup4*: Web scraping library
- *LangChain*: Framework for LLM applications
- *Google Gemini*: AI model for quiz generation
- *Pydantic*: Data validation using Python type hints

### Frontend
- *React*: UI library for building user interfaces
- *Vite*: Next-generation frontend tooling
- *Tailwind CSS*: Utility-first CSS framework

### Database
- *SQLite*: Lightweight file-based database

## Key Features Implementation

### 1. Prompt Engineering
The LLM prompt is carefully designed to:
- Extract structured information from unstructured text
- Generate diverse questions with varying difficulty
- Minimize hallucination by grounding in article content
- Produce consistent JSON output

### 2. Error Handling
- URL validation (must be English Wikipedia)
- Network error handling for scraping
- LLM generation failures
- Database transaction errors
- Clear user feedback for all error states

### 3. Data Persistence
- All quizzes stored in SQLite database
- Full quiz data serialized as JSON
- Historical access to all generated quizzes

### 4. UI/UX Design
- Clean, minimal interface
- Loading states for async operations
- Responsive design for all screen sizes
- Color-coded difficulty levels
- Modal for detailed quiz viewing

## Troubleshooting

### Backend Issues

*Port 8000 already in use:*
bash
uvicorn main:app --reload --port 8001

Update API_BASE_URL in frontend/src/services/api.js to match.

*CORS errors:*
Ensure CORS middleware in main.py includes your frontend URL.

*API key errors:*
Verify .env file exists in backend folder with correct key.

### Frontend Issues

*API connection failed:*
- Check backend is running on port 8000
- Verify API_BASE_URL in api.js

*Build errors:*
bash
rm -rf node_modules package-lock.json
npm install


## Database Schema

### Quiz Table
- id: Primary key (Integer)
- url: Wikipedia URL (String)
- title: Article title (String)
- date_generated: Timestamp (DateTime)
- scraped_content: Raw article text (Text)
- full_quiz_data: Complete quiz JSON (Text)

## Future Enhancements

- [ ] "Take Quiz" mode with scoring
- [ ] URL validation and preview
- [ ] Caching to prevent duplicate scraping
- [ ] Section-wise question grouping
- [ ] Export quiz as PDF
- [ ] Multiple language support
- [ ] User authentication and profiles

## License

This project is created for educational purposes as part of the DeepKlarity assignment.

## Contact

For questions or issues, please create an issue in the repository.