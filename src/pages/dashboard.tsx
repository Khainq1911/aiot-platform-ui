"use client";

import {
  Activity,
  AlertCircle,
  CheckCircle,
  Clock,
  Monitor,
  CameraIcon as Sensor,
  Users,
  Zap,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Progress } from "@/components/ui/progress";
import {
  Bar,
  BarChart,
  Cell,
  Pie,
  PieChart,
  Line,
  LineChart,
  XAxis,
  YAxis,
  CartesianGrid
} from "recharts";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { useEffect, useState } from "react";
import { getDashboardService } from "@/services/dashboard.services";

// Sample data - replace with your actual data
type DashboardDataType = {
  messageDevice: {
    id: number;
    projectId: number | null;
    name: string;
    object: number;
    sensor: number;
    notification: number;
  }[];
  statusDevice: {
    total: number;
    deviceActive: number;
    deviceInActive: number;
  };
  typeDetect: {
    id: number;
    projectId: number | null;
    name: string;
    human: number;
    vehicle: number;
    all: number;
  }[];
  notificationType: {
    id: number;
    projectId: number | null;
    name: string;
    object: number;
    sensor: number;
  }[];
  notificationStatus: {
    objects: any[]; // You can define a specific type if needed
    notifications: {
      status: string;
      count: string;
    }[];
    sensors: {
      status: string;
      count: string;
    }[];
  };
  totalSensorByDate: any[]; // Define this based on the expected structure
};

export default function Dashboard() {
  const [dashboardData, setDashboardData] = useState<DashboardDataType>({
    messageDevice: [],
    statusDevice: {
      total: 0,
      deviceActive: 0,
      deviceInActive: 0,
    },
    typeDetect: [],
    notificationType: [],
    notificationStatus: {
      objects: [],
      notifications: [],
      sensors: [],
    },
    totalSensorByDate: [],
  });

  useEffect(() => {
    const getDashboard = async () => {
      try {
        const res = await getDashboardService();
        setDashboardData(res as DashboardDataType);
      } catch (error) {
        console.log(error);
      }
    };
    getDashboard();
  }, []);

  const {
    statusDevice,
    messageDevice,
    typeDetect,
    notificationType,
    notificationStatus,
  } = dashboardData;

  // Calculate totals
  const totalSensors = messageDevice.reduce(
    (sum, device) => sum + device.sensor,
    0
  );
  const totalNotifications = messageDevice.reduce(
    (sum, device) => sum + device.notification,
    0
  );

  const activeDevicePercentage =
    statusDevice.total > 0
      ? (statusDevice.deviceActive / statusDevice.total) * 100
      : 0;

  // Chart data
  const deviceStatusData = [
    { name: "Hoạt động", value: statusDevice.deviceActive, color: "#22c55e" },
    {
      name: "Không hoạt động",
      value: statusDevice.deviceInActive,
      color: "#ef4444",
    },
  ];

  const sensorData = messageDevice.map((device) => ({
    name: device.name,
    sensors: device.sensor,
    notifications: device.notification,
  }));

  const notificationData = [
    {
      name: "Notifications Pending",
      value: Number.parseInt(notificationStatus.notifications[0]?.count || "0"),
      color: "#f59e0b",
    },
    {
      name: "Sensors Pending",
      value: Number.parseInt(notificationStatus.sensors[0]?.count || "0"),
      color: "#3b82f6",
    },
  ];

  // Mock time series data for demonstration
  const timeSeriesData = [
    { time: "00:00", sensors: 5, notifications: 2 },
    { time: "04:00", sensors: 3, notifications: 1 },
    { time: "08:00", sensors: 8, notifications: 4 },
    { time: "12:00", sensors: 12, notifications: 7 },
    { time: "16:00", sensors: 9, notifications: 5 },
    { time: "20:00", sensors: 6, notifications: 3 },
  ];

  const detectionData = [
    {
      name: "Con người",
      value: typeDetect.reduce((sum, device) => sum + device.human, 0),
      color: "#3b82f6",
    },
    {
      name: "Phương tiện",
      value: typeDetect.reduce((sum, device) => sum + device.vehicle, 0),
      color: "#22c55e",
    },
    {
      name: "Khác",
      value: typeDetect.reduce((sum, device) => sum + device.all, 0),
      color: "#8b5cf6",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="mx-auto max-w-7xl space-y-6">
        <div className="space-y-2">
          <h1 className="text-3xl font-bold tracking-tight">
            Device Monitoring Dashboard
          </h1>
          <p className="text-muted-foreground">
            Tổng quan hệ thống giám sát thiết bị và thông báo
          </p>
        </div>

        {/* Overview Cards */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Tổng thiết bị
              </CardTitle>
              <Monitor className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{statusDevice.total}</div>
              <div className="flex items-center space-x-2 text-xs text-muted-foreground">
                <CheckCircle className="h-3 w-3 text-green-500" />
                <span>{statusDevice.deviceActive} hoạt động</span>
                <AlertCircle className="h-3 w-3 text-red-500" />
                <span>{statusDevice.deviceInActive} không hoạt động</span>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Tổng Sensors
              </CardTitle>
              <Sensor className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{totalSensors}</div>
              <p className="text-xs text-muted-foreground">
                Từ {messageDevice.length} thiết bị
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Thông báo</CardTitle>
              <Zap className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{totalNotifications}</div>
              <p className="text-xs text-muted-foreground">
                Tổng thông báo từ thiết bị
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Tỷ lệ hoạt động
              </CardTitle>
              <Activity className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {activeDevicePercentage.toFixed(1)}%
              </div>
              <Progress value={activeDevicePercentage} className="mt-2" />
            </CardContent>
          </Card>
        </div>

        {/* Charts Section */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {/* Device Status Chart */}
          <Card>
            <CardHeader>
              <CardTitle>Trạng thái thiết bị</CardTitle>
              <CardDescription>Phân bố thiết bị hoạt động</CardDescription>
            </CardHeader>
            <CardContent>
              <ChartContainer
                config={{
                  active: { label: "Hoạt động", color: "#22c55e" },
                  inactive: { label: "Không hoạt động", color: "#ef4444" },
                }}
                className="h-[200px]"
              >
                <PieChart>
                  <Pie
                    data={deviceStatusData}
                    cx="50%"
                    cy="50%"
                    innerRadius={40}
                    outerRadius={80}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {deviceStatusData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <ChartTooltip content={<ChartTooltipContent />} />
                </PieChart>
              </ChartContainer>
            </CardContent>
          </Card>

          {/* Sensor Activity Chart */}
          <Card>
            <CardHeader>
              <CardTitle>Hoạt động Sensor</CardTitle>
              <CardDescription>
                Số lượng sensor và thông báo theo thiết bị
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ChartContainer
                config={{
                  sensors: { label: "Sensors", color: "#3b82f6" },
                  notifications: { label: "Notifications", color: "#f59e0b" },
                }}
                className="h-[200px]"
              >
                <BarChart data={sensorData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Bar dataKey="sensors" fill="var(--color-sensors)" />
                  <Bar
                    dataKey="notifications"
                    fill="var(--color-notifications)"
                  />
                </BarChart>
              </ChartContainer>
            </CardContent>
          </Card>

          {/* Notification Status Chart */}
          <Card>
            <CardHeader>
              <CardTitle>Thông báo chờ xử lý</CardTitle>
              <CardDescription>Phân bố thông báo theo loại</CardDescription>
            </CardHeader>
            <CardContent>
              <ChartContainer
                config={{
                  notifications: { label: "Notifications", color: "#f59e0b" },
                  sensors: { label: "Sensors", color: "#3b82f6" },
                }}
                className="h-[200px]"
              >
                <PieChart>
                  <Pie
                    data={notificationData}
                    cx="50%"
                    cy="50%"
                    outerRadius={80}
                    dataKey="value"
                  >
                    {notificationData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <ChartTooltip content={<ChartTooltipContent />} />
                </PieChart>
              </ChartContainer>
            </CardContent>
          </Card>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Hoạt động theo thời gian</CardTitle>
              <CardDescription>
                Biểu đồ sensor và thông báo trong 24h
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ChartContainer
                config={{
                  sensors: { label: "Sensors", color: "#3b82f6" },
                  notifications: { label: "Notifications", color: "#f59e0b" },
                }}
                className="h-[300px]"
              >
                <LineChart data={timeSeriesData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="time" />
                  <YAxis />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Line
                    type="monotone"
                    dataKey="sensors"
                    stroke="var(--color-sensors)"
                    strokeWidth={2}
                    dot={{ r: 4 }}
                  />
                  <Line
                    type="monotone"
                    dataKey="notifications"
                    stroke="var(--color-notifications)"
                    strokeWidth={2}
                    dot={{ r: 4 }}
                  />
                </LineChart>
              </ChartContainer>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Loại phát hiện</CardTitle>
              <CardDescription>
                Thống kê phát hiện theo đối tượng
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ChartContainer
                config={{
                  human: { label: "Con người", color: "#3b82f6" },
                  vehicle: { label: "Phương tiện", color: "#22c55e" },
                  other: { label: "Khác", color: "#8b5cf6" },
                }}
                className="h-[300px]"
              >
                <BarChart data={detectionData} layout="horizontal">
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis type="number" />
                  <YAxis dataKey="name" type="category" width={80} />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Bar dataKey="value" fill="#3b82f6">
                    {detectionData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Bar>
                </BarChart>
              </ChartContainer>
            </CardContent>
          </Card>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Trạng thái thông báo</CardTitle>
              <CardDescription>
                Tình trạng xử lý thông báo hệ thống
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {notificationStatus.notifications.map((notification, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Clock className="h-4 w-4 text-orange-500" />
                    <span className="text-sm font-medium">
                      Notifications {notification.status}
                    </span>
                  </div>
                  <Badge variant="secondary">{notification.count}</Badge>
                </div>
              ))}

              {notificationStatus.sensors.map((sensor, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Clock className="h-4 w-4 text-blue-500" />
                    <span className="text-sm font-medium">
                      Sensors {sensor.status}
                    </span>
                  </div>
                  <Badge variant="secondary">{sensor.count}</Badge>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Detection Summary */}
          <Card>
            <CardHeader>
              <CardTitle>Tổng quan phát hiện</CardTitle>
              <CardDescription>
                Thống kê phát hiện theo loại đối tượng
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Users className="h-4 w-4 text-blue-500" />
                    <span className="text-sm font-medium">Con người</span>
                  </div>
                  <Badge variant="outline">
                    {typeDetect.reduce((sum, device) => sum + device.human, 0)}
                  </Badge>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Monitor className="h-4 w-4 text-green-500" />
                    <span className="text-sm font-medium">Phương tiện</span>
                  </div>
                  <Badge variant="outline">
                    {typeDetect.reduce(
                      (sum, device) => sum + device.vehicle,
                      0
                    )}
                  </Badge>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Activity className="h-4 w-4 text-purple-500" />
                    <span className="text-sm font-medium">Tổng cộng</span>
                  </div>
                  <Badge variant="outline">
                    {typeDetect.reduce((sum, device) => sum + device.all, 0)}
                  </Badge>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Danh sách thiết bị</CardTitle>
            <CardDescription>
              Chi tiết thông tin từng thiết bị trong hệ thống
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Tên thiết bị</TableHead>
                  <TableHead>Trạng thái</TableHead>
                  <TableHead className="text-right">Objects</TableHead>
                  <TableHead className="text-right">Sensors</TableHead>
                  <TableHead className="text-right">Notifications</TableHead>
                  <TableHead className="text-right">Phát hiện</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {messageDevice.map((device) => {
                  const detection = typeDetect.find((d) => d.id === device.id);
                  return (
                    <TableRow key={device.id}>
                      <TableCell className="font-medium">
                        {device.name}
                      </TableCell>
                      <TableCell>
                        <Badge
                          variant="outline"
                          className="bg-green-50 text-green-700 border-green-200"
                        >
                          <CheckCircle className="h-3 w-3 mr-1" />
                          Hoạt động
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        {device.object}
                      </TableCell>
                      <TableCell className="text-right">
                        <Badge variant="secondary">{device.sensor}</Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        <Badge
                          variant={
                            device.notification > 0
                              ? "destructive"
                              : "secondary"
                          }
                        >
                          {device.notification}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="text-xs text-muted-foreground">
                          H: {detection?.human || 0} | V:{" "}
                          {detection?.vehicle || 0} | All: {detection?.all || 0}
                        </div>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Chi tiết thông báo theo thiết bị</CardTitle>
            <CardDescription>
              Phân tích thông báo từ từng thiết bị
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Thiết bị</TableHead>
                  <TableHead className="text-right">
                    Object Notifications
                  </TableHead>
                  <TableHead className="text-right">
                    Sensor Notifications
                  </TableHead>
                  <TableHead className="text-right">Tổng cộng</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {notificationType.map((device) => (
                  <TableRow key={device.id}>
                    <TableCell className="font-medium">{device.name}</TableCell>
                    <TableCell className="text-right">
                      <Badge
                        variant={
                          device.object > 0 ? "destructive" : "secondary"
                        }
                      >
                        {device.object}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <Badge
                        variant={
                          device.sensor > 0 ? "destructive" : "secondary"
                        }
                      >
                        {device.sensor}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <Badge variant="outline">
                        {device.object + device.sensor}
                      </Badge>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
