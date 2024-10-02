import React from 'react';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { bills } from '@/data/bills';
import { Button } from '../ui/button';
import { houses } from '@/data/houses';

type Props = {};

const HouseBillList = (props: Props) => {
  return (
    <div className='flex flex-col space-y-8 p-8'>
      <h1 className='font-semibold text-2xl'>Bills</h1>
      <div className='grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4'>
        {bills.map((bill) => (
          <Card>
            <CardHeader>
              <CardTitle className='pt-4'>{bill.service}</CardTitle>
            </CardHeader>
            <CardContent>
              <span className='text-sm font-semibold'>Billing Period: </span>
              <span className='text-sm mb-4'>{bill.billingPeriod}</span>

              <p className='text-sm'>
                <span className='font-semibold'>Date: </span>
                {bill.date}
              </p>
              <p className='text-sm'>
                <span className='font-semibold'>Status: </span>
                {bill.paid ? 'Paid' : 'Pending'}
              </p>
              <p className='text-sm'>
                <span className='font-semibold'>Due on: </span>
                {bill.due}
              </p>
              <p className='text-sm'>
                <span className='font-semibold'>Payment Date: </span>
                {bill.paid ? bill.payDate : 'N/A'}
              </p>

              <p className='pt-2 font-semibold text-lg'>
                Price: {'$' + bill.amount.toLocaleString('en-US')}
              </p>
            </CardContent>
            <CardFooter className='justify-end'>
              <Button
                variant='outline'
                className='border border-black font-semibold'
              >
                Download
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default HouseBillList;
