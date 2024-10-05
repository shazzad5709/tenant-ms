from pydantic import BaseModel, EmailStr
from typing import Optional
from fastapi import HTTPException, APIRouter, Depends
from config import db
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
    "houseNumber": complaint["houseNumber"],
    "streetAddress": complaint["streetAddress"],
    "city": complaint["city"],
    "state": complaint["state"],
    "zipCode": complaint["zipCode"],
    "complaintType": complaint["complaintType"],
    "description": complaint["description"],
    "status": complaint["status"],
  }


class ResponseModel(BaseModel):
  message: str


class ComplaintBoundary(BaseModel):
  tenantName: str
  tenantEmail: EmailStr
  tenantPhone: str
  houseId: str
  houseNumber: str
  streetAddress: str
  city: str
  state: str
  zipCode: str
  complaintType: str
  description: str
  status: str


class ComplaintEntity(BaseModel):
  id: str
  tenantName: str
  tenantEmail: str
  tenantPhone: str
  houseId: str
  houseNumber: str
  streetAddress: str
  city: str
  state: str
  zipCode: str
  complaintType: str
  description: str
  status: str


@router.get("/")
async def fetch_all_complaints():
  try:
    complaints = await db["complaint"].find().to_list(length=100)
    return [serialize_complaint(complaint) for complaint in complaints]

  except Exception as e:
    raise HTTPException(status_code=400, detail=str(e))


@router.get("/{id}")
async def fetch_complaint_by_id(id: str):
  try:
    complaint = await db["complaint"].find_one({"_id": ObjectId(id)})
    if not complaint:
      raise HTTPException(status_code=404, detail="Complaint not found")
    return serialize_complaint(complaint)

  except Exception as e:
    raise HTTPException(status_code=400, detail=str(e))


@router.get("/house/{houseId}")
async def fetch_complaint_by_house_id(houseId: str):
  try:
    complaints = await db["complaint"].find({"houseId": houseId}).to_list(length=100)

    return [serialize_complaint(complaint) for complaint in complaints]

  except Exception as e:
    raise HTTPException(status_code=400, detail=str(e))


@router.get("/tenant/{email}")
async def fetch_complaint_by_tenant(email: EmailStr):
  try:
    complaints = await db["complaint"].find({"tenantEmail": email}).to_list(length=100)
    return [serialize_complaint(complaint) for complaint in complaints]

  except Exception as e:
    raise HTTPException(status_code=400, detail=str(e))


@router.post("/")
async def create_complaint(complaint: ComplaintBoundary):
  try:
    await db["complaint"].insert_one(complaint.dict())
    return ResponseModel(message="Complaint created successfully")

  except Exception as e:
    raise HTTPException(status_code=400, detail=str(e))


@router.put("/{id}")
async def update_complaint(id: str, complaint: ComplaintBoundary):
  try:
    await db["complaint"].update_one({"_id": ObjectId(id)}, {"$set": complaint.dict()})
    return ResponseModel(message="Complaint updated successfully")

  except Exception as e:
    raise HTTPException(status_code=400, detail=str(e))


@router.put("/resolve/{id}")
async def update_complaint_status(id: str):
  try:
    await db["complaint"].update_one(
      {"_id": ObjectId(id)}, {"$set": {"status": "Resolved"}}
    )
    return ResponseModel(message="Complaint status updated successfully")

  except Exception as e:
    raise HTTPException(status_code=400, detail=str(e))


@router.delete("/{id}")
async def delete_complaint(id: str):
  try:
    await db["complaint"].delete_one({"_id": ObjectId(id)})
    return ResponseModel(message="Complaint deleted successfully")

  except Exception as e:
    raise HTTPException(status_code=400, detail=str(e))
