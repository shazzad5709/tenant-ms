'use client';
import { User } from '@/context/UserContext';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import BillEntity, { Bill } from '../entity/Bill';

type Props = {
  user: User | null;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
};

export const BillListingController: React.FC<Props> = ({
  user,
  setLoading,
}) => {
  const router = useRouter();
  const [bills, setBills] = useState<Bill[]>([]);

  const fetchAllBills = async () => {
    if (!user?.id) return; // Only fetch when user is available

    try {
      setLoading(true); // Start loading
      const res = await BillEntity.getBills();
      if ('status' in res && res.status === 200) {
        setBills(res.data);
      } else if (res instanceof Error) {
        alert('Failed to fetch bills');
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
      fetchAllBills();
    }
  }, [user]);

  if (user?.role !== 'Tenant') {
    return <div>Unauthorized</div>;
  }

  return <BillList bills={bills} role='tenant' />;
};
