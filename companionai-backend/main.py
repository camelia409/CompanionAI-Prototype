import uvicorn
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import google.generativeai as genai

# Initialize FastAPI
app = FastAPI()

# Configure CORS to allow frontend requests
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

# Define request model
class ChatRequest(BaseModel):
    user_input: str

@app.post("/ai-chat")
async def ai_chat(request: ChatRequest):
    """
    Endpoint to process user input and generate AI-powered health responses.
    Returns a structured, formatted response.
    """
    user_message = request.user_input

    # Structured AI Prompt
    ai_prompt = f"""
    You are an AI health assistant. Please provide a well-structured response with:
    - **Bold section headings** (e.g., Symptoms, What To Do, Tips, When to Seek Medical Help)
    - **Bullet points** for easy reading.
    - **Concise information** (max 5-7 bullet points per section).
    - **Clear spacing** for readability.
    - **Medical attention reminders** if the condition is serious.
    - **Limit response to 300 words.**

    **User Query:** {user_message}

    **AI Response:**
    """

    try:
        # Call Gemini AI API
        model = genai.GenerativeModel("gemini-2.0-flash")
        response = model.generate_content(ai_prompt)

        # Format AI response for readability
        formatted_response = format_ai_response(response.text)
        return {"response": formatted_response}

    except Exception as e:
        raise HTTPException(status_code=500, detail=f"AI Error: {str(e)}")

def format_ai_response(text: str) -> str:
    """
    Formats the AI response for readability:
    - Ensures spacing between sections
    - Retains markdown-friendly formatting
    """
    formatted_text = text.replace("**", "").replace("\n", "\n\n")
    return formatted_text

@app.get("/health-check")
def health_check():
    """Simple health check endpoint to verify API is running."""
    return {"message": "FastAPI is running!"}

# Run FastAPI Server
if __name__ == "__main__":
    uvicorn.run(app, host="127.0.0.1", port=8000, log_level="info")
