"use client";

import * as React from "react";
import * as DialogPrimitive from "@radix-ui/react-dialog";
import { X } from "lucide-react";
import { cn } from "@/lib/utils";

function DefaultErrorIcon() {
  return (
    <div className="w-[56px] h-[56px] rounded-full bg-error/10 flex items-center justify-center">
      <div className="w-[40px] h-[40px] rounded-full bg-error flex items-center justify-center">
        <X size={22} className="text-white" />
      </div>
    </div>
  );
}

interface ResponsiveModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  children: React.ReactNode;
  className?: string;
  icon?: React.ReactNode;
  showIcon?: boolean;
  maxWidth?: string;
}

function ResponsiveModal({
  open,
  onOpenChange,
  children,
  className,
  icon,
  showIcon = true,
  maxWidth = "400px",
}: ResponsiveModalProps) {
  return (
    <DialogPrimitive.Root open={open} onOpenChange={onOpenChange}>
      <DialogPrimitive.Portal>
        {/* Overlay */}
        <DialogPrimitive.Overlay className="fixed inset-0 z-[1500] bg-black/50 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0" />

        {/* Content */}
        <DialogPrimitive.Content
          className={cn(
            "fixed z-[1500] bg-white shadow-lg focus:outline-none",
            // Mobile: bottom drawer
            "inset-x-0 bottom-0 rounded-t-[20px] p-[24px] pb-[32px]",
            "data-[state=open]:animate-in data-[state=closed]:animate-out",
            "data-[state=closed]:slide-out-to-bottom data-[state=open]:slide-in-from-bottom",
            // Desktop: centered modal
            "md:inset-auto md:left-1/2 md:top-1/2 md:-translate-x-1/2 md:-translate-y-1/2",
            "md:rounded-[16px] md:w-full md:p-[16px]",
            "md:data-[state=closed]:slide-out-to-bottom-0 md:data-[state=open]:slide-in-from-bottom-0",
            "md:data-[state=closed]:zoom-out-95 md:data-[state=open]:zoom-in-95",
            "md:data-[state=closed]:fade-out-0 md:data-[state=open]:fade-in-0",
            className,
          )}
          style={{ maxWidth: `${maxWidth}` }}
        >
          {/* Close button */}
          <DialogPrimitive.Close className="absolute right-[16px] top-[16px] w-[32px] h-[32px] rounded-full flex items-center justify-center hover:bg-gray-100 transition-colors">
            <X size={18} className="text-text-header" />
          </DialogPrimitive.Close>

          {/* Drag handle - mobile only */}
          <div className="flex justify-center mb-[12px] md:hidden">
            <div className="w-[40px] h-[4px] rounded-full bg-gray-300" />
          </div>

          {/* Icon */}
          {showIcon && (
            <div className="flex justify-center mb-[16px] mt-[18px]">
              {icon ?? <DefaultErrorIcon />}
            </div>
          )}

          <div>{children}</div>
        </DialogPrimitive.Content>
      </DialogPrimitive.Portal>
    </DialogPrimitive.Root>
  );
}

function ResponsiveModalTitle({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <DialogPrimitive.Title
      className={cn(
        "text-[18px] font-bold text-text-header leading-[28px] text-center",
        className,
      )}
    >
      {children}
    </DialogPrimitive.Title>
  );
}

function ResponsiveModalDescription({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <DialogPrimitive.Description
      className={cn(
        "text-[14px] font-normal text-text-body leading-[20px] text-center",
        className,
      )}
    >
      {children}
    </DialogPrimitive.Description>
  );
}

export { ResponsiveModal, ResponsiveModalTitle, ResponsiveModalDescription };
