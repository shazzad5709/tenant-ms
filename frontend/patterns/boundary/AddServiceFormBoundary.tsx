import { useEffect, useState } from 'react';
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
  houseNumber: string;
  streetAddress: string;
  city: string;
  state: string;
  zipCode: string;
  houseOwnerName: string;
  houseOwnerId: string;
  houseId: string;
};

type AddServiceFormBoundaryProps = {
  addService: (data: ServiceFormData) => void;
};

export const AddServiceFormBoundary: React.FC<AddServiceFormBoundaryProps> = ({
  addService,
}) => {
  const { user } = useUser();

  const [data, setData] = useState<ServiceFormData>({
    serviceName: 'Electrical Maintenance',
    description: 'Inspecting and fixing electrical wiring and outlets.',
    charge: 200,
    serviceCategory: 'Electrical',
    serviceProviderName: 'Jane Doe',
    serviceProviderEmail: 'jane.doe@electricsolutions.com',
    serviceProviderPhone: '555-987-6543',
    houseNumber: '202B',
    streetAddress: '456 Elm St',
    city: 'San Jose',
    state: 'CA',
    zipCode: '95112',
    houseOwnerId: '',
    houseOwnerName: '',
    houseId: '670023b90f10e70b93b6c861',
  });

  const handleSubmit = (event: any) => {
    event.preventDefault();
    addService(data); // Passing data to control
  };

  useEffect(() => {
    if (user) {
      setData({
        ...data,
        houseOwnerId: user.id,
        houseOwnerName: user.name,
      });
    }
  }, [user]);

  return (
    <ServiceForm
      data={data}
      setData={setData}
      handleSubmit={handleSubmit}
      label='Add Service'
    />
  );
};
