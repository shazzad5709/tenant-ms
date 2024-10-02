import React from 'react';
import { render, screen, waitFor, act } from '@testing-library/react';
import '@testing-library/jest-dom';
import BillEntity from '../../patterns/entity/Bill';
import { User } from '@/context/UserContext';
import { BillListingController } from '@/patterns/controller/BillListingController';

// Mock the next/navigation module
jest.mock('next/navigation', () => ({
  useRouter: () => ({
    push: jest.fn(),
  }),
}));

// Mock the BillEntity
jest.mock('../entity/Bill', () => ({
  getBills: jest.fn(),
}));

// Mock the BillList component
jest.mock('./BillList', () => ({
  __esModule: true,
  default: ({ bills }: { bills: any[] }) => (
    <div data-testid='bill-list'>
      {bills.map((bill) => (
        <div key={bill.id}>{bill.description}</div>
      ))}
    </div>
  ),
}));

describe('BillListingController', () => {
  const mockSetLoading = jest.fn();
  const mockUser: User = {
    id: '66e59985dd126b3d6b8ba35b',
    role: 'Tenant',
    name: 'Jane Doe',
    username: 'jane',
    email: 'jane@me.com',
    access_token: '123456',
    token_type: 'Bearer',
  };

  const mockBills = [
    {
      id: '1',
      issuer: 'John Doe',
      issuerId: '66e59985dd376b3d6b8ba70c',
      issuedTo: 'Jane Doe',
      issuedToId: '66e59985dd126b3d6b8ba35b',
      amount: 100,
      description: 'Electricity',
      billDate: '2024-01-01',
      dueDate: '2024-02-01',
      status: 'Pending',
      paymentDate: null,
      billingPeriodFrom: '2024-01-01',
      billingPeriodTo: '2024-02-01',
    },
  ];

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders Unauthorized for non-Tenant users', () => {
    const nonTenantUser = { ...mockUser, role: 'Homeowner' };
    render(
      <BillListingController user={nonTenantUser} setLoading={mockSetLoading} />
    );
    expect(screen.getByText('Unauthorized')).toBeInTheDocument();
  });

  it('fetches and displays bills for Tenant users', async () => {
    (BillEntity.getBills as jest.Mock).mockResolvedValue({
      status: 200,
      data: mockBills,
    });

    await act(async () => {
      render(
        <BillListingController user={mockUser} setLoading={mockSetLoading} />
      );
    });

    await waitFor(() => {
      expect(screen.getByTestId('bill-list')).toBeInTheDocument();
      expect(screen.getByText('Electricity')).toBeInTheDocument();
    });

    expect(mockSetLoading).toHaveBeenCalledWith(true);
    expect(mockSetLoading).toHaveBeenCalledWith(false);
  });

  it('handles error when fetching bills fails', async () => {
    (BillEntity.getBills as jest.Mock).mockRejectedValue(
      new Error('Failed to fetch')
    );
    const alertMock = jest.spyOn(window, 'alert').mockImplementation(() => {});

    await act(async () => {
      render(
        <BillListingController user={mockUser} setLoading={mockSetLoading} />
      );
    });

    await waitFor(() => {
      expect(alertMock).toHaveBeenCalledWith('Failed to fetch bills');
    });

    expect(mockSetLoading).toHaveBeenCalledWith(true);
    expect(mockSetLoading).toHaveBeenCalledWith(false);

    alertMock.mockRestore();
  });

  it('does not fetch bills when user is null', async () => {
    await act(async () => {
      render(<BillListingController user={null} setLoading={mockSetLoading} />);
    });

    expect(BillEntity.getBills).not.toHaveBeenCalled();
    expect(mockSetLoading).not.toHaveBeenCalled();
  });

  it('refetches bills when user changes', async () => {
    (BillEntity.getBills as jest.Mock).mockResolvedValue({
      status: 200,
      data: mockBills,
    });

    const { rerender } = render(
      <BillListingController user={null} setLoading={mockSetLoading} />
    );

    expect(BillEntity.getBills).not.toHaveBeenCalled();

    await act(async () => {
      rerender(
        <BillListingController user={mockUser} setLoading={mockSetLoading} />
      );
    });

    await waitFor(() => {
      expect(BillEntity.getBills).toHaveBeenCalled();
    });
  });
});
