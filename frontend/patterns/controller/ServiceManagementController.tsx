'use client';
import ServiceList from '@/components/interface/HouseList';
import { User } from '@/context/UserContext';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import ServiceEntity, { Service } from '../entity/Service';

type Props = {
  user: User | null;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function ServiceManagementController({
  user,
  setLoading,
}: Readonly<Props>) {
  const router = useRouter();

  const [services, setServices] = useState<Service[]>([]);

  const fetchAllServices = async () => {
    if (!user?.id) return; // Only fetch when user is available

    try {
      setLoading(true); // Start loading
      const id = user?.id;
      const res = await ServiceEntity.getServicesByOwner(id);
      if ('status' in res && res.status === 200) {
        setServices(res.data);
      } else if (res instanceof Error) {
        alert('Failed to fetch services');
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false); // End loading
    }
  };

  const onEditClickedEvent = (serviceId: string) => {
    router.push(`/homeowner/service/update?id=${serviceId}`);
  };

  const onDeleteClickedEvent = (serviceId: string) => {
    try {
      setLoading(true); // Start loading
      const res = ServiceEntity.deleteService(serviceId);
      if ('status' in res && res.status === 200) {
        alert('Service deleted successfully');
        fetchAllServices();
      } else if (res instanceof Error) {
        alert(res.message);
      }
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
