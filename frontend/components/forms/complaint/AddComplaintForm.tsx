'use client';
import { Input } from '../../ui/input';
import { Button } from '../../ui/button';
import { ComplaintFormData } from '@/patterns/boundary/AddComplaintFormBoundary';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';

type Props = {
  data: ComplaintFormData;
  setData: React.Dispatch<React.SetStateAction<ComplaintFormData>>;
  handleSubmit: (e: React.FormEvent) => void;
};

export default function ComplaintForm({
  data,
  setData,
  handleSubmit,
}: Readonly<Props>) {
  return (
    <form
      onSubmit={handleSubmit}
      className='flex flex-col gap-4 p-16 lg:px-48 rounded-lg'
    >
      <h1 className='text-xl mb-4'>{data.tenantName}</h1>
      <p>
        <span className='italic'>Contact Info: </span>
        {data.tenantEmail}, {data.tenantPhone}
      </p>

      <div className='relative'>
        <Input
          id='type'
          name='type'
          type='text'
          value={data.complaintType}
          onChange={(e) => setData({ ...data, complaintType: e.target.value })}
          placeholder=' '
        />
        <Label htmlFor='type'>Complaint Type</Label>
      </div>

      <div className='relative'>
        <Textarea
          id='description'
          name='description'
          value={data.description}
          onChange={(e) =>
            setData({ ...data, description: e.target.value })
          }
          placeholder=' '
        />
        <Label htmlFor='description'>Complaint Description</Label>
      </div>

      <div className='flex gap-4'>
        <div className='relative'>
          <Input
            id='houseNumber'
            name='houseNumber'
            type='text'
            value={data.houseNumber}
            onChange={(e) => setData({ ...data, houseNumber: e.target.value })}
            placeholder=' '
          />
          <Label htmlFor='houseNumber'>House</Label>
        </div>

        <div className='relative'>
          <Input
            id='streetAddress'
            name='streetAddress'
            type='text'
            value={data.streetAddress}
            onChange={(e) =>
              setData({ ...data, streetAddress: e.target.value })
            }
            placeholder=' '
          />
          <Label htmlFor='streetAddress'>Street</Label>
        </div>

        <div className='relative'>
          <Input
            id='city'
            name='city'
            type='text'
            value={data.city}
            onChange={(e) => setData({ ...data, city: e.target.value })}
            placeholder=' '
          />
          <Label htmlFor='city'>City</Label>
        </div>

        <div className='relative'>
          <Input
            id='state'
            name='state'
            type='text'
            value={data.state}
            onChange={(e) => setData({ ...data, state: e.target.value })}
            placeholder=' '
          />
          <Label htmlFor='state'>State</Label>
        </div>

        <div className='relative'>
          <Input
            id='zipCode'
            name='zipCode'
            type='text'
            value={data.zipCode}
            onChange={(e) => setData({ ...data, zipCode: e.target.value })}
            placeholder=' '
          />
          <Label htmlFor='zipCode'>Zip Code</Label>
        </div>
      </div>

      <Button>Add Complaint</Button>
    </form>
  );
}
