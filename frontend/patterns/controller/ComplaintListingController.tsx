'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { User } from '@/context/UserContext';
import ComplaintEntity, { Complaint } from '../entity/Complaint';

type Props = {
  user: User | null;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
};

export const ComplaintListingController: React.FC<Props> = ({
  user,
  setLoading,
}) => {
  const router = useRouter();
  const [complaints, setComplaints] = useState<Complaint[]>([]);

  const fetchComplaints = async () => {
    if (!user?.id) return; // Only fetch when user is available

    try {
      setLoading(true); // Start loading
      const res = await ComplaintEntity.getComplaintsByOwner(user.id);
      if ('status' in res && res.status === 200) {
        setComplaints(res.data);
      } else if (res instanceof Error) {
        alert('Failed to fetch complaints');
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
      fetchComplaints();
    }
  }, [user]);

  const markAsResolved = (complaintId: string) => {
    try {
      setLoading(true); // Start loading
      const res = ComplaintEntity.markAsResolved(complaintId);
      if ('status' in res && res.status === 200) {
        alert('Complaint marked as resolved');
        fetchComplaints();
      } else if (res instanceof Error) {
        alert(res.message);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false); // End loading
    }
  };

  if (user?.role !== 'Homeowner') {
    return <div>Unauthorized</div>;
  }

  return (
    <ComplaintList
      complaints={complaints}
      role='homeowner'
      markAsResolved={markAsResolved}
    />
  );
};
