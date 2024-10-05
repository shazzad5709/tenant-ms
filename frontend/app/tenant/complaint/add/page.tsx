'use client';
import Navbar from '@/components/ui/navbar';
import React, { useState } from 'react';
import { InfinitySpin } from 'react-loader-spinner';
import { navbarItems } from '../../page';
import { AddComplaintController } from '@/patterns/controller/AddComplaintController';

type Props = {};

export default function AddHousePage({}: Props) {
  return (
    <div className='flex flex-col p-8'>
      <Navbar navbarItems={navbarItems} current='houses' />

      <div>
        <AddComplaintController />
      </div>
    </div>
  );
}
