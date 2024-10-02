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

  static readonly getBills = async (): Promise<AxiosResponse<any> | Error> => {
    try {
      const res = await axios.get('/bills');
      return res;
    } catch (error: any) {
      return error;
    }
  }

  static readonly getBill = async (billId: string): Promise<AxiosResponse<any> | Error> => {
    try {
      const res = await axios.get(`/bills/${billId}`);
      return res;
    } catch (error: any) {
      return error;
    }
  }

  static readonly deleteBill = async (billId: string): Promise<AxiosResponse<any> | Error> => {
    try {
      const res = await axios.delete(`/bills/${billId}`);
      return res;
    } catch (error: any) {
      return error;
    }
  }

  static readonly addBill = async (data: BillFormData): Promise<AxiosResponse<any> | Error> => {
    try {
      const res = await axios.post('/bills', data);
      return res;
    } catch (error: any) {
      return error;
    }
  }

  static readonly updateBill = async (billId: string, data: BillFormData): Promise<AxiosResponse<any> | Error> => {
    try {
      const res = await axios.put(`/bills/${billId}`, data);
      return res;
    } catch (error: any) {
      return error;
    }
  }

  static readonly getBillsByOwner = async (ownerId: string): Promise<AxiosResponse<any> | Error> => {
    try {
      const res = await axios.get(`/bills/owner/${ownerId}`);
      return res;
    } catch (error: any) {
      return error;
    }
  }

  static readonly getBillsByTenant = async (tenantId: string): Promise<AxiosResponse<any> | Error> => {
    try {
      const res = await axios.get(`/bills/tenant/${tenantId}`);
      return res;
    } catch (error: any) {
      return error;
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