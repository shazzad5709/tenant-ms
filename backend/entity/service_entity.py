from pydantic import BaseModel, EmailStr
from typing import Optional
from fastapi import HTTPException, APIRouter, Depends
from config import db
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
    "houseOwnerName": service["houseOwnerName"],
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
  serviceProviderEmail: EmailStr
  serviceProviderPhone: str
  houseId: str
  houseNumber: str
  streetAddress: str
  city: str
  state: str
  zipCode: str
  houseOwnerName: str
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
  houseOwnerName: str
  houseOwnerId: str


class ServiceController:
  async def getServices(self):
    try:
      services = await db["service"].find().to_list(length=100)
      return [serialize_service(service) for service in services]
    except Exception as e:
      raise HTTPException(status_code=400, detail=str(e))

  async def getServiceById(self, id: str):
    try:
      service = await db["service"].find_one({"_id": ObjectId(id)})
      if not service:
        raise HTTPException(status_code=404, detail="Service not found")
      return serialize_service(service)

    except Exception as e:
      raise HTTPException(status_code=400, detail=str(e))

  async def addService(self, service: ServiceBoundary):
    try:
      await db["service"].insert_one(service.dict())
      return ResponseModel(message="Service added successfully")

    except Exception as e:
      raise HTTPException(status_code=400, detail=str(e))

  async def updateService(self, id: str, service: ServiceBoundary):
    try:
      await db["service"].update_one({"_id": ObjectId(id)}, {"$set": service.dict()})
      return ResponseModel(message="Service updated successfully")

    except Exception as e:
      raise HTTPException(status_code=400, detail=str(e))

  async def deleteService(self, id: str):
    try:
      await db["service"].delete_one({"_id": ObjectId(id)})
      return ResponseModel(message="Service deleted successfully")

    except Exception as e:
      raise HTTPException(status_code=400, detail=str(e))

  async def fetchServiceByHouseId(self, houseId: str):
    try:
      services = await db["service"].find({"houseId": houseId}).to_list(length=100)
      return [serialize_service(service) for service in services]

    except Exception as e:
      raise HTTPException(status_code=400, detail=str(e))

  async def fetchServiceByHouseOwnerId(self, ownerId: str):
    try:
      services = await db["service"].find({"houseOwnerId": ownerId}).to_list(length=100)
      print(services)
      return [serialize_service(service) for service in services]

    except Exception as e:
      raise HTTPException(status_code=400, detail=str(e))


@router.get("/", response_model=list[ServiceEntity])
async def fetchAllServices(controller: ServiceController = Depends(ServiceController)):
  return await controller.getServices()


@router.get("/{id}", response_model=ServiceEntity)
async def fetchServiceById(
  id: str, controller: ServiceController = Depends(ServiceController)
):
  return await controller.getServiceById(id)


@router.get("/house/{houseId}", response_model=list[ServiceEntity])
async def fetchServiceByHouseId(
  houseId: str, controller: ServiceController = Depends(ServiceController)
):
  return await controller.fetchServiceByHouseId(houseId)


@router.get("/owner/{ownerId}", response_model=list[ServiceEntity])
async def fetchServiceByHouseOwnerId(
  ownerId: str, controller: ServiceController = Depends(ServiceController)
):
  return await controller.fetchServiceByHouseOwnerId(ownerId)


@router.post("/", response_model=ResponseModel)
async def addService(
  service: ServiceBoundary, controller: ServiceController = Depends(ServiceController)
):
  return await controller.addService(service)


@router.put("/{id}", response_model=ResponseModel)
async def updateService(
  id: str,
  service: ServiceBoundary,
  controller: ServiceController = Depends(ServiceController),
):
  return await controller.updateService(id, service)


@router.delete("/{id}", response_model=ResponseModel)
async def deleteService(
  id: str, controller: ServiceController = Depends(ServiceController)
):
  return await controller.deleteService(id)
