'use client';
import Navbar from '@/components/ui/navbar';
import useUser from '@/hooks/useUser';
import { ServiceListingController } from '@/patterns/controller/ServiceListingController';
import { useRouter } from 'next/navigation';
import React from 'react';
import { navbarItems } from '../page';

type Props = {};

export default function House({}: Props) {
  const router = useRouter();
  const { user, updateUser } = useUser();

  return (
    <div className='flex flex-col p-8'>
      <Navbar navbarItems={navbarItems} current='services' />

      <div>
        <div className='px-8 pt-8 text-lg'>Welcome, {user?.name}!</div>
        <ServiceListingController user={user} />
      </div>
    </div>
  );
}
