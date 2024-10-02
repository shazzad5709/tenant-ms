from pydantic import BaseModel, EmailStr
from typing import Optional


class UserBoundary(BaseModel):
  firstName: Optional[str] = None
  lastName: Optional[str] = None
  username: str
  email: EmailStr
  password: str
  phoneNumber: Optional[str] = None
  passportID: Optional[str] = None
  houseStreetNumber: Optional[str] = None
  city: Optional[str] = None
  state: Optional[str] = None
  zipCode: Optional[str] = None
  role: Optional[str] = None
