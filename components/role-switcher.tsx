"use client";

import { useRouter } from "next/navigation";
import { useAuthStore } from "@/stores/auth.store";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Shield, Store, User } from "lucide-react";
import type { UserRole } from "@/stores/auth.store";

const roleConfig: Record<UserRole, { label: string; icon: React.ReactNode; route: string; description: string }> = {
  ADMIN: {
    label: "Admin",
    icon: <Shield className="h-4 w-4" />,
    route: "/admin",
    description: "Manage users, countries, and services",
  },
  MERCHANT: {
    label: "Merchant",
    icon: <Store className="h-4 w-4" />,
    route: "/merchant",
    description: "Manage payments, transfers, and quick actions",
  },
  CLIENT: {
    label: "Client",
    icon: <User className="h-4 w-4" />,
    route: "/dashboard",
    description: "View dashboard and account information",
  },
};

export const RoleSwitcher = () => {
  const router = useRouter();
  const { user, getRole, getRoleRoute } = useAuthStore();

  const handleGoToDashboard = () => {
    const route = getRoleRoute();
    router.push(route);
  };

  const currentRole = getRole();
  const currentRoleValue = currentRole || "CLIENT";
  const currentConfig = roleConfig[currentRoleValue];

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle>Role Switcher</CardTitle>
        <CardDescription>
          Switch between different user roles to access different dashboards
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <label className="text-sm font-medium">Current Role</label>
          <div className="flex items-center gap-2 rounded-md border p-3">
            {currentConfig.icon}
            <div className="flex-1">
              <div className="font-medium">{currentConfig.label}</div>
              <p className="text-sm text-muted-foreground">
                {currentConfig.description}
              </p>
            </div>
          </div>
          {!user && (
            <p className="text-sm text-muted-foreground">
              Please log in to access your dashboard
            </p>
          )}
        </div>

        <div className="pt-4 border-t">
          <Button onClick={handleGoToDashboard} className="w-full" size="lg">
            Go to {currentConfig.label} Dashboard
          </Button>
        </div>

        <div className="pt-2 space-y-2">
          <p className="text-xs text-muted-foreground">
            <strong>Available Roles:</strong>
          </p>
          <div className="space-y-1">
            {Object.entries(roleConfig).map(([role, config]) => (
              <div key={role} className="flex items-center gap-2 text-xs text-muted-foreground">
                {config.icon}
                <span>
                  <strong>{config.label}:</strong> {config.description}
                </span>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

