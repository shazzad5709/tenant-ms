'use client';
import Link from 'next/link';
import { Input } from '../../ui/input';
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
import { Label } from '@/components/ui/label';

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
      className='flex flex-col p-16 gap-4 rounded-lg'
    >
      <h1 className='text-2xl mb-4'>Sign up to TMS</h1>

      <div className='flex gap-4'>
        <div className='relative w-full'>
          <Input
            required
            name='firstName'
            id='firstName'
            type='text'
            value={data.firstName}
            onChange={(e) => setData({ ...data, firstName: e.target.value })}
            placeholder=' '
          />
          <Label htmlFor='firstName'>First Name</Label>
        </div>

        <div className='relative w-full'>
          <Input
            required
            name='lastName'
            id='lastName'
            type='text'
            value={data.lastName}
            onChange={(e) => setData({ ...data, lastName: e.target.value })}
            placeholder=' '
          />
          <Label htmlFor='lastName'>Last Name</Label>
        </div>
      </div>

      <div className='relative w-full'>
        <Input
          required
          name='username'
          id='username'
          type='text'
          value={data.username}
          onChange={(e) => setData({ ...data, username: e.target.value })}
          placeholder=' '
        />
        <Label htmlFor='username'>Username</Label>
      </div>

      <div className='relative'>
        <Input
          required
          name='email'
          id='email'
          type='email'
          value={data.email}
          onChange={(e) => {
            setData({ ...data, email: e.target.value });
          }}
          placeholder=' '
        />

        <Label htmlFor='email'>Email</Label>
      </div>

      <div className='relative'>
        <Input
          name='password'
          id='password'
          required
          type='password'
          value={data.password}
          onChange={(e) => setData({ ...data, password: e.target.value })}
          placeholder=' '
        />

        <Label htmlFor='password'>Password</Label>
      </div>

      <div className='flex gap-4'>
        <div className='relative w-full'>
          <Input
            required
            name='phoneNumber'
            id='phoneNumber'
            type='text'
            value={data.phoneNumber}
            onChange={(e) => setData({ ...data, phoneNumber: e.target.value })}
            placeholder=' '
          />
          <Label htmlFor='phoneNumber'>Phone Number</Label>
        </div>

        <div className='relative w-full'>
          <Input
            required
            name='passportID'
            id='passportID'
            type='text'
            value={data.passportID}
            onChange={(e) => setData({ ...data, passportID: e.target.value })}
            placeholder=' '
          />
          <Label htmlFor='passportID'>Passport ID</Label>
        </div>
      </div>

      <div className='flex gap-4'>
        <div className='relative w-full'>
          <Input
            required
            name='houseStreetNumber'
            id='houseStreetNumber'
            type='text'
            value={data.houseStreetNumber}
            onChange={(e) =>
              setData({ ...data, houseStreetNumber: e.target.value })
            }
            placeholder=' '
          />

          <Label htmlFor='houseStreetNumber'>Address</Label>
        </div>

        <div className='relative w-full'>
          <Input
            required
            name='zipCode'
            id='zipCode'
            type='text'
            value={data.zipCode}
            onChange={(e) => setData({ ...data, zipCode: e.target.value })}
            placeholder=' '
          />

          <Label htmlFor='zipCode'>Zip Code</Label>
        </div>
      </div>

      <div className='flex gap-4'>
        <div className='relative w-full'>
          <Input
            required
            name='city'
            id='city'
            type='text'
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
            value={data.state}
            onChange={(e) => setData({ ...data, state: e.target.value })}
            placeholder=' '
          />

          <Label htmlFor='state'>State</Label>
        </div>
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
            <SelectItem value='tenant'>Tenant</SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>

      <Button onClick={handleSubmit}>Sign Up</Button>
      <span>
        Already have an account?{' '}
        <Link href={'/login'} className='underline hover:text-indigo-700'>
          Sign In!
        </Link>
      </span>
    </form>
  );
}
