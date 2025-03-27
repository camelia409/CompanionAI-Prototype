import threading
import time
import os
import uvicorn
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from flask import Flask, jsonify

# Prevent Flask from restarting itself
os.environ["FLASK_RUN_FROM_CLI"] = "false"

# Initialize FastAPI
fastapi_app = FastAPI()

# CORS Configuration (Update frontend URL in production)
origins = [
    "http://localhost:3000",  # Next.js Frontend
]

fastapi_app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,  # Allow only specified frontend origins
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@fastapi_app.get("/")
def read_root():
    return {"message": "Welcome to FastAPI Backend!"}

@fastapi_app.get("/fastapi-endpoint")
def fastapi_route():
    return {"message": "This is a FastAPI endpoint"}

@fastapi_app.get("/health-check")
def health_check():
    return {"message": "FastAPI is running!"}

# Initialize Flask
flask_app = Flask(__name__)

@flask_app.route("/")
def home():
    return jsonify({"message": "Welcome to Flask Backend!"})

@flask_app.route("/flask-endpoint")
def flask_route():
    return jsonify({"message": "This is a Flask endpoint"})

@flask_app.route("/health-check")
def flask_health():
    return jsonify({"message": "Flask is running!"})

# Function to run FastAPI on an available port
def run_fastapi():
    port = 8000  # Default FastAPI port
    while True:
        try:
            uvicorn.run(fastapi_app, host="127.0.0.1", port=port, log_level="info")
            break
        except OSError:
            print(f"⚠️ Port {port} in use, trying next...")
            port += 1  # Increment port and retry

# Function to run Flask on a fixed port
def run_flask():
    flask_app.run(host="127.0.0.1", port=5000, debug=False)

# Main execution: Run both FastAPI and Flask
if __name__ == "__main__":
    # Start FastAPI in a separate thread
    fastapi_thread = threading.Thread(target=run_fastapi, daemon=True)
    fastapi_thread.start()

    # Allow FastAPI some time to initialize
    time.sleep(2)

    # Start Flask (blocking call)
    run_flask()
