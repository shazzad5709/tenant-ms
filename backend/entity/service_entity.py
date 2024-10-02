from pydantic import BaseModel, EmailStr
from typing import Optional
from fastapi import HTTPException, APIRouter, Depends
from ..config import db
from bson import ObjectId


router = APIRouter()


def serialize_service(service):
  """
  Convert MongoDB service document to a JSON-serializable dict.
  """
  return {
    "id": str(service["_id"]),
    "serviceName": service["serviceName"],
    "description": service["description"],
    "charge": service["charge"],
    "serviceCategory": service["serviceCategory"],
    "serviceProviderName": service["serviceProviderName"],
    "serviceProviderEmail": service["serviceProviderEmail"],
    "serviceProviderPhone": service["serviceProviderPhone"],
    "houseId": str(service["houseId"]),
    "houseNumber": service["houseNumber"],
    "streetAddress": service["streetAddress"],
    "city": service["city"],
    "state": service["state"],
    "zipCode": service["zipCode"],
    "houseOwner": service["houseOwner"],
    "houseOwnerId": str(service["houseOwnerId"]),
  }


class ResponseModel(BaseModel):
  message: str


class ServiceBoundary(BaseModel):
  serviceName: str
  description: str
  charge: float
  serviceCategory: str
  serviceProviderName: str
  serviceProviderEmail: str
  serviceProviderPhone: str
  houseId: str
  houseNumber: str
  streetAddress: str
  city: str
  state: str
  zipCode: str
  houseOwner: str
  houseOwnerId: str


class ServiceEntity(BaseModel):
  id: str
  serviceName: str
  description: str
  charge: float
  serviceCategory: str
  serviceProviderName: str
  serviceProviderEmail: str
  serviceProviderPhone: str
  houseId: str
  houseNumber: str
  streetAddress: str
  city: str
  state: str
  zipCode: str
  houseOwner: str
  houseOwnerId: str
