import { instance } from "@/configs/axios.configs";

export const getDashboardService = async () => {
  const response = await instance.get("/dashboard");
  return response.data;
};
