from pydantic import BaseModel, EmailStr
from typing import Optional
from fastapi import HTTPException, APIRouter, Depends
from config import db
from bson import ObjectId


router = APIRouter()


def serialize_homeowner(homeowner):
  """
  Convert MongoDB homeowner document to a JSON-serializable dict.
  """
  return {
    "userId": str(homeowner["userId"]),
    "firstName": homeowner["firstName"],
    "lastName": homeowner["lastName"],
    "email": homeowner["email"],
    "phoneNumber": homeowner["phoneNumber"],
    "passportID": homeowner["passportID"],
    "houseStreetNumber": homeowner["houseStreetNumber"],
    "city": homeowner["city"],
    "state": homeowner["state"],
    "zipCode": homeowner["zipCode"],
  }


class ResponseModel(BaseModel):
  message: str


class Homeowner(BaseModel):
  userId: str
  firstName: Optional[str] = None
  lastName: Optional[str] = None
  email: EmailStr
  phoneNumber: Optional[str] = None
  passportID: Optional[str] = None
  houseStreetNumber: Optional[str] = None
  city: Optional[str] = None
  state: Optional[str] = None
  zipCode: Optional[str] = None

  async def create_homeowner(self):
    try:
      await db["homeowner"].insert_one(self.dict())
    except Exception as e:
      raise HTTPException(status_code=500, detail=str(e))
    return ResponseModel(message="Homeowner created successfully")
