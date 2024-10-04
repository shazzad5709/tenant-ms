from pydantic import BaseModel, EmailStr
from typing import Optional
from fastapi import HTTPException, APIRouter, Depends
from config import db
from bson import ObjectId


router = APIRouter()


def serialize_tenant(tenant):
  """
  Convert MongoDB tenant document to a JSON-serializable dict.
  """
  return {
    "userId": str(tenant["userId"]),
    "firstName": tenant["firstName"],
    "lastName": tenant["lastName"],
    "email": tenant["email"],
    "phoneNumber": tenant["phoneNumber"],
    "passportID": tenant["passportID"],
    "houseId": tenant["houseId"],
  }


class ResponseModel(BaseModel):
  message: str


class Tenant(BaseModel):
  userId: str
  firstName: Optional[str] = None
  lastName: Optional[str] = None
  email: EmailStr
  phoneNumber: Optional[str] = None
  passportID: Optional[str] = None
  houseId: Optional[str] = None

  async def create_tenant(self):
    try:
      await db["tenant"].insert_one(self.dict())
    except Exception as e:
      raise HTTPException(status_code=500, detail=str(e))
    return ResponseModel(message="Tenant created successfully")


@router.get("/", response_model=list[Tenant])
async def fetch_all_tenants():
  try:
    tenants = await db["tenant"].find().to_list(length=100)
    return [serialize_tenant(tenant) for tenant in tenants]

  except Exception as e:
    raise HTTPException(status_code=400, detail=str(e))


@router.get("/{tenant_id}", response_model=Tenant)
async def fetch_one_tenant(tenant_id: str):
  try:
    tenant = await db["tenant"].find_one({"userId": tenant_id})
    if tenant:
      return serialize_tenant(tenant)
    else:
      raise HTTPException(status_code=404, detail=f"Tenant {tenant_id} not found")
  except Exception as e:
    raise HTTPException(status_code=400, detail=str(e))


@router.put("/{tenant_id}", response_model=ResponseModel)
async def update_tenant(tenant_id: str, house: dict):
  houseId = house.get("houseId")
  try:
    await db["tenant"].update_one({"userId": tenant_id}, {"$set": {"houseId": houseId}})
    return ResponseModel(message="Tenant updated successfully")
  except Exception as e:
    raise HTTPException(status_code=400, detail=str(e))
