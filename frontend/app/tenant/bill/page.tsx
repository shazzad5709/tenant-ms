'use client';
import { Button } from '@/components/ui/button';
import Navbar from '@/components/ui/navbar';
import useUser from '@/hooks/useUser';
import { BillListingController } from '@/patterns/controller/BillListingController';
import { useRouter } from 'next/navigation';
import React from 'react';
import { navbarItems } from '../page';

type Props = {};

export default function House({}: Props) {
  const router = useRouter();
  const { user, updateUser } = useUser();

  return (
    <div className='flex flex-col p-8'>
      <Navbar navbarItems={navbarItems} current='bills' />

      <div>
        <div className='px-8 pt-8 text-lg'>Welcome, {user?.name}!</div>
        {/* Listings, Update and Delete Buttons are here as well */}
        <BillListingController user={user} />
      </div>
    </div>
  );
}
