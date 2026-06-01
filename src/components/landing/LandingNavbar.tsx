"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Menu, X } from "lucide-react";
import { ROUTES } from "@/lib/routes";

const navLinks = [
  { label: "Home", href: "/" },
  { label: "Products", href: "#products" },
  { label: "Developers", href: "#developers" },
  { label: "Contact us", href: "#contact" },
];

export function LandingNavbar() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <nav className="w-full bg-white border-b border-[#eaecf0] py-[12px] px-[16px] md:px-[24px]">
      <div className="flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex flex-col items-center w-[72px] md:w-[92px]">
          <div className="relative w-[72px] h-[23px] md:w-[92px] md:h-[29px]">
            <Image src="/images/logo-arm-connect.png" alt="ARM Connect" fill className="object-contain" />
          </div>
          <div className="w-full bg-black border border-[#ebebeb] flex items-center justify-center gap-[4px] px-[6px] py-[1px] md:px-[8px] md:py-[2px] shadow-[0px_1px_2px_0px_rgba(16,24,40,0.05)]">
            <span className="text-[8px] md:text-[10px] font-light text-white tracking-[0.4px] leading-[20px] h-[12px] flex items-center justify-center">
              CONNECT
            </span>
          </div>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center justify-between w-[726px]">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`text-[16px] leading-[24px] ${
                link.label === "Home" ? "font-bold text-primary" : "font-medium text-text-body-2"
              }`}
            >
              {link.label}
            </Link>
          ))}
          <Link
            href={ROUTES.LOGIN}
            className="bg-[#0d111c] text-white font-semibold text-[16px] leading-[1.31] tracking-[-0.48px] px-[48px] py-[12px] rounded-[10px]"
          >
            Login
          </Link>
        </div>

        {/* Mobile Hamburger */}
        <button onClick={() => setMobileOpen(!mobileOpen)} className="md:hidden">
          {mobileOpen ? <X className="w-[24px] h-[24px]" /> : <Menu className="w-[24px] h-[24px]" />}
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="md:hidden flex flex-col gap-[16px] pt-[16px] pb-[8px]">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setMobileOpen(false)}
              className={`text-[16px] leading-[24px] ${
                link.label === "Home" ? "font-bold text-primary" : "font-medium text-text-body-2"
              }`}
            >
              {link.label}
            </Link>
          ))}
          <Link
            href={ROUTES.LOGIN}
            onClick={() => setMobileOpen(false)}
            className="bg-[#0d111c] text-white font-semibold text-[16px] leading-[1.31] tracking-[-0.48px] px-[48px] py-[12px] rounded-[10px] text-center"
          >
            Login
          </Link>
        </div>
      )}
    </nav>
  );
}
