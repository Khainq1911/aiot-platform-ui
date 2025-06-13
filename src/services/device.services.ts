import { instance } from "@/configs/axios.configs";

const listDeviceService = async () => {
  const response = await instance.get("/device");
  return response.data;
};


const listSubDeviceService = async () => {
  const response = await instance.get("/device/sub-device/all")
  return response.data
}
export { listDeviceService, listSubDeviceService };
