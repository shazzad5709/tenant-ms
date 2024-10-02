import { useEffect, useState } from 'react';
import HouseForm from '@/components/forms/house/AddHouseForm';
import useUser from '@/hooks/useUser';

export type HouseFormData = {
  address: string;
  city: string;
  state: string;
  zipCode: string;
  image: string;
  type: string;
  floorspace: number;
  beds: number;
  baths: number;
  price: number;
  owner: string;
  ownerId: string;
  parking: number;
  phoneNumber: string;
};

type AddHouseFormBoundaryProps = {
  addHouse: (data: HouseFormData) => void;
};

export const AddHouseFormBoundary: React.FC<AddHouseFormBoundaryProps> = ({
  addHouse,
}) => {
  const { user, updateUser } = useUser();

  const [data, setData] = useState<HouseFormData>({
    address: '9 Garth rd',
    city: 'Scarsdale',
    state: 'NY',
    zipCode: '10583',
    image: '1.jpg',
    type: 'Duplex',
    floorspace: 1064,
    beds: 3,
    baths: 2,
    price: 410000,
    owner: '',
    ownerId: '',
    parking: 3,
    phoneNumber: '0812345679',
  });

  useEffect(() => {
    if (!user) {
      return;
    }
    setData((prevData) => ({
      ...prevData,
      owner: user?.name,
      ownerId: user?.id,
    }));
  }, [user]);

  const handleSubmit = (event: any) => {
    event.preventDefault();
    addHouse(data); // Passing data to control
  };

  return (
    <HouseForm
      data={data}
      setData={setData}
      handleSubmit={handleSubmit}
      label='List New House'
    />
  );
};
