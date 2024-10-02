import asyncio
from motor.motor_asyncio import AsyncIOMotorClient
import os
from dotenv import load_dotenv

load_dotenv()

uri = os.environ.get("MONGODB_URI")

client = AsyncIOMotorClient(uri)
db = client[os.environ.get("MONGODB_DATABASE")]