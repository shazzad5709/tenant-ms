'use client';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import {
  SignUpFormData,
  SignUpFormBoundary,
} from '../boundary/SignUpFormBoundary';
import useUser from '@/hooks/useUser';
import { UserEntity } from '../entity/User';
import { InfinitySpin } from 'react-loader-spinner';

type Props = {};

export const SignUpController: React.FC<Props> = ({}) => {
  const router = useRouter();
  const { user } = useUser();
  const [error, setError] = useState<string[]>([]);
  const [status, setStatus] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);

  // useEffect(() => {
  //   // console.log(error);
  // }, [error]);

  const signUpClickedEvent = async (data: SignUpFormData) => {
    const newErrors = isValidData(data);

    if (newErrors.length !== 0) {
      setError(newErrors);
      return;
    }

    console.log('Data in controller: ', data);

    try {
      setLoading(true);
      const res = await UserEntity.signUp(data);

      alert('Signed up successfully');
      router.push('/login');
    } catch (error) {
      console.log(error);
      alert('Sign up failed');
    } finally {
      setLoading(false);
    }
  };

  const isValidData = (data: SignUpFormData): string[] => {
    const newErrors = [];

    if (
      !data.firstName ||
      !data.lastName ||
      !data.username ||
      !data.email ||
      !data.password ||
      !data.phoneNumber ||
      !data.passportID ||
      !data.houseStreetNumber ||
      !data.city ||
      !data.state ||
      !data.zipCode
    ) {
      newErrors.push('All fields are required');
    }

    if (data.email && !data.email.includes('@')) {
      newErrors.push('Invalid email');
    }

    if (data.password && data.password.length < 6) {
      newErrors.push('Password must be at least 6 characters');
    }

    if (data.phoneNumber && data.phoneNumber.length !== 10) {
      newErrors.push('Phone number must be 10 characters');
    }

    if (data.passportID && data.passportID.length !== 9) {
      newErrors.push('Passport ID must be 9 characters');
    }

    if (data.zipCode && data.zipCode.length !== 5) {
      newErrors.push('Zip code must be 5 characters');
    }

    if (data.state && data.state.length !== 2) {
      newErrors.push('State must be 2 characters');
    }

    if (data.city && data.city.length < 2) {
      newErrors.push('City must be at least 2 characters');
    }

    if (data.houseStreetNumber && data.houseStreetNumber.length < 5) {
      newErrors.push('House and street number must be at least 5 characters');
    }

    if (data.username && data.username.length < 5) {
      newErrors.push('Username must be at least 5 characters');
    }

    if (data.firstName && data.firstName.length < 2) {
      newErrors.push('First name must be at least 2 characters');
    }

    if (data.lastName && data.lastName.length < 2) {
      newErrors.push('Last name must be at least 2 characters');
    }

    return newErrors;
  };

  // If a user is already logged in, redirect to their dashboard
  if (user) router.push(`/${user.role}?id=${user.id}`);

  if (loading)
    return (
      <div className='absolute inset-0 bg-white h-screen flex items-center justify-center text-xl'>
        <InfinitySpin color='black' />
      </div>
    );

  return (
    <>
      <SignUpFormBoundary signUp={signUpClickedEvent} />

      <div className='hidden text-white'>
        {error.length > 0 && (
          <ul>
            {error.map((err, idx) => (
              <li className='text-red-500' key={idx}>
                {err}
              </li>
            ))}
          </ul>
        )}
      </div>
    </>
  );
};
