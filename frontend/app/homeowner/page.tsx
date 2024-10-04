'use client';
import { useRouter } from 'next/navigation';
import React, { useEffect } from 'react';
import { InfinitySpin } from 'react-loader-spinner';

type Props = {};

export const navbarItems = [
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
  {
    name: 'Complaints',
    href: `/homeowner/complaint`,
  },
  {
    name: 'Applications',
    href: `/homeowner/application`,
  },
  {
    name: 'Notifications',
    href: `/notification`,
  },
];

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
