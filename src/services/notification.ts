import { instance } from "@/configs/axios.configs";
import type { Params } from "@/types/notification.types";

const listNotificationService = async (params: Params) => {
  const response = await instance.get("/notification", { params: params });
  return response.data;
};

const listSensorService = async (params: Params) => {
  const response = await instance.get("/sensor", { params: params });
  return response.data;
};

export { listNotificationService, listSensorService };
