from fastapi import FastAPI, HTTPException, Depends
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session
from datetime import datetime
import json
import os

from database import get_db, Quiz
from models import QuizGenerateRequest, QuizHistoryResponse, QuizDetailResponse
from scraper import scrape_wikipedia
from llm_quiz_generator import generate_quiz

# Initialize FastAPI app
app = FastAPI(
    title="AI Wiki Quiz Generator",
    description="Generate quizzes from Wikipedia articles using AI",
    version="1.0.0"
)

# Configure CORS - Allow all origins for deployment
# In production, you can restrict this to specific domains
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Allow all origins
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def root():
    """Root endpoint"""
    return {
        "message": "AI Wiki Quiz Generator API",
        "endpoints": {
            "generate_quiz": "POST /generate_quiz",
            "get_history": "GET /history",
            "get_quiz": "GET /quiz/{quiz_id}"
        }
    }

@app.post("/generate_quiz")
def generate_quiz_endpoint(request: QuizGenerateRequest, db: Session = Depends(get_db)):
    """
    Generate a quiz from a Wikipedia URL.
    
    Args:
        request: Contains the Wikipedia URL
        db: Database session
        
    Returns:
        Generated quiz data
    """
    try:
        # Step 1: Scrape Wikipedia article
        print(f"Scraping URL: {request.url}")
        title, article_text, raw_html = scrape_wikipedia(request.url)
        print(f"Scraped article: {title}")
        
        # Step 2: Generate quiz using LLM
        print("Generating quiz with AI...")
        quiz_data = generate_quiz(title, article_text)
        print("Quiz generated successfully")
        
        # Step 3: Prepare full quiz data for storage
        full_data = {
            "url": request.url,
            "title": quiz_data.get("title", title),
            "summary": quiz_data.get("summary", ""),
            "key_entities": quiz_data.get("key_entities", {}),
            "sections": quiz_data.get("sections", []),
            "quiz": quiz_data.get("quiz", []),
            "related_topics": quiz_data.get("related_topics", [])
        }
        
        # Step 4: Save to database
        new_quiz = Quiz(
            url=request.url,
            title=full_data["title"],
            scraped_content=article_text,  # Bonus: store raw content
            full_quiz_data=json.dumps(full_data)  # Serialize to JSON string
        )
        
        db.add(new_quiz)
        db.commit()
        db.refresh(new_quiz)
        
        print(f"Quiz saved to database with ID: {new_quiz.id}")
        
        # Return full quiz data with ID
        return {
            "id": new_quiz.id,
            "date_generated": new_quiz.date_generated.isoformat(),
            **full_data
        }
        
    except ValueError as e:
        raise HTTPException(status_code=400, detail=str(e))
    except Exception as e:
        print(f"Error: {str(e)}")
        raise HTTPException(status_code=500, detail=f"Error generating quiz: {str(e)}")

@app.get("/history", response_model=list[QuizHistoryResponse])
def get_history(db: Session = Depends(get_db)):
    """
    Get list of all generated quizzes.
    
    Args:
        db: Database session
        
    Returns:
        List of quiz history items
    """
    try:
        quizzes = db.query(Quiz).order_by(Quiz.date_generated.desc()).all()
        
        return [
            QuizHistoryResponse(
                id=quiz.id,
                url=quiz.url,
                title=quiz.title,
                date_generated=quiz.date_generated.isoformat()
            )
            for quiz in quizzes
        ]
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error fetching history: {str(e)}")

@app.get("/quiz/{quiz_id}")
def get_quiz(quiz_id: int, db: Session = Depends(get_db)):
    """
    Get detailed quiz data by ID.
    
    Args:
        quiz_id: Quiz ID
        db: Database session
        
    Returns:
        Complete quiz data
    """
    try:
        quiz = db.query(Quiz).filter(Quiz.id == quiz_id).first()
        
        if not quiz:
            raise HTTPException(status_code=404, detail="Quiz not found")
        
        # Deserialize JSON data
        quiz_data = json.loads(quiz.full_quiz_data)
        
        return {
            "id": quiz.id,
            "date_generated": quiz.date_generated.isoformat(),
            **quiz_data
        }
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error fetching quiz: {str(e)}")

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)