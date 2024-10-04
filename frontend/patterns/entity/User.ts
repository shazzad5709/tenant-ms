import axios from "@/lib/axios";
import { SignUpFormData } from "../boundary/SignUpFormBoundary";
import { SignInFormData } from "../boundary/SignInFormBoundary";
import { AxiosResponse } from "axios";
import { User } from "@/context/UserContext";


export class UserEntity {

  static readonly signUp = async (user: SignUpFormData): Promise<User> => {
    try {
      const res = await axios.post('/auth/signup', user);
      return res.data;
    } catch (error: any) {
      throw new Error(error.response?.data?.message || 'An error occurred');
    }
  }

  static readonly signIn = async (user: SignInFormData): Promise<User> => {
    try {
      const res = await axios.post('/auth/signin', user);
      console.log('Entity: ', res.data);
      return res.data;
    } catch (error: any) {
      throw new Error(error.response?.data?.message || 'An error occurred');
    }
  }

}
