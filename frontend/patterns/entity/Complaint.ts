import axios from "@/lib/axios";
import { AxiosResponse } from "axios";
import { ComplaintFormData } from "../boundary/AddComplaintFormBoundary";
import { HouseEntity } from "./House";

export type Complaint = {
  id: string;
  tenantName: string;
  tenantEmail: string;
  tenantPhone: string;
  houseId: string;
  houseNumber: string;
  streetAddress: string;
  city: string;
  state: string;
  zipCode: string;
  complaintType: string;
  description: string;
  status: string;
}
export class ComplaintEntity {

  static readonly getAllComplaints = async (): Promise<Complaint[]> => {
    try {
      const res = await axios.get('/complaints');
      return res.data;
    } catch (error: any) {
      throw new Error(error.response?.data?.message || 'Failed to fetch complaints');
    }
  }

  static readonly getComplaint = async (complaintId: string): Promise<Complaint> => {
    try {
      const res = await axios.get(`/complaints/${complaintId}`);
      return res.data;
    } catch (error: any) {
      throw new Error(error.response?.data?.message || 'Failed to fetch complaint');
    }
  }

  static readonly deleteComplaint = async (complaintId: string): Promise<string> => {
    try {
      const res = await axios.delete(`/complaints/${complaintId}`);
      return res.data.message;
    } catch (error: any) {
      throw new Error(error.response?.data?.message || 'Failed to delete complaint');
    }
  }

  static readonly addComplaint = async (data: ComplaintFormData): Promise<string> => {
    try {
      const res = await axios.post('/complaints', data);
      return res.data.message;
    } catch (error: any) {
      throw new Error(error.response?.data?.message || 'Failed to add complaint');
    }
  }

  static readonly updateComplaint = async (complaintId: string, data: ComplaintFormData): Promise<string> => {
    try {
      const res = await axios.put(`/complaints/${complaintId}`, data);
      return res.data.message;
    } catch (error: any) {
      throw new Error(error.response?.data?.message || 'Failed to update complaint');
    }
  }

  static readonly getComplaintsByTenant = async (tenantId: string): Promise<Complaint[]> => {
    try {
      const res = await axios.get(`/complaints/tenant/${tenantId}`);
      return res.data;
    } catch (error: any) {
      throw new Error(error.response?.data?.message || 'Failed to fetch complaints');
    }
  }

  static readonly getComplaintsByOwner = async (ownerId: string): Promise<Complaint[]> => {
    try {
      const houseList = await HouseEntity.getHousesByOwner(ownerId);
      let complaints: Complaint[] = [];
      for (let house of houseList) {
        const res = await this.getComplaintsByHouse(house.id);
        complaints = [...complaints, ...res];
      }
      return complaints;
    } catch (error: any) {
      throw new Error(error.response?.data?.message || 'Failed to fetch complaints');
    }
  }


  static readonly getComplaintsByHouse = async (houseId: string): Promise<Complaint[]> => {
    try {
      const res = await axios.get(`/complaints/house/${houseId}`);
      return res.data;
    } catch (error: any) {
      throw new Error(error.response?.data?.message || 'Failed to fetch complaints');
    }
  }

  static readonly markAsResolved = async (complaintId: string): Promise<string> => {
    try {
      const res = await axios.put(`/complaints/resolve/${complaintId}`);
      return res.data.message;
    } catch (error: any) {
      throw new Error(error.response?.data?.message || 'Failed to mark as resolved');
    }
  }
}