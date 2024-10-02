import { useState, useEffect } from 'react';
import NotificationList from '@/components/interface/NotificationList';

type NotificationBoundaryProps = {};

export const NotificationBoundary: React.FC<
  NotificationBoundaryProps
> = ({}) => {
  const [notifications, setNotifications] = useState<Notification[]>([]);

  useEffect(() => {
    // fetch applicants from database on init
    setNotifications();
  }, []);

  return (
    <NotificationList
      notifications={notifications}
      setNotifications={setNotifications}
    />
  );
};
