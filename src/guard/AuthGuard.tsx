"use client";

// TODO: revert auth check when API is wired
// import { useEffect } from "react";
// import { useRouter } from "next/navigation";
// import { useUserStore } from "@/components/common/user-store";
// import { ROUTES } from "@/lib/routes";

interface AuthGuardProps {
  children: React.ReactNode;
}

export function AuthGuard({ children }: AuthGuardProps) {
  return <>{children}</>;
}
