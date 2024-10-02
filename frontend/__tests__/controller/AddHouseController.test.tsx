import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { useRouter } from 'next/navigation';
import mockRouter from 'next-router-mock';
import '@testing-library/jest-dom';
import useUser from '../../hooks/useUser';
import React, { act } from 'react';
import HouseEntity from '@/patterns/entity/House';
import { AddHouseController } from '@/patterns/controller/AddHouseController';
import { AxiosResponse } from 'axios';

// Create mock functions
const mockUpdateUser = jest.fn();
const mockUseUser = jest.fn();
// router mock
jest.mock('next/navigation', () => require('next-router-mock'));

jest.mock('../../patterns/entity/House', () => ({
  addHouse: jest.fn(), // Mocking the signUp function
}));

// Mock the useUser hook
jest.mock('../../hooks/useUser', () => ({
  __esModule: true,
  default: () => mockUseUser(),
}));

const mockedAddHouse = HouseEntity.addHouse as jest.MockedFunction<
  typeof HouseEntity.addHouse
>;

describe('AddHouseController', () => {
  const mockPush = jest.fn();
  const mockSetLoading = jest.fn();

  beforeEach(() => {
    mockUseUser.mockReturnValue({
      user: { role: 'Homeowner' },
      updateUser: mockUpdateUser,
    });
    jest.clearAllMocks();
  });

  it('renders AddHouseFormBoundary if user is a Homeowner', async () => {
    const { rerender } = render(
      <AddHouseController loading={false} setLoading={mockSetLoading} />
    );

    await waitFor(() => {
      expect(screen.getByText('List New House')).toBeInTheDocument();
    });
  });

  it('shows "Unauthorized" if the user is not a Homeowner', async () => {
    mockUseUser.mockReturnValue({
      user: { role: 'Tenant' },
      updateUser: mockUpdateUser,
    });

    const { rerender } = render(
      <AddHouseController loading={false} setLoading={mockSetLoading} />
    );

    await waitFor(() => {
      expect(screen.getByText('Unauthorized')).toBeInTheDocument();
    });
  });

  it('sets loading state, calls addHouse, and navigates to /homeowner/house on success', async () => {
    const mockHouseData = {
      address: '9 Garth rd',
      city: 'Scarsdale',
      state: 'NY',
      zipCode: '10583',
      image: '1.jpg',
      type: 'Duplex',
      floorspace: 1064,
      beds: 3,
      baths: 2,
      price: 410000,
      owner: '',
      ownerId: '',
      parking: 3,
      phoneNumber: '0812345679',
    };

    mockedAddHouse.mockResolvedValue({ status: 200 } as AxiosResponse);

    // Mock the router
    mockRouter.push = jest.fn();

    // Render the component
    const { rerender } = render(
      <AddHouseController loading={false} setLoading={mockSetLoading} />
    );

    // Simulate filling the form
    await act(async () => {
      fireEvent.change(screen.getByLabelText(/Price/i), {
        target: { value: '440000' },
      });
    });

    // Simulate form submission
    fireEvent.click(screen.getByRole('button', { name: /List New House/i }));

    rerender(
      <AddHouseController loading={false} setLoading={mockSetLoading} />
    );

    await waitFor(() => {
      // Check if loading state was set to true
      expect(mockSetLoading).toHaveBeenCalledWith(true);

      expect(mockedAddHouse).toHaveBeenCalledWith(mockHouseData);

      // Check if the success alert was shown
      expect(window.alert).toHaveBeenCalledWith('House added successfully');

      // Check if router.push was called to navigate to the correct page
      expect(mockRouter.push).toHaveBeenCalledWith('/homeowner/House');

      // Check if loading state was set back to false
      expect(mockSetLoading).toHaveBeenCalledWith(false);
    });
  });

  it('shows error if addHouse fails', async () => {
    const mockError = new Error('Failed to List House');
    mockedAddHouse.mockResolvedValue(mockError);

    jest.spyOn(window, 'alert').mockImplementation(() => {});

    await act(async () => {
      render(
        <AddHouseController loading={false} setLoading={mockSetLoading} />
      );
    });

    await act(async () => {
      fireEvent.change(screen.getByLabelText(/Price/i), {
        target: { value: '440000' },
      });
    });

    fireEvent.click(screen.getByRole('button', { name: /List New House/i }));
    await waitFor(() => {
      expect(mockedAddHouse).toHaveBeenCalled();
    });

    expect(window.alert).toHaveBeenCalledWith('Failed to List House');
    expect(mockSetLoading).toHaveBeenCalledWith(true);
    expect(mockSetLoading).toHaveBeenCalledWith(false);
    expect(mockRouter.push).not.toHaveBeenCalled();
  });

  it('stops loading and logs error message if there is an exception during House addition', async () => {
    const mockError = new Error('API Error');
    mockedAddHouse.mockRejectedValue(mockError);

    const consoleLogSpy = jest
      .spyOn(console, 'log')
      .mockImplementation(() => {});

    await act(async () => {
      render(
        <AddHouseController loading={false} setLoading={mockSetLoading} />
      );
    });

    await act(async () => {
      await act(async () => {
        fireEvent.change(screen.getByLabelText(/Price/i), {
          target: { value: '440000' },
        });
      });
    });

    fireEvent.click(screen.getByRole('button', { name: /List New House/i }));
    await waitFor(() => {
      expect(mockedAddHouse).toHaveBeenCalled();
    });

    expect(mockSetLoading).toHaveBeenCalledWith(true);
    expect(mockSetLoading).toHaveBeenCalledWith(false);
    expect(consoleLogSpy).toHaveBeenCalledWith(mockError);
    expect(mockRouter.push).not.toHaveBeenCalled();

    consoleLogSpy.mockRestore();
  });
});
