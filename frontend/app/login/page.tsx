import { SignInControl } from '@/patterns/controller/SignInController';
import React from 'react';

type Props = {};

export default function page({}: Props) {
  return (
    <div className='flex h-screen w-full items-center justify-center'>
      <SignInControl />
    </div>
  );
}
