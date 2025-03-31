import os
from dotenv import load_dotenv
import google.generativeai as genai
from fastapi import APIRouter, HTTPException

# Load environment variables
load_dotenv()

# Fetch API key
API_KEY = os.getenv("GOOGLE_AI_API_KEY")

# Debugging: Check if the API key is being loaded
print(f"🔹 [symptom_checker.py] Loaded API Key: {API_KEY}")

if not API_KEY:
    raise ValueError("❌ GOOGLE_AI_API_KEY is missing. Set it in .env file.")

# Configure Google AI API
genai.configure(api_key=API_KEY)

# Create FastAPI Router
symptom_routes = APIRouter()

@symptom_routes.get("/check")
async def check_symptoms():
    """Dummy endpoint for symptom checking."""
    return {"message": "Symptom checker is working!"}
