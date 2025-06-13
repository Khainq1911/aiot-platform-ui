import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { formatDate } from "@/lib/utils";
import { listDeviceService } from "@/services/device.services";
import type { DeviceTableRow, deviceType } from "@/types/device.types";
import { CheckCircle2, WifiOff } from "lucide-react";
import { useEffect, useState } from "react";

export default function DevicePage() {
  const [tableData, setTableData] = useState<DeviceTableRow[]>([]);

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "active":
        return (
          <Badge className="bg-green-100 text-green-800 hover:bg-green-100">
            <CheckCircle2 className="h-3 w-3 mr-1" />
            Online
          </Badge>
        );
      case "inactive":
        return (
          <Badge
            variant="outline"
            className="text-slate-500 border-slate-300 hover:bg-slate-100"
          >
            <WifiOff className="h-3 w-3 mr-1" />
            Offline
          </Badge>
        );

      default:
        return <Badge>{status}</Badge>;
    }
  };

  const handleListDevices = async () => {
    try {
      const res = await listDeviceService();
      console.log(res);
      setTableData(
        res.map((item: deviceType) => ({
          status: item.isActive ? "active" : "inactive",
          name: item.name,
          description: item.data.description,
          macAddress: item.mac_address,
          createdAt: formatDate(item.createdAt),
          updatedAt: formatDate(item.updatedAt),
        }))
      );
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    handleListDevices();
  }, []);

  return (
    <div className="p-4 ">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">Devices</h1>
        <p className="text-slate-600">
          Manage and monitor all your IoT devices
        </p>
      </div>
      <div className="border rounded-lg bg-white overflow-hidden p-2 mt-4">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Status</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Description</TableHead>
              <TableHead>Mac Address</TableHead>
              <TableHead>Created Time</TableHead>
              <TableHead>Updated Time</TableHead>
              <TableHead>Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {tableData.map((item: DeviceTableRow) => (
              <TableRow key={item.name}>
                <TableCell>{getStatusBadge(item.status)}</TableCell>
                <TableCell>{item.name}</TableCell>
                <TableCell>{item.description}</TableCell>
                <TableCell>{item.macAddress}</TableCell>
                <TableCell>{item.createdAt}</TableCell>
                <TableCell>{item.updatedAt}</TableCell>
                <TableCell></TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
