import { useState } from 'react';
import BillForm from '@/components/forms/bill/AddBillForm';
import useUser from '@/hooks/useUser';

export type BillFormData = {
  issuer: string;
  issuedTo: string;
  description: string;
  issuerId: string;
  issuedToId: string;
  billDate: Date | null;
  dueDate: Date | null;
  amount: number;
  status: string;
  paymentDate: Date | null;
  billingPeriodFrom: Date | null;
  billingPeriodTo: Date | null;
};

type AddBillFormBoundaryProps = {
  addBill: (data: BillFormData) => void;
};

export const AddBillFormBoundary: React.FC<AddBillFormBoundaryProps> = ({
  addBill,
}) => {
  const { user } = useUser();

  const [data, setData] = useState<BillFormData>({
    issuer: user ? user.name : '',
    issuedTo: '',
    billDate: null,
    dueDate: null,
    amount: 0,
    status: 'pending',
    paymentDate: null,
    billingPeriodFrom: null,
    billingPeriodTo: null,
    description: '',
    issuerId: user ? user.id : '',
    issuedToId: '',
  });

  const handleSubmit = (event: any) => {
    event.preventDefault();
    addBill(data); // Passing data to control
  };

  return (
    <BillForm
      data={data}
      setData={setData}
      handleSubmit={handleSubmit}
      label='Create Bill'
    />
  );
};
