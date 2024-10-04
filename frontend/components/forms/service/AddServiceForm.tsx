'use client';
import { useState } from 'react';
import { Input } from '../../ui/input';
import { Button } from '../../ui/button';
import { ServiceFormData } from '@/patterns/boundary/AddServiceFormBoundary';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';

type Props = {
  label: string;
  data: ServiceFormData;
  setData: (data: ServiceFormData) => void;
  handleSubmit: (event: any) => void;
};

export default function ServiceForm({
  label,
  data,
  setData,
  handleSubmit,
}: Readonly<Props>) {
  return (
    <form
      onSubmit={handleSubmit}
      className='flex flex-col gap-4 p-16 lg:px-48 rounded-lg'
    >
      <h1 className='text-2xl mb-4'>Service</h1>

      <p className='font-semibold'>House Owner: {data.houseOwnerName}</p>

      <div className='relative w-full'>
        <Input
          type='text'
          value={data.serviceName}
          onChange={(e) => setData({ ...data, serviceName: e.target.value })}
          placeholder=' '
        />
        <Label htmlFor='name'>Service Name</Label>
      </div>

      <div className='relative w-full'>
        <Textarea
          value={data.description}
          onChange={(e) => setData({ ...data, description: e.target.value })}
          placeholder=' '
        />
        <Label htmlFor='description'>Description</Label>
      </div>

      <div className='flex gap-4'>
        <div className='relative w-full'>
          <Input
            name='charge'
            type='number'
            value={data.charge.toString()}
            onChange={(e) =>
              setData({ ...data, charge: Number(e.target.value) })
            }
            placeholder=' '
          />
          <Label htmlFor='charge'>Charge</Label>
        </div>

        <div className='relative w-full'>
          <Input
            name='serviceCategory'
            type='text'
            value={data.serviceCategory}
            onChange={(e) =>
              setData({ ...data, serviceCategory: e.target.value })
            }
            placeholder=' '
          />
          <Label htmlFor='serviceCategory'>Service Category</Label>
        </div>
      </div>

      <div className='flex gap-4'>
        <div className='relative w-1/4'>
          <Input
            name='serviceProviderName'
            type='text'
            value={data.serviceProviderName}
            onChange={(e) =>
              setData({ ...data, serviceProviderName: e.target.value })
            }
            placeholder=' '
          />
          <Label htmlFor='serviceProviderName'>Service Provider</Label>
        </div>

        <div className='relative w-1/2'>
          <Input
            name='serviceProviderEmail'
            type='email'
            value={data.serviceProviderEmail}
            onChange={(e) =>
              setData({ ...data, serviceProviderEmail: e.target.value })
            }
            placeholder=' '
          />
          <Label htmlFor='serviceProviderEmail'>Provider's Email</Label>
        </div>
        <div className='relative w-1/4'>
          <Input
            name='serviceProviderPhone'
            type='text'
            value={data.serviceProviderPhone}
            onChange={(e) =>
              setData({ ...data, serviceProviderPhone: e.target.value })
            }
            placeholder=' '
          />
          <Label htmlFor='serviceProviderPhone'>Provider's Phone</Label>
        </div>
      </div>

      <div className='flex gap-4'>
        <div className='relative w-full'>
          <Input
            name='apartmentNumber'
            type='text'
            value={data.houseNumber}
            disabled={label === 'Update Service'}
            onChange={(e) => setData({ ...data, houseNumber: e.target.value })}
            placeholder=' '
          />
          <Label htmlFor='apartmentNumber'>House</Label>
        </div>

        <div className='relative w-full'>
          <Input
            name='streetAddress'
            type='text'
            value={data.streetAddress}
            disabled={label === 'Update Service'}
            onChange={(e) =>
              setData({ ...data, streetAddress: e.target.value })
            }
            placeholder=' '
          />
          <Label htmlFor='streetAddress'>Street</Label>
        </div>

        <div className='relative w-full'>
          <Input
            name='houseId'
            type='text'
            disabled={label === 'Update Service'}
            value={data.houseId}
            onChange={(e) => setData({ ...data, houseId: e.target.value })}
            placeholder=' '
          />
          <Label htmlFor='houseId'>House ID</Label>
        </div>
      </div>

      <div className='flex gap-4'>
        <div className='relative w-full'>
          <Input
            required
            name='city'
            id='city'
            type='text'
            disabled={label === 'Update Service'}
            value={data.city}
            onChange={(e) => setData({ ...data, city: e.target.value })}
            placeholder=' '
          />
          <Label htmlFor='city'>City</Label>
        </div>

        <div className='relative w-full'>
          <Input
            required
            name='state'
            id='state'
            type='text'
            disabled={label === 'Update Service'}
            value={data.state}
            onChange={(e) => setData({ ...data, state: e.target.value })}
            placeholder=' '
          />

          <Label htmlFor='state'>State</Label>
        </div>

        <div className='relative w-full'>
          <Input
            required
            name='zipCode'
            id='zipCode'
            type='text'
            disabled={label === 'Update Service'}
            value={data.zipCode}
            onChange={(e) => setData({ ...data, zipCode: e.target.value })}
            placeholder=' '
          />

          <Label htmlFor='zipCode'>Zip Code</Label>
        </div>
      </div>

      <Button>{label}</Button>
    </form>
  );
}
