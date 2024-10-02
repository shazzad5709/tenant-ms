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

  async def addBill(self, bill: BillBoundary):
    try:
      await db["bill"].insert_one(bill.dict())
      return ResponseModel(message="Bill added successfully")

    except Exception as e:
      raise HTTPException(status_code=400, detail=str(e))

  async def updateBill(self, id: str, bill: BillBoundary):
    try:
      await db["bill"].update_one({"_id": ObjectId(id)}, {"$set": bill.dict()})
      return ResponseModel(message="Bill updated successfully")

    except Exception as e:
      raise HTTPException(status_code=400, detail=str(e))

  async def deleteBill(self, id: str):
    try:
      await db["bill"].delete_one({"_id": ObjectId(id)})
      return ResponseModel(message="Bill deleted successfully")

    except Exception as e:
      raise HTTPException(status_code=400, detail=str(e))

  async def fetchBillById(self, id: str):
    try:
      bill = await db["bill"].find_one({"_id": ObjectId(id)})

      if not bill:
        raise HTTPException(status_code=404, detail="Bill not found")
      return serialize_bill(bill)

    except Exception as e:
      raise HTTPException(status_code=400, detail=str(e))

  async def fetchBillByOwnerId(self, ownerId: str):
    try:
      bills = await db["bill"].find({"issuerId": ObjectId(ownerId)}).to_list(length=100)
      return bills

    except Exception as e:
      raise HTTPException(status_code=400, detail=str(e))

  async def fetchBillByTenantId(self, tenantId: str):
    try:
      bills = (
        await db["bill"].find({"issuedToId": ObjectId(tenantId)}).to_list(length=100)
      )
      return bills

    except Exception as e:
      raise HTTPException(status_code=400, detail=str(e))

  async def fetchAllBills(self):
    try:
      bills = await db["bill"].find().to_list(length=100)
      return bills
    except Exception as e:
      raise HTTPException(status_code=400, detail=str(e))


@router.get("/", response_model=list[BillEntity])
async def fetchBills(controller: BillEntity = Depends(BillEntity)):
  return await controller.fetchBills()


@router.get("/owner/{ownerId}", response_model=list[BillEntity])
async def fetchBillByOwnerId(
  ownerId: str, controller: BillEntity = Depends(BillEntity)
):
  return await controller.fetchBillByOwnerId(ownerId)


@router.get("/tenant/{tenantId}", response_model=list[BillEntity])
async def fetchBillByTenantId(
  tenantId: str, controller: BillEntity = Depends(BillEntity)
):
  return await controller.fetchBillByTenantId(tenantId)


@router.post("/", response_model=ResponseModel)
async def addBill(bill: BillBoundary, controller: BillEntity = Depends(BillEntity)):
  return await controller.addBill(bill)


@router.put("/{id}", response_model=ResponseModel)
async def updateBill(
  id: str, bill: BillBoundary, controller: BillEntity = Depends(BillEntity)
):
  return await controller.updateBill(id, bill)


@router.delete("/{id}", response_model=ResponseModel)
async def deleteBill(id: str, controller: BillEntity = Depends(BillEntity)):
  return await controller.deleteBill(id)
