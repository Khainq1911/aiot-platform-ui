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
  upper_limit: number | null;
  selected_area: any | null; 
  permissions: any | null;  
  device_id: string | null;
  device: any | null;        
};

