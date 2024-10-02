import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import useUser from '../../hooks/useUser';
import { AddBillFormBoundary } from '../../patterns/boundary/AddBillFormBoundary';

// Mock the useUser hook
jest.mock('../../hooks/useUser', () => ({
  __esModule: true,
  default: jest.fn(),
}));

// Mock the BillForm component
jest.mock('../../components/forms/bill/AddBillForm', () => ({
  __esModule: true,
  default: ({ data, setData, handleSubmit, label }: any) => (
    <form onSubmit={handleSubmit}>
      <input
        data-testid='issuer'
        value={data.issuer}
        onChange={(e) => setData({ ...data, issuer: e.target.value })}
      />
      <input
        data-testid='amount'
        type='number'
        value={data.amount}
        onChange={(e) => setData({ ...data, amount: Number(e.target.value) })}
      />
      <button type='submit'>{label}</button>
    </form>
  ),
}));

describe('AddBillFormBoundary', () => {
  const mockAddBill = jest.fn();
  const mockUser = { id: '123', name: 'John Doe' };

  beforeEach(() => {
    jest.clearAllMocks();
    (useUser as jest.Mock).mockReturnValue({ user: mockUser });
  });

  it('renders the form with initial data', () => {
    render(<AddBillFormBoundary addBill={mockAddBill} />);

    expect(screen.getByTestId('issuer')).toHaveValue('John Doe');
    expect(screen.getByTestId('amount')).toHaveValue(0);
    expect(
      screen.getByRole('button', { name: 'Create Bill' })
    ).toBeInTheDocument();
  });

  it('updates form data when inputs change', () => {
    render(<AddBillFormBoundary addBill={mockAddBill} />);

    fireEvent.change(screen.getByTestId('issuer'), {
      target: { value: 'Jane Doe' },
    });
    fireEvent.change(screen.getByTestId('amount'), {
      target: { value: '100' },
    });

    expect(screen.getByTestId('issuer')).toHaveValue('Jane Doe');
    expect(screen.getByTestId('amount')).toHaveValue(100);
  });

  it('calls addBill with form data when submitted', async () => {
    render(<AddBillFormBoundary addBill={mockAddBill} />);

    fireEvent.change(screen.getByTestId('issuer'), {
      target: { value: 'Jane Doe' },
    });
    fireEvent.change(screen.getByTestId('amount'), {
      target: { value: '100' },
    });
    fireEvent.click(screen.getByRole('button', { name: 'Create Bill' }));

    await waitFor(() => {
      expect(mockAddBill).toHaveBeenCalledWith(
        expect.objectContaining({
          issuer: 'Jane Doe',
          amount: 100,
          issuerId: '123',
        })
      );
    });
  });

  it('initializes with empty data when user is null', () => {
    (useUser as jest.Mock).mockReturnValue({ user: null });

    render(<AddBillFormBoundary addBill={mockAddBill} />);

    expect(screen.getByTestId('issuer')).toHaveValue('');
  });

  it('prevents default form submission', async () => {
    const mockPreventDefault = jest.fn();
    render(<AddBillFormBoundary addBill={mockAddBill} />);

    const form = screen
      .getByRole('button', { name: 'Create Bill' })
      .closest('form');
    fireEvent.submit(form!, { preventDefault: mockPreventDefault });

    await waitFor(() => {
      expect(mockPreventDefault).toHaveBeenCalled();
      expect(mockAddBill).toHaveBeenCalled();
    });
  });
});
