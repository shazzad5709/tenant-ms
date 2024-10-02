from pydantic import BaseModel, EmailStr
from typing import Optional
from fastapi import HTTPException
from config import db


class HouseEntity(BaseModel):
  id: str
  address: str
  city: str
  state: str
  zipCode: str
  owner: str
  ownerId: str
  phoneNumber: Optional[str] = None
  type: str
  floorspace: int
  beds: int
  baths: int
  price: int
  parking: int
  image: Optional[str] = None

  async def fetchAllHouses(self):
    try:
      houses = await db["house"].find().to_list()
      return houses
    except Exception as e:
      raise HTTPException(status_code=400, detail=str(e))
