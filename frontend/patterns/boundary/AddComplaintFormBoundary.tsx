import { useState } from 'react';
import ComplaintForm from '@/components/forms/complaint/AddComplaintForm';
import useUser from '@/hooks/useUser';
import { Tenant } from '../entity/Tenant';

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
  description: string;
};

type AddComplaintFormBoundaryProps = {
  tenant?: Tenant;
  addComplaint: (data: ComplaintFormData) => void;
};

export const AddComplaintFormBoundary: React.FC<
  AddComplaintFormBoundaryProps
> = ({ tenant, addComplaint }) => {
  const { user } = useUser();

  const [data, setData] = useState<ComplaintFormData>({
    tenantName: tenant ? tenant.firstName + ' ' + tenant.lastName : '',
    tenantEmail: tenant ? tenant.email : '',
    tenantPhone: tenant ? tenant.phoneNumber : '',
    houseNumber: '13 Rd',
    streetAddress: '789 Maple Dr',
    city: 'Scarsdale',
    state: 'NY',
    zipCode: '10583',
    complaintType: 'Pest Control',
    description: 'There are cockroaches in the apartment kitchen.',
  });

  const handleSubmit = (event: any) => {
    event.preventDefault();
    addComplaint(data); // Passing data to control
  };

  return (
    <ComplaintForm data={data} setData={setData} handleSubmit={handleSubmit} />
  );
};
