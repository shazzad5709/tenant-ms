'use client';
import Navbar from '@/components/ui/navbar';
import { UpdateServiceController } from '@/patterns/controller/UpdateServiceController';
import { useSearchParams } from 'next/navigation';
import React, { useState } from 'react';
import { InfinitySpin } from 'react-loader-spinner';
import { navbarItems } from '../../page';

type Props = {};

export default function UpdateServicePage({}: Props) {
  const searchParams = useSearchParams();
  const serviceId = searchParams.get('id');

  return (
    <div className='flex flex-col p-8'>
      <Navbar navbarItems={navbarItems} current='bills' />

      <div>
        <UpdateServiceController serviceId={serviceId ?? ''} />
      </div>
    </div>
  );
}
