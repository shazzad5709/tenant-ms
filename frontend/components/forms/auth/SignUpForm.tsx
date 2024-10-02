'use client';
import Link from 'next/link';
import Input from '../../ui/custom/Input';
import { Button } from '../../ui/button';
import { SignUpFormData } from '@/patterns/boundary/SignUpFormBoundary';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

type Props = {
  data: SignUpFormData;
  setData: (data: SignUpFormData) => void;
  handleSubmit: (event: any) => void;
};

export default function SignUpForm({
  data,
  setData,
  handleSubmit,
}: Readonly<Props>) {
  return (
    <form
      onSubmit={handleSubmit}
      className='flex flex-col gap-4 bg-gray-50 p-16 rounded-lg shadow-2xl'
    >
      <h1 className='text-2xl mb-4'>TMS</h1>

      <div className='flex gap-4'>
        <Input
          required
          type='text'
          value={data.firstName}
          onChange={(e) => setData({ ...data, firstName: e.target.value })}
          placeholder='First Name'
        />
        <Input
          required
          type='text'
          value={data.lastName}
          onChange={(e) => setData({ ...data, lastName: e.target.value })}
          placeholder='Last Name'
        />
      </div>

      <Input
        required
        type='text'
        value={data.username}
        onChange={(e) => setData({ ...data, username: e.target.value })}
        placeholder='Username'
      />

      <Input
        required
        type='email'
        value={data.email}
        onChange={(e) => {
          setData({ ...data, email: e.target.value });
        }}
        placeholder='Email'
      />

      <Input
        required
        type='password'
        value={data.password}
        onChange={(e) => setData({ ...data, password: e.target.value })}
        placeholder='Password'
      />

      <div className='flex gap-4'>
        <Input
          required
          type='text'
          value={data.phoneNumber}
          onChange={(e) => setData({ ...data, phoneNumber: e.target.value })}
          placeholder='Phone Number'
        />
        <Input
          required
          type='text'
          value={data.passportID}
          onChange={(e) => setData({ ...data, passportID: e.target.value })}
          placeholder='Passport ID'
        />
      </div>

      <div className='flex gap-4'>
        <Input
          required
          type='text'
          value={data.houseStreetNumber}
          onChange={(e) =>
            setData({ ...data, houseStreetNumber: e.target.value })
          }
          placeholder='House and Street Number'
        />
        <Input
          required
          type='text'
          value={data.zipCode}
          onChange={(e) => setData({ ...data, zipCode: e.target.value })}
          placeholder='Zip Code'
        />
      </div>
      <div className='flex gap-4'>
        <Input
          required
          type='text'
          value={data.city}
          onChange={(e) => setData({ ...data, city: e.target.value })}
          placeholder='City'
        />
        <Input
          required
          type='text'
          value={data.state}
          onChange={(e) => setData({ ...data, state: e.target.value })}
          placeholder='State'
        />
      </div>

      <Select
        onValueChange={(e) => {
          console.log('Role changed to:', e); // Add this for debugging
          setData({ ...data, role: e });
        }}
        value={data.role}
        defaultValue={data.role}
      >
        <SelectTrigger className='w-[180px]'>
          <SelectValue placeholder='Role' />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectItem value='homeowner'>Homeowner</SelectItem>
            <SelectItem value='tenant'>Tenant</SelectItem>\{' '}
          </SelectGroup>
        </SelectContent>
      </Select>

      <Button onClick={handleSubmit}>Sign Up</Button>
      <span>
        Already have an account?
        <Link href={'/login'} className='text-green-700'>
          {' '}
          Sign In!
        </Link>
      </span>
    </form>
  );
}
