'use client';
import React from 'react';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '../ui/button';
import { useRouter } from 'next/navigation';

type House = {
  id: string;
  address: string;
  city: string;
  state: string;
  zipCode: string;
  image: string;
  type: string;
  floorspace: number;
  beds: number;
  baths: number;
  price: number;
  owner: string;
  ownerId: string;
  parking: number;
  phoneNumber: string;
};

type Props = {
  houses: House[];
  role: string;
  onEditClicked?: (houseId: string) => void;
  onDeleteClicked?: (houseId: string) => void;
  onOfferClicked?: (houseId: string) => void;
};

const HouseList = ({
  houses,
  role,
  onEditClicked,
  onDeleteClicked,
  onOfferClicked,
}: Props) => {
  const router = useRouter();

  return (
    <div className='flex flex-col space-y-8 p-8'>
      <h1 className='text-3xl font-semibold'>Listings</h1>
      <div className='grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4'>
        {houses?.map((house) => (
          <Card key={house.id}>
            <CardHeader>
              {/* <img src={house.image} alt={house.id} /> */}
              <CardTitle className='pt-4'>
                {house.address}, {house.city}, {house.state}, {house.zipCode}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className='text-sm'>
                <span className='font-semibold'>Type: </span>
                {house.type}
              </p>
              <p className='text-sm'>
                <span className='font-semibold'>Floorspace: </span>
                {house.floorspace}
              </p>
              <p className='text-sm'>
                <span className='font-semibold'>Beds: </span>
                {house.beds}
              </p>
              <p className='text-sm'>
                <span className='font-semibold'>Baths: </span>
                {house.baths}
              </p>
              <p className='text-sm'>
                <span className='font-semibold'>Parking: </span>
                {house.parking}
              </p>
              <p className='pt-2 font-semibold text-lg'>
                Price: {'$' + house.price.toLocaleString('en-US')}
              </p>
              <p className='pt-2 text-lg'>
                <span className='font-semibold'>Owner: </span>
                {house.owner}, {house.phoneNumber}
              </p>
            </CardContent>
            {role === 'tenant' && (
              <CardFooter className='justify-end'>
                <Button
                  variant='outline'
                  className='text-green-600 hover:text-green-600 font-semibold'
                >
                  Apply
                </Button>
              </CardFooter>
            )}
            {role === 'homeowner' && onDeleteClicked && onEditClicked && (
              <CardFooter className='justify-between'>
                <Button
                  onClick={() => onDeleteClicked(house.id)} // Pass house id
                  variant='outline'
                  className='text-red-600 hover:text-red-600 font-semibold'
                >
                  Remove
                </Button>
                <Button
                  onClick={() => onEditClicked(house.id)} // Pass house id
                  variant='outline'
                  className='font-semibold'
                >
                  Edit
                </Button>
              </CardFooter>
            )}
          </Card>
        ))}
      </div>
    </div>
  );
};

export default HouseList;
