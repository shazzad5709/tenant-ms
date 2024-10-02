import pytest
from ..entity.user_entity import UserEntity
import bcrypt
import unittest.mock as mock


@pytest.fixture
def mock_db():
  mock_db = mock.create_autospec(dict)
  mock_db.__getitem__.return_value.find.return_value = [
    {
      "username": "john_doe",
      "email": "john@doe.com",
      "password": bcrypt.hashpw("johndoe".encode(), bcrypt.gensalt()).decode(),
      "phoneNumber": "0812345679",
      "role": "tenant",
      "name": "John Doe",
    }
  ]
  return mock_db


def test_validate_password():
  user = UserEntity(
    username="john_doe",
    email="john@doe.com",
    password="johndoe",
    role="tenant",
    name="John Doe",
  )
  hashed_password = bcrypt.hashpw(user.password.encode(), bcrypt.gensalt()).decode()
  assert bcrypt.checkpw(user.password.encode(), hashed_password.encode()) is True


def test_create_new_user(mock_db):
  user = UserEntity(
    username="john_doe",
    email="john@doe.com",
    password="johndoe",
    role="tenant",
    name="John Doe",
  )

  mock_db["user"].insert_one.return_value = {"username": "john_doe"}

  assert user.dict() == mock_db["user"].insert_one.return_value


def test_authenticate_user(mock_db):
  user_data = mock_db["user"].find.return_value[0]

  user = UserEntity(
    username=user_data["username"],
    email=user_data["email"],
    password="johndoe",
    role="tenant",
    name="John Doe",
  )

  hashed_password = bcrypt.hashpw(user.password.encode(), bcrypt.gensalt()).decode()
  assert bcrypt.checkpw(user.password.encode(), hashed_password.encode()) is True
