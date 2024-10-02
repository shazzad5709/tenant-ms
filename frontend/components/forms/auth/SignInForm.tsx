'use client';
import Link from 'next/link';
import Input from '../../ui/custom/Input';
import { Button } from '../../ui/button';
import { SignInFormData } from '@/patterns/boundary/SignInFormBoundary';

type Props = {
  data: SignInFormData;
  setData: (data: SignInFormData) => void;
  handleSubmit: (event: any) => void;
};

export default function SignInForm({
  data: credentials,
  setData: setCredentials,
  handleSubmit,
}: Readonly<Props>) {
  return (
    <form
      onSubmit={handleSubmit}
      className='flex w-full flex-col gap-4 bg-gray-50 p-16 rounded-lg shadow-2xl'
    >
      <h1 className='text-2xl mb-4'>TMS</h1>
      <Input
        type='email'
        value={credentials.email}
        onChange={(e) =>
          setCredentials({ ...credentials, email: e.target.value })
        }
        placeholder='Email'
      />
      <Input
        type='password'
        value={credentials.password}
        onChange={(e) =>
          setCredentials({ ...credentials, password: e.target.value })
        }
        placeholder='Password'
      />
      <Button onClick={handleSubmit}>Sign In</Button>
      <span>
        Don't have an account?
        <Link href={'/register'} className='text-green-700'>
          {' '}
          Sign Up!
        </Link>
      </span>
    </form>
  );
}
