'use client';
import { Button } from '@/components/ui/button';
import Navbar from '@/components/ui/navbar';
import useUser from '@/hooks/useUser';
import HouseListingController from '@/patterns/controller/HouseListingController';
import { useRouter } from 'next/navigation';
import React from 'react';

type Props = {};

export default function House({}: Props) {
  const router = useRouter();
  const { user, updateUser } = useUser();

  const navbarItems = [
    {
      name: 'Houses',
      href: `/tenant/house`,
    },
    {
      name: 'Bills',
      href: `/tenant/bill`,
    },
    {
      name: 'Services',
      href: `/tenant/service`,
    },
    {
      name: 'Complaints',
      href: `/tenant/complaint`,
    },
  ];

  return (
    <div className='flex flex-col p-8'>
      <Navbar navbarItems={navbarItems} current='houses' />

      <div>
        <div className='px-8 pt-8 text-lg'>Welcome, {user?.name}!</div>
        {/* Listings, Update and Delete Buttons are here as well */}
        <HouseListingController user={user} />
      </div>
    </div>
  );
}
