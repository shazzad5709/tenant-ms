import pytest
from ..entity.notification_entity import NotificationEntity
import unittest.mock as mock


@pytest.fixture
def mock_db():
  mock_db = mock.create_autospec(dict)
  mock_db.__getitem__.return_value.find.return_value = [
    {
      "id": "1",
      "userId": "66e59985dd376b3d6b8ba70c",
      "message": 'New service added: "Plumbing"',
      "date": "2020-12-01",
    },
    {
      "id": "2",
      "userId": "66e59985dd376b3d6b8ba70c",
      "message": 'New complaint added: "Water Leak"',
      "date": "2020-12-02",
    },
    {
      "id": "3",
      "userId": "66e59985dd376b3d6b8ba70c",
      "message": 'New service added: "Plumbing"',
      "date": "2020-12-03",
    },
    {
      "id": "4",
      "userId": "66e59985dd376b3d6b8ba70c",
      "message": 'New complaint added: "Water Leak"',
      "date": "2020-12-04",
    },
  ]
  return mock_db


@pytest.fixture
def notification(mock_db):
  return NotificationEntity(**mock_db["notification"].find.return_value[0])


def test_get_notification_by_user(mock_db):
  userId = "66e59985dd376b3d6b8ba70c"

  notifications = [
    NotificationEntity(**notification)
    for notification in mock_db["notification"].find.return_value
  ]

  filtered_notifications = [
    notification for notification in notifications if notification.userId == userId
  ]

  assert len(filtered_notifications) == 4


def test_mark_notification_as_read(mock_db):
  notification = NotificationEntity(**mock_db["notification"].find.return_value[0])

  assert notification.isRead is False

  mock_db["notification"].update_one(
    {"id": notification.id}, {"$set": {"isRead": True}}
  )

  assert mock_db["notification"].update_one.call_count == 1

  mock_db["notification"].find.return_value = [
    {
      "id": "1",
      "userId": "66e59985dd376b3d6b8ba70c",
      "message": 'New service added: "Plumbing"',
      "date": "2020-12-01",
      "isRead": True,
    }
  ]

  updated_notification = NotificationEntity(
    **mock_db["notification"].find.return_value[0]
  )

  assert updated_notification.isRead is True
