'use client';
import { User } from '@/context/UserContext';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import BillEntity, { Bill } from '../entity/Bill';
import BillList from '@/components/interface/BillList';

type Props = {
  user: User | null;
};

export const BillListingController: React.FC<Props> = ({ user }) => {
  const router = useRouter();
  const [bills, setBills] = useState<Bill[]>([]);
  const [loading, setLoading] = useState(false);

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

  if (user?.role !== 'tenant' && user?.role !== 'homeowner') {
    return <div>Unauthorized</div>;
  }

  return <BillList bills={bills} role='tenant' />;
};
