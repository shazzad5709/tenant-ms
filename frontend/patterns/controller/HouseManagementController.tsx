'use client';
import HouseList from '@/components/interface/HouseList';
import { User } from '@/context/UserContext';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import HouseEntity, { House } from '../entity/House';

type Props = {
  user: User | null;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function HouseManagementController({
  user,
  setLoading,
}: Readonly<Props>) {
  const router = useRouter();

  const [houses, setHouses] = useState<House[]>([]);

  const fetchAllHouses = async () => {
    setLoading(true);
    if (!user?.id) return;

    try {
      const res = await HouseEntity.getHouses();
      console.log('Controller: ', res);

      const houses: House[] = res;
      // console.log(houses);
      setHouses(houses);
    } catch (error) {
      console.log(error);
      alert('Failed to fetch houses');
    } finally {
      setLoading(false);
    }
  };

  const onEditClickedEvent = (houseId: string) => {
    router.push(`/homeowner/house/update?id=${houseId}`);
  };

  const onDeleteClickedEvent = (houseId: string) => {
    try {
      setLoading(true); // Start loading
      const res = HouseEntity.deleteHouse(houseId);
      if ('status' in res && res.status === 200) {
        alert('House deleted successfully');
        fetchAllHouses();
      } else if (res instanceof Error) {
        alert(res.message);
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
      console.log(user);
      fetchAllHouses();
    }
  }, [user]);

  return (
    <div>
      <HouseList
        houses={houses}
        role='homeowner'
        onEditClicked={onEditClickedEvent}
        onDeleteClicked={onDeleteClickedEvent}
      />
    </div>
  );
}
