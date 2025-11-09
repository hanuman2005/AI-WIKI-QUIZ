from pydantic import BaseModel, Field
from typing import List, Dict

# Pydantic models for LLM output validation

class QuizQuestion(BaseModel):
    """Individual quiz question model"""
    question: str = Field(description="The quiz question text")
    options: List[str] = Field(description="Four answer options (A-D)")
    answer: str = Field(description="The correct answer")
    difficulty: str = Field(description="Difficulty level: easy, medium, or hard")
    explanation: str = Field(description="Short explanation of the answer")

class KeyEntities(BaseModel):
    """Extracted entities from the article"""
    people: List[str] = Field(default_factory=list, description="List of people mentioned")
    organizations: List[str] = Field(default_factory=list, description="List of organizations")
    locations: List[str] = Field(default_factory=list, description="List of locations")

class QuizOutput(BaseModel):
    """Complete quiz output structure"""
    title: str = Field(description="Article title")
    summary: str = Field(description="Brief summary of the article (2-3 sentences)")
    key_entities: KeyEntities = Field(description="Key entities extracted from article")
    sections: List[str] = Field(description="Main sections of the article")
    quiz: List[QuizQuestion] = Field(description="List of 5-10 quiz questions")
    related_topics: List[str] = Field(description="3-5 related Wikipedia topics for further reading")

# Request/Response models for API

class QuizGenerateRequest(BaseModel):
    """Request model for quiz generation"""
    url: str = Field(description="Wikipedia article URL")

class QuizHistoryResponse(BaseModel):
    """Response model for quiz history list"""
    id: int
    url: str
    title: str
    date_generated: str
    
    class Config:
        from_attributes = True  # For SQLAlchemy compatibility

class QuizDetailResponse(BaseModel):
    """Response model for complete quiz details"""
    id: int
    url: str
    title: str
    summary: str
    key_entities: Dict
    sections: List[str]
    quiz: List[Dict]
    related_topics: List[str]
    date_generated: str