export interface Location {
  id: string;
  alt: number;
  lat: number;
  lon: number;
  description: string;
}

export interface ExternalMessage {
  message_id: string;
  type: string;
}

export interface Device {
  id: number;
  createdAt: string;
  updatedAt: string;
  projectId: number | null;
  data: Record<string, any>;
}

export interface NotificationMessage {
  id: number;
  message_id: string;
  payload: string;
  timestamp: string;
  createdAt: string;
  isReplied: number;
  CAT: string;
  device_id: number;
  location: Location;
  device: Device;
  external_messages: ExternalMessage[];
}

export interface SensorData {
  id: string;
  name: string;
  unit: string;
  payload: number | number[];
  description: string;
}

export interface SensorMessage {
  id: number;
  message_id: string;
  timestamp: string;
  createdAt: string;
  isReplied: number;
  device_id: number;
  device: Device;
  location: Location;
  sensor_list: SensorData[];
}

export interface Params {
  page: number;
  limit: string;
  q?: string;
  start?: Date;
  end?: Date;
}
