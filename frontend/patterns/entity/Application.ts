import axios from "@/lib/axios";
import { ApplicationData } from "../controller/ApplicationController";
import { TenantEntity } from "./Tenant";

export type Application = {
  id: string;
  houseId: string;
  tenantId: string;
  ownerId: string;
  status: string;
}

export class ApplicationEntity {
  static readonly getApplicationByOwnerId = async (ownerId: string): Promise<Application[]> => {
    try {
      const res = await axios.get(`/applications/owner/${ownerId}`);
      return res.data;
    } catch (error: any) {
      throw new Error(error.response?.data?.message || 'Failed to fetch bill');
    }
  }

  static readonly getApplicationByTenantId = async (tenantId: string): Promise<Application[]> => {
    try {
      const res = await axios.get(`/applications/tenant/${tenantId}`);
      return res.data;
    } catch (error: any) {
      throw new Error(error.response?.data?.message || 'Failed to fetch bill');
    }
  }

  static readonly getApplicationByHouseId = async (houseId: string): Promise<Application[]> => {
    try {
      const res = await axios.get(`/applications/house/${houseId}`);
      return res.data;
    } catch (error: any) {
      throw new Error(error.response?.data?.message || 'Failed to fetch bill');
    }
  }

  static readonly getApplicationById = async (applicationId: string): Promise<Application> => {
    try {
      const res = await axios.get(`/applications/${applicationId}`);
      return res.data;
    } catch (error: any) {
      throw new Error(error.response?.data?.message || 'Failed to fetch bill');
    }
  }

  static readonly addApplication = async (houseId: string, tenantId: string, ownerId: string): Promise<string> => {
    try {
      const data = { houseId, tenantId, ownerId, status: 'pending' };
      const res = await axios.post('/applications', data);
      return res.data.message;
    } catch (error: any) {
      throw new Error(error.response?.data?.message || 'Failed to add application');
    }
  }

  static readonly updateApplication = async (application: ApplicationData): Promise<string> => {
    try {
      const res = await axios.put(`/applications/${application.application.id}`);
      const updatedTenant = await TenantEntity.updateTenant(application.application.tenantId, application.application.houseId);
      return updatedTenant;
    } catch (error: any) {
      throw new Error(error.response?.data?.message || 'Failed to update application');
    }
  }

  static readonly deleteApplication = async (applicationId: string): Promise<string> => {
    try {
      const res = await axios.delete(`/applications/${applicationId}`);
      return res.data.message;
    } catch (error: any) {
      throw new Error(error.response?.data?.message || 'Failed to delete application');
    }
  }
}