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

export default function HouseListingController({
  user,
  setLoading,
}: Readonly<Props>) {
  const router = useRouter();
  const [houses, setHouses] = useState<House[]>([]);

  const fetchAllHouses = async () => {
    if (!user?.id) return; // Only fetch when user is available

    try {
      setLoading(true);
      const res = await HouseEntity.getHouses();
      if ('status' in res && res.status === 200) {
        setHouses(res.data);
      } else if (res instanceof Error) {
        alert('Failed to fetch houses');
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false); // End loading
    }
  };

  const onOfferClickedEvent = (houseId: string) => {
    // TODO: Implement offer logic
  };

  // On component mount
  useEffect(() => {
    if (user) {
      fetchAllHouses();
    }
  }, [user]);

  return (
    <div>
      <HouseList
        houses={houses}
        role='tenant'
        onOfferClicked={onOfferClickedEvent}
      />
    </div>
  );
}
