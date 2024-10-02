import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Notification } from '../../patterns/entity/Notification';
import NotificationList from '../../components/interface/NotificationList';

describe('NotificationList Component', () => {
  const mockNotifications: Notification[] = [
    {
      id: '1',
      message: 'New message received',
      date: new Date('2023-09-25'),
      isRead: false,
    },
    {
      id: '2',
      message: 'Profile updated successfully',
      date: new Date('2023-09-20'),
      isRead: true,
    },
  ];

  it('renders the notification list correctly', () => {
    render(<NotificationList notifications={mockNotifications} />);

    // Check if the header is rendered
    expect(screen.getByText('Notifications')).toBeInTheDocument();

    // Check if both notifications are rendered
    expect(screen.getByText('New message received')).toBeInTheDocument();
    expect(
      screen.getByText('Profile updated successfully')
    ).toBeInTheDocument();

    // Check if the dates are rendered correctly
    expect(screen.getByText('Mon Sep 25 2023')).toBeInTheDocument();
    expect(screen.getByText('Wed Sep 20 2023')).toBeInTheDocument();
  });

  it('applies the correct background for unread notifications', () => {
    render(<NotificationList notifications={mockNotifications} />);

    // Check that unread notification has the special background
    const unreadNotification = screen.getByText(
      'New message received'
    ).parentElement;
    expect(unreadNotification).toHaveClass('bg-blue-50/[0.5]');

    // Check that read notification does not have the special background
    const readNotification = screen.getByText(
      'Profile updated successfully'
    ).parentElement;
    expect(readNotification).not.toHaveClass('bg-blue-50/[0.5]');
  });
});
