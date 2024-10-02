from pydantic import BaseModel, EmailStr
from typing import Optional
from fastapi import HTTPException, APIRouter, Depends
from ..config import db
from bson import ObjectId


router = APIRouter()


def serialize_bill(bill):
  """
  Convert MongoDB bill document to a JSON-serializable dict.
  """
  return {
    "id": str(bill["_id"]),
    "issuer": bill["issuer"],
    "issuerId": str(bill["issuerId"]),
    "issuedTo": bill["issuedTo"],
    "issuedToId": str(bill["issuedToId"]),
    "amount": bill["amount"],
    "description": bill["description"],
    "billDate": bill["billDate"],
    "dueDate": bill["dueDate"],
    "status": bill["status"],
    "paymentDate": bill["paymentDate"],
    "billingPeriodFrom": bill["billingPeriodFrom"],
    "billingPeriodTo": bill["billingPeriodTo"],
  }


class ResponseModel(BaseModel):
  message: str


class BillEntity(BaseModel):
  id: str
  issuer: str
  issuerId: str
  issuedTo: str
  issuedToId: str
  amount: int
  description: str
  billDate: Optional[str] = None
  dueDate: Optional[str] = None
  status: str
  paymentDate: Optional[str] = None
  billingPeriodFrom: Optional[str] = None
  billingPeriodTo: Optional[str] = None

  async def fetchAllBills(self):
    try:
      bills = await db["bill"].find().to_list(length=100)
      return bills
    except Exception as e:
      raise HTTPException(status_code=400, detail=str(e))
    

  


@router.get("/", response_model=list[BillEntity])
async def fetchBills(
  ownerId: Optional[str] = None,
  tenantId: Optional[str] = None,
  controller: BillEntity = Depends(BillEntity),
):
  if ownerId:
    return await controller.fetchBillByOwnerId(ownerId)
  elif tenantId:
    return await controller.fetchBillByTenantId(tenantId)
  else:
    return await controller.fetchAllBills()


@router.get("/{id}", response_model=BillEntity)
async def fetchBillById(id: str, controller: BillEntity = Depends(BillEntity)):
  return await controller.fetchBillById(id)


class BillBoundary(BaseModel):
  issuer: str
  issuerId: str
  issuedTo: str
  issuedToId: str
  amount: int
  description: str
  billDate: Optional[str] = None
  dueDate: Optional[str] = None
  status: str
  paymentDate: Optional[str] = None
  billingPeriodFrom: Optional[str] = None
  billingPeriodTo: Optional[str] = None


@router.post("/", response_model=ResponseModel)
async def addBill(bill: BillBoundary, controller: BillEntity = Depends(BillEntity)):
  return await controller.addBill(bill)
