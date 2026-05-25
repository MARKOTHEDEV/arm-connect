"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { ChevronDown, LogOut } from "lucide-react";
import { useUserStore } from "@/components/common/user-store";
import { ROUTES } from "@/lib/routes";

const navLinks = [
  { label: "Dashboard", href: "/dashboard" },
  { label: "Products", href: "/products" },
  { label: "Transactions", href: "/transactions" },
  { label: "Developers/ API", href: "/developers" },
  { label: "Contact Us", href: "/contact" },
];

export function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const { user, logout } = useUserStore();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = () => {
    logout();
    router.push(ROUTES.LOGIN);
  };

  return (
    <nav className="w-full bg-white border-b border-[#eaecf0] py-[12px] px-[24px] flex items-center justify-between">
      {/* Logo */}
      <Link href="/dashboard" className="flex flex-col items-center w-[92px]">
        <div className="relative w-[92px] h-[29px]">
          <Image
            src="/images/logo-arm-connect.png"
            alt="ARM Connect"
            fill
            className="object-contain"
          />
        </div>
        <div className="w-full bg-black border border-[#ebebeb] flex items-center justify-center gap-[4px] px-[8px] py-[2px] shadow-[0px_1px_2px_0px_rgba(16,24,40,0.05)]">
          <span className="text-[10px] font-light text-white tracking-[0.4px] leading-[20px] h-[12px] flex items-center justify-center">
            CONNECT
          </span>
        </div>
      </Link>

      {/* Nav Links + User */}
      <div className="flex items-center gap-[40px] h-[40px]">
        {navLinks.map((link) => {
          const isActive = pathname === link.href || pathname.startsWith(link.href + "/");

          return (
            <Link
              key={link.href}
              href={link.href}
              className={`h-full flex items-center justify-center px-[12px] text-[16px] leading-[24px] ${
                isActive
                  ? "font-bold text-primary border-b-2 border-primary"
                  : "font-medium text-text-body-2"
              }`}
            >
              {link.label}
            </Link>
          );
        })}

        {/* User Dropdown */}
        <div className="relative" ref={dropdownRef}>
          <button
            onClick={() => setDropdownOpen(!dropdownOpen)}
            className="flex items-center gap-[9px]"
          >
            <span className="text-[14px] font-semibold text-text-header leading-[20px]">
              {user?.businessName || "User"}
            </span>
            <ChevronDown className={`w-[18px] h-[18px] text-text-header transition-transform ${dropdownOpen ? "rotate-180" : ""}`} />
          </button>

          {dropdownOpen && (
            <div className="absolute right-0 top-[40px] w-[200px] bg-white border border-card-stroke rounded-[8px] shadow-lg z-50 overflow-hidden">
              <button
                onClick={handleLogout}
                className="w-full flex items-center gap-[10px] px-[16px] py-[12px] hover:bg-[#f9fafb] transition-colors text-left"
              >
                <LogOut className="w-[16px] h-[16px] text-[#d92d20]" />
                <span className="text-[14px] font-medium text-[#d92d20]">Logout</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}
