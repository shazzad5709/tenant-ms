from pydantic import BaseModel, EmailStr
from typing import Optional
from fastapi import HTTPException, APIRouter, Depends
from config import db
from bson import ObjectId


router = APIRouter()


def serialize_application(application):
  """
  Convert MongoDB application document to a JSON-serializable dict.
  """
  return {
    "id": str(application["_id"]),
    "houseId": str(application["houseId"]),
    "tenantId": str(application["tenantId"]),
    "ownerId": str(application["ownerId"]),
    "status": application["status"],
  }


class ResponseModel(BaseModel):
  message: str


class ApplicationBoundary(BaseModel):
  houseId: str
  tenantId: str
  ownerId: str
  status: str


class ApplicationEntity(BaseModel):
  id: str
  houseId: str
  tenantId: str
  ownerId: str
  status: str  # pending, accepted


@router.get("/tenant/{tenantId}", response_model=list[ApplicationEntity])
async def fetchApplicationByTenantId(tenantId: str):
  try:
    applications = (
      await db["application"]
      .find({"tenantId": tenantId, "status": "pending"})
      .to_list(length=100)
    )
    return [serialize_application(application) for application in applications]

  except Exception as e:
    raise HTTPException(status_code=400, detail=str(e))


@router.get("/owner/{ownerId}", response_model=list[ApplicationEntity])
async def fetchApplicationByOwnerId(ownerId: str):
  try:
    # fetch only the pending ones
    applications = (
      await db["application"]
      .find({"ownerId": ownerId, "status": "pending"})
      .to_list(length=100)
    )
    return [serialize_application(application) for application in applications]

  except Exception as e:
    raise HTTPException(status_code=400, detail=str(e))


@router.get("/{id}", response_model=ApplicationEntity)
async def fetchApplicationById(id: str):
  try:
    application = await db["application"].find_one(
      {"_id": ObjectId(id), "status": "pending"}
    )

    if not application:
      raise HTTPException(status_code=404, detail="Application not found")
    return serialize_application(application)

  except Exception as e:
    raise HTTPException(status_code=400, detail=str(e))


@router.get("/", response_model=list[ApplicationEntity])
async def fetchAllApplications():
  try:
    applications = (
      await db["application"].find({"status": "pending"}).to_list(length=100)
    )
    return [serialize_application(application) for application in applications]

  except Exception as e:
    raise HTTPException(status_code=400, detail=str(e))


@router.post("/")
async def create_application(application: ApplicationBoundary):
  try:
    await db["application"].insert_one(application.dict())
    return ResponseModel(message="Application created successfully")

  except Exception as e:
    raise HTTPException(status_code=400, detail=str(e))


@router.put("/{id}")
async def update_application(id: str):
  try:
    await db["application"].update_one(
      {"_id": ObjectId(id)}, {"$set": {"status": "accepted"}}
    )
    return ResponseModel(message="Application updated successfully")

  except Exception as e:
    raise HTTPException(status_code=400, detail=str(e))


@router.delete("/{id}")
async def delete_application(id: str):
  try:
    await db["application"].delete_one({"_id": ObjectId(id)})
    return ResponseModel(message="Application deleted successfully")

  except Exception as e:
    raise HTTPException(status_code=400, detail=str(e))
