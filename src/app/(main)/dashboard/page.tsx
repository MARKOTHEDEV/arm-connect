"use client";

import { useEffect } from "react";
import { usePageHeaderStore } from "@/components/main/page-header-store";

export default function DashboardPage() {
  const { setTitle, setBreadcrumbs, setBackHref } = usePageHeaderStore();

  useEffect(() => {
    setTitle("Dashboard");
    setBreadcrumbs([{ label: "Dashboard" }]);
    setBackHref(null);
  }, [setTitle, setBreadcrumbs, setBackHref]);

  return (
    <div>
      <p className="text-[14px] text-text-body">
        Welcome to your dashboard.
      </p>
    </div>
  );
}
