"use client";

import { X, ChevronRight } from "lucide-react";

export type OnboardingModel = "b2b" | "b2b2c";

interface ModelSelectionModalProps {
  onSelect: (model: OnboardingModel) => void;
  onClose: () => void;
}

export function ModelSelectionModal({ onSelect, onClose }: ModelSelectionModalProps) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/50" onClick={onClose} />

      {/* Modal */}
      <div className="relative bg-white border border-card-stroke rounded-[10px] p-[32px] w-[560px] max-w-[90vw] flex flex-col gap-[24px] overflow-hidden">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="w-[38px] h-[38px] rounded-full bg-[#ebebeb] flex items-center justify-center"
        >
          <X className="w-[20px] h-[20px] text-text-header" strokeWidth={2} />
        </button>

        {/* Content */}
        <div className="flex flex-col gap-[32px]">
          {/* Header */}
          <div className="flex flex-col gap-[4px]">
            <h2 className="font-bold text-[20px] text-text-header leading-[30px]">
              Choose Your Onboarding Model
            </h2>
            <p className="text-[14px] font-normal text-text-body leading-[20px]">
              Select the approach that best aligns with your operating model.
            </p>
          </div>

          {/* Options */}
          <div className="flex flex-col gap-[24px]">
            <button
              onClick={() => onSelect("b2b")}
              className="w-full border border-card-stroke rounded-[8px] px-[11px] py-[16px] flex items-center justify-between hover:border-primary/40 transition-colors text-left"
            >
              <p className="text-[16px] text-text-header leading-[28px]">
                <span className="font-extrabold">B2B</span>
                <span className="font-semibold"> → Institution-managed client relationships</span>
              </p>
              <ChevronRight className="w-[20px] h-[20px] text-text-header shrink-0" />
            </button>

            <button
              onClick={() => onSelect("b2b2c")}
              className="w-full border border-card-stroke rounded-[8px] px-[11px] py-[16px] flex items-center justify-between hover:border-primary/40 transition-colors text-left"
            >
              <p className="text-[16px] text-text-header leading-[28px]">
                <span className="font-extrabold">B2B2C</span>
                <span className="font-semibold"> → Client-level onboarding and visibility</span>
              </p>
              <ChevronRight className="w-[20px] h-[20px] text-text-header shrink-0" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
