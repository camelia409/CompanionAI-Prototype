from fastapi import APIRouter
from app.routes.fastapi_routes import fastapi_routes
from app.routes.symptom_checker import symptom_routes
from app.routes.flask_routes import flask_routes
from flask import Flask

# Initialize FastAPI Router
router = APIRouter()

# Include FastAPI routes
router.include_router(fastapi_routes, prefix="/fastapi", tags=["FastAPI Endpoints"])
router.include_router(symptom_routes, prefix="/symptom-checker", tags=["Symptom Checker API"])

# Initialize Flask App
flask_app = Flask(__name__)
flask_app.register_blueprint(flask_routes, url_prefix="/flask")

@router.get("/")
async def root():
    return {"message": "Welcome to CompanionAI Backend!"}
