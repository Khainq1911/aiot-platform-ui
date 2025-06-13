export type deviceType = {
  id: number;
  name: string;
  description: string;
  mac_address: string;
  deviceId: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
  projectId: number | null;
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
