"use client";

import * as React from "react";
import * as DialogPrimitive from "@radix-ui/react-dialog";
import { X } from "lucide-react";
import { cn } from "@/lib/utils";

interface SideDrawerProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  children: React.ReactNode;
  className?: string;
  title?: string;
  description?: string;
  width?: string;
}

function SideDrawer({
  open,
  onOpenChange,
  children,
  className,
  title,
  description,
  width = "483px",
}: SideDrawerProps) {
  return (
    <DialogPrimitive.Root open={open} onOpenChange={onOpenChange}>
      <DialogPrimitive.Portal>
        {/* Overlay */}
        <DialogPrimitive.Overlay className="fixed inset-0 z-[1500] bg-black/50 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0" />

        {/* Content */}
        <DialogPrimitive.Content
          className={cn(
            "fixed z-[1500] bg-white shadow-lg focus:outline-none flex flex-col w-full",
            // Mobile: bottom sheet
            "inset-x-0 bottom-0 top-auto max-h-[90vh] rounded-t-[20px]",
            "data-[state=open]:animate-in data-[state=closed]:animate-out",
            "data-[state=closed]:slide-out-to-bottom data-[state=open]:slide-in-from-bottom",
            // Desktop: floating right side drawer with margin
            "md:inset-auto md:right-[23px] md:top-[23px] md:bottom-[23px] md:max-h-none md:rounded-none md:w-auto",
            "md:data-[state=closed]:slide-out-to-right md:data-[state=open]:slide-in-from-right",
            "md:data-[state=closed]:slide-out-to-bottom-0 md:data-[state=open]:slide-in-from-bottom-0",
            className,
          )}
          style={{ minWidth: width }}
        >
          {/* Header */}
          <div className="flex items-start justify-between p-[24px] pb-[16px] shrink-0">
            <div className="flex flex-col gap-[8px] flex-1 pr-[32px]">
              {title && (
                <DialogPrimitive.Title className="text-[20px] font-bold text-text-header leading-[28px]">
                  {title}
                </DialogPrimitive.Title>
              )}
              {description && (
                <DialogPrimitive.Description className="text-[13px] font-normal text-text-body leading-[18px]">
                  {description}
                </DialogPrimitive.Description>
              )}
            </div>

            <DialogPrimitive.Close className="w-[32px] h-[32px] rounded-full flex items-center justify-center hover:bg-gray-100 transition-colors shrink-0">
              <X size={18} className="text-text-header" />
            </DialogPrimitive.Close>
          </div>

          {/* Scrollable content */}
          <div className="flex-1 overflow-y-auto px-[24px] pb-[24px]">
            {children}
          </div>
        </DialogPrimitive.Content>
      </DialogPrimitive.Portal>
    </DialogPrimitive.Root>
  );
}

export { SideDrawer };
