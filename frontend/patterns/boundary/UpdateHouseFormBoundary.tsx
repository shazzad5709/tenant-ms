import { useState } from 'react';

import HouseForm from '@/components/forms/house/AddHouseForm';
import { HouseFormData } from './AddHouseFormBoundary';

type UpdateHouseFormBoundaryProps = {
  house: HouseFormData;
  updateHouse: (data: HouseFormData) => void;
};

export const UpdateHouseFormBoundary: React.FC<UpdateHouseFormBoundaryProps> = ({
  house,
  updateHouse,
}) => {
  const [data, setData] = useState<HouseFormData>({ ...house });

  const handleSubmit = (event: any) => {
    event.preventDefault();
    updateHouse(data); // Passing data to control
  };

  return (
    <HouseForm
      data={data}
      setData={setData}
      handleSubmit={handleSubmit}
      label='Update House'
    />
  );
};