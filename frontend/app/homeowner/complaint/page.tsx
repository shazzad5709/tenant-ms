'use client';
import { Button } from '@/components/ui/button';
import Navbar from '@/components/ui/navbar';
import useUser from '@/hooks/useUser';
import { ComplaintListingController } from '@/patterns/controller/ComplaintListingController';
import ServiceManagementController from '@/patterns/controller/ServiceManagementController';
import { useRouter } from 'next/navigation';
import React from 'react';
import { navbarItems } from '../page';

type Props = {};

export default function Service({}: Props) {
  const router = useRouter();
  const { user, updateUser } = useUser();

  

  const onAddServiceClicked = () => {
    router.push('/homeowner/service/add');
  };

  return (
    <div className='flex flex-col p-8'>
      <Navbar navbarItems={navbarItems} current='complaints' />

      <div>
        <div className='px-8 pt-8 text-lg'>Welcome, {user?.name}!</div>
        {/* Listings, Update and Delete Buttons are here as well */}
        <ComplaintListingController user={user} />
      </div>
    </div>
  );
}
