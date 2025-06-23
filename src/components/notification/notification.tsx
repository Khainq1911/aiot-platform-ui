import type { NotificationMessage } from "@/types/notification.types";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Badge } from "../ui/badge";
import { Bell, Database, MapPin, MessageSquare } from "lucide-react";
import { formatDate } from "@/lib/utils";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";

export default function NotificationItem({
  message,
}: {
  message: NotificationMessage;
}) {
  return (
    <div>
      <Card className="mb-4">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <Bell className="h-4 w-4" />
              Notification {message.message_id}
            </CardTitle>
            <div className="flex items-center gap-2">
              <Badge>{message.CAT}</Badge>
              {message.isReplied === 1 && (
                <Badge variant="outline">Replied</Badge>
              )}
            </div>
          </div>
          <CardDescription>
            Device ID: {message.device_id} • {formatDate(message.timestamp)}
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <h4 className="font-medium mb-2">Message</h4>
            <p className="text-sm text-muted-foreground bg-muted p-3 rounded-md">
              {message.payload}
            </p>
          </div>

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
                  Model: {message.device?.data?.description || "Unknown"}
                </p>
                <p className="text-muted-foreground">
                  MAC Address: {message?.device?.data?.name || "Unknown"}
                </p>
                <p className=" text-muted-foreground">
                  Updated: {formatDate(message.device.updatedAt)}
                </p>
              </div>
            </div>
          </div>

          {message.external_messages.length > 0 && (
            <div>
              <h4 className="font-medium mb-2 flex items-center gap-2">
                <MessageSquare className="h-4 w-4" />
                External Messages
              </h4>
              <div className="flex gap-2">
                {message.external_messages.map((ext, index) => (
                  <Badge key={index} variant="outline">
                    {ext.type}: {ext.message_id}
                  </Badge>
                ))}
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
