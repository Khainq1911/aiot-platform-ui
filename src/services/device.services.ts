import { instance } from "@/configs/axios.configs";
import type { LatLngTuple } from "leaflet";

const listDeviceService = async () => {
  const response = await instance.get("/device");
  return response.data;
};

const listSubDeviceService = async () => {
  const response = await instance.get("/device/sub-device/all");
  return response.data;
};

const UpdateLimitService = async (
  id: number,
  data: { type: string; upper_limit: string; lower_limit: string }
) => {
  const response = await instance.put(`/device/sub-device/${id}`, data);
  return response.data;
};

const SetZoneService = async (
  id: number,
  data: { type: string; selected_area: LatLngTuple[] }
) => {
  const response = await instance.put(`/device/sub-device/${id}`, data);
  return response.data;
};
export {
  listDeviceService,
  listSubDeviceService,
  UpdateLimitService,
  SetZoneService,
};
