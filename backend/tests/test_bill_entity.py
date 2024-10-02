import pytest
from ..entity.bill_entity import BillEntity
import unittest.mock as mock

@pytest.fixture
def mock_db():
  mock_db = mock.create_autospec(dict)
  mock_db.__getitem__.return_value.find.return_value = [
    {
      "id": "1",
      "issuer": "John Doe",
      "issuerId": "66e59985dd376b3d6b8ba70c",
      "issuedTo": "Jane Doe",
      "issuedToId": "66e59985dd126b3d6b8ba35b",
      "amount": 100,
      "description": "Electricity",
      "billDate": "2024-01-01",
      "dueDate": "2024-02-01",
      "status": "Pending",
      "paymentDate": None,
      "billingPeriodFrom": "2024-01-01",
      "billingPeriodTo": "2024-02-01",
    },
    {
      "id": "2",
      "issuer": "John Doe",
      "issuerId": "66e59985dd376b3d6b8ba70c",
      "issuedTo": "Jane Doe",
      "issuedToId": "66e59985dd126b3d6b8ba35b",
      "amount": 2000,
      "description": "Monthly rent",
      "billDate": "2024-01-01",
      "dueDate": "2024-02-01",
      "status": "Paid",
      "paymentDate": "2024-02-01",
      "billingPeriodFrom": "2024-01-01",
      "billingPeriodTo": "2024-02-01",
    },
    {
      "id": "3",
      "issuer": "John Doe",
      "issuerId": "66e59985dd376b3d6b8ba70c",
      "issuedTo": "Jane Doe",
      "issuedToId": "66e59985dd126b3d6b8ba35b",
      "amount": 80,
      "description": "Water",
      "billDate": "2024-01-01",
      "dueDate": "2024-02-01",
      "status": "Paid",
      "paymentDate": "2024-02-01",
      "billingPeriodFrom": "2024-01-01",
      "billingPeriodTo": "2024-02-01",
    },
  ]
  return mock_db


@pytest.fixture
def bill(mock_db):
  return BillEntity(**mock_db["bill"].find.return_value[0])


def test_create_new_bill(bill):
  bill_data = bill.dict()

  assert bill_data["id"] == "1"
  assert bill_data["issuer"] == "John Doe"
  assert bill_data["issuerId"] == "66e59985dd376b3d6b8ba70c"
  assert bill_data["issuedTo"] == "Jane Doe"
  assert bill_data["issuedToId"] == "66e59985dd126b3d6b8ba35b"
  assert bill_data["amount"] == 100
  assert bill_data["description"] == "Electricity"
  assert bill_data["billDate"] == "2024-01-01"
  assert bill_data["dueDate"] == "2024-02-01"
  assert bill_data["status"] == "Pending"
  assert bill_data["paymentDate"] is None
  assert bill_data["billingPeriodFrom"] == "2024-01-01"
  assert bill_data["billingPeriodTo"] == "2024-02-01"


def test_get_bills_by_owner_id(mock_db):
  owner_id = "66e59985dd376b3d6b8ba70c"
  bills = [BillEntity(**bill_data) for bill_data in mock_db["bill"].find.return_value]
  filtered_bills = [b for b in bills if b.issuerId == owner_id]

  assert len(filtered_bills) == 3


def test_get_bills_by_tenant_id(mock_db):
  tenant_id = "66e59985dd126b3d6b8ba35b"
  bills = [BillEntity(**bill_data) for bill_data in mock_db["bill"].find.return_value]
  filtered_bills = [b for b in bills if b.issuedToId == tenant_id]

  assert len(filtered_bills) == 3


def test_generate_memo(mock_db):
  bill = BillEntity(**mock_db["bill"].find.return_value[0])
  assert bill.generate_memo() == "Electricity - John Doe - Jane Doe"
