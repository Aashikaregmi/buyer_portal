from motor.motor_asyncio import AsyncIOMotorClient
from pymongo.errors import ConnectionFailure
from dotenv import load_dotenv
import os

load_dotenv()

MONGO_URL = os.getenv("MONGO_URL", "mongodb://localhost:27017")

client = AsyncIOMotorClient(MONGO_URL)

db = client["buyer_portal"]

# collections
users_collection = db["users"]
favourites_collection = db["favourites"]
properties_collection = db["properties"]


async def setup_database():
    """Create indexes for performance and data integrity."""
    await users_collection.create_index("email", unique=True)

    # Compound index: prevents a user from favouriting
    # the same property twice
    await favourites_collection.create_index(
        [("user_id", 1), ("property_id", 1)],
        unique=True,
    )
    print("Database indexes created")


async def check_db_connection():
    """Ping MongoDB to make sure it's reachable."""
    try:
        await client.admin.command("ping")
        return True
    except ConnectionFailure:
        return False