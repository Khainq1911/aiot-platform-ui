import { formatDate } from "@/lib/utils";
import type { SensorMessage } from "@/types/notification.types";
import {
  AlertTriangle,
  Badge,
  Battery,
  Clock,
  Database,
  Gauge,
  MapPin,
  Snowflake,
} from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Separator } from "../ui/separator";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";

function BatteryIndicator({ level }: { level: number }) {
  const getBatteryColor = (level: number) => {
    if (level > 50) return "bg-green-500";
    if (level > 20) return "bg-yellow-500";
    return "bg-red-500";
  };

  const getBatteryTextColor = (level: number) => {
    if (level > 50) return "text-green-700";
    if (level > 20) return "text-yellow-700";
    return "text-red-700";
  };

  return (
    <div className="flex items-center gap-2">
      <div className="w-8 h-4 border-2 border-gray-300 rounded-sm relative">
        <div className="absolute top-0 right-0 w-1 h-2 bg-gray-300 rounded-r-sm translate-x-1"></div>
        <div
          className={`h-full rounded-sm ${getBatteryColor(
            level
          )} transition-all duration-300`}
          style={{ width: `${level}%` }}
        ></div>
      </div>
      <span className={`text-sm font-medium ${getBatteryTextColor(level)}`}>
        {level}%
      </span>
    </div>
  );
}

export default function SensorItem({ message }: { message: SensorMessage }) {
  const batteryData = message.sensor_list.find(
    (sensor) => sensor.name === "battery"
  );
  return (
    <Card className="mb-4">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <Snowflake className="h-4 w-4" />
            Sensor {message.message_id}
          </CardTitle>
          <div className="flex items-center gap-4">
            {batteryData && (
              <div className="flex items-center gap-2">
                <Battery className="h-4 w-4" />
                <BatteryIndicator level={batteryData.payload as number} />
              </div>
            )}
            <div className="flex items-center gap-2">
              <Clock className="h-4 w-4" />
              <span className="text-sm text-muted-foreground">
                {formatDate(message.timestamp)}
              </span>
            </div>
          </div>
        </div>
        <CardDescription>
          Device ID: {message.device_id} • {message.sensor_list.length} sensors
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {batteryData && (batteryData.payload as number) < 30 && (
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3">
            <div className="flex items-center gap-2 text-yellow-800">
              <AlertTriangle className="h-4 w-4" />
              <span className="font-medium">Low Battery Warning</span>
            </div>
            <p className="text-sm text-yellow-700 mt-1">
              Device battery is at {batteryData.payload}%. Consider charging
              soon.
            </p>
          </div>
        )}
        <div>
          <h4 className="font-medium mb-3 flex items-center gap-2">
            <Gauge className="h-4 w-4" />
            Sensor Readings
          </h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {message.sensor_list.map((sensor) => (
              <div key={sensor.id} className="border rounded-lg p-3">
                <div className="flex items-center justify-between mb-1">
                  <span className="font-medium">{sensor.name}</span>
                  <Badge fontVariant="secondary">{sensor.unit}</Badge>
                </div>
                <div className="text-lg font-mono">
                  {Array.isArray(sensor.payload)
                    ? `[${sensor.payload.join(", ")}]`
                    : sensor.payload}
                </div>
                <p className="text-xs text-muted-foreground mt-1">
                  {sensor.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        <Separator />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <h4 className="font-medium mb-2 flex items-center gap-2">
              <MapPin className="h-4 w-4" />
              Location
            </h4>
            <MapContainer
              center={[message?.location?.lat, message?.location?.lon]}
              zoom={13}
              scrollWheelZoom={false}
              style={{
                height: "100px",
                position: "relative",
                zIndex: 1,
              }}
              className="w-full lg:w-[300px]"
            >
              <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />

              <Marker
                position={[message?.location?.lat, message?.location?.lon]}
              >
                <Popup>
                  A pretty CSS3 popup. <br /> Easily customizable.
                </Popup>
              </Marker>
            </MapContainer>
          </div>

          <div>
            <h4 className="font-medium mb-2 flex items-center gap-2">
              <Database className="h-4 w-4" />
              Device Info
            </h4>
            <div className="text-sm space-y-1">
              <p className="text-muted-foreground">
                Model: {message.device.data?.description || "Unknown"}
              </p>
              <p className="text-muted-foreground">
                MAC Address: {message.device.data?.name || "Unknown"}
              </p>
              <p className=" text-muted-foreground">
                Updated: {formatDate(message.device.updatedAt)}
              </p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
