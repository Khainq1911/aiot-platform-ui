import {
  useState,
  type ChangeEvent,
  type Dispatch,
  type FormEvent,
  type SetStateAction,
} from "react";
import { Button } from "../ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Textarea } from "../ui/textarea";
import type { NewProjectDto } from "@/types/project.types";

interface Props {
  dialogOpen: boolean;
  newProjectForm: NewProjectDto;
  handleDialogOpenChange: () => void;
  setDialogOpen: Dispatch<SetStateAction<boolean>>;
  setNewProjectForm: Dispatch<SetStateAction<NewProjectDto>>;
}

export default function NewProject({
  handleDialogOpenChange,
  setNewProjectForm,
  setDialogOpen,
  dialogOpen,
  newProjectForm,
}: Props) {
  const [selectedUser, setSelectedUser] = useState("");
  const handleFormInputChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setNewProjectForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmitNewProjectForm = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(newProjectForm);
    setDialogOpen(false);
  };

  return (
    <Dialog open={dialogOpen} onOpenChange={handleDialogOpenChange}>
      <DialogContent>
        <form onSubmit={handleSubmitNewProjectForm} className="space-y-4">
          <DialogHeader>
            <DialogTitle>New Project</DialogTitle>
            <DialogDescription>
              This action cannot be undone. This will permanently delete your
              account and remove your data from our servers.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label>Project Name</Label>
              <Input
                required
                placeholder="Enter project name"
                name="name"
                onChange={handleFormInputChange}
              />
            </div>

            <div className="space-y-2">
              <Label>Members</Label>
              <Select value={selectedUser} onValueChange={setSelectedUser}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select user " />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="admin">Admin</SelectItem>
                  <SelectItem value="member">Member</SelectItem>
                  <SelectItem value="viewer">Viewer</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>Description</Label>
              <Textarea
                required
                placeholder="Enter project description"
                name="description"
                onChange={handleFormInputChange}
              />
            </div>
          </div>
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">Cancel</Button>
            </DialogClose>
            <Button onClick={handleDialogOpenChange}>Submit</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
