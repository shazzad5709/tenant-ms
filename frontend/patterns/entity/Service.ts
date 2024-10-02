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
  houseOwner: string;
  houseOwnerId: string;
}
export default class ServiceEntity {

  static async getServices(): Promise<AxiosResponse<any> | Error> {
    try {
      const res = await axios.get('/services');
      return res;
    } catch (error: any) {
      return error;
    }
  }

  static async getService(serviceId: string): Promise<AxiosResponse<any> | Error> {
    try {
      const res = await axios.get(`/services/${serviceId}`);
      return res;
    } catch (error: any) {
      return error;
    }
  }

  static async deleteService(serviceId: string): Promise<AxiosResponse<any> | Error> {
    try {
      const res = await axios.delete(`/services/${serviceId}`);
      return res;
    } catch (error: any) {
      return error;
    }
  }

  static async addService(data: ServiceFormData): Promise<AxiosResponse<any> | Error> {
    try {
      const res = await axios.post('/services', data);
      return res;
    } catch (error: any) {
      return error;
    }
  }

  static async updateService(serviceId: string, data: ServiceFormData): Promise<AxiosResponse<any> | Error> {
    try {
      const res = await axios.put(`/services/${serviceId}`, data);
      return res;
    } catch (error: any) {
      return error;
    }
  }

  static async getServicesByOwner(ownerId: string): Promise<AxiosResponse<any> | Error> {
    try {
      const res = await axios.get(`/services/owner/${ownerId}`);
      return res;
    } catch (error: any) {
      return error;
    }
  }

  static async getServicesByTenant(tenantId: string): Promise<AxiosResponse<any> | Error> {
    try {
      const res = await axios.get(`/services/tenant/${tenantId}`);
      return res;
    } catch (error: any) {
      return error;
    }
  }

  static async getServicesByHouse(houseId: string): Promise<AxiosResponse<any> | Error> {
    try {
      const res = await axios.get(`/services/house/${houseId}`);
      return res;
    } catch (error: any) {
      return error;
    }
  }

  static async placeOrder(serviceId: string, tenantId: string, houseId: string): Promise<AxiosResponse<any> | Error> {
    try {
      // TODO: Validate order
      const res = await axios.post(`/services/${serviceId}/offer`, { offer });
      return res;
    } catch (error: any) {
      return error;
    }
  }
}