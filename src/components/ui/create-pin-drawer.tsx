"use client";

import { useState, useEffect } from "react";
import { Lock } from "lucide-react";
import { SideDrawer } from "./side-drawer";
import { OtpInput } from "@/components/auth/OtpInput";

interface CreatePinDrawerProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: (pin: string) => void;
  width?: string;
  showCurrentPin?: boolean;
}

function CreatePinDrawer({
  open,
  onOpenChange,
  onSubmit,
  width,
  showCurrentPin = false,
}: CreatePinDrawerProps) {
  const [currentPin, setCurrentPin] = useState<string[]>(["", "", "", ""]);
  const [pin, setPin] = useState<string[]>(["", "", "", ""]);
  const [confirmPin, setConfirmPin] = useState<string[]>(["", "", "", ""]);

  useEffect(() => {
    if (open) {
      setCurrentPin(["", "", "", ""]);
      setPin(["", "", "", ""]);
      setConfirmPin(["", "", "", ""]);
    }
  }, [open]);

  const newPinsMatch =
    pin.every((d) => d !== "") &&
    confirmPin.every((d) => d !== "") &&
    pin.join("") === confirmPin.join("");

  const isComplete = showCurrentPin
    ? currentPin.every((d) => d !== "") && newPinsMatch
    : newPinsMatch;

  const handleSubmit = () => {
    if (isComplete) {
      onSubmit(pin.join(""));
    }
  };

  return (
    <SideDrawer open={open} onOpenChange={onOpenChange} width={width}>
      <div className="flex flex-col gap-[20px]">
        <h2 className="text-[20px] font-bold text-text-header leading-[28px]">
          Create 4-digit PIN
        </h2>
        <p className="text-[13px] font-normal text-text-body leading-[18px]">
          This PIN will be used for transaction
        </p>

        {/* Current PIN */}
        {showCurrentPin && (
          <div className="flex flex-col gap-[8px]">
            <label className="text-[13px] font-semibold text-text-header leading-[18px]">
              Enter Current PIN
            </label>
            <OtpInput
              value={currentPin}
              onChange={setCurrentPin}
              length={4}
              type="password"
            />
          </div>
        )}

        {/* New PIN */}
        <div className="flex flex-col gap-[8px]">
          <label className="text-[13px] font-semibold text-text-header leading-[18px]">
            {showCurrentPin ? "Enter New PIN" : "Enter PIN"}
          </label>
          <OtpInput value={pin} onChange={setPin} length={4} type="password" />
        </div>

        {/* Confirm PIN */}
        <div className="flex flex-col gap-[8px]">
          <label className="text-[13px] font-semibold text-text-header leading-[18px]">
            {showCurrentPin ? "Confirm New PIN" : "Confirm PIN"}
          </label>
          <OtpInput
            value={confirmPin}
            onChange={setConfirmPin}
            length={4}
            type="password"
          />
        </div>

        {/* Continue button */}
        <button
          onClick={handleSubmit}
          disabled={!isComplete}
          className="w-full h-[48px] bg-primary rounded-[8px] text-white text-[14px] font-semibold hover:bg-primary/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Continue
        </button>

        {/* Safety note */}
        <div className="flex items-center justify-center gap-[8px]">
          <Lock size={14} className="text-text-body" />
          <p className="text-[12px] font-normal text-text-body leading-[16px]">
            Keep your transaction PIN safe to prevent fraud
          </p>
        </div>
      </div>
    </SideDrawer>
  );
}

export { CreatePinDrawer };
