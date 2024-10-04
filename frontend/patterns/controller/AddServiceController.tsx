'use client';
import {
  AddServiceFormBoundary,
  ServiceFormData,
} from '../boundary/AddServiceFormBoundary';
import { useRouter } from 'next/navigation';
import useUser from '@/hooks/useUser';
import { ServiceEntity } from '../entity/Service';

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

  const addServiceClickedEvent = async (data: ServiceFormData) => {
    try {
      setLoading(true);

      console.log(data);

      const res = await ServiceEntity.addService(data);

      alert('Service added successfully');
      router.push('/homeowner/service');
    } catch (error) {
      console.log(error);
      alert('Failed to add service');
    } finally {
      setLoading(false);
    }
  };

  if (user?.role !== 'homeowner') {
    return <div>Unauthorized</div>;
  }

  return <AddServiceFormBoundary addService={addServiceClickedEvent} />;
};
