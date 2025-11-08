"use client";

import { useAuthStore, type UserRole } from "@/stores/auth.store";
import { AppSidebar } from "@/components/app-sidebar";
import { SiteHeader } from "@/components/site-header";
import {
  SidebarInset,
  SidebarProvider,
} from "@/components/ui/sidebar";
import { PageLoader } from "@/components/ui/page-loader";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user, isHydrated } = useAuthStore();
  const role = user?.role as UserRole | undefined;

  // Show loading state while hydrating
  if (!isHydrated) {
    return <PageLoader text="Loading dashboard..." />;
  }

  // AuthProvider handles routing, so if we reach here, user is authenticated
  // and has access to the current route

  return (
    <SidebarProvider
      style={
        {
          "--sidebar-width": "calc(var(--spacing) * 72)",
          "--header-height": "calc(var(--spacing) * 12)",
        } as React.CSSProperties
      }
    >
      <AppSidebar variant="inset" />
      <SidebarInset>
        <SiteHeader />
        <div className="flex flex-1 flex-col">
          <div className="@container/main flex flex-1 flex-col gap-2">
            {children}
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}

