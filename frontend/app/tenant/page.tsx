'use client';
import { useRouter } from 'next/navigation';
import React, { useEffect } from 'react';
import { InfinitySpin } from 'react-loader-spinner';

type Props = {};

export const navbarItems = [
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

export default function Tenant({}: Props) {
  const router = useRouter();

  const navigate = (href: string) => {
    router.push(href);
  };

  useEffect(() => {
    router.push(`/tenant/house`);
  }, []);

  return (
    <div className='h-screen flex items-center justify-center'>
      <InfinitySpin color='#000' />
    </div>
  );
}
