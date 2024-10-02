from fastapi import APIRouter, HTTPException, Depends
from fastapi.security import OAuth2PasswordRequestForm
from pydantic import BaseModel
from database.models import UserInDB
from boundary.user_boundary import UserBoundary
from entity.user_entity import UserEntity
from config import db
import bcrypt
import jwt
import os
from datetime import datetime, timedelta
from passlib.context import CryptContext

router = APIRouter()


class SignInRequest(BaseModel):
  email: str
  password: str


class SignInResponse(BaseModel):
  id: str
  access_token: str
  username: str
  email: str
  role: str
  token_type: str
  name: str


class Token(BaseModel):
  access_token: str
  token_type: str


class SignInController:
  def verify_password(self, plain_password, hashed_password):
    return bcrypt.checkpw(plain_password.encode(), hashed_password.encode())

  def create_access_token(self, data: dict, expires_delta: timedelta = None):
    to_encode = data.copy()
    if expires_delta:
      expire = datetime.now() + expires_delta
    else:
      expire = datetime.now() + timedelta(minutes=15)
    to_encode.update({"exp": expire})
    encoded_jwt = jwt.encode(
      to_encode, os.environ.get("SECRET_KEY"), algorithm=os.environ.get("ALGORITHM")
    )
    return encoded_jwt

  async def signin(self, req: SignInRequest):
    user = await db.user.find_one({"email": req.email})
    if not user:
      raise HTTPException(status_code=400, detail="Incorrect email")

    if not self.verify_password(req.password, user["password"]):
      raise HTTPException(status_code=400, detail="Incorrect password")

    access_token_expires = timedelta(minutes=3000)  # Token expires in 30 minutes
    access_token = self.create_access_token(
      data={"sub": user["email"]}, expires_delta=access_token_expires
    )

    return SignInResponse(
      id=str(user["_id"]),
      access_token=access_token,
      token_type="bearer",
      username=user["username"],
      email=user["email"],
      role=user["role"],
      name=user["name"],
    )


@router.post("/signin", response_model=SignInResponse)
async def signin(
  req: SignInRequest, controller: SignInController = Depends(SignInController)
):
  return await controller.signin(req)
