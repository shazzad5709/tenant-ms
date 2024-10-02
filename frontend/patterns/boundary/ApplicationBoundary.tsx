import { useEffect, useState } from 'react';
import { users } from '@/data/users';
import ApprovalInterface from '@/components/interface/ApprovalInterface';

type ApplicationBoundaryProps = {
  accept: (applicantId: string) => void;
  reject: (applicantId: string) => void;
};

export const ApplicationBoundary: React.FC<ApplicationBoundaryProps> = ({
  accept,
  reject,
}) => {
  const [applicants, setApplicants] = useState<User[]>([]); // [applicantId, setApplicantId
  const [applicantId, setApplicantId] = useState<string>('');

  useEffect(() => {
    // fetch applicants from database on init
  }, []);

  const handleAccept = (event: any) => {
    event.preventDefault();
    accept(applicantId); // Passing data to control
    applicants.filter((applicant) => applicant.id !== applicantId);
    setApplicantId('');
  };

  const handleReject = (event: any) => {
    event.preventDefault();
    reject(applicantId); // Passing data to control
    applicants.filter((applicant) => applicant.id !== applicantId);
    setApplicantId('');
  };

  return (
    <ApprovalInterface
      users={users}
      applicantId={applicantId}
      setApplicantId={setApplicantId}
      handleAccept={handleAccept}
      handleReject={handleReject}
    />
  );
};
