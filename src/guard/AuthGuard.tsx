"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useUserStore } from "@/components/common/user-store";
import { ROUTES } from "@/lib/routes";

interface AuthGuardProps {
  children: React.ReactNode;
}

export function AuthGuard({ children }: AuthGuardProps) {
  const router = useRouter();
  const { isAuthenticated, hasHydrated } = useUserStore();

  useEffect(() => {
    if (hasHydrated && !isAuthenticated) {
      router.replace(ROUTES.LOGIN);
    }
  }, [isAuthenticated, hasHydrated, router]);

  if (!hasHydrated || !isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center ">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary" />
      </div>
    );
  }

  return <>{children}</>;
}
