'use client';
import { useState } from 'react';
import Input from '../../ui/custom/Input';
import { Button } from '../../ui/button';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';

type Props = {};

export default function UpdateServiceForm({}: Props) {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [charge, setCharge] = useState(0);

  const fetchService = async () => {
    // implementation
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log(name, description, charge);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className='flex flex-col gap-4 bg-gray-50 p-16 rounded-lg shadow-2xl'
    >
      <h1 className='text-2xl mb-4'>TMS</h1>
      <Input
        type='text'
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder='Service Name'
      />
      <textarea
        className='p-2 bg-gray-50 border-b border-gray-400'
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        placeholder='Description'
      />
      <div>
        <label htmlFor='charge' className='pl-2 text-xs text-gray-700'>
          Service Charge
        </label>
        <Input
          name='charge'
          type='number'
          value={charge.toString()}
          onChange={(e) => setCharge(Number(e.target.value))}
          placeholder='Charge'
        />
      </div>
      <AlertDialog>
        <AlertDialogTrigger asChild>
          <Button>Update Service</Button>
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are all entry correct?</AlertDialogTitle>
            <AlertDialogDescription>
              Confirm to update service, cancel to make changes.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction>Confirm</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* <Button type='submit' label='Update Service' /> */}
    </form>
  );
}
