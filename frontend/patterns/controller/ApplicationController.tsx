import { useState } from 'react';
import { ApplicationBoundary } from '../boundary/ApplicationBoundary';
import { useRouter } from 'next/router';
import UserEntity from '../entity/User';

type Props = {};

export const ApplicationController: React.FC<Props> = ({}) => {
  const [error, setError] = useState<string>('');
  const router = useRouter();
  const user = useUser();

  const onAcceptClickedEvent = (applicantId: string) => {
    const applicant = UserEntity.find((user) => user.id === applicantId);
    applicant.role = 'Homeowner';
    const tenant = new Homeowner(applicant);
  };

  const onRejectClickedEvent = (applicantId: string) => {
    UserEntity.remove((user) => user.id === applicantId);
  };

  if (error) {
    return <div>{error}</div>;
  }

  if (!user) router.push('/signin');

  if (user.role !== 'Admin') {
    return <div>Unauthorized</div>;
  }

  return (
    <ApplicationBoundary
      accept={onAcceptClickedEvent}
      reject={onRejectClickedEvent}
    />
  );
};
