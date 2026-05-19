"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { X, Menu, LogOut, ChevronDown } from "lucide-react";
import { useUserStore } from "@/components/common/user-store";

const sidebarLinks = [
  { label: "Dashboard", href: "/dashboard" },
  { label: "Settings", href: "/settings" },
];

interface MobileSidebarProps {
  open: boolean;
  onClose: () => void;
}

export function MobileSidebar({ open, onClose }: MobileSidebarProps) {
  const pathname = usePathname();
  const { logout } = useUserStore();

  return (
    <>
      {/* Overlay */}
      {open && (
        <div
          className="fixed inset-0 z-[2000] bg-black/50 md:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <div
        className={`fixed top-0 left-0 bottom-0 z-[2001] w-[280px] bg-[#0A0319] flex flex-col transition-transform duration-300 ease-in-out md:hidden ${
          open ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-[20px] py-[20px]">
          <div className="flex items-center gap-[12px]">
            <Menu size={20} className="text-white" />
            <Link href="/dashboard" onClick={onClose}>
              <div className="relative w-[56px] h-[32px]">
                <Image
                  src="/images/logo-white.svg"
                  alt="ARM Prestige Wealth"
                  fill
                  className="object-contain"
                />
              </div>
            </Link>
          </div>
          <button
            onClick={onClose}
            className="w-[32px] h-[32px] flex items-center justify-center"
          >
            <X size={20} className="text-white" />
          </button>
        </div>

        {/* Portfolio Switcher */}
        <div className="px-[20px] mb-[24px]">
          <button
            className="w-full flex items-center gap-[10px] rounded-[12px] px-[12px] py-[10px]"
            style={{
              background: "#FFFFFF33",
              border: "1px solid rgba(255, 255, 255, 0.2)",
            }}
          >
            <div
              className="w-[32px] h-[32px] rounded-full border flex items-center justify-center shrink-0"
              style={{
                backgroundColor: "rgba(255, 255, 255, 0.1)",
                borderColor: "rgba(255, 255, 255, 0.2)",
              }}
            >
              <Image src="/icons/globe.svg" alt="" width={16} height={16} />
            </div>
            <div className="flex flex-col items-start flex-1 min-w-0">
              <span className="text-[10px] font-medium text-white/70 leading-[12px]">
                Switch Portfolio:
              </span>
              <span className="text-[12px] font-semibold text-white leading-[16px] truncate w-full text-left">
                3783899
              </span>
            </div>
            <ChevronDown size={14} className="text-white shrink-0" />
          </button>
        </div>

        {/* Nav Links */}
        <div className="border-t border-white/10 mx-[20px]" />
        <div className="flex flex-col gap-[4px] px-[20px] py-[16px]">
          {sidebarLinks.map((link) => {
            const isActive =
              pathname === link.href || pathname.startsWith(link.href + "/");

            return (
              <Link
                key={link.href}
                href={link.href}
                onClick={onClose}
                className={`px-[16px] py-[12px] rounded-[8px] text-[14px] font-medium leading-[20px] transition-colors ${
                  isActive ? "text-white" : "text-white/60 hover:text-white"
                }`}
                style={{
                  backgroundColor: isActive ? "#FFFFFF33" : "transparent",
                }}
              >
                {link.label}
              </Link>
            );
          })}
        </div>

        {/* Logout */}
        <div className="border-t border-white/10 mx-[20px]" />
        <div className="px-[20px] py-[24px]">
          <button
            onClick={() => {
              logout();
              onClose();
            }}
            className="flex items-center gap-[10px] px-[16px] py-[12px]"
          >
            <LogOut size={18} className="text-[#D92D20]" />
            <span className="text-[14px] font-medium text-primary leading-[20px]">
              Log-out
            </span>
          </button>
        </div>
      </div>
    </>
  );
}
