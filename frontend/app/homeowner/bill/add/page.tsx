'use client';
import Navbar from '@/components/ui/navbar';
import { AddBillController } from '@/patterns/controller/AddBillController';
import React, { useState } from 'react';
import { InfinitySpin } from 'react-loader-spinner';
import { navbarItems } from '../../page';

type Props = {};

export default function AddBillPage({}: Props) {
  const [loading, setLoading] = useState(false);

 

  if (loading) {
    return (
      <div className='h-screen flex items-center justify-center'>
        <InfinitySpin color='#000' />
      </div>
    );
  }

  return (
    <div className='flex flex-col p-8'>
      <Navbar navbarItems={navbarItems} current='bills' />

      <div>
        <AddBillController loading={loading} setLoading={setLoading} />
      </div>
    </div>
  );
}
