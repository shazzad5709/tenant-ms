'use client';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { UpdateHouseFormBoundary } from '../boundary/UpdateHouseFormBoundary';
import useUser from '@/hooks/useUser';
import HouseEntity from '../entity/House';
import { HouseFormData } from '../boundary/AddHouseFormBoundary';
import { InfinitySpin } from 'react-loader-spinner';

type Props = {
  houseId: string;
};

export const UpdateHouseController: React.FC<Props> = ({ houseId }) => {
  const [error, setError] = useState<string>('');
  const { user } = useUser();
  const router = useRouter();
  const [house, setHouse] = useState<HouseFormData>();

  const fetchHouse = async (houseId: string) => {
    try {
      const res = await HouseEntity.getHouse(houseId);
      if ('status' in res && res.status === 200) {
        const house = res.data as HouseFormData;
        setHouse(house);
      } else if (res instanceof Error) {
        setError(res.message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  // On component mount
  useEffect(() => {
    fetchHouse(houseId);
  }, []);

  const updateHouseClickedEvent = async (data: HouseFormData) => {
    try {
      const res = await HouseEntity.updateHouse(houseId, data);
      if ('status' in res && res.status === 200) {
        alert('House updated successfully');
        router.push('/homeowner/house');
      } else if (res instanceof Error) {
        alert('Failed to update house');
      }
    } catch (error) {
      console.log(error);
    }
  };

  if (user?.role !== 'Homeowner') {
    return <div>Unauthorized</div>;
  }

  if (!house)
    return (
      <div className='absolute inset-0 bg-white h-screen flex items-center justify-center text-xl'>
        <InfinitySpin color='black' />
      </div>
    );

  return (
    <UpdateHouseFormBoundary
      house={house}
      updateHouse={updateHouseClickedEvent}
    />
  );
};
