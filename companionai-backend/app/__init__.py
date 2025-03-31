from fastapi import FastAPI
from app.routes.fastapi_routes import fastapi_routes
from app.routes.symptom_checker import symptom_routes
from app.routes.flask_routes import flask_routes

app = FastAPI()

# Include FastAPI routes
app.include_router(fastapi_routes, prefix="/fastapi")
app.include_router(symptom_routes, prefix="/symptom-checker")

# Flask app setup (if needed)
from flask import Flask
flask_app = Flask(__name__)
flask_app.register_blueprint(flask_routes, url_prefix="/flask")

@app.get("/")
async def root():
    return {"message": "Welcome to CompanionAI Backend!"}
