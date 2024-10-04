import axios from "@/lib/axios";
import { AxiosResponse } from "axios";
import { ServiceFormData } from "../boundary/AddServiceFormBoundary";

export type Service = {
  id: string;
  serviceName: string;
  description: string;
  charge: number;
  serviceCategory: string;
  serviceProviderName: string;
  serviceProviderEmail: string;
  serviceProviderPhone: string;
  houseId: string;
  houseNumber: string;
  streetAddress: string;
  city: string;
  state: string;
  zipCode: string;
  houseOwnerName: string;
  houseOwnerId: string;
}
export class ServiceEntity {

  static async getServices(): Promise<Service[]> {
    try {
      const res = await axios.get('/services');
      return res.data;
    } catch (error: any) {
      return error;
    }
  }

  static async getService(serviceId: string): Promise<Service> {
    try {
      const res = await axios.get(`/services/${serviceId}`);
      return res.data;
    } catch (error: any) {
      throw new Error(error.response?.data?.message || 'Failed to fetch bills');
    }
  }

  static async deleteService(serviceId: string): Promise<string> {
    try {
      const res = await axios.delete(`/services/${serviceId}`);
      return res.data.message;
    } catch (error: any) {
      throw new Error(error.response?.data?.message || 'Failed to fetch bills');
    }
  }

  static async addService(data: ServiceFormData): Promise<string> {
    try {
      const res = await axios.post('/services', data);
      return res.data.message;
    } catch (error: any) {
      throw new Error(error.response?.data?.message || 'Failed to fetch bills');
    }
  }

  static async updateService(serviceId: string, data: ServiceFormData): Promise<string> {
    try {
      const res = await axios.put(`/services/${serviceId}`, data);
      return res.data.message;
    } catch (error: any) {
      throw new Error(error.response?.data?.message || 'Failed to fetch bills');
    }
  }

  static async getServicesByOwner(ownerId: string): Promise<Service[]> {
    try {
      const res = await axios.get(`/services/owner/${ownerId}`);
      return res.data;
    } catch (error: any) {
      throw new Error(error.response?.data?.message || 'Failed to fetch bills');
    }
  }

  static async getServicesByTenant(tenantId: string): Promise<Service[]> {
    try {
      const res = await axios.get(`/services/tenant/${tenantId}`);
      return res.data;
    } catch (error: any) {
      throw new Error(error.response?.data?.message || 'Failed to fetch bills');
    }
  }

  static async getServicesByHouse(houseId: string): Promise<Service[]> {
    try {
      const res = await axios.get(`/services/house/${houseId}`);
      return res.data;
    } catch (error: any) {
      throw new Error(error.response?.data?.message || 'Failed to fetch bills');
    }
  }

  // static async placeOrder(serviceId: string, tenantId: string, houseId: string): Promise<AxiosResponse<any> | Error> {
  //   try {
  //     // TODO: Validate order
  //     const res = await axios.post(`/services/${serviceId}/offer`, { offer });
  //     return res;
  //   } catch (error: any) {
  //     throw new Error(error.response?.data?.message || 'Failed to fetch bills');
  //   }
  // }
}