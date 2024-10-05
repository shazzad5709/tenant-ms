'use client';
import {
  AddComplaintFormBoundary,
  ComplaintFormData,
} from '../boundary/AddComplaintFormBoundary';
import { useRouter } from 'next/navigation';
import { ComplaintEntity } from '../entity/Complaint';
import useUser from '@/hooks/useUser';
import { useEffect, useState } from 'react';
import { Tenant, TenantEntity } from '../entity/Tenant';
import Loading from '@/components/ui/custom/Loading';

type Props = {};

export const AddComplaintController: React.FC<Props> = ({}) => {
  const { user, updateUser } = useUser();
  const router = useRouter();
  const [tenant, setTenant] = useState<Tenant>();
  const [loading, setLoading] = useState(false);

  const addComplaintClickedEvent = async (data: ComplaintFormData) => {
    try {
      setLoading(true);

      const body = {
        ...data,
        houseId: tenant?.houseId,
        status: 'pending',
      };

      const res = await ComplaintEntity.addComplaint(body);

      alert('Complaint added successfully');
      router.push('/tenant/complaint');
    } catch (error) {
      console.log(error);
      alert('Failed to add complaint');
    } finally {
      setLoading(false);
    }
  };

  const fetchTenantInfo = async () => {
    if (!user?.id) return; // Only fetch when user is available

    try {
      setLoading(true); // Start loading
      console.log(user.id);
      const res = await TenantEntity.getTenantById(user.id);
      setTenant(res);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false); // End loading
    }
  };

  useEffect(() => {
    if (tenant) return;
    if (user) {
      fetchTenantInfo();
    }
  }, [user?.id, tenant, setLoading]);

  if (user?.role !== 'tenant') {
    return <div>Unauthorized</div>;
  }

  if (loading) {
    return <Loading />;
  }

  return (
    <AddComplaintFormBoundary
      tenant={tenant}
      addComplaint={addComplaintClickedEvent}
    />
  );
};
