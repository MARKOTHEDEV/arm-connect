"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Menu, LogOut } from "lucide-react";
import { useUserStore } from "@/components/common/user-store";
import { MobileSidebar } from "./MobileSidebar";

const navLinks = [
  { label: "Dashboard", href: "/dashboard" },
];

function getUserInitials(firstName?: string | null, lastName?: string | null) {
  const first = firstName?.charAt(0)?.toUpperCase() ?? "";
  const last = lastName?.charAt(0)?.toUpperCase() ?? "";
  return first + last || "U";
}

export function Navbar() {
  const pathname = usePathname();
  const { user, logout } = useUserStore();
  const initials = getUserInitials(user?.firstname, user?.lastname);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <>
      <nav className="w-full h-[72px] flex items-center justify-between px-[16px] md:px-[40px] bg-[#0A0319]">
        {/* Left: Hamburger (mobile) + Logo + Nav Links (desktop) */}
        <div className="flex items-center gap-[12px] md:gap-[48px]">
          {/* Hamburger - mobile only */}
          <button
            onClick={() => setSidebarOpen(true)}
            className="flex items-center justify-center md:hidden"
          >
            <Menu size={22} className="text-white" />
          </button>

          {/* Logo */}
          <Link href="/dashboard" className="flex flex-col items-start shrink-0">
            <div className="relative w-[56px] h-[32px]">
              <Image
                src="/images/logo-white.svg"
                alt="ARM Connect"
                fill
                className="object-contain"
              />
            </div>
          </Link>

          {/* Navigation Links - desktop only */}
          <div className="hidden md:flex items-center gap-[8px]">
            {navLinks.map((link) => {
              const isActive =
                pathname === link.href || pathname.startsWith(link.href + "/");

              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`px-[20px] py-[8px] rounded-[6px] text-[14px] font-medium leading-[20px] transition-colors ${
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
        </div>

        {/* Right: Icons + Avatar */}
        <div className="flex items-center gap-[12px]">
          {/* Notification Bell */}
          <button
            className="w-[40px] h-[40px] rounded-full border flex items-center justify-center hover:opacity-80 transition-opacity"
            style={{
              backgroundColor: "#FFFFFF33",
              borderColor: "rgba(255, 255, 255, 0.2)",
            }}
          >
            <Image
              src="/icons/bell.svg"
              alt="Notifications"
              width={18}
              height={18}
            />
          </button>

          {/* Settings Gear - desktop only */}
          <Link
            href="/settings"
            className="hidden md:flex w-[40px] h-[40px] rounded-full border items-center justify-center hover:opacity-80 transition-opacity"
            style={{
              backgroundColor: "#FFFFFF33",
              borderColor: "rgba(255, 255, 255, 0.2)",
            }}
          >
            <Image src="/icons/gear.svg" alt="Settings" width={18} height={18} />
          </Link>

          {/* User Avatar */}
          <div className="w-[40px] h-[40px] rounded-full bg-primary flex items-center justify-center">
            <span className="text-[14px] font-bold text-white leading-none">
              {initials}
            </span>
          </div>

          {/* Logout - desktop only */}
          <button
            onClick={logout}
            className="hidden md:flex w-[40px] h-[40px] rounded-full border items-center justify-center hover:opacity-80 transition-opacity"
            style={{
              backgroundColor: "#FFFFFF33",
              borderColor: "rgba(255, 255, 255, 0.2)",
            }}
          >
            <LogOut size={18} className="text-[#D92D20]" />
          </button>
        </div>
      </nav>

      {/* Mobile Sidebar */}
      <MobileSidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />
    </>
  );
}
