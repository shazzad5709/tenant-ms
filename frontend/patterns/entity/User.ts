import axios from "@/lib/axios";
import { SignUpFormData } from "../boundary/SignUpFormBoundary";
import { SignInFormData } from "../boundary/SignInFormBoundary";
import { AxiosResponse } from "axios";
import { User } from "@/context/UserContext";


export default class UserEntity {

  static readonly signUp = async (user: SignUpFormData): Promise<AxiosResponse<any> | Error> => {
    try {
      const res = await axios.post('/auth/signup', user);
      return res;
    } catch (error: any) {
      return error;
    }
  }

  static readonly signIn = async (user: SignInFormData): Promise<User | Error> => {
    try {
      const res = await axios.post('/auth/signin', user);
      console.log('Entity: ', res.data);
      return res.data;
    } catch (error: any) {
      return new Error(error.response?.data?.message || 'An error occurred');
    }
  }

}
