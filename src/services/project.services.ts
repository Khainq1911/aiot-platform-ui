import { instance } from "@/configs/axios.configs";
import type { NewProjectDto } from "@/types/project.types";

const createProjectService = async (payload: NewProjectDto) => {
  const response = await instance.post("/project", payload);
  return response.data;
};

export { createProjectService };
