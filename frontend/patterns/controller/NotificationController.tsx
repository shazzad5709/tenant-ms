'use client';
import useUser from '@/hooks/useUser';
import { useEffect, useState } from 'react';
import {NotificationEntity} from '../entity/Notification';
import { NotificationBoundary } from '../boundary/NotifcationBoundary';

type Props = {};

export const NotificationController: React.FC<Props> = ({}) => {
  const { user } = useUser();
  const [notifications, setNotifications] = useState<Notification[]>([]);

  const fetchNotifications = async () => {
    if (!user?.id) return;

    try {
      const res = await NotificationEntity.getNotifications(user.id);
      if ('status' in res && res.status === 200) {
        setNotifications(res.data);
      } else if (res instanceof Error) {
        console.log(res.message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  // On component mount
  useEffect(() => {
    if (user) {
      fetchNotifications();
    }
  }, [user]);

  const markAsReadEvent = (notificationId: string) => {
    NotificationEntity.markAsRead(notificationId);
    setNotifications((prevNotifications) =>
      prevNotifications.filter(
        (notification) => notification.id !== notificationId
      )
    );
  };

  return (
    <NotificationBoundary
      notifications={notifications}
      markAsRead={markAsReadEvent}
    />
  );
};
