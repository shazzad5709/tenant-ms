'use client';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { UpdateServiceFormBoundary } from '../boundary/UpdateServiceFormBoundary';
import { ServiceFormData } from '../boundary/AddServiceFormBoundary';
import useUser from '@/hooks/useUser';
import { ServiceEntity } from '../entity/Service';
import { InfinitySpin } from 'react-loader-spinner';

type Props = {
  serviceId: string;
};

export const UpdateServiceController: React.FC<Props> = ({ serviceId }) => {
  const { user } = useUser();
  const router = useRouter();
  const [service, setService] = useState<ServiceFormData>();
  const [loading, setLoading] = useState(false);

  const fetchService = async (ServiceId: string) => {
    try {
      const res = await ServiceEntity.getService(ServiceId);
      const service = res;
      setService(service);
    } catch (error) {
      console.log(error);
      alert('Failed to fetch service');
    }
  };

  // On component mount
  useEffect(() => {
    fetchService(serviceId);
  }, []);

  const updateServiceClickedEvent = async (data: ServiceFormData) => {
    try {
      const res = await ServiceEntity.updateService(serviceId, data);
      alert(res);
      router.push('/homeowner/service');
    } catch (error) {
      console.log(error);
    }
  };

  if (user?.role !== 'homeowner') {
    return <div>Unauthorized</div>;
  }

  if (loading) {
    return (
      <div className='h-full flex items-center justify-center'>
        <InfinitySpin color='#000' />
      </div>
    );
  }

  if (!service) {
    return <div>Service not found</div>;
  }

  return (
    <UpdateServiceFormBoundary
      service={service}
      updateService={updateServiceClickedEvent}
    />
  );
};
