from contextlib import asynccontextmanager
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from database import setup_database, check_db_connection

from auth import router as auth_router
from favourites import router as favourites_router
from properties import router as properties_router


@asynccontextmanager
async def lifespan(app: FastAPI):
    """Runs once on startup, then once on shutdown."""
    print("Starting up...")
    db_ok = await check_db_connection()
    if db_ok:
        print("Connected to MongoDB")
        await setup_database()
    else:
        print("Cannot connect to MongoDB! Make sure it's running.")
    yield
    print("Shutting down...")


app = FastAPI(
    title="Buyer Portal API",
    description="A real-estate buyer portal with auth and favourites",
    version="1.0.0",
    lifespan=lifespan,
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173", "https://buyer-portal-aasignment.vercel.app", "*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(auth_router)
app.include_router(favourites_router)
app.include_router(properties_router)

@app.get("/")
async def root():
    return {"message": "Buyer Portal API is running!"}