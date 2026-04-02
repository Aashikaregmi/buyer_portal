import asyncio
from motor.motor_asyncio import AsyncIOMotorClient
from dotenv import load_dotenv
import os

load_dotenv()

MONGO_URL = os.getenv("MONGO_URL", "mongodb://localhost:27017")
client = AsyncIOMotorClient(MONGO_URL)
db = client["buyer_portal"]
properties_collection = db["properties"]

SAMPLE_PROPERTIES = [
    {
        "title": "Lake View Villa",
        "image_url": "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=800",
        "price": 450000,
        "location": "Pokhara, Nepal",
        "bedrooms": 4,
        "bathrooms": 3,
    },
    {
        "title": "Modern City Apartment",
        "image_url": "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800",
        "price": 280000,
        "location": "Kathmandu, Nepal",
        "bedrooms": 2,
        "bathrooms": 1,
    },
    {
        "title": "Mountain Retreat Cottage",
        "image_url": "https://images.unsplash.com/photo-1518780664697-55e3ad937233?w=800",
        "price": 350000,
        "location": "Nagarkot, Nepal",
        "bedrooms": 3,
        "bathrooms": 2,
    },
    {
        "title": "Riverside Bungalow",
        "image_url": "https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=800",
        "price": 520000,
        "location": "Chitwan, Nepal",
        "bedrooms": 5,
        "bathrooms": 4,
    },
    {
        "title": "Heritage Townhouse",
        "image_url": "https://images.unsplash.com/photo-1480074568708-e7b720bb3f09?w=800",
        "price": 390000,
        "location": "Bhaktapur, Nepal",
        "bedrooms": 3,
        "bathrooms": 2,
    },
    {
        "title": "Sunset Penthouse",
        "image_url": "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800",
        "price": 680000,
        "location": "Lalitpur, Nepal",
        "bedrooms": 3,
        "bathrooms": 2,
    },
    {
        "title": "Garden Estate",
        "image_url": "https://images.unsplash.com/photo-1416331108676-a22ccb276e35?w=800",
        "price": 720000,
        "location": "Budhanilkantha, Nepal",
        "bedrooms": 5,
        "bathrooms": 4,
    },
    {
        "title": "Hilltop Haven",
        "image_url": "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800",
        "price": 550000,
        "location": "Dhulikhel, Nepal",
        "bedrooms": 4,
        "bathrooms": 3,
    },
    {
        "title": "Cozy Studio Flat",
        "image_url": "https://images.unsplash.com/photo-1493809842364-78817add7ffb?w=800",
        "price": 120000,
        "location": "Thamel, Kathmandu",
        "bedrooms": 1,
        "bathrooms": 1,
    },
    {
        "title": "Luxury Farmhouse",
        "image_url": "https://images.unsplash.com/photo-1505843513577-22bb7d21e455?w=800",
        "price": 890000,
        "location": "Godawari, Nepal",
        "bedrooms": 6,
        "bathrooms": 5,
    },
    {
        "title": "Minimalist Loft",
        "image_url": "https://images.unsplash.com/photo-1536376072261-38c75010e6c9?w=800",
        "price": 310000,
        "location": "Jhamsikhel, Lalitpur",
        "bedrooms": 2,
        "bathrooms": 1,
    },
    {
        "title": "Colonial Mansion",
        "image_url": "https://images.unsplash.com/photo-1572120360610-d971b9d7767c?w=800",
        "price": 950000,
        "location": "Lazimpat, Kathmandu",
        "bedrooms": 7,
        "bathrooms": 5,
    },
    {
        "title": "Bamboo Beach House",
        "image_url": "https://images.unsplash.com/photo-1499793983690-e29da59ef1c2?w=800",
        "price": 410000,
        "location": "Sauraha, Chitwan",
        "bedrooms": 3,
        "bathrooms": 2,
    },
    {
        "title": "Sky Terrace Duplex",
        "image_url": "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800",
        "price": 620000,
        "location": "Maharajgunj, Kathmandu",
        "bedrooms": 4,
        "bathrooms": 3,
    },
    {
        "title": "Pine Forest Cabin",
        "image_url": "https://images.unsplash.com/photo-1510798831971-661eb04b3739?w=800",
        "price": 270000,
        "location": "Kakani, Nepal",
        "bedrooms": 2,
        "bathrooms": 1,
    },
    {
        "title": "Rooftop Garden Flat",
        "image_url": "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800",
        "price": 340000,
        "location": "Kupondole, Lalitpur",
        "bedrooms": 2,
        "bathrooms": 2,
    },
    {
        "title": "Valley View Manor",
        "image_url": "https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?w=800",
        "price": 780000,
        "location": "Changunarayan, Nepal",
        "bedrooms": 5,
        "bathrooms": 4,
    },
    {
        "title": "Zen Courtyard Home",
        "image_url": "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=800",
        "price": 460000,
        "location": "Patan, Lalitpur",
        "bedrooms": 3,
        "bathrooms": 2,
    },
    {
        "title": "Cliffside Retreat",
        "image_url": "https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=800",
        "price": 830000,
        "location": "Bandipur, Nepal",
        "bedrooms": 4,
        "bathrooms": 3,
    },
    {
        "title": "Urban Micro Apartment",
        "image_url": "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800",
        "price": 95000,
        "location": "New Road, Kathmandu",
        "bedrooms": 1,
        "bathrooms": 1,
    },
    {
        "title": "Terracotta Ranch",
        "image_url": "https://images.unsplash.com/photo-1600573472550-8090b5e0745e?w=800",
        "price": 670000,
        "location": "Lumbini, Nepal",
        "bedrooms": 5,
        "bathrooms": 3,
    },
    {
        "title": "Snowpeak Chalet",
        "image_url": "https://images.unsplash.com/photo-1542718610-a1d656d1884c?w=800",
        "price": 590000,
        "location": "Namche Bazaar, Nepal",
        "bedrooms": 3,
        "bathrooms": 2,
    },
    {
        "title": "Artist Warehouse Loft",
        "image_url": "https://images.unsplash.com/photo-1574362848149-11496d93a7c7?w=800",
        "price": 380000,
        "location": "Sanepa, Lalitpur",
        "bedrooms": 2,
        "bathrooms": 1,
    },
    {
        "title": "Tropical Garden Villa",
        "image_url": "https://images.unsplash.com/photo-1580587771525-78b9dba3b914?w=800",
        "price": 750000,
        "location": "Bharatpur, Nepal",
        "bedrooms": 4,
        "bathrooms": 3,
    },
    {
        "title": "Glass Wall Residence",
        "image_url": "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800",
        "price": 1100000,
        "location": "Budhanilkantha, Nepal",
        "bedrooms": 6,
        "bathrooms": 4,
    },
    {
        "title": "Pagoda Style Home",
        "image_url": "https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=800",
        "price": 430000,
        "location": "Kirtipur, Nepal",
        "bedrooms": 3,
        "bathrooms": 2,
    },
    {
        "title": "Sunrise Flat",
        "image_url": "https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?w=800",
        "price": 220000,
        "location": "Balaju, Kathmandu",
        "bedrooms": 2,
        "bathrooms": 1,
    },
    {
        "title": "Orchard Country House",
        "image_url": "https://images.unsplash.com/photo-1568605114967-8130f3a36994?w=800",
        "price": 640000,
        "location": "Ilam, Nepal",
        "bedrooms": 4,
        "bathrooms": 3,
    },
    {
        "title": "Riverside Penthouse",
        "image_url": "https://images.unsplash.com/photo-1600607687644-aac4c3eac7f4?w=800",
        "price": 710000,
        "location": "Trisuli, Nepal",
        "bedrooms": 3,
        "bathrooms": 2,
    },
    {
        "title": "Sandstone Villa",
        "image_url": "https://images.unsplash.com/photo-1583608205776-bfd35f0d9f83?w=800",
        "price": 490000,
        "location": "Janakpur, Nepal",
        "bedrooms": 4,
        "bathrooms": 3,
    },
]


async def seed():
    await properties_collection.delete_many({})
    result = await properties_collection.insert_many(SAMPLE_PROPERTIES)
    print(f"Inserted {len(result.inserted_ids)} properties")


asyncio.run(seed())