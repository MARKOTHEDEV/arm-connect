"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useUserStore } from "@/components/common/user-store";
import { ROUTES } from "@/lib/routes";

interface GuestGuardProps {
  children: React.ReactNode;
}

export function GuestGuard({ children }: GuestGuardProps) {
  const router = useRouter();
  const { isAuthenticated, isFirstLogin, hasHydrated } = useUserStore();

  useEffect(() => {
    if (hasHydrated && isAuthenticated) {
      if (isFirstLogin) {
        router.replace(`${ROUTES.FIRST_LOGIN}/verify-otp`);
      } else {
        router.replace(ROUTES.DASHBOARD);
      }
    }
  }, [isAuthenticated, isFirstLogin, hasHydrated, router]);

  if (!hasHydrated || isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary" />
      </div>
    );
  }

  return <>{children}</>;
}
