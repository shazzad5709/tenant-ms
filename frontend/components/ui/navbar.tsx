'use client';
import React from 'react';
import { Button } from './button';
import useUser from '@/hooks/useUser';
import { useRouter } from 'next/navigation';
import { InfinitySpin } from 'react-loader-spinner';

type Props = {
  navbarItems: { name: string; href: string }[];
  current: string;
};

export default function Navbar({ navbarItems, current }: Readonly<Props>) {
  const { user, updateUser } = useUser();
  const router = useRouter();

  const signOut = () => {
    updateUser(null);
    router.push('/');
  };

  if (!user)
    return (
      <div className='h-screen flex items-center justify-center'>
        <InfinitySpin color='#000' />
      </div>
    );

  return (
    <div className='flex items-center justify-between'>
      <div className='text-4xl font-semibold'>TMS</div>
      <div className='space-x-2 flex px-2 py-2 '>
        {navbarItems.map((item) => (
          <Button
            variant={'outline'}
            onClick={() => router.push(item.href)}
            key={item.name}
            className={`hover:bg-slate-100 px-4 py-1 rounded-lg ${
              current === item.name.toLocaleLowerCase() ? 'bg-slate-200' : ''
            }`}
          >
            {item.name}
          </Button>
        ))}
        <Button
          variant={'outline'}
          onClick={signOut}
          className='hover:bg-slate-100 px-4 py-1 rounded-lg border-black/[0.3]'
        >
          Sign Out
        </Button>
      </div>
    </div>
  );
}
