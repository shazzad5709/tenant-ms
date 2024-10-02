'use client';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { UpdateServiceFormBoundary } from '../boundary/UpdateServiceFormBoundary';
import { ServiceFormData } from '../boundary/AddServiceFormBoundary';
import useUser from '@/hooks/useUser';
import ServiceEntity from '../entity/Service';
import { InfinitySpin } from 'react-loader-spinner';

type Props = {
  serviceId: string;
};

export const UpdateServiceController: React.FC<Props> = ({ serviceId }) => {
  const [error, setError] = useState<string>('');
  const { user } = useUser();
  const router = useRouter();
  const [service, setService] = useState<ServiceFormData>();

  const fetchService = async (ServiceId: string) => {
    try {
      const res = await ServiceEntity.getService(ServiceId);
      if ('status' in res && res.status === 200) {
        const service = res.data as ServiceFormData;
        setService(service);
      } else if (res instanceof Error) {
        setError(res.message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  // On component mount
  useEffect(() => {
    fetchService(serviceId);
  }, []);

  const updateServiceClickedEvent = (data: ServiceFormData) => {
    try {
      const res = ServiceEntity.updateService(serviceId, data);
      if ('status' in res && res.status === 200) {
        alert('Service updated successfully');
        router.push('/homeowner/service');
      } else if (res instanceof Error) {
        alert('Failed to update service');
      }
    } catch (error) {
      console.log(error);
    }
  };

  if (user?.role !== 'Homeowner') {
    return <div>Unauthorized</div>;
  }

  if (!service)
    return (
      <div className='absolute inset-0 bg-white h-screen flex items-center justify-center text-xl'>
        <InfinitySpin color='black' />
      </div>
    );

  return (
    <UpdateServiceFormBoundary
      service={service}
      updateService={updateServiceClickedEvent}
    />
  );
};
