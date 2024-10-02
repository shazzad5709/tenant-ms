'use client';
import {
  AddHouseFormBoundary,
  HouseFormData,
} from '../boundary/AddHouseFormBoundary';
import { useRouter } from 'next/navigation';
import useUser from '@/hooks/useUser';
import HouseEntity from '../entity/House';

type Props = {
  loading: boolean;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
};

export const AddHouseController: React.FC<Props> = ({
  loading,
  setLoading,
}) => {
  const { user, updateUser } = useUser();
  const router = useRouter();

  const addHouseClickedEvent = async (data: HouseFormData) => {
    try {
      setLoading(true);

      const res = await HouseEntity.addHouse(data);

      if ('status' in res && res.status === 200) {
        alert('House added successfully');
        router.push('/homeowner/house');
      } else if (res instanceof Error) {
        alert('Failed to add house');
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  if (user?.role !== 'homeowner') {
    return (
      <div className='h-screen flex items-center justify-center text-xl'>
        Unauthorized
      </div>
    );
  }

  return <AddHouseFormBoundary addHouse={addHouseClickedEvent} />;
};
