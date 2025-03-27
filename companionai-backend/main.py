import uvicorn
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import google.generativeai as genai  # ✅ Correct Import

# Initialize FastAPI
app = FastAPI()

# CORS Configuration
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],  # Frontend URL
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Configure Gemini AI API
GENAI_API_KEY = "AIzaSyCv9jngvdp95nMJCSII_oxxNgt_p0vu47w"  # Replace with your API Key
genai.configure(api_key=GENAI_API_KEY)

# Define Request Model
class ChatRequest(BaseModel):
    user_input: str

@app.post("/ai-chat")
def ai_chat(request: ChatRequest):
    try:
        model = genai.GenerativeModel("gemini-2.0-flash")
        response = model.generate_content(request.user_input)
        return {"response": response.text}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.get("/health-check")
def health_check():
    return {"message": "FastAPI is running!"}

# Run FastAPI
if __name__ == "__main__":
    uvicorn.run(app, host="127.0.0.1", port=8000, log_level="info")
