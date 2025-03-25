from fastapi import APIRouter

fastapi_routes = APIRouter()

@fastapi_routes.get("/")
async def root():
    return {"message": "Welcome to FastAPI!"}

@fastapi_routes.get("/fastapi-endpoint")
async def fastapi_data():
    return {"message": "FastAPI endpoint is working!"}
