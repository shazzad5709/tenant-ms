'use client';
import useUser from '@/hooks/useUser';
import {
  AddBillFormBoundary,
  BillFormData,
} from '../boundary/AddBillFormBoundary';
import { useRouter } from 'next/navigation';
import { BillEntity } from '../entity/Bill';

type Props = {
  loading: boolean;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
};

export const AddBillController: React.FC<Props> = ({ loading, setLoading }) => {
  const { user } = useUser();
  const router = useRouter();

  const addBillClickedEvent = async (data: BillFormData) => {
    console.log(data);
    try {
      setLoading(true);
      const res = await BillEntity.addBill(data);
      alert('Bill added successfully');
      router.push('/homeowner/bill');
    } catch (error) {
      console.log(error);
      alert('Failed to add bill');
    } finally {
      setLoading(false);
    }
  };

  if (user?.role !== 'homeowner') {
    return <div>Unauthorized</div>;
  }

  return <AddBillFormBoundary addBill={addBillClickedEvent} />;
};
