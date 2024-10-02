from pydantic import BaseModel, EmailStr
from typing import Optional
from fastapi import HTTPException, APIRouter, Depends
from ..config import db
from bson import ObjectId


router = APIRouter()


def serialize_complaint(complaint):
  """
  Convert MongoDB complaint document to a JSON-serializable dict.
  """
  return {
    "id": str(complaint["_id"]),
    "tenantName": complaint["tenantName"],
    "tenantEmail": complaint["tenantEmail"],
    "tenantPhone": complaint["tenantPhone"],
    "houseId": str(complaint["houseId"]),
    "apartmentNumber": complaint["apartmentNumber"],
    "streetAddress": complaint["streetAddress"],
    "city": complaint["city"],
    "state": complaint["state"],
    "zipCode": complaint["zipCode"],
    "complaintType": complaint["complaintType"],
    "complaintDescription": complaint["complaintDescription"],
    "status": complaint["status"],
  }


class ComplaintEntity(BaseModel):
  id: str
  tenantName: str
  tenantEmail: str
  tenantPhone: str
  houseId: str
  apartmentNumber: str
  streetAddress: str
  city: str
  state: str
  zipCode: str
  complaintType: str
  complaintDescription: str
  status: str
