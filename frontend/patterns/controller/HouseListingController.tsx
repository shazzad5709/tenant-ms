'use client';
import HouseList from '@/components/interface/HouseList';
import { User } from '@/context/UserContext';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { HouseEntity, House } from '../entity/House';
import Loading from '@/components/ui/custom/loading';
import { Application, ApplicationEntity } from '../entity/Application';

type Props = {
  user: User | null;
};

export default function HouseListingController({ user }: Readonly<Props>) {
  const router = useRouter();
  const [houses, setHouses] = useState<House[]>([]);
  const [alreadyApplied, setAlreadyApplied] = useState<string[]>([]);

  const [loading, setLoading] = useState(false);

  const fetchAllHouses = async () => {
    if (!user?.id) return; // Only fetch when user is available

    try {
      setLoading(true);
      const res = await HouseEntity.getHouses();
      setHouses(res);
    } catch (error) {
      console.log(error);
      alert('Failed to fetch houses');
    } finally {
      setLoading(false); // End loading
    }
  };

  const fetchApplications = async () => {
    if (!user?.id) return; // Only fetch when user is available

    try {
      setLoading(true);
      const res = await ApplicationEntity.getApplicationByTenantId(user.id);
      const appliedHouses = res.map((application) => application.houseId); // Get appliedHouses(res);
      setAlreadyApplied(appliedHouses);
    } catch (error) {
      console.log(error);
      alert('Failed to fetch applications');
    } finally {
      setLoading(false); // End loading
    }
  };

  const applyAsTenant = async (house: House) => {
    if (!user?.id) return; // Only apply when user is available

    try {
      setLoading(true);
      const res = await ApplicationEntity.addApplication(
        house.id,
        user.id,
        house.ownerId
      );
      fetchApplications();
    } catch (error) {
      console.log(error);
      alert('Failed to apply as tenant');
    } finally {
      setLoading(false); // End loading
    }
  };

  // On component mount
  useEffect(() => {
    if (user) {
      fetchAllHouses();
      fetchApplications();
    }
  }, [user]);

  if (loading) return <Loading />;

  return (
    <div>
      <HouseList
        houses={houses}
        role='tenant'
        applyAsTenant={applyAsTenant}
        alreadyApplied={alreadyApplied}
      />
    </div>
  );
}
