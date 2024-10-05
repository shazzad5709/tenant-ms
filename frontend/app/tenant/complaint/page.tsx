'use client';
import { Button } from '@/components/ui/button';
import Navbar from '@/components/ui/navbar';
import useUser from '@/hooks/useUser';
import { useRouter } from 'next/navigation';
import React from 'react';
import { navbarItems } from '../page';
import ComplaintManagementController from '@/patterns/controller/ComplaintManagementController';

type Props = {};

export default function House({}: Props) {
  const router = useRouter();
  const { user, updateUser } = useUser();

  const onAddComplaintClicked = () => {
    router.push('/tenant/complaint/add');
  };

  return (
    <div className='flex flex-col p-8'>
      <Navbar navbarItems={navbarItems} current='complaints' />

      <div>
        <div className='px-8 pt-8 text-lg'>Welcome, {user?.name}!</div>
        {/* Listings, Update and Delete Buttons are here as well */}
        <ComplaintManagementController user={user} />

        {/* Add house */}
        <div className='flex w-full justify-end p-8'>
          <Button
            onClick={onAddComplaintClicked}
            variant='secondary'
            className='border border-black px-8 py-4 text-lg'
          >
            Create New Complaint
          </Button>
        </div>
      </div>
    </div>
  );
}
