'use client';
import { useRouter } from 'next/navigation';
import {
  SignInFormBoundary,
  SignInFormData,
} from '../boundary/SignInFormBoundary';
import { useEffect, useState } from 'react';
import useUser from '@/hooks/useUser';
import UserEntity from '../entity/User';
import { User } from '@/context/UserContext';

type Props = {};

export const SignInControl: React.FC<Props> = ({}) => {
  const router = useRouter();
  const { user, updateUser } = useUser();
  const [status, setStatus] = useState<string>('');

  useEffect(() => {
    alert(status);
  }, [status]);

  const signInClickedEvent = async (data: SignInFormData) => {
    try {
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
    }
  };

  // if (user?.id) router.push(`/${user.role}?id=${user.id}`);

  return <SignInFormBoundary signIn={signInClickedEvent} />;
};
