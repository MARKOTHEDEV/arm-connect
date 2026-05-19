"use client";

import { useState, useEffect, useCallback } from "react";
import { SideDrawer } from "./side-drawer";
import { OtpInput } from "@/components/auth/OtpInput";

interface OtpVerificationDrawerProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  email: string;
  onVerify: (otp: string) => void;
  onResend?: () => void;
  otpLength?: number;
  countdownSeconds?: number;
  width?: string;
}

function OtpVerificationDrawer({
  open,
  onOpenChange,
  email,
  onVerify,
  onResend,
  otpLength = 6,
  countdownSeconds = 59,
  width,
}: OtpVerificationDrawerProps) {
  const [otp, setOtp] = useState<string[]>(Array(otpLength).fill(""));
  const [countdown, setCountdown] = useState(countdownSeconds);
  const [canResend, setCanResend] = useState(false);

  // Reset state when drawer opens
  useEffect(() => {
    if (open) {
      setOtp(Array(otpLength).fill(""));
      setCountdown(countdownSeconds);
      setCanResend(false);
    }
  }, [open, otpLength, countdownSeconds]);

  // Countdown timer
  useEffect(() => {
    if (!open || canResend) return;

    if (countdown <= 0) {
      setCanResend(true);
      return;
    }

    const timer = setInterval(() => {
      setCountdown((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [open, countdown, canResend]);

  const handleResend = useCallback(() => {
    onResend?.();
    setCountdown(countdownSeconds);
    setCanResend(false);
    setOtp(Array(otpLength).fill(""));
  }, [onResend, countdownSeconds, otpLength]);

  const handleContinue = () => {
    const otpString = otp.join("");
    if (otpString.length === otpLength) {
      onVerify(otpString);
    }
  };

  const isComplete = otp.every((digit) => digit !== "");

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, "0")}s`;
  };

  return (
    <SideDrawer open={open} onOpenChange={onOpenChange} width={width}>
      <div className="flex flex-col gap-[20px]">
        {/* Title */}
        <h2 className="text-[20px] font-bold text-text-header leading-[28px]">
          Verification code
        </h2>

        {/* Description with email */}
        <div className="flex flex-col gap-[4px]">
          <p className="text-[13px] font-normal text-text-body leading-[18px]">
            Enter the 6-digits code we sent to your email
          </p>
          <p className="text-[14px] font-bold text-text-header leading-[20px]">
            {email}
          </p>
        </div>

        {/* OTP Input */}
        <OtpInput value={otp} onChange={setOtp} length={otpLength} />

        {/* Help text */}
        <p className="text-[12px] font-normal text-text-body leading-[16px]">
          If you haven&apos;t received an email in 3 minutes, check your spam,
          resend
        </p>

        {/* Timer + Resend */}
        <div className="flex items-center gap-[12px]">
          <span className="text-[13px] font-medium text-text-body leading-[18px]">
            {formatTime(countdown)}
          </span>
          <button
            onClick={handleResend}
            disabled={!canResend}
            className={`text-[13px] font-semibold leading-[18px] ${
              canResend
                ? "text-primary hover:underline"
                : "text-primary/40 cursor-not-allowed"
            }`}
          >
            Resend
          </button>
        </div>

        {/* Continue button */}
        <button
          onClick={handleContinue}
          disabled={!isComplete}
          className="w-full h-[48px] bg-primary rounded-[8px] text-white text-[14px] font-semibold hover:bg-primary/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Continue
        </button>
      </div>
    </SideDrawer>
  );
}

export { OtpVerificationDrawer };
