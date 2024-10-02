'use client';
import Navbar from '@/components/ui/navbar';
import useUser from '@/hooks/useUser';
import { UpdateHouseController } from '@/patterns/controller/UpdateHouseController';
import { useRouter, useSearchParams } from 'next/navigation';
import React, { useState } from 'react';
import { InfinitySpin } from 'react-loader-spinner';

type Props = {};

export default function AddHousePage({}: Props) {
  const [loading, setLoading] = useState(false);

  const searchParams = useSearchParams();
  const houseId = searchParams.get('id');

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

      {/* Add house controller */}
      <div>
        <UpdateHouseController houseId={houseId ?? ''} />
      </div>
    </div>
  );
}
