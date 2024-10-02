from pydantic import BaseModel, EmailStr
from typing import Optional

class UserCreate(BaseModel):
  username: str
  email: EmailStr
  password: str
  phone_number: Optional[str] = None

class UserInDB(BaseModel):
  id: str
  username: str
  email: EmailStr