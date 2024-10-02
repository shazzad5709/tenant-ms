'use client';
import { useState } from 'react';
import { Input } from '../../ui/input';
import { Button } from '../../ui/button';
import { BillFormData } from '@/patterns/boundary/AddBillFormBoundary';
import { Label } from '@/components/ui/label';

type Props = {
  label: string;
  data: BillFormData;
  setData: (data: BillFormData) => void;
  handleSubmit: (event: any) => void;
};

export default function BillForm({
  label,
  data,
  setData,
  handleSubmit,
}: Readonly<Props>) {
  const dateToString = (date: Date | null) => {
    if (date === null) return '';
    return date.toISOString().split('T')[0];
  };

  return (
    <form
      onSubmit={handleSubmit}
      className='flex flex-col gap-4 p-16 lg:px-48 rounded-lg'
    >
      <h1 className='text-2xl'>
        Issuer: <span className='font-bold'>{data.issuer}</span>
      </h1>
      <p className='text-gray-700'>Provide the following information</p>
      <div className='flex gap-4'>
        <div className='relative w-full'>
          <Input
            type='date'
            id='billDate'
            name='billDate'
            disabled
            value={dateToString(data.billDate)}
            onChange={(e) =>
              setData({ ...data, billDate: new Date(e.target.value) })
            }
            placeholder=' '
          />
          <Label htmlFor='billDate'>Bill Date</Label>
        </div>

        <div className='relative w-full'>
          <Input
            type='date'
            value={dateToString(data.dueDate)}
            onChange={(e) =>
              setData({ ...data, dueDate: new Date(e.target.value) })
            }
            placeholder=' '
          />
          <Label htmlFor='dueDate'>Due Date</Label>
        </div>
      </div>
      <div className='flex gap-4'>
        <div className='relative w-full'>
          <Input
            type='text'
            id='issuedTo'
            name='issuedTo'
            value={data.issuedTo}
            onChange={(e) => setData({ ...data, issuedTo: e.target.value })}
            placeholder=' '
          />
          <Label htmlFor='issuedTo'>Issued To</Label>
        </div>
        <div className='relative w-full'>
          <Input
            type='text'
            id='issuedToId'
            name='issuedToId'
            value={data.issuedToId}
            onChange={(e) => setData({ ...data, issuedToId: e.target.value })}
            placeholder=' '
          />
          <Label htmlFor='issuedToId'>ID</Label>
        </div>
      </div>
      <div className='relative w-full'>
        <Input
          type='text'
          id='description'
          name='description'
          value={data.description}
          onChange={(e) => setData({ ...data, description: e.target.value })}
          placeholder=' '
        />
        <Label htmlFor='description'>Description</Label>
      </div>
      <div className='flex gap-4'>
        <div className='relative w-full'>
          <Input
            type='date'
            id='billingPeriodFrom'
            name='billingPeriodFrom'
            value={dateToString(data.billingPeriodFrom)}
            onChange={(e) =>
              setData({ ...data, billingPeriodFrom: new Date(e.target.value) })
            }
            placeholder=' '
          />
          <Label htmlFor='billingPeriodFrom'>Billing Period From</Label>
        </div>

        <div className='relative w-full'>
          <Input
            type='date'
            id='billingPeriodTo'
            name='billingPeriodTo'
            value={dateToString(data.billingPeriodTo)}
            onChange={(e) =>
              setData({ ...data, billingPeriodTo: new Date(e.target.value) })
            }
            placeholder=' '
          />
          <Label htmlFor='billingPeriodTo'>Billing Period To</Label>
        </div>
      </div>
      <div className='relative w-full'>
        <Input
          name='amount'
          type='number'
          id='amount'
          value={data.amount.toString()}
          onChange={(e) =>
            setData({ ...data, amount: parseFloat(e.target.value) })
          }
          placeholder=' '
        />
        <Label htmlFor='amount'>Amount</Label>
      </div>
      <div className='flex justify-end'>
        <Button>{label}</Button>
      </div>
    </form>
  );
}
