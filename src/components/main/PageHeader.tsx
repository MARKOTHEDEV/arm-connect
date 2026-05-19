"use client";

import Link from "next/link";
import { usePageHeaderStore } from "./page-header-store";
import { ArrowLeft } from "lucide-react";

export function PageHeader() {
  const { title, breadcrumbs, backHref } = usePageHeaderStore();

  if (!title) return null;

  return (
    <div className="flex flex-col gap-[4px]">
      {/* Title with back button */}
      <div className="flex items-center gap-[12px]">
        {backHref && (
          <Link
            href={backHref}
            className="w-[32px] h-[32px] rounded-full flex items-center justify-center hover:opacity-80 transition-opacity shrink-0"
            style={{
              backgroundColor: "#FFFFFF33",
            }}
          >
            <ArrowLeft size={18} color="white" />
          </Link>
        )}
        <h1 className="text-[24px] font-bold text-white leading-[32px]">
          {title}
        </h1>
      </div>

      {/* Breadcrumbs */}
      {breadcrumbs.length > 0 && (
        <nav className="flex items-center gap-[6px]">
          {breadcrumbs.map((crumb, i) => (
            <span key={i} className="flex items-center gap-[6px]">
              {i > 0 && (
                <span className="text-[13px] text-white/60 font-medium">
                  &gt;
                </span>
              )}
              {crumb.href ? (
                <Link
                  href={crumb.href}
                  className="text-[13px] text-white/60 font-normal leading-[18px] hover:text-white transition-colors"
                >
                  {crumb.label}
                </Link>
              ) : (
                <span className="text-[13px] text-white/60 font-normal leading-[18px]">
                  {crumb.label}
                </span>
              )}
            </span>
          ))}
        </nav>
      )}
    </div>
  );
}
