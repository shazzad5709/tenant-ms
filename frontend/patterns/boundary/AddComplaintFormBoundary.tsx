import { useState } from 'react';
import ComplaintForm from '@/components/forms/complaint/AddComplaintForm';
import useUser from '@/hooks/useUser';

export type ComplaintFormData = {
  tenantName: string;
  tenantEmail: string;
  tenantPhone: string;
  houseNumber: string;
  streetAddress: string;
  city: string;
  state: string;
  zipCode: string;
  complaintType: string;
  complaintDescription: string;
};

type AddComplaintFormBoundaryProps = {
  addComplaint: (data: ComplaintFormData) => void;
};

export const AddComplaintFormBoundary: React.FC<
  AddComplaintFormBoundaryProps
> = ({ addComplaint }) => {
  const { user } = useUser();

  const [data, setData] = useState<ComplaintFormData>({
    tenantName: '',
    tenantEmail: '',
    tenantPhone: '',
    houseNumber: '',
    streetAddress: '',
    city: '',
    state: '',
    zipCode: '',
    complaintType: '',
    complaintDescription: '',
  });

  const handleSubmit = (event: any) => {
    event.preventDefault();
    addComplaint(data); // Passing data to control
  };

  return (
    <ComplaintForm data={data} setData={setData} handleSubmit={handleSubmit} />
  );
};
