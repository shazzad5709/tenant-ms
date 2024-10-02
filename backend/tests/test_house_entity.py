import pytest
from ..entity.house_entity import HouseEntity
import unittest.mock as mock


@pytest.fixture
def mock_db():
  mock_db = mock.create_autospec(dict)
  mock_db.__getitem__.return_value.find.return_value = [
    {
      "id": "1",
      "address": "6 Garth rd",
      "city": "Scarsdale",
      "state": "NY",
      "zipCode": "10583",
      "owner": "John Doe",
      "ownerId": "66e59985dd376b3d6b8ba70c",
      "phoneNumber": "0812345679",
      "type": "Duplex",
      "floorspace": 1264,
      "beds": 3,
      "baths": 1,
      "price": 295000,
      "parking": 2,
    },
    {
      "id": "2",
      "address": "39 Sterling ave",
      "city": "White Plains",
      "state": "NY",
      "zipCode": "10606",
      "owner": "John Doe",
      "ownerId": "66e59985dd376b3d6b8ba70c",
      "phoneNumber": "0812345679",
      "type": "Condo",
      "floorspace": 768,
      "beds": 2,
      "baths": 2,
      "price": 445000,
      "parking": 1,
    },
  ]
  return mock_db


@pytest.fixture
def house(mock_db):
  """
  Fixture to create a HouseEntity instance based on the first house in the mock DB.
  """
  house_data = mock_db["house"].find.return_value[0]
  return HouseEntity(**house_data)


def test_add_house(house):
  house_data = house.dict()

  assert house_data["id"] == "1"
  assert house_data["ownerId"] == "66e59985dd376b3d6b8ba70c"
  assert house_data["address"] == "6 Garth rd"
  assert house_data["city"] == "Scarsdale"
  assert house_data["state"] == "NY"


def test_get_houses_by_owner_id(mock_db):
  owner_id = "66e59985dd376b3d6b8ba70c"
  houses = [
    HouseEntity(**house_data) for house_data in mock_db["house"].find.return_value
  ]
  filtered_houses = [h for h in houses if h.ownerId == owner_id]

  assert len(filtered_houses) == 2


def test_place_negotiated_offer(house):
  offer_response = house.place_negotiated_offer(270000, "66e9d6590d093a50e9ef0e0f")
  assert offer_response == "Negotiated offer placed successfully"
