import pytest
from ..entity.service_entity import ServiceEntity
import unittest.mock as mock


@pytest.fixture
def mock_db():
  mock_db = mock.create_autospec(dict)
  mock_db.__getitem__.return_value.find.return_value = [
    {
      "id": "1",
      "serviceName": "Electricity",
      "description": "Electricity bill for the month",
      "charge": 100,
      "serviceCategory": "Utility",
      "serviceProviderName": "John Doe",
      "serviceProviderEmail": "q7TqJ@example.com",
      "serviceProviderPhone": "0812345679",
      "houseId": "1",
      "houseNumber": "6",
      "streetAddress": "6 Garth rd",
      "city": "Scarsdale",
      "state": "NY",
      "zipCode": "10583",
      "houseOwner": "John Doe",
      "houseOwnerId": "66e59985dd376b3d6b8ba70c",
    },
    {
      "id": "2",
      "serviceName": "Water",
      "description": "Water bill for the month",
      "charge": 50,
      "serviceCategory": "Utility",
      "serviceProviderName": "John Doe",
      "serviceProviderEmail": "q7TqJ@example.com",
      "serviceProviderPhone": "0812345679",
      "houseId": "1",
      "houseNumber": "6",
      "streetAddress": "6 Garth rd",
      "city": "Scarsdale",
      "state": "NY",
      "zipCode": "10583",
      "houseOwner": "John Doe",
      "houseOwnerId": "66e59985dd376b3d6b8ba70c",
    },
  ]
  return mock_db


@pytest.fixture
def service(mock_db):
  return ServiceEntity(**mock_db["service"].find.return_value[0])


def test_get_service_by_house(mock_db):
  assert len(mock_db["service"].find.return_value) == 2

  assert (
    len([s for s in mock_db["service"].find.return_value if s["houseId"] == "1"]) == 2
  )

  assert (
    len([s for s in mock_db["service"].find.return_value if s["houseId"] == "2"]) == 0
  )


def test_update_service(mock_db):
  service = ServiceEntity(**mock_db["service"].find.return_value[0])

  service.serviceName = "Gas"

  assert service.serviceName == "Gas"

  mock_db["service"].update_one.return_value.modified_count = 1

  mock_db["service"].update_one(
    {"_id": service.houseOwnerId},  
    {"$set": service.dict()},  
  )

  assert mock_db["service"].update_one.call_count == 1

  assert mock_db["service"].update_one.return_value.modified_count == 1


def test_order_service(mock_db):
  order_response = service.place_order("1")

  assert order_response.message == "Service ordered successfully"
