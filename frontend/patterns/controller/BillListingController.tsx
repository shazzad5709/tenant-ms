'use client';
import { User } from '@/context/UserContext';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { BillEntity, Bill } from '../entity/Bill';
import BillList from '@/components/interface/BillList';
import { Tenant, TenantEntity } from '../entity/Tenant';

type Props = {
  user: User | null;
};

export const BillListingController: React.FC<Props> = ({ user }) => {
  const router = useRouter();
  const [bills, setBills] = useState<Bill[]>([]);
  const [loading, setLoading] = useState(false);
  const [tenantInfo, setTenantInfo] = useState<Tenant>();

  const fetchAllBills = async () => {
    if (!user?.id) return; // Only fetch when user is available

    try {
      setLoading(true); // Start loading
      console.log(user.id);
      const res = await BillEntity.getBillsByTenant(user.id);
      console.log(res);
      setBills(res);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false); // End loading
    }
  };

  const fetchTenantInfo = async () => {
    if (!user?.id) return; // Only fetch when user is available

    try {
      setLoading(true); // Start loading
      console.log(user.id);
      const res = await TenantEntity.getTenantById(user.id);
      console.log(res);
      setTenantInfo(res);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false); // End loading
    }
  };

  // On component mount
  useEffect(() => {
    if (user) {
      fetchTenantInfo();
    }
  }, [user]);

  useEffect(() => {
    if (tenantInfo?.houseId) {
      fetchAllBills();
    }
  }, [tenantInfo]);

  if (user?.role !== 'tenant') {
    return <div>Unauthorized</div>;
  }

  if (!tenantInfo?.houseId) {
    return <div className='text-center text-3xl'>Not in a house</div>;
  }

  return <BillList bills={bills} role={user.role} />;
};
