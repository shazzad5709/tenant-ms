import React from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '../ui/button';
import { Tenant } from '@/patterns/entity/Tenant';
import { ApplicationData } from '@/patterns/controller/ApplicationController';
import { Application } from '@/patterns/entity/Application';

type Props = {
  applications: ApplicationData[];
  onAcceptClicked?: (application: ApplicationData) => void;
  onRejectClicked?: (application: Application) => void;
};

const ApprovalInterface = ({
  applications,
  onAcceptClicked,
  onRejectClicked,
}: Props) => {
  return (
    <div className='flex flex-col space-y-8 p-8'>
      <h1 className='font-semibold text-2xl'>Requests</h1>
      <div className='flex space-x-4'>
        {applications.map((application) => (
          <Card>
            <CardHeader>
              <CardTitle>
                {application.tenant.firstName} {application.tenant.lastName}
              </CardTitle>
              <CardDescription>
                <span className='text-black text-base'>
                  {application.tenant.email}
                </span>
                <br />
              </CardDescription>
            </CardHeader>
            <CardContent className='space-y-2'>
              <p className='text-sm'>
                <span className='font-semibold'>Phone: </span>
                {application.tenant.phoneNumber}
              </p>
              <p className='text-sm'>
                <span className='font-semibold'>Passport ID: </span>
                {application.tenant.passportID}
              </p>
              <p className='text-sm'>
                <span className='font-semibold'>House ID: </span>
                {application.application.houseId}
              </p>
            </CardContent>
            <CardFooter className='justify-between gap-4'>
              <Button
                onClick={() => onRejectClicked?.(application.application)}
                variant='outline'
                className='text-red-600 hover:text-red-600 font-semibold'
              >
                Reject
              </Button>
              <Button
                onClick={() => onAcceptClicked?.(application)}
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
