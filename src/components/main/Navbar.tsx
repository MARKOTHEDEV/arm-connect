"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { ChevronDown } from "lucide-react";

const navLinks = [
  { label: "Dashboard", href: "/dashboard" },
  { label: "Products", href: "/products" },
  { label: "Transactions", href: "/transactions" },
  { label: "Developers/ API", href: "/developers" },
  { label: "Contact Us", href: "/contact" },
];

export function Navbar() {
  const pathname = usePathname();

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

        {/* User */}
        <div className="flex items-center gap-[9px]">
          <span className="text-[14px] font-semibold text-text-header leading-[20px]">
            Babatunde Ijesha
          </span>
          <ChevronDown className="w-[18px] h-[18px] text-text-header" />
        </div>
      </div>
    </nav>
  );
}
