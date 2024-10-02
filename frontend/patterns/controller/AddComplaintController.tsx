'use client';
import {
  AddComplaintFormBoundary,
  ComplaintFormData,
} from '../boundary/AddComplaintFormBoundary';
import { useRouter } from 'next/navigation';
import ComplaintEntity from '../entity/Complaint';
import useUser from '@/hooks/useUser';

type Props = {
  loading: boolean;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
};

export const AddComplaintController: React.FC<Props> = ({
  loading,
  setLoading,
}) => {
  const { user, updateUser } = useUser();
  const router = useRouter();

  const addComplaintClickedEvent = (data: ComplaintFormData) => {
    try {
      setLoading(true);

      const res = ComplaintEntity.addComplaint(data);

      if ('status' in res && res.status === 200) {
        alert('Complaint added successfully');
        router.push('/tenant/complaint');
      } else if (res instanceof Error) {
        alert('Failed to add complaint');
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  if (user?.role !== 'Tenant') {
    return <div>Unauthorized</div>;
  }

  return <AddComplaintFormBoundary addComplaint={addComplaintClickedEvent} />;
};
