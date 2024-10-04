'use client';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { UpdateHouseFormBoundary } from '../boundary/UpdateHouseFormBoundary';
import useUser from '@/hooks/useUser';
import { HouseEntity } from '../entity/House';
import { HouseFormData } from '../boundary/AddHouseFormBoundary';
import { InfinitySpin } from 'react-loader-spinner';

type Props = {
  houseId: string;
};

export const UpdateHouseController: React.FC<Props> = ({ houseId }) => {
  const { user } = useUser();
  const router = useRouter();
  const [house, setHouse] = useState<HouseFormData>();
  const [loading, setLoading] = useState<boolean>(false);

  const fetchHouse = async (houseId: string) => {
    if (!houseId) {
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      const res = await HouseEntity.getHouse(houseId);
      setHouse(res);
    } catch (error) {
      console.log(error);
      alert('Failed to fetch house');
    } finally {
      setLoading(false);
    }
  };

  // On component mount
  useEffect(() => {
    fetchHouse(houseId);
  }, []);

  const updateHouseClickedEvent = async (data: HouseFormData) => {
    setLoading(true);
    try {
      const res = await HouseEntity.updateHouse(houseId, data);
      alert(res);
      router.push('/homeowner/house');
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  if (user?.role !== 'homeowner') {
    return <div>Unauthorized</div>;
  }

  if (loading)
    return (
      <div className='absolute inset-0 bg-white h-screen flex items-center justify-center text-xl'>
        <InfinitySpin color='black' />
      </div>
    );

  return (
    <div>
      {house ? (
        <UpdateHouseFormBoundary
          house={house}
          updateHouse={updateHouseClickedEvent}
        />
      ) : (
        <div>House not found</div>
      )}
    </div>
  );
};
