import { instance } from "@/configs/axios.configs";

const listDeviceService = async () => {
  const response = await instance.get("/device");
  return response.data;
};

export { listDeviceService };
