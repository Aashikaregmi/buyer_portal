from fastapi import APIRouter
from database import properties_collection
from models import PropertyResponse

router = APIRouter(prefix="/properties", tags=["Properties"])


@router.get("/", response_model=list[PropertyResponse])
async def get_properties():
    properties = []
    cursor = properties_collection.find()
    async for prop in cursor:
        properties.append(PropertyResponse(
            id=str(prop["_id"]),
            title=prop["title"],
            image_url=prop["image_url"],
            price=prop["price"],
            location=prop["location"],
            bedrooms=prop["bedrooms"],
            bathrooms=prop["bathrooms"],
        ))
    return properties