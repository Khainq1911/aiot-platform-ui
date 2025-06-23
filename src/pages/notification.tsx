import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  listNotificationService,
  listSensorService,
} from "@/services/notification";
import { Activity, Bell, Cctv, Filter } from "lucide-react";
import { useEffect, useState } from "react";
import socket from "@/socket";
import type {
  NotificationMessage,
  Params,
  SensorMessage,
} from "@/types/notification.types";
import NotificationItem from "@/components/notification/notification";
import SensorItem from "@/components/notification/sensor";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { DatePicker } from "@/components/ui/date-picker";
import { toast } from "sonner";
import useDebounce from "@/hooks/use-debounce";
import PaginationComponent from "@/components/layout/pagination";

export default function NotificationPage() {
  const [tabs, setTabs] = useState("notification");
  const [params, setParams] = useState<Params>({ page: 1, limit: "5" });
  const [notifications, setNotifications] = useState<{
    message: NotificationMessage[];
    total: number;
  }>({ message: [], total: 0 });
  const [sensors, setSensors] = useState<{
    message: SensorMessage[];
    total: number;
  }>({ message: [], total: 0 });

  const debouncedValue = useDebounce(params.q || "", 300);

  const handleTabsChange = (value: string) => {
    setTabs(value);
  };

  const handleListNotification = async () => {
    try {
      const response = await listNotificationService(params);
      setNotifications((prev) => ({
        ...prev,
        message: response.data,
        total: response.total,
      }));
    } catch (error) {
      console.log(error);
    }
  };

  const handleListSensor = async () => {
    try {
      const response = await listSensorService(params);
      setSensors((prev) => ({
        ...prev,
        message: response.data,
        total: response.total,
      }));
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    switch (tabs) {
      case "notification":
        handleListNotification();
        break;
      case "sensor":
        handleListSensor();
        break;
      default:
        break;
    }
  }, [
    tabs,
    params.end,
    params.limit,
    params.page,
    debouncedValue,
    params.start,
  ]);

  useEffect(() => {
    const showToast = (title: string, description: string) => {
      toast.success(title, {
        description,
        style: {
          background: "var(--toast-success-bg)",
          color: "var(--toast-text)",
        },
      });
    };

    socket.on("sensorMessage", (data) => {
      showToast("Sensor Message Received", "New sensor data has arrived.");
      setSensors((prev) => ({
        ...prev,
        message: [data as SensorMessage, ...prev.message],
        total: prev.total + 1,
      }));
    });

    socket.on("notificationMessage", (data) => {
      showToast("Notification Received", "A new notification has been added.");
      setNotifications((prev) => ({
        ...prev,
        message: [data as NotificationMessage, ...prev.message],
        total: prev.total + 1,
      }));
    });

    return () => {
      socket.off("sensorMessage");
      socket.off("notificationMessage");
    };
  }, []);

  return (
    <div className="mx-auto p-6 max-w-6xl">
      <div className="mb-6">
        <h1 className="text-3xl font-bold mb-2">Messages Dashboard</h1>
        <p className="text-muted-foreground">
          Monitor notification alerts and sensor data from your connected
          devices
        </p>
      </div>

      <Card className="mb-6">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Filter className="h-4 w-4" />
            Filters Information
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="space-y-2">
              <Label htmlFor="name-filter">Name</Label>
              <Input
                id="name-filter"
                placeholder="Search by name..."
                value={params.q}
                onChange={(e) => {
                  return setParams({ ...params, q: e.target.value });
                }}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="start-date">Start Date</Label>
              <DatePicker
                date={params.start}
                onChange={(date) => {
                  toast.success("Start Date Updated", {
                    description: "Start date filter has been applied.",
                    style: {
                      background: "var(--toast-success-bg)",
                      color: "var(--toast-text)",
                    },
                  });

                  return setParams((prev) => ({ ...prev, start: date }));
                }}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="end-date">End Date</Label>
              <DatePicker
                date={params.end}
                onChange={(date) => {
                  toast.success("End Date Updated", {
                    description: "End date filter has been applied.",
                    style: {
                      background: "var(--toast-success-bg)",
                      color: "var(--toast-text)",
                    },
                  });
                  return setParams((prev) => ({ ...prev, end: date }));
                }}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="limit">Items per page</Label>
              <Select
                defaultValue={params.limit}
                onValueChange={(value) => {
                  toast.success("Pagination Updated", {
                    description: `Items per page set to ${value}.`,
                    style: {
                      background: "var(--toast-success-bg)",
                      color: "var(--toast-text)",
                    },
                  });
                  return setParams((prev) => ({ ...prev, limit: value }));
                }}
              >
                <SelectTrigger className="w-full">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="5">5 items</SelectItem>
                  <SelectItem value="10">10 items</SelectItem>
                  <SelectItem value="20">20 items</SelectItem>
                  <SelectItem value="50">50 items</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      <Tabs value={tabs} onValueChange={handleTabsChange} className="w-full">
        <TabsList className=" w-full grid grid-cols-3">
          <TabsTrigger value="notification">
            <Bell className="h-4 w-4" />
            Notification
          </TabsTrigger>
          <TabsTrigger value="sensor">
            <Activity className="h-4 w-4" />
            Sensor
          </TabsTrigger>
          <TabsTrigger value="object">
            <Cctv className="h-4 w-4" />
            Object
          </TabsTrigger>
        </TabsList>
        <TabsContent value="notification">
          {notifications.message.map((item, index) => (
            <NotificationItem key={index} message={item} />
          ))}
        </TabsContent>
        <TabsContent value="sensor">
          {sensors.message.map((item: SensorMessage, index) => (
            <SensorItem key={index} message={item} />
          ))}
        </TabsContent>
      </Tabs>

      <PaginationComponent params={params} setParams={setParams} />
    </div>
  );
}
