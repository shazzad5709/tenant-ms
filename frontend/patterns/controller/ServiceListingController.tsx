'use client';
import { User } from '@/context/UserContext';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import ServiceEntity, { Service } from '../entity/Service';
import ServiceList from '@/components/interface/HouseList';

type Props = {
  user: User | null;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
};

export const ServiceListingController: React.FC<Props> = ({
  user,
  setLoading,
}) => {
  const router = useRouter();
  const [services, setServices] = useState<Service[]>([]);

  const fetchAllServices = async () => {
    if (!user?.id) return; // Only fetch when user is available

    try {
      setLoading(true);
      const res = await ServiceEntity.getServicesByTenant(user.id);
      if ('status' in res && res.status === 200) {
        setServices(res.data);
      } else if (res instanceof Error) {
        alert('Failed to fetch services');
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  // On component mount
  useEffect(() => {
    if (user) {
      fetchAllServices();
    }
  }, [user]);

  const orderService = (ServiceId: string) => {
    router.push(`/tenant/service/${ServiceId}`);
  };

  if (user?.role !== 'Tenant') {
    return <div>Unauthorized</div>;
  }

  return (
    <ServiceList
      services={services}
      role='tenant'
      orderService={orderService}
    />
  );
};
