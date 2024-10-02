from fastapi import APIRouter, HTTPException, Depends
from entity.house_entity import HouseEntity
from boundary.house_boundary import HouseBoundary
from config import db
from pydantic import BaseModel
from typing import Optional
from bson import ObjectId

router = APIRouter()


def serialize_house(house):
  """
  Convert MongoDB house document to a JSON-serializable dict.
  """
  return {
    "id": str(house["_id"]),
    "address": house["address"],
    "city": house["city"],
    "state": house["state"],
    "zipCode": house["zipCode"],
    "image": house["image"],
    "type": house["type"],
    "floorspace": house["floorspace"],
    "beds": house["beds"],
    "baths": house["baths"],
    "price": house["price"],
    "owner": house["owner"],
    "ownerId": str(house["ownerId"]),
    "parking": house["parking"],
    "phoneNumber": house["phoneNumber"],
  }


class ResponseModel(BaseModel):
  message: str


class HouseListingController:
  async def fetchAllHouses(self) -> list[HouseEntity]:
    try:
      houses = await db["house"].find().to_list(length=100)
      return [serialize_house(house) for house in houses]

    except Exception as e:
      raise HTTPException(status_code=400, detail=str(e))

  async def fetchHousesByOwnerId(self, ownerId: str) -> list[HouseEntity]:
    try:
      houses = await db["house"].find({"ownerId": ownerId}).to_list(length=100)
      return [serialize_house(house) for house in houses]

    except Exception as e:
      raise HTTPException(status_code=400, detail=str(e))

  async def fetchHouseById(self, id: str) -> HouseEntity:
    try:
      house = await db["house"].find_one({"_id": ObjectId(id)})

      if not house:
        raise HTTPException(status_code=404, detail="House not found")
      return serialize_house(house)

    except Exception as e:
      raise HTTPException(status_code=400, detail=str(e))

  async def addHouse(self, house: HouseBoundary) -> ResponseModel:
    try:
      await db["house"].insert_one(house.dict())
      return ResponseModel(message="House added successfully")

    except Exception as e:
      print(str(e))
      raise HTTPException(status_code=400, detail=str(e))


@router.get("/", response_model=list[HouseEntity])
async def fetch_houses(
  ownerId: Optional[str] = None,
  controller: HouseListingController = Depends(HouseListingController),
):
  if ownerId:
    return await controller.fetchHousesByOwnerId(ownerId)
  else:
    return await controller.fetchAllHouses()


@router.get("/{id}", response_model=HouseEntity)
async def fetchHouseById(
  id: str, controller: HouseListingController = Depends(HouseListingController)
):
  return await controller.fetchHouseById(id)


@router.post("/", response_model=ResponseModel)
async def add_house(
  house: HouseBoundary,
  controller: HouseListingController = Depends(HouseListingController),
):
  return await controller.addHouse(house)
