'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { UserEntity } from '../entity/User';
import ApprovalInterface from '@/components/interface/ApprovalInterface';
import useUser from '@/hooks/useUser';
import { Tenant, TenantEntity } from '../entity/Tenant';
import { Application, ApplicationEntity } from '../entity/Application';
import Loading from '@/components/ui/custom/Loading';

type Props = {};

export type ApplicationData = {
  application: Application;
  tenant: Tenant;
};

export const ApplicationController: React.FC<Props> = ({}) => {
  const router = useRouter();
  const { user } = useUser();

  const [applications, setApplications] = useState<ApplicationData[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchApplicants = async () => {
    if (!user) return;

    try {
      setLoading(true);
      const applications = await ApplicationEntity.getApplicationByOwnerId(
        user.id
      );
      let applicants: ApplicationData[] = [];
      for (let application of applications) {
        const res = await TenantEntity.getTenantById(application.tenantId);
        const applicationWithTenant: ApplicationData = {
          application: application,
          tenant: res,
        };

        applicants.push(applicationWithTenant);
      }

      setApplications(applicants);
    } catch (error) {
      console.log(error);
      alert('Error');
    } finally {
      setLoading(false);
    }
  };

  const onAcceptClickedEvent = async (application: ApplicationData) => {
    try {
      setLoading(true);
      const res = await ApplicationEntity.updateApplication(application);
      alert('Application accepted');
      fetchApplicants();
    } catch (error) {
      console.log(error);
      alert('Error accepting application');
    } finally {
      setLoading(false);
    }
  };

  const onRejectClickedEvent = async (application: Application) => {
    try {
      setLoading(true);
      const res = await ApplicationEntity.deleteApplication(application.id);
      alert('Application rejected');
      fetchApplicants();
    } catch (error) {
      console.log(error);
      alert('Error rejecting application');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user) {
      fetchApplicants();
    }
  }, [user]);

  // useEffect(() => {
  //   console.log(applicants);
  // }, [applicants]);

  if (user?.role !== 'homeowner') {
    return <div>Unauthorized</div>;
  }

  if (loading) return <Loading />;

  return (
    <ApprovalInterface
      applications={applications}
      onAcceptClicked={onAcceptClickedEvent}
      onRejectClicked={onRejectClickedEvent}
    />
  );
};
