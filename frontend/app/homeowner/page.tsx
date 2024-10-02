'use client';
import HouseList from '@/components/interface/HouseList';
import { Button } from '@/components/ui/button';
import Navbar from '@/components/ui/navbar';
import useUser from '@/hooks/useUser';
import axios from '@/lib/axios';
import { useRouter, useSearchParams } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { InfinitySpin } from 'react-loader-spinner';

type Props = {};

export default function Homeowner({}: Props) {
  const router = useRouter();

  const navigate = (href: string) => {
    router.push(href);
  };

  useEffect(() => {
    router.push(`/homeowner/house`);
  }, []);

  return (
    <div className='h-screen flex items-center justify-center'>
      <InfinitySpin color='#000' />
    </div>
  );
}
