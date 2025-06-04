import { isAuthenticated } from "@/lib/utils";
import type { ReactNode } from "react";
import { Navigate } from "react-router-dom";

export default function PrivateRoutes({ children }: { children: ReactNode }) {
  return isAuthenticated() ? <div>{children}</div> : <Navigate to="/auth" />;
}
