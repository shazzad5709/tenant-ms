'use client';
import ComplaintList from '@/components/interface/ComplaintList';
import { User } from '@/context/UserContext';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { HouseEntity, House } from '../entity/House';
import { InfinitySpin } from 'react-loader-spinner';
import { Button } from '@/components/ui/button';
import { Tenant, TenantEntity } from '../entity/Tenant';
import { Complaint, ComplaintEntity } from '../entity/Complaint';

type Props = {
  user: User | null;
};

export default function HouseManagementController({ user }: Readonly<Props>) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [tenantInfo, setTenantInfo] = useState<Tenant>();
  const [complaints, setComplaints] = useState<Complaint[]>([]);

  const fetchAllComplaints = async () => {
    setLoading(true);
    if (!user?.id) return;

    try {
      const res = await ComplaintEntity.getComplaintsByTenant(user.email);
      setComplaints(res);
    } catch (error) {
      console.log(error);
      alert('Failed to fetch complaints');
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
      console.log(res);
      setTenantInfo(res);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false); // End loading
    }
  };

  const onEditClickedEvent = (houseId: string) => {
    router.push(`/homeowner/house/update?id=${houseId}`);
  };

  const onDeleteClickedEvent = async (complaintId: string) => {
    try {
      setLoading(true); // Start loading
      const res = await ComplaintEntity.deleteComplaint(complaintId);
      alert(res);
      fetchAllComplaints();
    } catch (error) {
      alert(error);
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
      fetchAllComplaints();
    }
  }, [tenantInfo]);

  if (loading) {
    return (
      <div className='flex justify-center items-center h-screen'>
        <InfinitySpin color='#00000' />
      </div>
    );
  }

  if (!user) {
    return (
      <div className='flex h-screen items-center justify-center'>
        Unauthorized
        <Button onClick={() => router.push('/login')}>Sign In</Button>
      </div>
    );
  }

  if (user?.role !== 'tenant') {
    return <div>Unauthorized</div>;
  }

  if (!tenantInfo?.houseId) {
    return <div className='text-center text-3xl'>Not in a house</div>;
  }

  return (
    <div>
      <ComplaintList
        complaints={complaints}
        role='tenant'
        onDeleteClicked={onDeleteClickedEvent}
      />
    </div>
  );
}
