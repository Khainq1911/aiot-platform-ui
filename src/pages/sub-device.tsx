import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { listSubDeviceService } from "@/services/device.services";
import type { subDeviceData } from "@/types/device.types";
import { useEffect, useState } from "react";

export default function SubDevicePage() {
  const [subDeviceData, setSubDeviceData] = useState<subDeviceData[]>([]);

  const handleListSubDevice = async () => {
    try {
      const res = await listSubDeviceService();
      setSubDeviceData(res);
    } catch (error) {}
  };

  useEffect(() => {
    handleListSubDevice();
  }, []);

  return (
    <div className="p-4">
      <div className="border rounded-lg bg-white overflow-hidden p-2 mt-4">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Id</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Type</TableHead>
              <TableHead>Unit</TableHead>
              <TableHead>Device</TableHead>
              <TableHead>Upper Limit</TableHead>
              <TableHead>Lower Limit</TableHead>
              <TableHead>Selected Area</TableHead>
              <TableHead>Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {subDeviceData.map((item: subDeviceData) => (
              <TableRow key={item.id}>
                <TableCell>{item.id}</TableCell>
                <TableCell>{item.name}</TableCell>
                <TableCell>{item.type}</TableCell>
                <TableCell>{item.unit}</TableCell>
                <TableCell>{item.device_id || "None"}</TableCell>
                <TableCell>{item.upper_limit || "None"}</TableCell>
                <TableCell>{item.lower_limit || "None"}</TableCell>
                <TableCell>{item.selected_area || "None"}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
