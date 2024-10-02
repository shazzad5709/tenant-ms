import React from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { users } from '@/data/users';
import { Button } from '../ui/button';

type Props = {};

const ApprovalInterface = (props: Props) => {
  return (
    <div className='flex flex-col space-y-8 p-8'>
      <h1 className='font-semibold text-2xl'>Requests</h1>
      <div className='flex space-x-4'>
        {users.map((user) => (
          <Card>
            <CardHeader>
              <CardTitle>
                {user.firstName} {user.lastName}
              </CardTitle>
              <CardDescription>
                <span className='text-black text-base'>{user.email}</span>
                <br />
                <span className='text-black text-base capitalize'>
                  {user.role}
                </span>
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className='text-sm italic font-semibold'>Address</p>
              <p className='text-sm mb-4'>{user.address}</p>

              <p className='text-sm'>
                <span className='font-semibold'>Phone: </span>
                {user.phone}
              </p>
              <p className='text-sm'>
                <span className='font-semibold'>Passport ID: </span>
                {user.passportId}
              </p>
            </CardContent>
            <CardFooter className='justify-between'>
              <Button
                variant='outline'
                className='text-red-600 hover:text-red-600 font-semibold'
              >
                Reject
              </Button>
              <Button
                variant='outline'
                className='text-green-600 hover:text-green-600 font-semibold'
              >
                Approve
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default ApprovalInterface;
