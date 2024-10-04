'use client';
import { User } from '@/context/UserContext';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { ServiceEntity, Service } from '../entity/Service';
import ServiceList from '@/components/interface/ServiceList';
import { Tenant, TenantEntity } from '../entity/Tenant';

type Props = {
  user: User | null;
};

export const ServiceListingController: React.FC<Props> = ({ user }) => {
  const router = useRouter();
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(false);
  const [tenantInfo, setTenantInfo] = useState<Tenant>();

  const fetchAllServices = async () => {
    if (!user?.id) return; // Only fetch when user is available

    try {
      setLoading(true);
      const res = await ServiceEntity.getServicesByTenant(user.id);
      setServices(res);
    } catch (error) {
      console.log(error);
      alert('Failed to fetch services');
    } finally {
      setLoading(false);
    }
  };

  const fetchTenantInfo = async () => {
    if (!user?.id) return; // Only fetch when user is available

    try {
      setLoading(true); // Start loading
      console.log(user.id);
      const res = await TenantEntity.getTenantById(user.id);
      console.log(res);
      setTenantInfo(res);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false); // End loading
    }
  };

  // On component mount
  useEffect(() => {
    if (user) {
      fetchTenantInfo();
    }
  }, [user]);

  useEffect(() => {
    if (tenantInfo?.houseId) {
      fetchAllServices();
    }
  }, [tenantInfo]);

  const orderService = (ServiceId: string) => {
    router.push(`/tenant/service/${ServiceId}`);
  };

  if (user?.role !== 'tenant') {
    return <div>Unauthorized</div>;
  }

  if (!tenantInfo?.houseId) {
    return <div className='text-center text-3xl'>Not in a house</div>;
  }

  return (
    <ServiceList
      services={services}
      role='tenant'
      orderService={orderService}
    />
  );
};
