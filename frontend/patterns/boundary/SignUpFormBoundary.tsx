import SignUpForm from '@/components/forms/auth/SignUpForm';
import { useEffect, useState } from 'react';

export type SignUpFormData = {
  firstName: string;
  lastName: string;
  username: string;
  email: string;
  password: string;
  phoneNumber: string;
  passportID: string;
  houseStreetNumber: string;
  city: string;
  state: string;
  zipCode: string;
  role: string;
};

type SignUpFormBoundaryProps = {
  signUp: (data: SignUpFormData) => void;
};

export const SignUpFormBoundary: React.FC<SignUpFormBoundaryProps> = ({
  signUp,
}) => {
  const [data, setData] = useState<SignUpFormData>({
    firstName: '',
    lastName: '',
    username: '',
    email: '',
    password: '',
    phoneNumber: '',
    passportID: '',
    houseStreetNumber: '',
    city: '',
    state: '',
    zipCode: '',
    role: 'homeowner',
  });

  // mock data
  // const [data, setData] = useState<SignUpFormData>({
  //   firstName: 'John',
  //   lastName: 'Doe',
  //   username: 'johndoe',
  //   email: 'john@doe.com',
  //   password: 'johndoe',
  //   phoneNumber: '0812345679',
  //   passportID: 'A12345678',
  //   houseStreetNumber: '1674 Rocky Mountain Ave',
  //   city: 'Milpitas',
  //   state: 'CA',
  //   zipCode: '95035',
  //   role: 'Homeowner',
  // });

  // useEffect(() => {
  //   console.log('Current data state:', data);
  // }, [data]);

  const handleSubmit = (event: any) => {
    event.preventDefault();
    signUp(data); // Passing data to control
  };

  return (
    <SignUpForm data={data} setData={setData} handleSubmit={handleSubmit} />
  );
};
