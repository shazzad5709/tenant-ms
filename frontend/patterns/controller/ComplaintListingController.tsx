'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { User } from '@/context/UserContext';
import { ComplaintEntity, Complaint } from '../entity/Complaint';
import { InfinitySpin } from 'react-loader-spinner';
import ComplaintList from '@/components/interface/ComplaintList';

type Props = {
  user: User | null;
};

export const ComplaintListingController: React.FC<Props> = ({ user }) => {
  const router = useRouter();
  const [complaints, setComplaints] = useState<Complaint[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchComplaints = async () => {
    if (!user?.id) return; // Only fetch when user is available

    try {
      setLoading(true); // Start loading
      const res = await ComplaintEntity.getComplaintsByOwner(user.id);
      setComplaints(res);
    } catch (error) {
      console.log(error);
      alert('Failed to fetch complaints');
    } finally {
      setLoading(false); // End loading
    }
  };

  // On component mount
  useEffect(() => {
    if (user) {
      fetchComplaints();
    }
  }, [user]);

  const onMarkAsResolvedClicked = async (complaintId: string) => {
    try {
      setLoading(true); // Start loading
      const res = await ComplaintEntity.markAsResolved(complaintId);
      alert('Complaint marked as resolved');
      fetchComplaints();
    } catch (error) {
      console.log(error);
      alert('Failed to mark as resolved');
    } finally {
      setLoading(false); // End loading
    }
  };

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
    <ComplaintList
      complaints={complaints}
      owner={user.name}
      role='homeowner'
      onMarkAsResolvedClicked={onMarkAsResolvedClicked}
    />
  );
};
