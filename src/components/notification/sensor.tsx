import { formatDate } from "@/lib/utils";
import type { SensorMessage } from "@/types/notification.types";
import { Badge, Clock, Database, Gauge, MapPin, Snowflake } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Separator } from "../ui/separator";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";

export default function SensorItem({ message }: { message: SensorMessage }) {
  return (
    <Card className="mb-4">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <Snowflake className="h-4 w-4" />
            Sensor {message.message_id}
          </CardTitle>
          <div className="flex items-center gap-2">
            <Clock className="h-4 w-4" />
            <span className="text-sm text-muted-foreground">
              {formatDate(message.timestamp)}
            </span>
          </div>
        </div>
        <CardDescription>
          Device ID: {message.device_id} • {message.sensor_list.length} sensors
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
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
              center={[21.005, 105.845]}
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

              <Marker position={[51.505, -0.09]}>
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
                Model: {message.device.data.description || "Unknown"}
              </p>
              <p className="text-muted-foreground">
                MAC Address: {message.device.data.name || "Unknown"}
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
