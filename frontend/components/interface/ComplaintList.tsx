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
import { Complaint } from '@/patterns/entity/Complaint';

type Props = {
  complaints: Complaint[];
  owner?: string;
  role: string;
  onMarkAsResolvedClicked?: (complaintId: string) => void;
  // onEditClicked?: (complaintId: string) => void;
  onDeleteClicked?: (complaintId: string) => void;
};

const ComplaintList = ({
  complaints,
  owner,
  role,
  onMarkAsResolvedClicked,
  // onEditClicked,
  onDeleteClicked,
}: Props) => {
  const router = useRouter();

  return (
    <div className='flex flex-col space-y-8 p-8'>
      <h1 className='text-3xl font-semibold'>Complaints</h1>
      <div className='grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4'>
        {complaints?.map((complaint) => (
          <Card key={complaint.id}>
            <CardHeader>
              <CardTitle className='pt-4'>{complaint.complaintType}</CardTitle>
              <CardDescription className='text-black text-base'>
                {complaint.description}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className='space-y-1'>
                <h1 className='text-lg font-semibold'>Tenant Info</h1>
                <p className='text-sm'>
                  <span className='font-semibold'>{complaint.tenantName}</span>
                </p>
                <p className='text-sm'>
                  <span className='font-semibold'>Email: </span>
                  {complaint.tenantEmail}
                </p>
                <p className='text-sm'>
                  <span className='font-semibold'>Contact Info: </span>
                  {complaint.tenantPhone}
                </p>
              </div>

              <div className='space-y-1 pt-4'>
                <h1 className='text-lg font-semibold mt-2'>House Info</h1>

                <p className='text-sm'>
                  <span className='font-semibold'>Address: </span>
                  {complaint.houseNumber}, {complaint.streetAddress},{' '}
                  {complaint.city}, {complaint.state}, {complaint.zipCode}
                </p>
                <p className='text-sm'>
                  <span className='font-semibold'>Status: </span>
                  {complaint.status.toUpperCase()}
                </p>
              </div>
            </CardContent>
            {role === 'homeowner' && onMarkAsResolvedClicked && (
              <CardFooter className='justify-end'>
                <Button
                  disabled={complaint.status.toLowerCase() === 'resolved'}
                  onClick={() => onMarkAsResolvedClicked(complaint.id)} // Pass house id
                  variant='outline'
                  className='text-green-600 hover:text-green-600 font-semibold'
                >
                  Mark as Resolved
                </Button>
              </CardFooter>
            )}
            {role === 'tenant' && onDeleteClicked && (
              <CardFooter className='justify-between'>
                <Button
                  onClick={() => onDeleteClicked(complaint.id)} // Pass house id
                  variant='outline'
                  className='text-red-600 hover:text-red-600 font-semibold'
                >
                  Remove
                </Button>
                {/* <Button
                  onClick={() => onEditClicked(complaint.id)} // Pass house id
                  variant='outline'
                  className='font-semibold'
                >
                  Edit
                </Button> */}
              </CardFooter>
            )}
          </Card>
        ))}
      </div>
    </div>
  );
};

export default ComplaintList;
