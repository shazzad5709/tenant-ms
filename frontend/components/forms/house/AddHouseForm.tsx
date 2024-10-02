'use client';
import { Input } from '../../ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '../../ui/button';
import { HouseFormData } from '@/patterns/boundary/AddHouseFormBoundary';

type Props = {
  data: HouseFormData;
  setData: React.Dispatch<React.SetStateAction<HouseFormData>>;
  handleSubmit: (e: React.FormEvent) => void;
  label: string;
};

export default function HouseForm({
  data,
  setData,
  handleSubmit,
  label,
}: Readonly<Props>) {
  return (
    <form
      onSubmit={handleSubmit}
      className='flex flex-col gap-4 p-16 lg:px-48 rounded-lg'
    >
      <h1 className='text-2xl'>
        Owner: <span className='font-bold'>{data.owner}</span>
      </h1>
      <p className='text-gray-700'>
        Provide the following information for your house
      </p>

      <div className='relative'>
        <Input
          id='address'
          name='address'
          type='text'
          value={data.address}
          onChange={(e) => setData({ ...data, address: e.target.value })}
          placeholder=' '
        />
        <Label htmlFor='address'>Address</Label>
      </div>

      <div className='flex gap-2 lg:gap-8'>
        <div className='relative w-full'>
          <Input
            type='text'
            id='city'
            name='city'
            value={data.city}
            onChange={(e) => setData({ ...data, city: e.target.value })}
            placeholder=' '
          />
          <Label htmlFor='city'>City</Label>
        </div>

        <div className='relative w-full'>
          <Input
            type='text'
            id='state'
            name='state'
            value={data.state}
            onChange={(e) => setData({ ...data, state: e.target.value })}
            placeholder=' '
          />
          <Label htmlFor='state'>State</Label>
        </div>

        <div className='relative w-full'>
          <Input
            type='text'
            id='zipCode'
            name='zipCode'
            value={data.zipCode}
            onChange={(e) => setData({ ...data, zipCode: e.target.value })}
            placeholder=' '
          />
          <Label htmlFor='zipCode'>Zip Code</Label>
        </div>
      </div>

      <div className='relative'>
        <Input
          type='text'
          id='type'
          name='type'
          value={data.type}
          onChange={(e) => setData({ ...data, type: e.target.value })}
          placeholder=' '
        />
        <Label htmlFor='type'>Type</Label>
      </div>

      <div className='flex gap-2 lg:gap-8'>
        <div className='relative w-full'>
          <Input
            type='number'
            id='floorspace'
            name='addfloorspaceress'
            value={data.floorspace.toString()}
            onChange={(e) =>
              setData({ ...data, floorspace: e.target.valueAsNumber })
            }
            placeholder=' '
          />
          <Label htmlFor='floorspace'>Floorspace</Label>
        </div>

        <div className='relative w-full'>
          <Input
            type='number'
            id='beds'
            name='beds'
            value={data.beds.toString()}
            onChange={(e) => setData({ ...data, beds: e.target.valueAsNumber })}
            placeholder=' '
          />
          <Label htmlFor='beds'>Beds</Label>
        </div>

        <div className='relative w-full'>
          <Input
            type='number'
            id='baths'
            name='baths'
            value={data.baths.toString()}
            onChange={(e) =>
              setData({ ...data, baths: e.target.valueAsNumber })
            }
            placeholder=' '
          />
          <Label htmlFor='baths'>Baths</Label>
        </div>

        <div className='relative w-full'>
          <Input
            type='number'
            id='parking'
            name='parking'
            value={data.parking.toString()}
            onChange={(e) =>
              setData({ ...data, parking: e.target.valueAsNumber })
            }
            placeholder=' '
          />
          <Label htmlFor='parking'>Parking</Label>
        </div>
      </div>

      <div className='relative'>
        <Input
          type='text'
          id='phoneNumber'
          name='phoneNumber'
          value={data.phoneNumber}
          onChange={(e) => setData({ ...data, phoneNumber: e.target.value })}
          placeholder=' '
        />
        <Label htmlFor='phoneNumber'>Contact Info</Label>
      </div>

      <div className='relative'>
        <Input
          name='charge'
          type='number'
          id='charge'
          value={data.price.toString()}
          onChange={(e) => setData({ ...data, price: e.target.valueAsNumber })}
          placeholder=' '
        />
        <Label htmlFor='charge'>Price</Label>
      </div>

      <div className='flex justify-end'>
        <Button>{label}</Button>
      </div>
    </form>
  );
}
