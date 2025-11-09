from langchain_google_genai import ChatGoogleGenerativeAI
from langchain_core.prompts import PromptTemplate
from langchain_core.output_parsers import JsonOutputParser
from models import QuizOutput
import os
import re
import json
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

# Debug: Print API key status
api_key = os.getenv("GEMINI_API_KEY")
if api_key:
    print(f"✅ API Key loaded: {api_key[:10]}...")
else:
    print("❌ API Key not found in environment variables!")

# Initialize Gemini model with correct model name
llm = ChatGoogleGenerativeAI(
    model="models/gemini-2.5-flash",
    google_api_key=api_key,
    temperature=0.7
)

print(f"✅ Using model: models/gemini-2.5-flash")

# Create output parser with Pydantic schema
parser = JsonOutputParser(pydantic_object=QuizOutput)

# Define prompt template
prompt_template = """You are an expert educational content creator. Your task is to analyze a Wikipedia article and create a comprehensive, engaging quiz.

ARTICLE TITLE: {title}

ARTICLE CONTENT:
{article_text}

Based on this article, generate a structured quiz with the following components:

1. **Summary**: Write a concise 2-3 sentence summary of the article's main topic.

2. **Key Entities**: Extract and categorize important entities:
   - People: Names of individuals mentioned
   - Organizations: Companies, institutions, groups
   - Locations: Countries, cities, places

3. **Sections**: List 3-5 main topic areas covered in the article.

4. **Quiz Questions**: Generate 5-10 diverse questions that:
   - Cover different aspects of the article
   - Have varying difficulty levels (easy, medium, hard)
   - Include EXACTLY 4 options each (A-D)
   - Have clear correct answers
   - Include explanations that reference the article
   - Test comprehension, not just memorization

5. **Related Topics**: Suggest 3-5 related Wikipedia topics for further reading.

CRITICAL INSTRUCTIONS:
- Base ALL questions STRICTLY on information present in the article
- Do NOT hallucinate or add information not in the article
- Ensure questions are clear, unambiguous, and factually correct
- Make sure all 4 options are plausible but only one is correct
- Vary difficulty: 3-4 easy, 3-4 medium, 2-3 hard questions
- Explanations should clearly state why the answer is correct
- The "answer" field must contain the EXACT text of one of the options

IMPORTANT: Return ONLY valid JSON without any markdown formatting, code blocks, or extra text.
Do NOT wrap the JSON in ```json ``` or any other markers.
Return the raw JSON object directly.

{format_instructions}

Generate the quiz now:"""

# Create prompt
prompt = PromptTemplate(
    template=prompt_template,
    input_variables=["title", "article_text"],
    partial_variables={"format_instructions": parser.get_format_instructions()}
)

def clean_json_output(text: str) -> str:
    """
    Clean LLM output by removing markdown code blocks and extra text.
    
    Args:
        text: Raw output from LLM
        
    Returns:
        Clean JSON string
    """
    # Remove markdown code blocks
    text = re.sub(r'^```json\s*', '', text, flags=re.MULTILINE)
    text = re.sub(r'^```\s*$', '', text, flags=re.MULTILINE)
    text = re.sub(r'```$', '', text)
    
    # Remove any text before first {
    first_brace = text.find('{')
    if first_brace != -1:
        text = text[first_brace:]
    
    # Remove any text after last }
    last_brace = text.rfind('}')
    if last_brace != -1:
        text = text[:last_brace + 1]
    
    return text.strip()

def generate_quiz(title: str, article_text: str) -> dict:
    """
    Generate quiz from article content using LLM.
    
    Args:
        title: Article title
        article_text: Cleaned article text
        
    Returns:
        Dictionary containing quiz data matching QuizOutput schema
        
    Raises:
        Exception: If generation fails
    """
    try:
        print(f"Generating quiz for: {title}")
        print(f"Article text length: {len(article_text)} characters")
        
        # Create chain without parser first
        chain_without_parser = prompt | llm
        
        # Get raw output
        raw_output = chain_without_parser.invoke({
            "title": title,
            "article_text": article_text
        })
        
        # Extract text content
        if hasattr(raw_output, 'content'):
            raw_text = raw_output.content
        else:
            raw_text = str(raw_output)
        
        print(f"Raw output length: {len(raw_text)} characters")
        
        # Clean the output
        cleaned_json = clean_json_output(raw_text)
        
        print(f"Cleaned JSON length: {len(cleaned_json)} characters")
        
        # Parse the cleaned JSON
        try:
            result = json.loads(cleaned_json)
            
            # Validate against Pydantic schema
            validated_result = QuizOutput(**result)
            
            print("Quiz generation successful")
            return validated_result.dict()
            
        except json.JSONDecodeError as e:
            print(f"JSON parsing error: {e}")
            print(f"Cleaned JSON (first 500 chars): {cleaned_json[:500]}")
            raise Exception(f"Failed to parse JSON: {str(e)}")
        except Exception as e:
            print(f"Validation error: {e}")
            raise Exception(f"Failed to validate output: {str(e)}")
        
    except Exception as e:
        print(f"Error in quiz generation: {str(e)}")
        raise Exception(f"Failed to generate quiz: {str(e)}")