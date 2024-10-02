'use client';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { UpdateBillFormBoundary } from '../boundary/UpdateBillFormBoundary';
import useUser from '@/hooks/useUser';
import { BillFormData } from '../boundary/AddBillFormBoundary';
import BillEntity from '../entity/Bill';
import { InfinitySpin } from 'react-loader-spinner';

type Props = {
  billId: string;
};

export const UpdateBillController: React.FC<Props> = ({ billId }) => {
  const [error, setError] = useState<string>('');
  const { user } = useUser();
  const router = useRouter();
  const [bill, setBill] = useState<BillFormData>();

  const fetchBill = async (billId: string) => {
    try {
      const res = await BillEntity.getBill(billId);
      if ('status' in res && res.status === 200) {
        const bill = res.data as BillFormData;
        setBill(bill);
      } else if (res instanceof Error) {
        setError(res.message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  // On component mount
  useEffect(() => {
    fetchBill(billId);
  }, []);

  const updateBillClickedEvent = async (data: BillFormData) => {
    try {
      const res = await BillEntity.updateBill(billId, data);
      if ('status' in res && res.status === 200) {
        alert('Bill updated successfully');
        router.push('/homeowner/bill');
      } else if (res instanceof Error) {
        alert('Failed to update bill');
      }
    } catch (error) {
      console.log(error);
    }
  };

  if (error) {
    return <div>{error}</div>;
  }

  if (user?.role !== 'Homeowner') {
    return <div>Unauthorized</div>;
  }

  if (!bill)
    return (
      <div className='absolute inset-0 bg-white h-screen flex items-center justify-center text-xl'>
        <InfinitySpin color='black' />
      </div>
    );

  return <UpdateBillFormBoundary bill={bill} updateBill={updateBillClickedEvent} />;
};
