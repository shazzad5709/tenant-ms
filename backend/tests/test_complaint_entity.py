import pytest
from ..entity.complaint_entity import ComplaintEntity
import unittest.mock as mock


@pytest.fixture
def mock_db():
  mock_db = mock.create_autospec(dict)
  mock_db.__getitem__.return_value.find.return_value = [
    {
      "id": "1",
      "tenantName": "John Doe",
      "tenantEmail": "q7TqJ@example.com",
      "tenantPhone": "0812345679",
      "houseId": "1",
      "apartmentNumber": "6",
      "streetAddress": "6 Garth rd",
      "city": "Scarsdale",
      "state": "NY",
      "zipCode": "10583",
      "complaintType": "Maintenance",
      "complaintDescription": "A window glass broke. Need to fix it.",
      "status": "Pending",
    },
    {
      "id": "2",
      "tenantName": "John Doe",
      "tenantEmail": "q7TqJ@example.com",
      "tenantPhone": "0812345679",
      "houseId": "1",
      "apartmentNumber": "6",
      "streetAddress": "6 Garth rd",
      "city": "Scarsdale",
      "state": "NY",
      "zipCode": "10583",
      "complaintType": "Water",
      "complaintDescription": "No water from 6 PM to 8 PM everyday for the past week.",
      "status": "Pending",
    },
  ]
  return mock_db


@pytest.fixture
def complaint(mock_db):
  return ComplaintEntity(**mock_db["complaint"].find.return_value[0])


def test_create_new_complaint(complaint, mock_db):
  assert len(mock_db["complaint"].find.return_value) == 2

  complaint_data = complaint.dict()

  assert complaint_data["id"] == "1"
  assert complaint_data["houseId"] == "1"
  assert complaint_data["status"] == "Pending"
  assert complaint_data["tenantName"] == "John Doe"


def test_mark_complaint_as_resolved(mock_db):
  complaint = ComplaintEntity(**mock_db["complaint"].find.return_value[0])

  assert complaint.status == "Pending"

  mock_db["complaint"].update_one(
    {"id": complaint.id}, {"$set": {"status": "Resolved"}}
  )

  assert mock_db["complaint"].update_one.call_count == 1

  mock_db["complaint"].find.return_value = [
    {
      "id": "1",
      "tenantName": "John Doe",
      "tenantEmail": "q7TqJ@example.com",
      "tenantPhone": "0812345679",
      "houseId": "1",
      "apartmentNumber": "6",
      "streetAddress": "6 Garth rd",
      "city": "Scarsdale",
      "state": "NY",
      "zipCode": "10583",
      "complaintType": "Maintenance",
      "complaintDescription": "A window glass broke. Need to fix it.",
      "status": "Resolved",
    }
  ]

  updated_complaint = ComplaintEntity(**mock_db["complaint"].find.return_value[0])

  assert updated_complaint.status == "Resolved"


def test_get_complaint_by_house(mock_db):
  assert len(mock_db["complaint"].find.return_value) == 2

  assert (
    len([c for c in mock_db["complaint"].find.return_value if c["houseId"] == "1"]) == 2
  )

  assert (
    len([c for c in mock_db["complaint"].find.return_value if c["houseId"] == "2"]) == 0
  )
