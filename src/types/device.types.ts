export type deviceType = {
  id: number;
  name: string;
  description: string;
  mac_address: string;
  deviceId: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
  projectId: number | null; // eslint-disable-next-line
  project: any | null;
  data: {
    name: string;
    description: string;
  };
};

export type DeviceTableRow = {
  status: "active" | "inactive";
  name: string;
  description: string;
  macAddress: string;
  createdAt: string;
  updatedAt: string;
};

export type subDeviceData = {
  id: number;
  name: string;
  description: string;
  type: string;
  unit: string;
  publish: boolean;
  createdAt: string;
  updatedAt: string;
  detection_timer: number | null;
  lower_limit: number | null;
  upper_limit: number | null; // eslint-disable-next-line
  selected_area: any | null; // eslint-disable-next-line
  permissions: any | null;
  device_id: string | null; // eslint-disable-next-line
  device: any | null;
};
