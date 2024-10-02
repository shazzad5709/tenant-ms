import { useState } from 'react';
import ServiceForm from '@/components/forms/service/AddServiceForm';
import useUser from '@/hooks/useUser';

export type ServiceFormData = {
  serviceName: string;
  description: string;
  charge: number;
  serviceCategory: string;
  serviceProviderName: string;
  serviceProviderEmail: string;
  serviceProviderPhone: string;
  apartmentNumber: string;
  streetAddress: string;
  city: string;
  state: string;
  zipCode: string;
  houseOwnerName: string;
  houseOwnerId: string;
};

type AddServiceFormBoundaryProps = {
  addService: (data: ServiceFormData) => void;
};

export const AddServiceFormBoundary: React.FC<AddServiceFormBoundaryProps> = ({
  addService,
}) => {
  const { user } = useUser();

  const [data, setData] = useState<ServiceFormData>({
    serviceName: '',
    description: '',
    charge: 0,
    serviceCategory: '',
    serviceProviderName: '',
    serviceProviderEmail: '',
    serviceProviderPhone: '',
    apartmentNumber: '',
    streetAddress: '',
    city: '',
    state: '',
    zipCode: '',
    houseOwnerId: user.id,
    houseOwnerName: user.name,
  });

  const handleSubmit = (event: any) => {
    event.preventDefault();
    addService(data); // Passing data to control
  };

  return (
    <ServiceForm
      data={data}
      setData={setData}
      handleSubmit={handleSubmit}
      label='Add Service'
    />
  );
};
