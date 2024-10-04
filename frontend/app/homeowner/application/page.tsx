'use client';
import Navbar from '@/components/ui/navbar';
import useUser from '@/hooks/useUser';
import { useRouter } from 'next/navigation';
import React from 'react';
import { navbarItems } from '../page';
import { ApplicationController } from '@/patterns/controller/ApplicationController';

type Props = {};

export default function Service({}: Props) {
  const router = useRouter();
  const { user, updateUser } = useUser();

  const onAddServiceClicked = () => {
    router.push('/homeowner/service/add');
  };

  return (
    <div className='flex flex-col p-8'>
      <Navbar navbarItems={navbarItems} current='applications' />

      <div>
        <div className='px-8 pt-8 text-lg'>Welcome, {user?.name}!</div>
        <ApplicationController />
      </div>
    </div>
  );
}
