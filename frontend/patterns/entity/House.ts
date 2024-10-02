import axios from "@/lib/axios";
import { AxiosResponse } from "axios";
import { HouseFormData } from "../boundary/AddHouseFormBoundary";

export type House = {
  id: string;
  address: string;
  city: string;
  state: string;
  zipCode: string;
  image: string;
  type: string;
  floorspace: number;
  beds: number;
  baths: number;
  price: number;
  owner: string;
  ownerId: string;
  parking: number;
  phoneNumber: string;
};

export default class HouseEntity {

  static readonly getHouses = async (): Promise<House[]> => {
    try {
      const res = await axios.get('/houses');
      return res.data;
    } catch (error: any) {
      throw new Error(error.response?.data?.message || 'Failed to fetch houses');
    }
  }


  static readonly getHouse = async (houseId: string): Promise<AxiosResponse<any> | Error> => {
    try {
      const res = await axios.get(`/houses/${houseId}`);
      return res;
    } catch (error: any) {
      return error;
    }
  }

  static readonly deleteHouse = async (houseId: string): Promise<AxiosResponse<any> | Error> => {
    try {
      const res = await axios.delete(`/houses/${houseId}`);
      return res;
    } catch (error: any) {
      return error;
    }
  }

  static readonly addHouse = async (data: HouseFormData): Promise<AxiosResponse<any> | Error> => {
    try {
      const res = await axios.post('/houses', data);
      return res;
    } catch (error: any) {
      return error;
    }
  }

  static readonly updateHouse = async (houseId: string, data: HouseFormData): Promise<AxiosResponse<any> | Error> => {
    try {
      const res = await axios.put(`/houses/${houseId}`, data);
      return res;
    } catch (error: any) {
      return error;
    }
  }

  static readonly getHousesByOwner = async (ownerId: string): Promise<AxiosResponse<any> | Error> => {
    try {
      const res = await axios.get(`/houses/owner/${ownerId}`);
      return res;
    } catch (error: any) {
      return error;
    }
  }

  static readonly placeOffer = async (houseId: string, offer: number): Promise<AxiosResponse<any> | Error> => {
    try {
      // TODO: Validate offer
      const res = await axios.post(`/houses/${houseId}/offer`, { offer });
      return res;
    } catch (error: any) {
      return error;
    }
  }
}