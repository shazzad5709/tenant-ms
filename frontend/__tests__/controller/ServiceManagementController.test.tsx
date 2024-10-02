import React from 'react';
import { render, screen, waitFor, act, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import ServiceEntity from '../../patterns/entity/Service';
import { User } from '../../context/UserContext';
import ServiceManagementController from '../../patterns/controller/ServiceManagementController';


// Mock the next/navigation module
const mockPush = jest.fn();
jest.mock('next/navigation', () => ({
  useRouter: () => ({
    push: mockPush,
  }),
}));

// Mock the ServiceEntity
jest.mock('../entity/Service', () => ({
  getServicesByOwner: jest.fn(),
  deleteService: jest.fn(),
}));

// Mock the ServiceList component
jest.mock('../../components/interface/HouseList', () => ({
  __esModule: true,
  default: ({ services, onEditClicked, onDeleteClicked }: any) => (
    <div data-testid="service-list">
      {services.map((service: any) => (
        <div key={service.id}>
          <span>{service.serviceName}</span>
          <button onClick={() => onEditClicked(service.id)}>Edit</button>
          <button onClick={() => onDeleteClicked(service.id)}>Delete</button>
        </div>
      ))}
    </div>
  ),
}));

describe('ServiceManagementController', () => {
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

  const mockServices = [
    {
      id: '1',
      serviceName: "Electricity",
      description: "Electricity bill for the month",
      charge: 100,
      serviceCategory: "Utility",
      serviceProviderName: "John Doe",
      serviceProviderEmail: "q7TqJ@example.com",
      serviceProviderPhone: "0812345679",
      houseId: "1",
      houseNumber: "6",
      streetAddress: "6 Garth rd",
      city: "Scarsdale",
      state: "NY",
      zipCode: "10583",
      houseOwner: "John Doe",
      houseOwnerId: "66e59985dd376b3d6b8ba70c",
    },
  ];

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('fetches and displays services for Homeowner users', async () => {
    (ServiceEntity.getServicesByOwner as jest.Mock).mockResolvedValue({ status: 200, data: mockServices });

    await act(async () => {
      render(<ServiceManagementController user={mockUser} setLoading={mockSetLoading} />);
    });

    await waitFor(() => {
      expect(screen.getByTestId('service-list')).toBeInTheDocument();
      expect(screen.getByText('Electricity')).toBeInTheDocument();
    });

    expect(mockSetLoading).toHaveBeenCalledWith(true);
    expect(mockSetLoading).toHaveBeenCalledWith(false);
    expect(ServiceEntity.getServicesByOwner).toHaveBeenCalledWith(mockUser.id);
  });

  it('handles error when fetching services fails', async () => {
    (ServiceEntity.getServicesByOwner as jest.Mock).mockRejectedValue(new Error('Failed to fetch'));
    const alertMock = jest.spyOn(window, 'alert').mockImplementation(() => {});

    await act(async () => {
      render(<ServiceManagementController user={mockUser} setLoading={mockSetLoading} />);
    });

    await waitFor(() => {
      expect(alertMock).toHaveBeenCalledWith('Failed to fetch services');
    });

    expect(mockSetLoading).toHaveBeenCalledWith(true);
    expect(mockSetLoading).toHaveBeenCalledWith(false);

    alertMock.mockRestore();
  });

  it('does not fetch services when user is null', async () => {
    await act(async () => {
      render(<ServiceManagementController user={null} setLoading={mockSetLoading} />);
    });

    expect(ServiceEntity.getServicesByOwner).not.toHaveBeenCalled();
    expect(mockSetLoading).not.toHaveBeenCalled();
  });

  it('navigates to edit page when edit button is clicked', async () => {
    (ServiceEntity.getServicesByOwner as jest.Mock).mockResolvedValue({ status: 200, data: mockServices });

    await act(async () => {
      render(<ServiceManagementController user={mockUser} setLoading={mockSetLoading} />);
    });

    await waitFor(() => {
      fireEvent.click(screen.getByText('Edit'));
    });

    expect(mockPush).toHaveBeenCalledWith('/homeowner/service/update?id=1');
  });

  it('deletes service when delete button is clicked', async () => {
    (ServiceEntity.getServicesByOwner as jest.Mock).mockResolvedValue({ status: 200, data: mockServices });
    (ServiceEntity.deleteService as jest.Mock).mockResolvedValue({ status: 200 });
    const alertMock = jest.spyOn(window, 'alert').mockImplementation(() => {});

    await act(async () => {
      render(<ServiceManagementController user={mockUser} setLoading={mockSetLoading} />);
    });

    await waitFor(() => {
      fireEvent.click(screen.getByText('Delete'));
    });

    expect(ServiceEntity.deleteService).toHaveBeenCalledWith('1');
    expect(alertMock).toHaveBeenCalledWith('Service deleted successfully');
    expect(ServiceEntity.getServicesByOwner).toHaveBeenCalledTimes(2); // Initial fetch + after delete

    alertMock.mockRestore();
  });

  it('handles error when deleting service fails', async () => {
    (ServiceEntity.getServicesByOwner as jest.Mock).mockResolvedValue({ status: 200, data: mockServices });
    (ServiceEntity.deleteService as jest.Mock).mockRejectedValue(new Error('Failed to delete'));
    const alertMock = jest.spyOn(window, 'alert').mockImplementation(() => {});

    await act(async () => {
      render(<ServiceManagementController user={mockUser} setLoading={mockSetLoading} />);
    });

    await waitFor(() => {
      fireEvent.click(screen.getByText('Delete'));
    });

    expect(ServiceEntity.deleteService).toHaveBeenCalledWith('1');
    expect(alertMock).toHaveBeenCalledWith('Failed to delete');
    expect(ServiceEntity.getServicesByOwner).toHaveBeenCalledTimes(1); // Only initial fetch

    alertMock.mockRestore();
  });
});