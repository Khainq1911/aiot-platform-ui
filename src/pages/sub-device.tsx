import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  listSubDeviceService,
  UpdateLimitService,
} from "@/services/device.services";
import type { subDeviceData } from "@/types/device.types";
import { SquarePen } from "lucide-react";
import React, { useEffect, useState } from "react";
import { toast } from "sonner";

export default function SubDevicePage() {
  const [subDeviceData, setSubDeviceData] = useState<subDeviceData[]>([]);
  const [openModal, setOpenModal] = React.useState<boolean>(false);
  const [currentSubDevice, setCurrentSubDevice] = useState<number>(0);
  const [modalLimitForm, setModalLimitForm] = React.useState({
    upper_limit: "",
    lower_limit: "",
  });

  const handleListSubDevice = async () => {
    try {
      const res = await listSubDeviceService();
      setSubDeviceData(res);
    } catch (error) {}
  };

  const handleUpdateSubdevice = async () => {
    try {
      await UpdateLimitService(currentSubDevice, {
        ...modalLimitForm,
        type: "sensor",
      });
      await handleListSubDevice();
      toast.success("Update Success", {
        description: "Update Success",
        style: {
          background: "var(--toast-success-bg)",
          color: "var(--toast-text)",
        },
      });
    } catch (error) {
      console.log(error);
    }
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
                <TableCell>
                  <SquarePen
                    onClick={() => {
                      setCurrentSubDevice(item.id);
                      setOpenModal(true);
                    }}
                  />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
      <Dialog open={openModal} onOpenChange={setOpenModal}>
        <form>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Set Limit</DialogTitle>
              <DialogDescription>
                Make changes to your profile here. Click save when you&apos;re
                done.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4">
              <div className="grid gap-3">
                <Label htmlFor="upper-limit">Upper Limit</Label>
                <Input
                  id="upper-limit"
                  name="upper-limit"
                  value={modalLimitForm.upper_limit}
                  onChange={(e) =>
                    setModalLimitForm({
                      ...modalLimitForm,
                      upper_limit: e.target.value,
                    })
                  }
                />
              </div>
              <div className="grid gap-3">
                <Label htmlFor="lower-limit">Lower Limit</Label>
                <Input
                  id="lower-limit"
                  name="lower-limit"
                  value={modalLimitForm.lower_limit}
                  onChange={(e) =>
                    setModalLimitForm({
                      ...modalLimitForm,
                      lower_limit: e.target.value,
                    })
                  }
                />
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setOpenModal(false)}>
                Cancel
              </Button>
              <Button
                onClick={() => {
                  handleUpdateSubdevice();
                  setOpenModal(false);
                }}
              >
                Confirm
              </Button>
            </DialogFooter>
          </DialogContent>
        </form>
      </Dialog>
    </div>
  );
}
