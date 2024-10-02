'use client';
import { useState } from 'react';
import Input from '../../ui/custom/Input';
import { Button } from '../../ui/button';
import { BillFormData } from '@/patterns/boundary/AddBillFormBoundary';

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
      className='flex flex-col gap-4 bg-gray-50 p-16 rounded-lg shadow-2xl'
    >
      <h1 className='text-2xl mb-4'>TMS</h1>
      <Input
        type='date'
        value={dateToString(data.billDate)}
        onChange={(e) =>
          setData({ ...data, billDate: new Date(e.target.value) })
        }
        placeholder='Service Name'
      />
      <Input
        type='date'
        value={dateToString(data.dueDate)}
        onChange={(e) =>
          setData({ ...data, dueDate: new Date(e.target.value) })
        }
        placeholder='Service Name'
      />
      <div>
        <label htmlFor='billingPeriod' className='pl-2 text-xs text-gray-700'>
          Bill Starts From
        </label>
        <Input
          type='date'
          id='billingPeriod'
          value={dateToString(data.billingPeriodFrom)}
          onChange={(e) =>
            setData({ ...data, billingPeriodFrom: new Date(e.target.value) })
          }
          placeholder='Billing Period From'
        />
        <label htmlFor='billingPeriodEnd'>To</label>
        <Input
          type='date'
          id='billingPeriodEnd'
          value={dateToString(data.billingPeriodTo)}
          onChange={(e) =>
            setData({ ...data, billingPeriodTo: new Date(e.target.value) })
          }
          placeholder='To'
        />
      </div>
      <div>
        <label htmlFor='amount' className='pl-2 text-xs text-gray-700'>
          Service Charge
        </label>
        <Input
          name='amount'
          type='number'
          value={data.amount.toString()}
          onChange={(e) =>
            setData({ ...data, amount: parseFloat(e.target.value) })
          }
          placeholder='Amount'
        />
      </div>
      <Button>{label}</Button>
    </form>
  );
}
