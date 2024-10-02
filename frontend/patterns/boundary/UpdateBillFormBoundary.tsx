import { useState } from 'react';

import BillForm from '@/components/forms/bill/AddBillForm';
import { BillFormData } from './AddBillFormBoundary';

type UpdateBillFormBoundaryProps = {
  bill: BillFormData;
  updateBill: (data: BillFormData) => void;
};

export const UpdateBillFormBoundary: React.FC<UpdateBillFormBoundaryProps> = ({
  bill,
  updateBill,
}) => {
  const [data, setData] = useState<BillFormData>({ ...bill });

  const handleSubmit = (event: any) => {
    event.preventDefault();
    updateBill(data); // Passing data to control
  };

  return (
    <BillForm
      data={data}
      setData={setData}
      handleSubmit={handleSubmit}
      label='Update Bill'
    />
  );
};
