import os
import logging
from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from typing import List
import google.generativeai as genai

# Initialize FastAPI Router
symptom_routes = APIRouter()

# Load API key
GENAI_API_KEY = os.getenv("GOOGLE_AI_API_KEY")
if not GENAI_API_KEY:
    raise ValueError("❌ GOOGLE_AI_API_KEY is missing. Set it in the .env file.")

genai.configure(api_key=GENAI_API_KEY)
logging.info("🔹 API Key loaded successfully")

# Define request model
class SymptomRequest(BaseModel):
    symptoms: List[str]

# Select the Gemini model
available_models = [m.name for m in genai.list_models()]
MODEL_NAME = "models/gemini-1.5-flash-latest"

if MODEL_NAME not in available_models:
    raise ValueError(f"❌ Selected model '{MODEL_NAME}' is not available! Choose from: {available_models}")

logging.info(f"✅ Using Model: {MODEL_NAME}")

# POST endpoint for symptom checker
@symptom_routes.post("/symptom-checker")
async def check_symptoms(request: SymptomRequest):
    logging.info(f"📩 Received symptoms: {request.symptoms}")

    if not request.symptoms:
        raise HTTPException(status_code=400, detail="❌ Symptoms list cannot be empty.")

    try:
        model = genai.GenerativeModel(MODEL_NAME)
        prompt = f"You are a medical assistant. Based on the following symptoms, provide a possible diagnosis and advice:\nSymptoms: {', '.join(request.symptoms)}"
        response = model.generate_content(prompt)

        # ✅ Extract diagnosis correctly
        diagnosis = response.candidates[0].content.parts[0].text if response.candidates else "No diagnosis available."

        return {"diagnosis": diagnosis}

    except Exception as e:
        logging.error(f"❌ AI Processing Error: {e}")
        raise HTTPException(status_code=500, detail=f"❌ AI Processing Error: {str(e)}")

# GET endpoint for health check
@symptom_routes.get("/symptom-checker/test")
async def test_check():
    """Dummy test endpoint"""
    return {"message": "✅ Symptom checker is working!"}
