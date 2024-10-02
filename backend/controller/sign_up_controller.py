from fastapi import APIRouter, HTTPException, Depends
from boundary.user_boundary import UserBoundary
from entity.user_entity import UserEntity
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

      print(user_data)
      user_model = user_data.dict()
      user = UserEntity(**{k: user_model[k] for k in UserEntity.__fields__.keys()})
      user.name = user_model.first_name + " " + user_model.last_name

      result = await user.sign_up()

      return SignUpResponse(status_code=200, message="User created successfully")

    except ValueError as e:
      raise HTTPException(status_code=400, detail=str(e))


@router.post("/signup", response_model=SignUpResponse)
async def signup(
  user_data: UserBoundary, controller: SignUpController = Depends(SignUpController)
):
  return await controller.signup(user_data)
