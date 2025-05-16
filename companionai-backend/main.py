import os
import uvicorn
import logging
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import google.generativeai as genai
from dotenv import load_dotenv, find_dotenv

# Load environment variables
dotenv_path = find_dotenv()
if not dotenv_path:
    raise ValueError("❌ .env file not found!")
load_dotenv(dotenv_path)

# Fetch API key
api_key = os.getenv("GOOGLE_AI_API_KEY")
if not api_key:
    raise ValueError("❌ GOOGLE_AI_API_KEY is missing. Check your .env file.")

# Configure logging
logging.basicConfig(level=logging.INFO)
logging.info("🔹 API Key loaded successfully")

# Configure Google AI API
genai.configure(api_key=api_key)

# Get available models
available_models = [m.name for m in genai.list_models()]
logging.info(f"✅ Available Gemini models: {available_models}")

# Select a model manually from available ones
MODEL_NAME = "models/gemini-1.5-flash-latest"
if MODEL_NAME not in available_models:
    raise ValueError(f"❌ Selected model '{MODEL_NAME}' is not available! Choose from: {available_models}")

logging.info(f"✅ Using Model: {MODEL_NAME}")

# Initialize FastAPI
app = FastAPI()

# ✅ CORS middleware setup
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],  # Change this to your frontend URL if deployed
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# ✅ Chat endpoint model
class ChatRequest(BaseModel):
    user_input: str

@app.post("/ai-chat")
def ai_chat(request: ChatRequest):
    try:
        model = genai.GenerativeModel(MODEL_NAME)
        response = model.generate_content(request.user_input)
        return {"response": response.text}
    except Exception as e:
        logging.error(f"❌ AI Chat error: {e}")
        raise HTTPException(status_code=500, detail=str(e))

@app.get("/health-check")
def health_check():
    return {"message": "FastAPI is running!"}

# ✅ Import & mount Symptom Checker Router
from app.routes.symptom_checker import symptom_routes
app.include_router(symptom_routes)

# ✅ Correct way to run the app from script
if __name__ == "__main__":
    uvicorn.run("main:app", host="127.0.0.1", port=8000, reload=True)
