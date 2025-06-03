import { instance } from "@/configs/axios.configs";
import type { loginDto, signupDto } from "@/types/auth.types";

const loginServices = async (payload: loginDto) => {
  const response = await instance.post("/auth/login", payload);
  return response.data;
};

const signupServices = async (payload: signupDto) => {
  const response = await instance.post("/auth/register", payload);
  return response.data;
};

export { loginServices, signupServices };
