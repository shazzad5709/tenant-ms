import axios from "@/lib/axios";
import { AxiosResponse } from "axios";

export type Notification = {
  id: string;
  message: string;
  date: Date;
  isRead: boolean;
};

export default class NotificationEntity {

  static readonly getNotifications = async (userId: string): Promise<AxiosResponse<any> | Error> => {
    try {
      const res = await axios.get('/notifications/user', { params: { userId } });
      return res;
    } catch (error: any) {
      return error;
    }
  }

  static readonly markAsRead = async (notificationId: string): Promise<AxiosResponse<any> | Error> => {
    try {
      const res = await axios.put(`/notifications/${notificationId}`);
      return res;
    } catch (error: any) {
      return error;
    }
  }
}