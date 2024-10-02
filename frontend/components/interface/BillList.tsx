'use client';
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
import { Bill } from '@/patterns/entity/Bill';

type Props = {
  bills: Bill[];
  role: string;
  onEditClicked?: (billId: string) => void;
  onDeleteClicked?: (billId: string) => void;
  onDownloadClicked?: (billId: string) => void;
};

const BillList = ({
  bills,
  role,
  onEditClicked,
  onDeleteClicked,
  onDownloadClicked,
}: Props) => {
  return (
    <div className='flex flex-col space-y-8 p-8'>
      <h1 className='font-semibold text-2xl'>Bills</h1>
      <div className='grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4'>
        {bills.map((bill) => (
          <Card>
            <CardHeader>
              <CardTitle className='pt-4'>{bill.description}</CardTitle>
              <CardDescription>{bill.issuedTo}</CardDescription>
            </CardHeader>
            <CardContent>
              <span className='text-sm font-semibold'>Billing Period: </span>
              {bill.billingPeriodFrom && bill.billingPeriodTo && (
                <span className='text-sm mb-4'>
                  {new Date(bill.billingPeriodFrom).toLocaleDateString('en-GB')}{' '}
                  - {new Date(bill.billingPeriodTo).toLocaleDateString('en-GB')}
                </span>
              )}

              {bill.billDate && (
                <p className='text-sm'>
                  <span className='font-semibold'>Date: </span>
                  {new Date(bill.billDate).toLocaleDateString('en-GB')}
                </p>
              )}

              <p className='text-sm'>
                <span className='font-semibold'>Status: </span>
                {bill.status}
              </p>

              {bill.dueDate && (
                <p className='text-sm'>
                  <span className='font-semibold'>Due Date: </span>
                  {new Date(bill.dueDate).toLocaleDateString('en-GB')}
                </p>
              )}

              {bill.paymentDate && (
                <p className='text-sm'>
                  <span className='font-semibold'>Payment Date: </span>
                  {new Date(bill.paymentDate).toLocaleDateString('en-GB')}
                </p>
              )}

              <p className='pt-2 font-semibold text-lg'>
                Amount: {'$' + bill.amount.toLocaleString('en-US')}
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

export default BillList;
