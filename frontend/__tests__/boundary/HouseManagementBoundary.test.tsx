import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import HouseList from '../../components/interface/HouseList';

// Mock data for house listings
const mockHouses = [
  {
    id: '1',
    address: '123 Main St',
    city: 'New York',
    state: 'NY',
    zipCode: '10001',
    image: '',
    type: 'Apartment',
    floorspace: 1200,
    beds: 3,
    baths: 2,
    price: 500000,
    owner: 'John Doe',
    ownerId: '1',
    parking: 2,
    phoneNumber: '123-456-7890',
  },
  {
    id: '2',
    address: '456 Broadway',
    city: 'Los Angeles',
    state: 'CA',
    zipCode: '90001',
    image: '',
    type: 'House',
    floorspace: 2000,
    beds: 4,
    baths: 3,
    price: 750000,
    owner: 'Jane Doe',
    ownerId: '2',
    parking: 3,
    phoneNumber: '987-654-3210',
  },
];

describe('HouseList Component', () => {
  it('renders house listings for tenants', () => {
    render(<HouseList houses={mockHouses} role='tenant' />);

    // Check if house details are rendered
    expect(
      screen.getByText('123 Main St, New York, NY, 10001')
    ).toBeInTheDocument();
    expect(
      screen.getByText('456 Broadway, Los Angeles, CA, 90001')
    ).toBeInTheDocument();

    // Check if 'Apply' button is rendered for tenants
    const applyButtons = screen.getAllByText('Apply');
    expect(applyButtons.length).toBe(2);
  });

  it('renders house listings for homeowners with edit and delete buttons', () => {
    const mockEdit = jest.fn();
    const mockDelete = jest.fn();

    render(
      <HouseList
        houses={mockHouses}
        role='homeowner'
        onEditClicked={mockEdit}
        onDeleteClicked={mockDelete}
      />
    );

    // Check if house details are rendered
    expect(
      screen.getByText('123 Main St, New York, NY, 10001')
    ).toBeInTheDocument();
    expect(
      screen.getByText('456 Broadway, Los Angeles, CA, 90001')
    ).toBeInTheDocument();

    // Check if 'Edit' and 'Remove' buttons are rendered for homeowners
    const editButtons = screen.getAllByText('Edit');
    const removeButtons = screen.getAllByText('Remove');
    expect(editButtons.length).toBe(2);
    expect(removeButtons.length).toBe(2);

    // Simulate clicking on 'Edit' and 'Remove' buttons
    fireEvent.click(editButtons[0]);
    fireEvent.click(removeButtons[0]);
    expect(mockEdit).toHaveBeenCalledWith('1');
    expect(mockDelete).toHaveBeenCalledWith('1');
  });

  it('does not render any buttons if the role is neither tenant nor homeowner', () => {
    render(<HouseList houses={mockHouses} role='visitor' />);

    // Check that no buttons are rendered
    expect(screen.queryByText('Apply')).toBeNull();
    expect(screen.queryByText('Edit')).toBeNull();
    expect(screen.queryByText('Remove')).toBeNull();
  });
});
