import React from 'react';
import { InfinitySpin } from 'react-loader-spinner';

type Props = {};

export default function Loading({}: Props) {
  return (
    <div className='flex justify-center items-center h-screen'>
      <InfinitySpin color='#000000' />
    </div>
  );
}
