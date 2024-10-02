'use client';
import HouseList from '@/components/interface/HouseList';
import { Button } from '@/components/ui/button';
import Navbar from '@/components/ui/navbar';
import useUser from '@/hooks/useUser';
import HomeownerHouseManagementController from '@/patterns/controller/HouseManagementController';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { InfinitySpin } from 'react-loader-spinner';

type Props = {};

export default function House({}: Props) {
  const [loading, setLoading] = useState<boolean>(false); // Add loading state
  const router = useRouter();
  const { user, updateUser } = useUser();

  const navbarItems = [
    {
      name: 'Houses',
      href: `/homeowner/house`,
    },
    {
      name: 'Bills',
      href: `/homeowner/bill`,
    },
    {
      name: 'Services',
      href: `/homeowner/service`,
    },
  ];

  const onAddHouseClicked = () => {
    router.push('/homeowner/house/add');
  };

  if (loading) {
    return (
      <div className='h-screen flex items-center justify-center'>
        <InfinitySpin color='#000' />
      </div>
    );
  }

  return (
    <div className='flex flex-col p-8'>
      <Navbar navbarItems={navbarItems} current='houses' />

      <div>
        <div className='px-8 pt-8 text-lg'>Welcome, {user?.name}!</div>
        {/* Listings, Update and Delete Buttons are here as well */}
        <HomeownerHouseManagementController
          user={user}
          setLoading={setLoading}
        />

        {/* Add house */}
        <div className='flex w-full justify-end p-8'>
          <Button
            onClick={onAddHouseClicked}
            variant='secondary'
            className='border border-black px-8 py-4 text-lg'
          >
            Add New House
          </Button>
        </div>
      </div>
    </div>
  );
}
