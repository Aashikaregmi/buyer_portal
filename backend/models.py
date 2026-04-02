from pydantic import BaseModel, EmailStr, Field, field_validator
from datetime import datetime
import re

#AUTH MODELS 

class UserRegister(BaseModel):
    """What the user sends when signing up."""
    firstName: str = Field(..., min_length=1, max_length=100)
    lastName: str = Field(..., min_length=1, max_length=100)
    email: EmailStr
    password: str = Field(..., min_length=8, max_length=100)

    @field_validator("password")
    @classmethod
    def password_strength(cls, v: str) -> str:
        if not re.search(r"\d", v):
            raise ValueError("Password must contain at least one number")
        if not re.search(r"[!@#$%^&*(),.?\":{}|<>]", v):
            raise ValueError("Password must contain at least one special character")
        return v


class UserLogin(BaseModel):
    """What the user sends when logging in."""
    email: EmailStr
    password: str


class UserResponse(BaseModel):
    """What we send BACK about a user. No password here!"""
    id: str
    fullName: str
    email: str
    role: str


class TokenResponse(BaseModel):
    """What we send back after successful login."""
    access_token: str
    token_type: str = "bearer"
    user: UserResponse


#FAVOURITE MODELS 

class FavouriteAdd(BaseModel):
    property_id: str
    property_name: str = Field(..., min_length=1, max_length=200)
    image_url: str


class FavouriteResponse(BaseModel):
    id: str
    property_id: str
    property_name: str
    image_url: str
    added_at: datetime


class MessageResponse(BaseModel):
    """Generic success/error message."""
    message: str


# PROPERTY MODEL
class PropertyResponse(BaseModel):
    id: str
    title: str
    image_url: str
    price: float
    location: str
    bedrooms: int
    bathrooms: int