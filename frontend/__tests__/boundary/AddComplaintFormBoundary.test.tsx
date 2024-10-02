import { render, screen, fireEvent } from '@testing-library/react';
import {
  AddComplaintFormBoundary,
  ComplaintFormData,
} from '@/patterns/boundary/AddComplaintFormBoundary';
import useUser from '@/hooks/useUser';
import React from 'react';

// Mock the useUser hook
jest.mock('../../hooks/useUser', () => ({
  __esModule: true,
  default: jest.fn(),
}));

const mockUseUser = useUser as jest.Mock;

describe('AddComplaintFormBoundary', () => {
  const mockAddComplaint = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders the ComplaintForm with initial values', () => {
    // Mocking user data
    mockUseUser.mockReturnValue({
      user: {
        name: 'John Doe',
        email: 'john@example.com',
        phone: '1234567890',
      },
    });

    render(<AddComplaintFormBoundary addComplaint={mockAddComplaint} />);

    // Verify that the initial form fields contain the user info
    expect(screen.getByDisplayValue('John Doe')).toBeInTheDocument();
    expect(screen.getByDisplayValue('john@example.com')).toBeInTheDocument();
    expect(screen.getByDisplayValue('1234567890')).toBeInTheDocument();
  });

  it('submits the form with updated data', () => {
    // Mocking user data
    mockUseUser.mockReturnValue({
      user: {
        name: 'John Doe',
        email: 'john@example.com',
        phone: '1234567890',
      },
    });

    render(<AddComplaintFormBoundary addComplaint={mockAddComplaint} />);

    // Fill in the form fields
    fireEvent.change(screen.getByPlaceholderText('House Number'), {
      target: { value: '123' },
    });
    fireEvent.change(screen.getByPlaceholderText('Street Address'), {
      target: { value: 'Main St' },
    });
    fireEvent.change(screen.getByPlaceholderText('City'), {
      target: { value: 'New York' },
    });
    fireEvent.change(screen.getByPlaceholderText('State'), {
      target: { value: 'NY' },
    });
    fireEvent.change(screen.getByPlaceholderText('Zip Code'), {
      target: { value: '10001' },
    });
    fireEvent.change(screen.getByPlaceholderText('Complaint Type'), {
      target: { value: 'Noise' },
    });
    fireEvent.change(screen.getByPlaceholderText('Complaint Description'), {
      target: { value: 'Loud noise at night' },
    });

    // Submit the form
    fireEvent.submit(screen.getByRole('form'));

    // Assert that the addComplaint function was called with the form data
    expect(mockAddComplaint).toHaveBeenCalledWith({
      tenantName: 'John Doe',
      tenantEmail: 'john@example.com',
      tenantPhone: '1234567890',
      houseNumber: '123',
      streetAddress: 'Main St',
      city: 'New York',
      state: 'NY',
      zipCode: '10001',
      complaintType: 'Noise',
      complaintDescription: 'Loud noise at night',
    });
  });
});
