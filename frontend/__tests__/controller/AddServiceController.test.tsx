import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { useRouter } from 'next/navigation';
import mockRouter from 'next-router-mock';
import '@testing-library/jest-dom';
import useUser from '../../hooks/useUser';
import React, { act } from 'react';
import ServiceEntity from '@/patterns/entity/Service';
import { AddServiceController } from '@/patterns/controller/AddServiceController';
import { AxiosResponse } from 'axios';

// Create mock functions
const mockUpdateUser = jest.fn();
const mockUseUser = jest.fn();
// router mock
jest.mock('next/navigation', () => require('next-router-mock'));

jest.mock('../../patterns/entity/Service', () => ({
  addService: jest.fn(), // Mocking the signUp function
}));

// Mock the useUser hook
jest.mock('../../hooks/useUser', () => ({
  __esModule: true,
  default: () => mockUseUser(),
}));

const mockedAddService = ServiceEntity.addService as jest.MockedFunction<
  typeof ServiceEntity.addService
>;

describe('AddServiceController', () => {
  const mockPush = jest.fn();
  const mockSetLoading = jest.fn();

  beforeEach(() => {
    mockUseUser.mockReturnValue({
      user: { role: 'Homeowner' },
      updateUser: mockUpdateUser,
    });
    jest.clearAllMocks();
  });

  it('renders AddServiceFormBoundary if user is a Homeowner', async () => {
    const { rerender } = render(
      <AddServiceController loading={false} setLoading={mockSetLoading} />
    );

    await waitFor(() => {
      expect(screen.getByText('Add Service')).toBeInTheDocument();
    });
  });

  it('shows "Unauthorized" if the user is not a Homeowner', async () => {
    mockUseUser.mockReturnValue({
      user: { role: 'Tenant' },
      updateUser: mockUpdateUser,
    });

    const { rerender } = render(
      <AddServiceController loading={false} setLoading={mockSetLoading} />
    );

    await waitFor(() => {
      expect(screen.getByText('Unauthorized')).toBeInTheDocument();
    });
  });

  it('sets loading state, calls addService, and navigates to /homeowner/service on success', async () => {
    const mockServiceData = {
      serviceName: 'Electricity',
      description: 'Electricity bill for the month',
      charge: 100,
      serviceCategory: 'Utility',
      serviceProviderName: 'John Doe',
      serviceProviderEmail: 'q7TqJ@example.com',
      serviceProviderPhone: '0812345679',
      houseId: '1',
      houseNumber: '6',
      streetAddress: '6 Garth rd',
      city: 'Scarsdale',
      state: 'NY',
      zipCode: '10583',
      houseOwner: 'John Doe',
      houseOwnerId: '66e59985dd376b3d6b8ba70c',
    };

    // Mock the BillEntity.addBill to return a successful response
    mockedAddService.mockResolvedValue({ status: 200 } as AxiosResponse);

    // Mock the router
    mockRouter.push = jest.fn();

    // Render the component
    const { rerender } = render(
      <AddServiceController loading={false} setLoading={mockSetLoading} />
    );

    // Simulate filling the form
    await act(async () => {
      fireEvent.change(screen.getByLabelText(/Charfe/i), {
        target: { value: '44' },
      });
    });

    // Simulate form submission
    fireEvent.click(screen.getByRole('button', { name: /Add Service/i }));

    rerender(
      <AddServiceController loading={false} setLoading={mockSetLoading} />
    );

    await waitFor(() => {
      // Check if loading state was set to true
      expect(mockSetLoading).toHaveBeenCalledWith(true);

      // Check if BillEntity.addBill was called with the correct data
      expect(mockedAddService).toHaveBeenCalledWith(mockServiceData);

      // Check if the success alert was shown
      expect(window.alert).toHaveBeenCalledWith('Service added successfully');

      // Check if router.push was called to navigate to the correct page
      expect(mockRouter.push).toHaveBeenCalledWith('/homeowner/service');

      // Check if loading state was set back to false
      expect(mockSetLoading).toHaveBeenCalledWith(false);
    });
  });

  it('shows error if addService fails', async () => {
    const mockError = new Error('Failed to add Service');
    mockedAddService.mockResolvedValue(mockError);

    jest.spyOn(window, 'alert').mockImplementation(() => {});

    await act(async () => {
      render(
        <AddServiceController loading={false} setLoading={mockSetLoading} />
      );
    });

    await act(async () => {
      fireEvent.change(screen.getByLabelText(/Charge/i), {
        target: { value: '90' },
      });
    });

    fireEvent.click(screen.getByRole('button', { name: /Add Service/i }));
    await waitFor(() => {
      expect(mockedAddService).toHaveBeenCalled();
    });

    expect(window.alert).toHaveBeenCalledWith('Failed to add Service');
    expect(mockSetLoading).toHaveBeenCalledWith(true);
    expect(mockSetLoading).toHaveBeenCalledWith(false);
    expect(mockRouter.push).not.toHaveBeenCalled();
  });

  it('stops loading and logs error message if there is an exception during Service addition', async () => {
    const mockError = new Error('API Error');
    mockedAddService.mockRejectedValue(mockError);

    const consoleLogSpy = jest
      .spyOn(console, 'log')
      .mockImplementation(() => {});

    await act(async () => {
      render(
        <AddServiceController loading={false} setLoading={mockSetLoading} />
      );
    });

    await act(async () => {
      await act(async () => {
        fireEvent.change(screen.getByLabelText(/Charge/i), {
          target: { value: '94' },
        });
      });
    });

    fireEvent.click(screen.getByRole('button', { name: /Add Service/i }));
    await waitFor(() => {
      expect(mockedAddService).toHaveBeenCalled();
    });

    expect(mockSetLoading).toHaveBeenCalledWith(true);
    expect(mockSetLoading).toHaveBeenCalledWith(false);
    expect(consoleLogSpy).toHaveBeenCalledWith(mockError);
    expect(mockRouter.push).not.toHaveBeenCalled();

    consoleLogSpy.mockRestore();
  });
});
