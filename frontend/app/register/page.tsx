import { SignUpController } from '@/patterns/controller/SignUpController';
import React from 'react';

type Props = {};

export default function page({}: Props) {
  return (
    <div className='flex flex-col h-screen items-center justify-center px-48'>
      <SignUpController />
    </div>
  );
}
