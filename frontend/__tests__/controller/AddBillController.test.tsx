import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { useRouter } from 'next/navigation';
import mockRouter from 'next-router-mock';
import '@testing-library/jest-dom';
import useUser from '../../hooks/useUser';
import React, { act } from 'react';
import BillEntity from '@/patterns/entity/Bill';
import { AddBillController } from '@/patterns/controller/AddBillController';
import { AxiosResponse } from 'axios';

// Create mock functions
const mockUpdateUser = jest.fn();
const mockUseUser = jest.fn();
// router mock
jest.mock('next/navigation', () => require('next-router-mock'));

jest.mock('../../patterns/entity/Bill', () => ({
  addBill: jest.fn(), // Mocking the signUp function
}));

// Mock the useUser hook
jest.mock('../../hooks/useUser', () => ({
  __esModule: true,
  default: () => mockUseUser(),
}));

const mockedAddBill = BillEntity.addBill as jest.MockedFunction<
  typeof BillEntity.addBill
>;

describe('AddBillController', () => {
  const mockPush = jest.fn();
  const mockSetLoading = jest.fn();

  beforeEach(() => {
    mockUseUser.mockReturnValue({
      user: { role: 'Homeowner' },
      updateUser: mockUpdateUser,
    });
    jest.clearAllMocks();
  });

  it('renders AddBillFormBoundary if user is a Homeowner', async () => {
    const { rerender } = render(
      <AddBillController loading={false} setLoading={mockSetLoading} />
    );

    await waitFor(() => {
      expect(screen.getByText('Create Bill')).toBeInTheDocument();
    });
  });

  it('shows "Unauthorized" if the user is not a Homeowner', async () => {
    mockUseUser.mockReturnValue({
      user: { role: 'Tenant' },
      updateUser: mockUpdateUser,
    });

    const { rerender } = render(
      <AddBillController loading={false} setLoading={mockSetLoading} />
    );

    await waitFor(() => {
      expect(screen.getByText('Unauthorized')).toBeInTheDocument();
    });
  });

  it('sets loading state, calls addBill, and navigates to /homeowner/bill on success', async () => {
    const mockBillData = {
      amount: 100,
      description: 'Test Bill',
    };

    // Mock the BillEntity.addBill to return a successful response
    mockedAddBill.mockResolvedValue({ status: 200 } as AxiosResponse);

    // Mock the router
    mockRouter.push = jest.fn();

    // Render the component
    const { rerender } = render(
      <AddBillController loading={false} setLoading={mockSetLoading} />
    );

    // Simulate filling the form
    await act(async () => {
      fireEvent.change(screen.getByLabelText(/Amount/i), {
        target: { value: '100' },
      });
      fireEvent.click(screen.getByRole('button', { name: /Create Bill/i }));
    });

    // Simulate form submission
    fireEvent.click(screen.getByRole('button', { name: /Create Bill/i }));

    rerender(<AddBillController loading={false} setLoading={mockSetLoading} />);

    await waitFor(() => {
      // Check if loading state was set to true
      expect(mockSetLoading).toHaveBeenCalledWith(true);

      // Check if BillEntity.addBill was called with the correct data
      expect(mockedAddBill).toHaveBeenCalledWith(mockBillData);

      // Check if the success alert was shown
      expect(window.alert).toHaveBeenCalledWith('Bill added successfully');

      // Check if router.push was called to navigate to the correct page
      expect(mockRouter.push).toHaveBeenCalledWith('/homeowner/bill');

      // Check if loading state was set back to false
      expect(mockSetLoading).toHaveBeenCalledWith(false);
    });
  });

  it('shows error if addBill fails', async () => {
    const mockError = new Error('Failed to add bill');
    mockedAddBill.mockResolvedValue(mockError);

    jest.spyOn(window, 'alert').mockImplementation(() => {});

    await act(async () => {
      render(<AddBillController loading={false} setLoading={mockSetLoading} />);
    });

    await act(async () => {
      fireEvent.change(screen.getByLabelText(/Amount/i), {
        target: { value: '100' },
      });
      fireEvent.change(screen.getByLabelText(/Description/i), {
        target: { value: 'Test Bill' },
      });
      fireEvent.click(screen.getByRole('button', { name: /Create Bill/i }));
    });

    await waitFor(() => {
      expect(mockedAddBill).toHaveBeenCalled();
    });

    expect(window.alert).toHaveBeenCalledWith('Failed to add bill');
    expect(mockSetLoading).toHaveBeenCalledWith(true);
    expect(mockSetLoading).toHaveBeenCalledWith(false);
    expect(mockRouter.push).not.toHaveBeenCalled();
  });

  it('stops loading and logs error message if there is an exception during bill addition', async () => {
    const mockError = new Error('API Error');
    mockedAddBill.mockRejectedValue(mockError);

    const consoleLogSpy = jest
      .spyOn(console, 'log')
      .mockImplementation(() => {});

    await act(async () => {
      render(<AddBillController loading={false} setLoading={mockSetLoading} />);
    });

    await act(async () => {
      fireEvent.change(screen.getByLabelText(/Amount/i), {
        target: { value: '100' },
      });
      fireEvent.change(screen.getByLabelText(/Description/i), {
        target: { value: 'Test Bill' },
      });
      fireEvent.click(screen.getByRole('button', { name: /Create Bill/i }));
    });

    await waitFor(() => {
      expect(mockedAddBill).toHaveBeenCalled();
    });

    expect(mockSetLoading).toHaveBeenCalledWith(true);
    expect(mockSetLoading).toHaveBeenCalledWith(false);
    expect(consoleLogSpy).toHaveBeenCalledWith(mockError);
    expect(mockRouter.push).not.toHaveBeenCalled();

    consoleLogSpy.mockRestore();
  });
});
