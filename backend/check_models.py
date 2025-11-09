import os
from dotenv import load_dotenv
import google.generativeai as genai

load_dotenv()

api_key = os.getenv("GEMINI_API_KEY")
genai.configure(api_key=api_key)

print("Available Gemini Models for generateContent:")
print("=" * 60)

for model in genai.list_models():
    if 'generateContent' in model.supported_generation_methods:
        print(f"\n✅ Model Name: {model.name}")
        print(f"   Display Name: {model.display_name}")
        print(f"   Description: {model.description[:100]}...")