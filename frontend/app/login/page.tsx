import { SignInControl } from '@/patterns/controller/SignInController';
import React from 'react';

type Props = {};

export default function page({}: Props) {
  return (
    <div className='flex flex-col h-screen items-center justify-center px-48'>
      <SignInControl />
    </div>
  );
}
