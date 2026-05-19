import Link from "next/link";

export function Footer() {
  return (
    <footer className="w-full flex items-center justify-between px-[40px] py-[24px] ">
      <p className="text-[14px] font-[400] text-[#667085] leading-[18px]">
        &copy; Copyright 2026. ARM Holding Company. All Rights Reserved.
      </p>
      <Link
        href="/support"
        className="text-[14px] font-[400] text-[#667085] leading-[18px] hover:underline"
      >
        Contact support
      </Link>
    </footer>
  );
}
