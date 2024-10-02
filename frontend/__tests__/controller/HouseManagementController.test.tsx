import React from 'react';
import {
  render,
  screen,
  waitFor,
  act,
  fireEvent,
} from '@testing-library/react';
import '@testing-library/jest-dom';
import HouseEntity from '../../patterns/entity/House';
import { User } from '../../context/UserContext';
import HouseManagementController from '../../patterns/controller/HouseManagementController';

// Mock the next/navigation module
const mockPush = jest.fn();
jest.mock('next/navigation', () => ({
  useRouter: () => ({
    push: mockPush,
  }),
}));

// Mock the HouseEntity
jest.mock('../../patterns/entity/House', () => ({
  getHouses: jest.fn(),
  deleteHouse: jest.fn(),
}));

// Mock the HouseList component
jest.mock('../../components/interface/HouseList', () => ({
  __esModule: true,
  default: ({ houses, onEditClicked, onDeleteClicked }: any) => (
    <div data-testid='house-list'>
      {houses.map((house: any) => (
        <div key={house.id}>
          <span>{house.address}</span>
          <button onClick={() => onEditClicked(house.id)}>Edit</button>
          <button onClick={() => onDeleteClicked(house.id)}>Delete</button>
        </div>
      ))}
    </div>
  ),
}));

describe('HouseManagementController', () => {
  const mockSetLoading = jest.fn();
  const mockUser: User = {
    id: '66e59985dd376b3d6b8ba70c',
    role: 'Homeowner',
    name: 'John Doe',
    username: 'johndoe',
    email: 'johndoe@me.com',
    access_token: '123456',
    token_type: 'Bearer',
  };

  const mockHouses = [
    {
      id: '1',
      address: '6 Garth rd',
      city: 'Scarsdale',
      state: 'NY',
      zipCode: '10583',
      owner: 'John Doe',
      ownerId: '66e59985dd376b3d6b8ba70c',
      phoneNumber: '0812345679',
      type: 'Duplex',
      floorspace: 1264,
      beds: 3,
      baths: 1,
      price: 295000,
      parking: 2,
    },
  ];

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('fetches and displays houses for Homeowner users', async () => {
    (HouseEntity.getHouses as jest.Mock).mockResolvedValue({
      status: 200,
      data: mockHouses,
    });

    await act(async () => {
      render(
        <HouseManagementController
          user={mockUser}
          setLoading={mockSetLoading}
        />
      );
    });

    await waitFor(() => {
      expect(screen.getByTestId('house-list')).toBeInTheDocument();
      expect(screen.getByText('6 Garth rd')).toBeInTheDocument();
    });

    expect(mockSetLoading).toHaveBeenCalledWith(true);
    expect(mockSetLoading).toHaveBeenCalledWith(false);
  });

  it('handles error when fetching houses fails', async () => {
    (HouseEntity.getHouses as jest.Mock).mockRejectedValue(
      new Error('Failed to fetch')
    );
    const alertMock = jest.spyOn(window, 'alert').mockImplementation(() => {});

    await act(async () => {
      render(
        <HouseManagementController
          user={mockUser}
          setLoading={mockSetLoading}
        />
      );
    });

    await waitFor(() => {
      expect(alertMock).toHaveBeenCalledWith('Failed to fetch houses');
    });

    expect(mockSetLoading).toHaveBeenCalledWith(true);
    expect(mockSetLoading).toHaveBeenCalledWith(false);

    alertMock.mockRestore();
  });

  it('does not fetch houses when user is null', async () => {
    await act(async () => {
      render(
        <HouseManagementController user={null} setLoading={mockSetLoading} />
      );
    });

    expect(HouseEntity.getHouses).not.toHaveBeenCalled();
    expect(mockSetLoading).not.toHaveBeenCalled();
  });

  it('navigates to edit page when edit button is clicked', async () => {
    (HouseEntity.getHouses as jest.Mock).mockResolvedValue({
      status: 200,
      data: mockHouses,
    });

    await act(async () => {
      render(
        <HouseManagementController
          user={mockUser}
          setLoading={mockSetLoading}
        />
      );
    });

    await waitFor(() => {
      fireEvent.click(screen.getByText('Edit'));
    });

    expect(mockPush).toHaveBeenCalledWith('/homeowner/house/update?id=1');
  });

  it('deletes house when delete button is clicked', async () => {
    (HouseEntity.getHouses as jest.Mock).mockResolvedValue({
      status: 200,
      data: mockHouses,
    });
    (HouseEntity.deleteHouse as jest.Mock).mockResolvedValue({ status: 200 });
    const alertMock = jest.spyOn(window, 'alert').mockImplementation(() => {});

    await act(async () => {
      render(
        <HouseManagementController
          user={mockUser}
          setLoading={mockSetLoading}
        />
      );
    });

    await waitFor(() => {
      fireEvent.click(screen.getByText('Delete'));
    });

    expect(HouseEntity.deleteHouse).toHaveBeenCalledWith('1');
    expect(alertMock).toHaveBeenCalledWith('House deleted successfully');
    expect(HouseEntity.getHouses).toHaveBeenCalledTimes(2); // Initial fetch + after delete

    alertMock.mockRestore();
  });

  it('handles error when deleting house fails', async () => {
    (HouseEntity.getHouses as jest.Mock).mockResolvedValue({
      status: 200,
      data: mockHouses,
    });
    (HouseEntity.deleteHouse as jest.Mock).mockRejectedValue(
      new Error('Failed to delete')
    );
    const alertMock = jest.spyOn(window, 'alert').mockImplementation(() => {});

    await act(async () => {
      render(
        <HouseManagementController
          user={mockUser}
          setLoading={mockSetLoading}
        />
      );
    });

    await waitFor(() => {
      fireEvent.click(screen.getByText('Delete'));
    });

    expect(HouseEntity.deleteHouse).toHaveBeenCalledWith('1');
    expect(alertMock).toHaveBeenCalledWith('Failed to delete');
    expect(HouseEntity.getHouses).toHaveBeenCalledTimes(1); // Only initial fetch

    alertMock.mockRestore();
  });
});
