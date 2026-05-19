"use client";

export function DarkSection({ children }: { children: React.ReactNode }) {
  return (
    <div className="px-[40px] pt-[32px] pb-[80px] flex flex-col gap-[24px] bg-[#0A0319] min-h-[257px] shrink-0">
      {children}
    </div>
  );
}
