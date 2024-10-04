from fastapi import APIRouter, HTTPException, Depends
from boundary.user_boundary import UserBoundary
from entity.user_entity import UserEntity
from entity.homeowner import Homeowner
from entity.tenant import Tenant
from config import db
import bcrypt
from pydantic import BaseModel

router = APIRouter()


class SignUpResponse(BaseModel):
  status_code: int
  message: str


class SignUpController:
  async def signup(self, user_data: UserBoundary):
    try:
      existing_user = await db.user.find_one(
        {"$or": [{"username": user_data.username}, {"email": user_data.email}]}
      )
      if existing_user:
        raise HTTPException(
          status_code=400, detail="Username or email already registered"
        )

      user_model = user_data.dict()
      user_model["name"] = user_data.firstName + " " + user_data.lastName
      user = UserEntity(**{k: user_model[k] for k in UserEntity.__fields__.keys()})

      result = await user.sign_up()
      print(result)

      if user.role == "homeowner":
        homeowner = Homeowner(
          userId=result,
          firstName=user.firstName,
          lastName=user.lastName,
          email=user.email,
          phoneNumber=user.phoneNumber,
          passportID=user.passportID,
          houseStreetNumber=user.houseStreetNumber,
          city=user.city,
          state=user.state,
          zipCode=user.zipCode,
        )
        await homeowner.create_homeowner()

      if user.role == "tenant":
        tenant = Tenant(
          userId=result,
          firstName=user_data.firstName,
          lastName=user_data.lastName,
          email=user_data.email,
          phoneNumber=user_data.phoneNumber,
          passportID=user_data.passportID,
        )
        await tenant.create_tenant()

      return SignUpResponse(status_code=200, message="User created successfully")

    except ValueError as e:
      await db.user.delete_one({"email": user_data.email})
      raise HTTPException(status_code=400, detail=str(e))


@router.post("/signup", response_model=SignUpResponse)
async def signup(
  user_data: UserBoundary, controller: SignUpController = Depends(SignUpController)
):
  return await controller.signup(user_data)
