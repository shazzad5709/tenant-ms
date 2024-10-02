import axios from "@/lib/axios";
import { AxiosResponse } from "axios";
import { ComplaintFormData } from "../boundary/AddComplaintFormBoundary";

export type Complaint = {
  id: string;
  tenantName: string;
  tenantEmail: string;
  tenantPhone: string;
  houseId: string;
  apartmentNumber: string;
  streetAddress: string;
  city: string;
  state: string;
  zipCode: string;
  complaintType: string;
  complaintDescription: string;
  status: string;
}
export default class ComplaintEntity {

  static readonly getAllComplaints = async (): Promise<AxiosResponse<any> | Error> => {
    try {
      const res = await axios.get('/complaints');
      return res;
    } catch (error: any) {
      return error;
    }
  }

  static readonly getComplaint = async (complaintId: string): Promise<AxiosResponse<any> | Error> => {
    try {
      const res = await axios.get(`/complaints/${complaintId}`);
      return res;
    } catch (error: any) {
      return error;
    }
  }

  static readonly deleteComplaint = async (complaintId: string): Promise<AxiosResponse<any> | Error> => {
    try {
      const res = await axios.delete(`/complaints/${complaintId}`);
      return res;
    } catch (error: any) {
      return error;
    }
  }

  static readonly addComplaint = async (data: ComplaintFormData): Promise<AxiosResponse<any> | Error> => {
    try {
      const res = await axios.post('/complaints', data);
      return res;
    } catch (error: any) {
      return error;
    }
  }

  static readonly updateComplaint = async (complaintId: string, data: ComplaintFormData): Promise<AxiosResponse<any> | Error> => {
    try {
      const res = await axios.put(`/complaints/${complaintId}`, data);
      return res;
    } catch (error: any) {
      return error;
    }
  }

  static readonly getComplaintsByTenant = async (tenantId: string): Promise<AxiosResponse<any> | Error> => {
    try {
      const res = await axios.get(`/complaints/tenant/${tenantId}`);
      return res;
    } catch (error: any) {
      return error;
    }
  }

  static readonly getComplaintsByOwner = async (ownerId: string): Promise<AxiosResponse<any> | Error> => {
    try {
      const res = await axios.get(`/complaints/owner/${ownerId}`);
      return res;
    } catch (error: any) {
      return error;
    }
  }


  static readonly getComplaintsByHouse = async (houseId: string): Promise<AxiosResponse<any> | Error> => {
    try {
      const res = await axios.get(`/complaints/house/${houseId}`);
      return res;
    } catch (error: any) {
      return error;
    }
  }

  static readonly markAsResolved = async (complaintId: string): Promise<AxiosResponse<any> | Error> => {
    try {
      const res = await axios.put(`/complaints/${complaintId}/resolve`);
      return res;
    } catch (error: any) {
      return error;
    }
  }
}