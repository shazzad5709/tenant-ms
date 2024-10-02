import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { ServiceFormData } from '../../patterns/boundary/AddServiceFormBoundary';
import { UpdateServiceFormBoundary } from '../../patterns/boundary/UpdateServiceFormBoundary';

// Mock ServiceForm component
jest.mock(
  '../../components/forms/service/AddServiceForm',
  () =>
    ({ data, setData, handleSubmit, label }: any) =>
      (
        <form onSubmit={handleSubmit}>
          <input
            type='text'
            value={data.name}
            onChange={(e) => setData({ ...data, name: e.target.value })}
            placeholder='Service Name'
          />
          <button type='submit'>{label}</button>
        </form>
      )
);

describe('UpdateServiceFormBoundary Component', () => {
  const mockService: ServiceFormData = {
    serviceName: 'Cleaning Service',
    description: 'We offer the best cleaning service in the city',
    charge: 100,
    serviceCategory: '',
    serviceProviderName: '',
    serviceProviderEmail: '',
    serviceProviderPhone: '',
    apartmentNumber: '',
    streetAddress: '',
    city: '',
    state: '',
    zipCode: '',
    houseOwnerName: '',
    houseOwnerId: '',
  };

  const mockUpdateService = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders the ServiceForm with the correct initial data', () => {
    render(
      <UpdateServiceFormBoundary
        service={mockService}
        updateService={mockUpdateService}
      />
    );

    // Check if the input field contains the initial service name
    expect(screen.getByPlaceholderText('Service Name')).toHaveValue(
      mockService.serviceName
    );

    // Check if the submit button has the correct label
    expect(screen.getByText('Update Service')).toBeInTheDocument();
  });

  it('calls updateService with updated data when the form is submitted', () => {
    render(
      <UpdateServiceFormBoundary
        service={mockService}
        updateService={mockUpdateService}
      />
    );

    // Change the service name
    fireEvent.change(screen.getByPlaceholderText('Service Name'), {
      target: { value: 'Updated Cleaning Service' },
    });

    // Submit the form
    fireEvent.click(screen.getByText('Update Service'));

    // Check if the updateService function was called with updated data
    expect(mockUpdateService).toHaveBeenCalledWith({
      ...mockService,
      name: 'Updated Cleaning Service',
    });
  });

  it('does not call updateService if no changes are made and form is submitted', () => {
    render(
      <UpdateServiceFormBoundary
        service={mockService}
        updateService={mockUpdateService}
      />
    );

    // Submit the form without making any changes
    fireEvent.click(screen.getByText('Update Service'));

    // Check if updateService was called with the original data
    expect(mockUpdateService).toHaveBeenCalledWith(mockService);
  });
});
