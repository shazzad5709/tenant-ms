'use client';
import Link from 'next/link';
import { Input } from '../../ui/input';
import { Button } from '../../ui/button';
import { SignInFormData } from '@/patterns/boundary/SignInFormBoundary';
import { Label } from '@/components/ui/label';

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
      className='flex flex-col w-full p-16 md:w-1/2 xl:w-1/3 gap-4 rounded-lg'
    >
      <h1 className='text-2xl mb-4'>Sign in to TMS</h1>
      <div className='relative'>
        <Input
          name='email'
          id='email'
          type='email'
          value={credentials.email}
          onChange={(e) =>
            setCredentials({ ...credentials, email: e.target.value })
          }
          placeholder='Email'
        />
        <Label htmlFor='address'>Address</Label>
      </div>
      <div className='relative'>
        <Input
          name='password'
          id='password'
          type='password'
          value={credentials.password}
          onChange={(e) =>
            setCredentials({ ...credentials, password: e.target.value })
          }
          placeholder='Password'
        />
        <Label htmlFor='password'>Password</Label>
      </div>
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
