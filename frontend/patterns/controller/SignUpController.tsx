'use client';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import {
  SignUpFormData,
  SignUpFormBoundary,
} from '../boundary/SignUpFormBoundary';
import useUser from '@/hooks/useUser';
import UserEntity from '../entity/User';

type Props = {};

export const SignUpController: React.FC<Props> = ({}) => {
  const router = useRouter();
  const { user } = useUser();
  const [error, setError] = useState<string[]>([]);
  const [status, setStatus] = useState<string>('');

  // useEffect(() => {
  //   // console.log(error);
  // }, [error]);

  const signUpClickedEvent = async (data: SignUpFormData) => {
    const newErrors = isValidData(data);

    // Check if there are errors immediately
    if (newErrors.length !== 0) {
      setError(newErrors); // Set the error state
      return; // Exit if there are errors
    }

    console.log('Data in controller: ', data);

    try {
      const res = await UserEntity.signUp(data);

      if ('status' in res && res.status === 200) {
        setStatus('User created successfully');
        // console.log(status);
        router.push('/login');
      } else if (res instanceof Error) {
        // console.log(res.message);
      }
    } catch (error) {
      // console.log(error);
    }
  };

  const isValidData = (data: SignUpFormData): string[] => {
    const newErrors = [];

    // if (!data.email) console.log('undefined email');

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

    // Update error state at once
    return newErrors;
  };

  // if (user) router.push(`/${user.role}?id=${user.id}`);

  return (
    <>
      <SignUpFormBoundary signUp={signUpClickedEvent} />

      {error.length > 0 && (
        <ul className='hidden'>
          {error.map((err, idx) => (
            <li key={idx}>{err}</li>
          ))}
        </ul>
      )}

      <p className='hidden'>{status}</p>
    </>
  );
};
