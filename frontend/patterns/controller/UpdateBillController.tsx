'use client';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { UpdateBillFormBoundary } from '../boundary/UpdateBillFormBoundary';
import useUser from '@/hooks/useUser';
import { BillFormData } from '../boundary/AddBillFormBoundary';
import { BillEntity } from '../entity/Bill';
import { InfinitySpin } from 'react-loader-spinner';

type Props = {
  billId: string;
};

export const UpdateBillController: React.FC<Props> = ({ billId }) => {
  const { user } = useUser();
  const router = useRouter();
  const [bill, setBill] = useState<BillFormData>();
  const [loading, setLoading] = useState(false);

  const fetchBill = async (billId: string) => {
    if (!billId) {
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      const res = await BillEntity.getBill(billId);
      setBill(res);
    } catch (error) {
      console.log(error);
      alert('Failed to fetch bill');
    } finally {
      setLoading(false);
    }
  };

  // On component mount
  useEffect(() => {
    fetchBill(billId);
  }, []);

  const updateBillClickedEvent = async (data: BillFormData) => {
    try {
      setLoading(true);
      const res = await BillEntity.updateBill(billId, data);
      alert('Bill updated successfully');
      router.push('/homeowner/bill');
    } catch (error) {
      console.log(error);
      alert('Failed to update bill');
    } finally {
      setLoading(false);
    }
  };

  if (user?.role !== 'homeowner') {
    return <div>Unauthorized</div>;
  }

  if (loading)
    return (
      <div className='absolute inset-0 bg-white h-screen flex items-center justify-center text-xl'>
        <InfinitySpin color='black' />
      </div>
    );

  if (!bill) return <div className=''>Bill not found</div>;

  return (
    <UpdateBillFormBoundary bill={bill} updateBill={updateBillClickedEvent} />
  );
};
