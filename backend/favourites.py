from fastapi import APIRouter, HTTPException, Depends
from database import favourites_collection
from models import FavouriteAdd, FavouriteResponse, MessageResponse
from dependencies import get_current_user
from bson import ObjectId
from datetime import datetime

router = APIRouter(prefix="/favourites", tags=["Favourites"])


@router.get("/", response_model=list[FavouriteResponse])
async def get_favourites(current_user: dict = Depends(get_current_user)):
    favourites = []
    cursor = favourites_collection.find({"user_id": current_user["id"]})
    async for fav in cursor:
        favourites.append(FavouriteResponse(
            id=str(fav["_id"]),
            property_id=fav["property_id"],
            property_name=fav["property_name"],
            image_url=fav["image_url"],
            added_at=fav["added_at"],
        ))
    return favourites


@router.post("/", response_model=FavouriteResponse)
async def add_favourite(fav_data: FavouriteAdd, current_user: dict = Depends(get_current_user)):
    existing = await favourites_collection.find_one({
        "user_id": current_user["id"],
        "property_id": fav_data.property_id,
    })
    if existing:
        raise HTTPException(status_code=400, detail="Property already in favourites")

    fav_doc = {
        "user_id": current_user["id"],
        "property_id": fav_data.property_id,
        "property_name": fav_data.property_name,
        "image_url": fav_data.image_url,
        "added_at": datetime.utcnow(),
    }

    result = await favourites_collection.insert_one(fav_doc)

    return FavouriteResponse(
        id=str(result.inserted_id),
        property_id=fav_data.property_id,
        property_name=fav_data.property_name,
        image_url=fav_data.image_url,
        added_at=fav_doc["added_at"],
    )


@router.delete("/{property_id}", response_model=MessageResponse)
async def remove_favourite(property_id: str, current_user: dict = Depends(get_current_user)):
    result = await favourites_collection.delete_one({
        "user_id": current_user["id"],
        "property_id": property_id,
    })

    if result.deleted_count == 0:
        raise HTTPException(status_code=404, detail="Favourite not found")

    return MessageResponse(message="Favourite removed successfully")