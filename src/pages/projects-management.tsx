import NewProject from "@/components/projects-management/new-project";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import type { NewProjectDto } from "@/types/project.types";
import { Plus, Search } from "lucide-react";
import { useState } from "react";

export default function ProjectsManagement() {
  const [dialogOpen, setDialogOpen] = useState<boolean>(false);

  const [newProjectForm, setNewProjectForm] = useState<NewProjectDto>({
    name: "",
    description: "",
    deviceIds: [],
    userIds: [],
  });

  const handleDialogOpenChange = () => {
    setDialogOpen((prev) => !prev);
  };

  return (
    <div className="min-h-screen bg-slate-50 p-4 md:p-6">
      <div className="flex flex-col lg:flex-row lg:justify-between lg:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">
            Project Management
          </h1>
          <p className="text-slate-600">
            Manage project details and team members
          </p>
        </div>
        <Button onClick={handleDialogOpenChange}>
          <Plus />
          <span>New Project</span>
        </Button>
      </div>

      <div className="bg-white p-4 relative">
        <Search className="absolute left-8 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
        <Input type="text" placeholder="Search projects..." className="pl-12" />
      </div>

      <NewProject
        dialogOpen={dialogOpen}
        newProjectForm={newProjectForm}
        setDialogOpen={setDialogOpen}
        setNewProjectForm={setNewProjectForm}
        handleDialogOpenChange={handleDialogOpenChange}
      />
    </div>
  );
}
