import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { SignInControl } from '@/patterns/controller/SignInController';
import { useRouter } from 'next/navigation';
import mockRouter from 'next-router-mock';
import '@testing-library/jest-dom';
import useUser from '../../hooks/useUser';

jest.mock('next/navigation', () => require('next-router-mock'));

const mockUpdateUser = jest.fn();
jest.mock('../../hooks/useUser', () => ({
  __esModule: true,
  default: () => ({
    user: null,
    updateUser: mockUpdateUser,
  }),
}));

describe('Sign In Form', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('Have Sign In Text', () => {
    const push = jest.fn();
    render(<SignInControl />);

    expect(screen.getByText('Sign In')).toBeInTheDocument();
  });

  it('should validate required fields by checking setError state', async () => {
    const { rerender } = render(<SignInControl />);

    fireEvent.click(screen.getByRole('button', { name: /Sign In/i }));

    rerender(<SignInControl />);

    await waitFor(() => {
      expect(screen.getByText('All fields are required')).toBeInTheDocument();
    });
  });

  it('should display an error if email is invalid', async () => {
    const { rerender } = render(<SignInControl />);

    const emailInput = screen.getByPlaceholderText('Email');
    fireEvent.change(emailInput, { target: { value: 'johndoe' } });

    fireEvent.click(screen.getByRole('button', { name: /Sign In/i }));

    rerender(<SignInControl />);

    await waitFor(() => {
      expect(screen.getByText('Invalid email')).toBeInTheDocument();
    });
  });

  it('should display an error if password is invalid', async () => {
    const { rerender } = render(<SignInControl />);

    const passwordInput = screen.getByPlaceholderText('Password');
    fireEvent.change(passwordInput, { target: { value: 'johndoe' } });

    fireEvent.click(screen.getByRole('button', { name: /Sign In/i }));

    rerender(<SignInControl />);

    await waitFor(() => {
      expect(screen.getByText('Invalid password')).toBeInTheDocument();
    });
  });

  it('should navigate to home page when sign in is successful', async () => {
    const push = jest.fn();
    mockRouter.push = push;

    const { rerender } = render(<SignInControl />);

    const emailInput = screen.getByPlaceholderText('Email');
    const passwordInput = screen.getByPlaceholderText('Password');

    fireEvent.change(emailInput, { target: { value: 'johndoe' } });
    fireEvent.change(passwordInput, { target: { value: 'johndoe' } });

    fireEvent.click(screen.getByRole('button', { name: /Sign In/i }));

    rerender(<SignInControl />);

    await waitFor(() => {
      expect(push).toHaveBeenCalledWith('/');
    });
  });
});
