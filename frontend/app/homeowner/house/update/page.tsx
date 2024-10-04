'use client';
import Navbar from '@/components/ui/navbar';
import useUser from '@/hooks/useUser';
import { UpdateHouseController } from '@/patterns/controller/UpdateHouseController';
import { useRouter, useSearchParams } from 'next/navigation';
import React, { useState } from 'react';
import { InfinitySpin } from 'react-loader-spinner';
import { navbarItems } from '../../page';

type Props = {};

export default function UpdateHousePage({}: Props) {
  const [loading, setLoading] = useState(false);

  const searchParams = useSearchParams();
  const houseId = searchParams.get('id');

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
