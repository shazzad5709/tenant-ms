from pydantic import BaseModel, EmailStr
from typing import Optional
from fastapi import HTTPException
from ..config import db


class NotificationEntity(BaseModel):
  id: str
  userId: str
  message: str
  date: Optional[str] = None
  isRead: Optional[bool] = False
