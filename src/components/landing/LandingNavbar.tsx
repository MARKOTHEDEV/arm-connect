"use client";

import Link from "next/link";
import Image from "next/image";
import { ROUTES } from "@/lib/routes";

const navLinks = [
  { label: "Home", href: "/" },
  { label: "Products", href: "#products" },
  { label: "Developers", href: "#developers" },
  { label: "Contact us", href: "#contact" },
];

export function LandingNavbar() {
  return (
    <nav className="w-full bg-white border-b border-[#eaecf0] py-[12px] px-[24px] flex items-center justify-between">
      {/* Logo */}
      <Link href="/" className="flex flex-col items-center w-[92px]">
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

      {/* Nav Links + Login */}
      <div className="flex items-center justify-between w-[726px]">
        {navLinks.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className={`text-[16px] leading-[24px] ${
              link.label === "Home"
                ? "font-bold text-primary"
                : "font-medium text-text-body-2"
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
    </nav>
  );
}
