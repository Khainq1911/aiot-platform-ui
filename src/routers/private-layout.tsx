import AppSidebar from "@/components/layout/sidebar";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { getUser, isAuthenticated } from "@/lib/utils";
import type { ReactNode } from "react";
import { Navigate } from "react-router-dom";

export default function PrivateRoutes({ children }: { children: ReactNode }) {
  return isAuthenticated() ? (
    <SidebarProvider>
      <div className="min-h-screen w-full flex">
        <AppSidebar />
        <main className="w-full">
          <header className="p-4 flex justify-between items-center shadow rounded">
            <SidebarTrigger />
            <p className="font-bold">
              Hello
              <span className="ml-2">{getUser().name}</span>!!
            </p>
          </header>
          {children}
        </main>
      </div>
    </SidebarProvider>
  ) : (
    <Navigate to="/auth" />
  );
}
