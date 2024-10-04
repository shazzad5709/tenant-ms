'use client';
import ServiceList from '@/components/interface/ServiceList';
import { User } from '@/context/UserContext';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { ServiceEntity, Service } from '../entity/Service';

type Props = {
  user: User | null;
};

export default function ServiceManagementController({ user }: Readonly<Props>) {
  const router = useRouter();

  const [loading, setLoading] = useState(false);
  const [services, setServices] = useState<Service[]>([]);

  const fetchAllServices = async () => {
    if (!user?.id) return; // Only fetch when user is available

    try {
      setLoading(true); // Start loading
      const id = user?.id;
      const res = await ServiceEntity.getServicesByOwner(id);
      setServices(res);
    } catch (error) {
      console.log(error);
      alert('Failed to fetch services');
    } finally {
      setLoading(false); // End loading
    }
  };

  const onEditClickedEvent = (serviceId: string) => {
    router.push(`/homeowner/service/update?id=${serviceId}`);
  };

  const onDeleteClickedEvent = async (serviceId: string) => {
    try {
      setLoading(true); // Start loading
      const res = await ServiceEntity.deleteService(serviceId);
      alert(res);
      fetchAllServices();
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false); // End loading
    }
  };

  // On component mount
  useEffect(() => {
    if (user) {
      fetchAllServices();
    }
  }, [user]);

  return (
    <div>
      <ServiceList
        services={services}
        role='homeowner'
        onEditClicked={onEditClickedEvent}
        onDeleteClicked={onDeleteClickedEvent}
      />
    </div>
  );
}
