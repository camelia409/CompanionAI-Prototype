from fastapi import APIRouter

# Initialize FastAPI Router
fastapi_routes = APIRouter(prefix="/fastapi", tags=["FastAPI Endpoints"])

@fastapi_routes.get("/")
async def root():
    return {"message": "Welcome to FastAPI!"}

@fastapi_routes.get("/endpoint")
async def fastapi_data():
    return {"message": "FastAPI endpoint is working!"}
