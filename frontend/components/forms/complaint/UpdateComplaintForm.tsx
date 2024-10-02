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

export default function UpdateComplaintForm({}: Props) {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');

  const fetchComplaints = async () => {
    // implementation
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log(name, description);
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

      <AlertDialog>
        <AlertDialogTrigger asChild>
          <Button>Update Service</Button>
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are all entry correct?</AlertDialogTitle>
            <AlertDialogDescription>
              Confirm to update complaint, cancel to make changes.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction>Confirm</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </form>
  );
}
