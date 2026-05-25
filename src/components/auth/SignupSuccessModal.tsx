"use client";

import Image from "next/image";
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";

interface SignupSuccessModalProps {
  onClose: () => void;
}

export function SignupSuccessModal({ onClose }: SignupSuccessModalProps) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/50" onClick={onClose} />

      {/* Modal */}
      <div className="relative bg-white border border-card-stroke rounded-[10px] p-[32px] w-[480px] max-w-[90vw] flex flex-col gap-[24px] items-center overflow-hidden">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-[24px] right-[24px] w-[38px] h-[38px] rounded-full bg-[#ebebeb] flex items-center justify-center"
        >
          <X className="w-[20px] h-[20px] text-text-header" strokeWidth={2} />
        </button>

        {/* Success Icon */}
        <div className="w-[120px] h-[120px] relative">
          <Image
            src="/images/verification-success.png"
            alt="Account Created"
            fill
            className="object-contain"
          />
        </div>

        {/* Title + Description */}
        <div className="flex flex-col gap-[8px] items-center text-center">
          <h2 className="font-bold text-[20px] text-text-header leading-[30px]">
            Account Created Successfully!
          </h2>
          <p className="text-[14px] font-medium text-text-body leading-[20px]">
            Your account has been created. You can now log in with your email and password.
          </p>
        </div>

        {/* Login Button */}
        <Button
          onClick={onClose}
          className="w-full h-[48px] rounded-[4px] text-[14px] font-semibold"
        >
          Go to Login
        </Button>
      </div>
    </div>
  );
}
