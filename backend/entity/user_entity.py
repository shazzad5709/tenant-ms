from pydantic import BaseModel, EmailStr
from typing import Optional
import bcrypt
from fastapi import HTTPException
from config import db


class UserEntity(BaseModel):
  username: str
  email: EmailStr
  password: str
  phoneNumber: Optional[str] = None
  role: str
  name: Optional[str] = None

  def validate_password(self):
    # print(len(self.password) >= 6)
    return len(self.password) >= 6

  def hash_password(self) -> str:
    salt = bcrypt.gensalt()
    hashed = bcrypt.hashpw(self.password.encode(), salt)
    return hashed.decode()

  async def sign_up(self):
    if not self.validate_password():
      raise HTTPException(
        status_code=400,
        detail="Password must be at least 6 characters long",
      )

    hashed_password = self.hash_password()

    self.password = hashed_password

    try:
      result = await db.user.insert_one(self.dict())
      return str(result.inserted_id)

    except Exception as e:
      raise HTTPException(status_code=400, detail=str(e))
