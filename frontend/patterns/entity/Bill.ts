import axios from "@/lib/axios";
import { BillFormData } from "../boundary/AddBillFormBoundary";
import { AxiosResponse } from "axios";

export type Bill = {
  id: string;
  issuer: string;
  issuedTo: string;
  description: string;
  issuerId: string;
  issuedToId: string;
  billDate: Date | null;
  dueDate: Date | null;
  amount: number;
  status: string;
  paymentDate: Date | null;
  billingPeriodFrom: Date | null;
  billingPeriodTo: Date | null;
};

export default class BillEntity {

  static readonly getBills = async (): Promise<Bill[]> => {
    try {
      const res = await axios.get('/bills');
      return res.data;
    } catch (error: any) {
      throw new Error(error.response?.data?.message || 'Failed to fetch bills');
    }
  }

  static readonly getBill = async (billId: string): Promise<Bill> => {
    try {
      const res = await axios.get(`/bills/${billId}`);
      return res.data;
    } catch (error: any) {
      throw new Error(error.response?.data?.message || 'Failed to fetch bill');
    }
  }

  static readonly deleteBill = async (billId: string): Promise<string> => {
    try {
      const res = await axios.delete(`/bills/${billId}`);
      return res.data.message;
    } catch (error: any) {
      throw new Error(error.response?.data?.message || 'Failed to delete bill');
    }
  }

  static readonly addBill = async (data: BillFormData): Promise<string> => {
    try {
      const res = await axios.post('/bills', data);
      return res.data.message;
    } catch (error: any) {
      throw new Error(error.response?.data?.message || 'Failed to add bill');
    }
  }

  static readonly updateBill = async (billId: string, data: BillFormData): Promise<string> => {
    try {
      const res = await axios.put(`/bills/${billId}`, data);
      return res.data.message;
    } catch (error: any) {
      throw new Error(error.response?.data?.message || 'Failed to update bill');
    }
  }

  static readonly getBillsByOwner = async (ownerId: string): Promise<Bill[]> => {
    try {
      const res = await axios.get(`/bills/owner/${ownerId}`);
      return res.data;
    } catch (error: any) {
      throw new Error(error.response?.data?.message || 'Failed to fetch bills');
    }
  }

  static readonly getBillsByTenant = async (tenantId: string): Promise<Bill[]> => {
    try {
      const res = await axios.get(`/bills/tenant/${tenantId}`);
      return res.data;
    } catch (error: any) {
      throw new Error(error.response?.data?.message || 'Failed to fetch bills');
    }
  }

  // static readonly downloadBill = async (billId: string): Promise<AxiosResponse<any> | Error> => {
  //   try {
  //     const res = await axios.get(`/bills/${billId}/download`);
  //     return res;
  //   } catch (error: any) {
  //     return error;
  //   }
  // }
}