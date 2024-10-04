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
import { useRouter } from 'next/navigation';
import { Service } from '@/patterns/entity/Service';

type Props = {
  services: Service[];
  role: string;
  onEditClicked?: (serviceId: string) => void;
  onDeleteClicked?: (serviceId: string) => void;
  orderService?: (serviceId: string) => void;
};

const ServiceList = ({
  services,
  role,
  onEditClicked,
  onDeleteClicked,
  orderService,
}: Props) => {
  const router = useRouter();

  return (
    <div className='flex flex-col space-y-8 p-8'>
      <h1 className='text-3xl font-semibold'>Services</h1>
      <div className='grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4'>
        {services?.map((service) => (
          <Card key={service.id}>
            <CardHeader>
              <CardTitle className='pt-4'>{service.serviceName}</CardTitle>
              <CardDescription className='text-black text-base'>
                {service.description}
              </CardDescription>
              <CardDescription>{service.serviceCategory}</CardDescription>
              <p className='pt-2 font-semibold text-lg'>
                Charge: {'$' + service.charge.toLocaleString('en-US')}
              </p>
            </CardHeader>
            <CardContent>
              <div className='space-y-1'>
                <h1 className='text-lg font-semibold'>Service Provider Info</h1>
                <p className='text-sm'>
                  <span className='font-semibold'>
                    {service.serviceProviderName}
                  </span>
                </p>
                <p className='text-sm'>
                  <span className='font-semibold'>Email: </span>
                  {service.serviceProviderEmail}
                </p>
                <p className='text-sm'>
                  <span className='font-semibold'>Contact Info: </span>
                  {service.serviceProviderPhone}
                </p>
              </div>

              <div className='space-y-1 pt-4'>
                <h1 className='text-lg font-semibold mt-2'>House Info</h1>

                <p className='text-sm'>
                  <span className='font-semibold'>Address: </span>
                  {service.houseNumber}, {service.streetAddress},{service.city},{' '}
                  {service.state}, {service.zipCode}
                </p>
                <p className='text-sm'>
                  <span className='font-semibold'>Owned By: </span>
                  {service.houseOwnerName}
                </p>
              </div>
            </CardContent>
            {role === 'tenant' && (
              <CardFooter className='justify-end'>
                <Button
                  onClick={() => orderService && orderService(service.id)}
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
                  onClick={() => onDeleteClicked(service.id)} // Pass house id
                  variant='outline'
                  className='text-red-600 hover:text-red-600 font-semibold'
                >
                  Remove
                </Button>
                <Button
                  onClick={() => onEditClicked(service.id)} // Pass house id
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

export default ServiceList;
