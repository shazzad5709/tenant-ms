import SignInForm from '@/components/forms/auth/SignInForm';
import { useState } from 'react';

// user input data type declaration
export type SignInFormData = {
  email: string;
  password: string;
};

// information about control method
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

  // current data and how to capture data from input change
  const [data, setData] = useState<SignInFormData>({
    email: 'robert@johnson.com',
    password: 'robertjohnson',
  });

  const handleSubmit = (event: any) => {
    event.preventDefault();
    signIn(data); // Passing data to control
  };

  return (
    <SignInForm data={data} setData={setData} handleSubmit={handleSubmit} />
  );
};
