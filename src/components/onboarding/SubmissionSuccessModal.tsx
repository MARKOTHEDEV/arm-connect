"use client";

import { X } from "lucide-react";
import Image from "next/image";
import { Button } from "@/components/ui/button";

const SUBMITTED_SECTIONS = [
  "KYC Upload & Corporate Information",
  "Contact & Bank Details",
  "Risk & Signatory Details",
  "Mandate & Declaration",
];

interface SubmissionSuccessModalProps {
  onClose: () => void;
}

export function SubmissionSuccessModal({ onClose }: SubmissionSuccessModalProps) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/50" />

      {/* Modal */}
      <div className="relative bg-white border border-card-stroke rounded-[10px] p-[32px] w-[604px] max-w-[90vw] flex flex-col gap-[24px] overflow-hidden">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="w-[38px] h-[38px] rounded-full bg-[#ebebeb] flex items-center justify-center"
        >
          <X className="w-[20px] h-[20px] text-text-header" strokeWidth={2} />
        </button>

        {/* Content */}
        <div className="flex flex-col gap-[39px] items-center">
          {/* Illustration + Title */}
          <div className="flex flex-col gap-[24px] items-center w-full">
            <div className="w-[169px] h-[149px] relative">
              <Image
                src="/images/verification-success.png"
                alt="Verification in progress"
                fill
                className="object-contain"
              />
            </div>
            <div className="flex flex-col gap-[8px] items-center text-center w-full">
              <h2 className="font-bold text-[20px] text-text-header leading-[30px]">
                Account verification & activation in progress
              </h2>
              <p className="text-[14px] font-medium text-text-body leading-[20px]">
                Information received! We&apos;ll notify you once verification is complete.
              </p>
            </div>
          </div>

          {/* Submitted Sections */}
          <div className="flex flex-col gap-[24px] w-full">
            {SUBMITTED_SECTIONS.map((section) => (
              <div
                key={section}
                className="border border-card-stroke rounded-[8px] px-[11px] py-[16px] flex items-center justify-between"
              >
                <p className="font-extrabold text-[16px] text-text-header leading-[28px]">
                  {section}
                </p>
                <span className="bg-[#eff4ff] text-[10px] font-bold text-[#6172f3] leading-[18px] px-[8px] py-[2px] rounded-full">
                  SUBMITTED
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Continue Button */}
        <Button
          onClick={onClose}
          className="w-full h-[48px] rounded-[4px] text-[14px] font-semibold"
        >
          Continue to Dashboard
        </Button>
      </div>
    </div>
  );
}
