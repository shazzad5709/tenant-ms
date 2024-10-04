'use client';
import { useRouter } from 'next/navigation';
import {
  SignInFormBoundary,
  SignInFormData,
} from '../boundary/SignInFormBoundary';
import { useEffect, useState } from 'react';
import useUser from '@/hooks/useUser';
import { UserEntity } from '../entity/User';
import { User } from '@/context/UserContext';
import { InfinitySpin } from 'react-loader-spinner';

type Props = {};

export const SignInControl: React.FC<Props> = ({}) => {
  const router = useRouter();
  const { user, updateUser } = useUser();
  const [status, setStatus] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    if (status.length > 0) {
      alert(status);
    }
  }, [status]);

  const signInClickedEvent = async (data: SignInFormData) => {
    try {
      setLoading(true);
      const res = await UserEntity.signIn(data);
      console.log('Controller: ', res);

      if ('access_token' in res && res.access_token) {
        setStatus('Signed in');

        const updatedUser: User = {
          id: res.id,
          username: res.username,
          email: res.email,
          role: res.role,
          access_token: res.access_token,
          token_type: res.token_type,
          name: res.name,
        };

        updateUser(updatedUser);
        router.push(`/${updatedUser.role}?id=${updatedUser.id}`);
      } else if (res instanceof Error) {
        alert(res.message);
      }
    } catch (error) {
      alert(error);
    } finally {
      setLoading(false);
    }
  };

  if (user) router.push(`/${user.role}?id=${user.id}`);

  if (loading)
    return (
      <div className='absolute inset-0 bg-white h-screen flex items-center justify-center text-xl'>
        <InfinitySpin color='black' />
      </div>
    );

  return <SignInFormBoundary signIn={signInClickedEvent} />;
};
