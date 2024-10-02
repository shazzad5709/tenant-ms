import React from 'react';
import { Notification } from '@/patterns/entity/Notification';
type Props = {
  notifications: Notification[];
};

const NotificationList = ({ notifications }: Props) => {
  return (
    <div className='flex flex-col'>
      <h1 className='text-xl font-bold border-b border-gray-200 px-4'>
        Notifications
      </h1>
      {notifications.map((notification) => (
        <div
          key={notification.id}
          className={`flex flex-col border-b border-gray-200 p-4 ${
            !notification.isRead ? 'bg-blue-50/[0.5]' : ''
          }`}
        >
          <p className='text-sm font-semibold'>{notification.message}</p>
          <p className='text-xs text-gray-400'>
            {notification.date.toDateString()}
          </p>
        </div>
      ))}
    </div>
  );
};

export default NotificationList;
