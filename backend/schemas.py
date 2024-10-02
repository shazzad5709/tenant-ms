from pydantic import BaseModel
from typing import Optional
import enum

class UserRole(str, enum.Enum):
    ADMIN = "admin"
    HOMEOWNER = "homeowner"
    TENANT = "tenant"

class UserCreate(BaseModel):
    username: str
    email: str
    password: str
    role: UserRole

class UserUpdate(BaseModel):
    username: Optional[str] = None
    email: Optional[str] = None
    password: Optional[str] = None
    role: Optional[UserRole] = None

class UserInDB(BaseModel):
    id: str
    username: str
    email: str
    role: UserRole

class Token(BaseModel):
    access_token: str
    token_type: str