'use client';
import { User } from '@/context/UserContext';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { BillEntity, Bill } from '../entity/Bill';
import BillList from '@/components/interface/BillList';
import { InfinitySpin } from 'react-loader-spinner';

type Props = {
  user: User | null;
};

export const BillManagementController: React.FC<Props> = ({ user }) => {
  const router = useRouter();
  const [bills, setBills] = useState<Bill[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchAllBills = async () => {
    if (!user?.id) return; // Only fetch when user is available

    try {
      setLoading(true); // Start loading
      console.log(user.id);
      const res = await BillEntity.getBillsByOwner(user.id);
      console.log(res);
      setBills(res);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false); // End loading
    }
  };

  const onEditClickedEvent = (billId: string) => {
    router.push(`/homeowner/bill/update?id=${billId}`);
  };

  // On component mount
  useEffect(() => {
    if (user) {
      fetchAllBills();
    }
  }, [user]);

  if (user?.role !== 'homeowner') {
    return <div>Unauthorized</div>;
  }

  if (loading) {
    return (
      <div className='flex justify-center items-center h-screen'>
        <InfinitySpin color='#000000' />
      </div>
    );
  }

  return (
    <BillList
      bills={bills}
      role={user.role}
      onEditClicked={onEditClickedEvent}
    />
  );
};
