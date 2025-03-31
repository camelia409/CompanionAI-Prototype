import os
import uvicorn
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from dotenv import load_dotenv, find_dotenv
import google.generativeai as genai

# Force load .env file
dotenv_path = find_dotenv()
if not dotenv_path:
    raise ValueError("❌ .env file not found!")
load_dotenv(dotenv_path)

# Fetch API key
api_key = os.getenv("GOOGLE_AI_API_KEY")
print(f"🔹 Loaded API Key: {api_key}")

if not api_key:
    raise ValueError("❌ GOOGLE_AI_API_KEY is missing. Check your .env file.")

# Configure Google AI API
genai.configure(api_key=api_key)

# Initialize FastAPI
app = FastAPI()

# Configure CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Import API routes (ensure symptom_routes is properly defined in symptom_checker.py)
from app.routes.fastapi_routes import fastapi_routes
from app.routes.symptom_checker import symptom_routes
from app.routes.flask_routes import flask_routes

# Include FastAPI routes
app.include_router(fastapi_routes, prefix="/fastapi")
app.include_router(symptom_routes, prefix="/symptom-checker")

@app.get("/")
async def root():
    """Root endpoint to verify API is running."""
    return {"message": "Welcome to CompanionAI Backend!"}

# Run FastAPI Server
if __name__ == "__main__":
    uvicorn.run(app, host="127.0.0.1", port=8000, log_level="info")
