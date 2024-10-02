import SignInForm from '@/components/forms/auth/SignInForm';
import { useState } from 'react';

export type SignInFormData = {
  email: string;
  password: string;
};

type SignInFormBoundaryProps = {
  signIn: (data: SignInFormData) => void;
};

export const SignInFormBoundary: React.FC<SignInFormBoundaryProps> = ({
  signIn,
}) => {
  // const [data, setData] = useState<SignInFormData>({
  //   email: '',
  //   password: '',
  // });

  // mock data
  const [data, setData] = useState<SignInFormData>({
    email: 'john@doe.com',
    password: 'johndoe',
  });

  const handleSubmit = (event: any) => {
    event.preventDefault();
    signIn(data); // Passing data to control
  };

  return (
    <SignInForm data={data} setData={setData} handleSubmit={handleSubmit} />
  );
};
