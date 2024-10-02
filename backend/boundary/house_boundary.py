from pydantic import BaseModel, EmailStr
from typing import Optional
from fastapi import HTTPException


class HouseBoundary(BaseModel):
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
