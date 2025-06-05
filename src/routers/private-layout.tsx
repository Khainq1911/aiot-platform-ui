import AppSidebar from "@/components/layout/sidebar";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { isAuthenticated } from "@/lib/utils";
import type { ReactNode } from "react";
import { Navigate } from "react-router-dom";

export default function PrivateRoutes({ children }: { children: ReactNode }) {
  return isAuthenticated() ? (
    <SidebarProvider>
      <div className="min-h-screen w-full flex">
        <AppSidebar />
        <main className="w-full">
          <header className="p-4 flex justify-between items-center">
            <SidebarTrigger />
            <p>Hello! KhaiNguyen</p>
          </header>
          {children}
        </main>
      </div>
    </SidebarProvider>
  ) : (
    <Navigate to="/auth" />
  );
}
