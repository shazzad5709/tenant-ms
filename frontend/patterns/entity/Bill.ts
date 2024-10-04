import axios from "@/lib/axios";
import { BillFormData } from "../boundary/AddBillFormBoundary";

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

export class BillEntity {

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
      const bill = {
        ...res.data,
        billDate: res.data.billDate ? new Date(res.data.billDate) : null,
        dueDate: res.data.dueDate ? new Date(res.data.dueDate) : null,
        paymentDate: res.data.paymentDate ? new Date(res.data.paymentDate) : null,
        billingPeriodFrom: res.data.billingPeriodFrom ? new Date(res.data.billingPeriodFrom) : null,
        billingPeriodTo: res.data.billingPeriodTo ? new Date(res.data.billingPeriodTo) : null,
      }
      return bill;
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
      const req = {
        ...data,
        billDate: data.billDate ? data.billDate.toISOString() : null,
        dueDate: data.dueDate ? data.dueDate.toISOString() : null,
        paymentDate: data.paymentDate ? data.paymentDate.toISOString() : null,
        billingPeriodFrom: data.billingPeriodFrom ? data.billingPeriodFrom.toISOString() : null,
        billingPeriodTo: data.billingPeriodTo ? data.billingPeriodTo.toISOString() : null,
      };


      const res = await axios.post('/bills', req);
      return res.data.message;
    } catch (error: any) {
      throw new Error(error.response?.data?.message || 'Failed to add bill');
    }
  }

  static readonly updateBill = async (billId: string, data: BillFormData): Promise<string> => {
    try {
      const req = {
        ...data,
        billDate: data.billDate ? data.billDate.toISOString() : null,
        dueDate: data.dueDate ? data.dueDate.toISOString() : null,
        paymentDate: data.paymentDate ? data.paymentDate.toISOString() : null,
        billingPeriodFrom: data.billingPeriodFrom ? data.billingPeriodFrom.toISOString() : null,
        billingPeriodTo: data.billingPeriodTo ? data.billingPeriodTo.toISOString() : null,
      };

      const res = await axios.put(`/bills/${billId}`, req);
      return res.data.message;
    } catch (error: any) {
      throw new Error(error.response?.data?.message || 'Failed to update bill');
    }
  }

  static readonly getBillsByOwner = async (ownerId: string): Promise<Bill[]> => {
    try {
      const res = await axios.get(`/bills/owner/${ownerId}`);
      console.log(res)
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