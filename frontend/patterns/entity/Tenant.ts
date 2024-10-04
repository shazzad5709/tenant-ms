import axios from "@/lib/axios";

export type Tenant = {
  userId: string;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  passportID: string;
  houseId?: string;
}

export class TenantEntity {
  static readonly getTenantById = async (tenantId: string): Promise<Tenant> => {
    try {
      const res = await axios.get(`/tenants/${tenantId}`);
      return res.data;
    } catch (error: any) {
      throw new Error(error.response?.data?.message || 'Failed to fetch tenant');
    }
  }

  static readonly getTenantByHouseId = async (houseId: string): Promise<Tenant[]> => {
    try {
      const res = await axios.get(`/tenants/house/${houseId}`);
      return res.data;
    } catch (error: any) {
      throw new Error(error.response?.data?.message || 'Failed to fetch tenant');
    }
  }

  static readonly updateTenant = async (tenantId: string, houseId: string): Promise<string> => {
    try {
      const data = { houseId };
      // console.log(data);
      const res = await axios.put(`/tenants/${tenantId}`, data);
      return res.data.message;
    } catch (error: any) {
      throw new Error(error.response?.data?.message || 'Failed to update tenant');
    }
  }
}