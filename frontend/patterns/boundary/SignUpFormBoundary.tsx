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
  // const [data, setData] = useState<SignUpFormData>({
  //   firstName: '',
  //   lastName: '',
  //   username: '',
  //   email: '',
  //   password: '',
  //   phoneNumber: '',
  //   passportID: '',
  //   houseStreetNumber: '',
  //   city: '',
  //   state: '',
  //   zipCode: '',
  //   role: 'homeowner',
  // });

  const [data, setData] = useState<SignUpFormData>({
    firstName: 'Alice',
    lastName: 'Davis',
    username: 'alicedavis',
    email: 'alice@davis.com',
    password: 'alicedavis',
    phoneNumber: '0812345682',
    passportID: 'D23456789',
    houseStreetNumber: '520 Oak Lane',
    city: 'Santa Clara',
    state: 'CA',
    zipCode: '95050',
    role: 'tenant',
  });

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
