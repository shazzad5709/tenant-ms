import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { useRouter } from 'next/navigation';
import mockRouter from 'next-router-mock';
import '@testing-library/jest-dom';
import useUser from '../../hooks/useUser';
import { SignUpController } from '@/patterns/controller/SignUpController';
import UserEntity from '@/patterns/entity/User';
import React from 'react';
// router mock
jest.mock('next/navigation', () => require('next-router-mock'));

// user mock
const mockUpdateUser = jest.fn();
jest.mock('../../hooks/useUser', () => ({
  __esModule: true,
  default: () => ({
    user: null,
    updateUser: mockUpdateUser,
  }),
}));

// entity mock
jest.mock('../../patterns/entity/User', () => ({
  signUp: jest.fn(), // Mocking the signUp function
}));

describe('Sign Up Form', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('Have Sign Up Text', () => {
    const push = jest.fn();
    render(<SignUpController />);

    expect(screen.getByText('Sign Up')).toBeInTheDocument();
  });

  it('should validate required fields by checking setError state', async () => {
    const { rerender } = render(<SignUpController />);

    fireEvent.click(screen.getByRole('button', { name: /Sign Up/i }));

    rerender(<SignUpController />);

    await waitFor(() => {
      expect(screen.getByText('All fields are required')).toBeInTheDocument();
    });
  });

  it('should display an error if email is invalid', async () => {
    const { rerender } = render(<SignUpController />);

    const emailInput = screen.getByPlaceholderText('Email');
    fireEvent.change(emailInput, { target: { value: 'johndoe' } });
    fireEvent.click(screen.getByRole('button', { name: /Sign Up/i }));

    rerender(<SignUpController />);

    await waitFor(() => {
      expect(screen.getByText('Invalid email')).toBeInTheDocument(); // Check for the specific error message
    });
  });

  it('should display an error if password is less than 6 characters', async () => {
    const { rerender } = render(<SignUpController />);

    const passwordInput = screen.getByPlaceholderText('Password');
    fireEvent.change(passwordInput, { target: { value: 'pass' } });
    fireEvent.click(screen.getByRole('button', { name: /Sign Up/i }));

    rerender(<SignUpController />);

    await waitFor(() => {
      expect(
        screen.getByText('Password must be at least 6 characters')
      ).toBeInTheDocument(); // Check for the specific error message
    });
  });

  it('should successfully sign up a user', async () => {
    const { rerender } = render(<SignUpController />);

    (UserEntity.signUp as jest.Mock).mockResolvedValue({
      status: 200,
      // data: { id: '1', role: 'Homeowner' },
    });

    const firstNameInput = screen.getByPlaceholderText('First Name');
    const lastNameInput = screen.getByPlaceholderText('Last Name');
    const emailInput = screen.getByPlaceholderText('Email');
    const passwordInput = screen.getByPlaceholderText('Password');
    const phoneNumberInput = screen.getByPlaceholderText('Phone Number');
    const passportIDInput = screen.getByPlaceholderText('Passport ID');
    const houseStreetNumberInput = screen.getByPlaceholderText(
      'House and Street Number'
    );
    const userNameInput = screen.getByPlaceholderText('Username');
    const cityInput = screen.getByPlaceholderText('City');
    const stateInput = screen.getByPlaceholderText('State');
    const zipCodeInput = screen.getByPlaceholderText('Zip Code');
    const roleInput = screen.getByRole('combobox');

    fireEvent.change(firstNameInput, { target: { value: 'John' } });
    fireEvent.change(lastNameInput, { target: { value: 'Doe' } });
    fireEvent.change(emailInput, { target: { value: 'john@example.com' } });
    fireEvent.change(passwordInput, { target: { value: 'johndoe' } });
    fireEvent.change(phoneNumberInput, { target: { value: '0812345679' } });
    fireEvent.change(passportIDInput, { target: { value: 'A12345678' } });
    fireEvent.change(houseStreetNumberInput, {
      target: { value: '1674 Rocky Mountain Ave' },
    });
    fireEvent.change(userNameInput, { target: { value: 'johndoe' } });
    fireEvent.change(cityInput, { target: { value: 'Milpitas' } });
    fireEvent.change(stateInput, { target: { value: 'CA' } });
    fireEvent.change(zipCodeInput, { target: { value: '95035' } });

    fireEvent.mouseDown(roleInput);

    fireEvent.click(screen.getByRole('button', { name: /Sign Up/i }));

    rerender(<SignUpController />);

    await waitFor(() => {
      expect(screen.getByText('User created successfully')).toBeInTheDocument();
    });
  });
});
