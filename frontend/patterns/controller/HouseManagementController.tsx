'use client';
import HouseList from '@/components/interface/HouseList';
import { User } from '@/context/UserContext';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import {HouseEntity,  House } from '../entity/House';
import { InfinitySpin } from 'react-loader-spinner';
import { Button } from '@/components/ui/button';

type Props = {
  user: User | null;
};

export default function HouseManagementController({ user }: Readonly<Props>) {
  const router = useRouter();

  const [loading, setLoading] = useState(false);

  const [houses, setHouses] = useState<House[]>([]);

  const fetchAllHouses = async () => {
    setLoading(true);
    if (!user?.id) return;

    try {
      const res = await HouseEntity.getHousesByOwner(user.id);
      console.log('Controller: ', res);

      const houses: House[] = res;
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

  const onDeleteClickedEvent = async (houseId: string) => {
    try {
      setLoading(true); // Start loading
      const res = await HouseEntity.deleteHouse(houseId);
      alert(res);
      fetchAllHouses();
    } catch (error) {
      alert(error);
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

  if (loading) {
    return (
      <div className='flex justify-center items-center h-screen'>
        <InfinitySpin color='#00BFFF' />
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
