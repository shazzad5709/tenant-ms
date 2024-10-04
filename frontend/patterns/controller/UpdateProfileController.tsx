import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { UpdateProfileFormBoundary } from '../boundary/UpdateProfileFormBoundary';
import useUser from '@/hooks/useUser';
import { UserEntity } from '../entity/User';

export const UpdateProfileController: React.FC<Props> = ({ userId }) => {
  const [error, setError] = useState<string>('');
  const { user } = useUser();
  const router = useRouter();
  const [userData, setUserData] = useState<ProfileFormData>();

  // On component mount
  useEffect(() => {
    setUserData(user);
  }, [user]);

  const updateProfileClickedEvent = async (data: ProfileFormData) => {
    try {
      const res = await UserEntity.updateProfile(userId, data);
      if ('status' in res && res.status === 200) {
        alert('Profile updated successfully');
        router.push('/homeowner/profile');
      } else if (res instanceof Error) {
        alert('Failed to update profile');
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <UpdateProfileFormBoundary
      user={user}
      updateProfile={updateProfileClickedEvent}
    />
  );
};
