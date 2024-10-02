'use client';
import {
  AddServiceFormBoundary,
  ServiceFormData,
} from '../boundary/AddServiceFormBoundary';
import { useRouter } from 'next/navigation';
import useUser from '@/hooks/useUser';
import ServiceEntity from '../entity/Service';

type Props = {
  loading: boolean;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
};

export const AddServiceController: React.FC<Props> = ({
  loading,
  setLoading,
}) => {
  const { user, updateUser } = useUser();
  const router = useRouter();

  const addServiceClickedEvent = (data: ServiceFormData) => {
    try {
      setLoading(true);

      const res = ServiceEntity.addService(data);

      if ('status' in res && res.status === 200) {
        alert('Service added successfully');
        router.push('/homeowner/service');
      } else if (res instanceof Error) {
        alert('Failed to add service');
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  if (user?.role !== 'Homeowner') {
    return <div>Unauthorized</div>;
  }

  return <AddServiceFormBoundary addService={addServiceClickedEvent} />;
};
