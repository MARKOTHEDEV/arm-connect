"use client";

import { Suspense, useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { toast } from "sonner";
import { OtpInput } from "./OtpInput";
import { useValidateOtpMutation } from "@/hooks/useValidateOtpMutation";
import { useUserStore } from "@/components/common/user-store";
// TODO: re-add when merchant API endpoints are available
const forgotPassword = async (_data: { email: string }) => ({ success: true, message: "OTP sent" });
const verifyEmail = async (_data: { email: string }) => ({ success: true, message: "Email verified" });
const verifyLoginOtp = async (_data: { email: string; otp: string }) => ({ success: true, message: "OTP verified" });
const validateResetPasswordOtp = async (_data: { identifier: string; otp: string; isActivation: boolean }) => ({ success: true, message: "OTP verified" });
import { ROUTES } from "@/lib/routes";
import { useMutation } from "@tanstack/react-query";

interface VerifyOtpPageProps {
  type: "email" | "phone";
  backHref: string;
  nextHref: string;
  alternateHref: string;
  step: string;
  flow: "forgot-password" | "activate-account" | "first-login";
}

function VerifyOtpContent({
  type,
  backHref,
  nextHref,
  alternateHref,
  step,
  flow,
}: VerifyOtpPageProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { user } = useUserStore();
  const email = flow === "first-login" ? (user?.contactEmail || "") : (searchParams.get("email") || "");
  const phone = searchParams.get("phone") || "+234-81****0957";

  const [otp, setOtp] = useState<string[]>(["", "", "", "", "", ""]);
  const [timer, setTimer] = useState(59);
  const [canResend, setCanResend] = useState(false);
  const [isResending, setIsResending] = useState(false);

  const isEmail = type === "email";
  const displayValue = isEmail ? email : phone;

  const validateOtpMutation = useValidateOtpMutation({
    onSuccess: () => {
      router.push(`${nextHref}?email=${encodeURIComponent(email)}`);
    },
  });

  const verifyLoginOtpMutation = useMutation({
    mutationFn: (data: { email: string; otp: string }) => verifyLoginOtp(data),
    onSuccess: (response) => {
      if (!response.success) {
        toast.error(response.message || "Invalid OTP.");
        return;
      }
      toast.success(response.message || "OTP verified successfully.");
      router.push(`${nextHref}?email=${encodeURIComponent(email)}`);
    },
    onError: (error: { response?: { data?: { message?: string } } }) => {
      const message = error.response?.data?.message || "OTP verification failed. Please try again.";
      toast.error(message);
    },
  });

  const validateResetPasswordOtpMutation = useMutation({
    mutationFn: (data: { identifier: string; otp: string; isActivation: boolean }) => validateResetPasswordOtp(data),
    onSuccess: (response) => {
      if (!response.success) {
        toast.error(response.message || "Invalid OTP.");
        return;
      }
      toast.success(response.message || "OTP verified successfully.");
      router.push(`${nextHref}?email=${encodeURIComponent(email)}`);
    },
    onError: (error: { response?: { data?: { message?: string } } }) => {
      const message = error.response?.data?.message || "OTP verification failed. Please try again.";
      toast.error(message);
    },
  });

  useEffect(() => {
    if (timer > 0) {
      const interval = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);
      return () => clearInterval(interval);
    } else {
      setCanResend(true);
    }
  }, [timer]);

  const handleResend = async () => {
    if (!canResend) return;

    if (email) {
      setIsResending(true);
      try {
        let response;
        if (flow === "forgot-password") {
          response = await forgotPassword({ email });
        } else {
          response = await verifyEmail({ email });
        }
        if (response.success) {
          toast.success(response.message || "OTP resent to your email.");
        } else {
          toast.error(response.message || "Failed to resend OTP.");
        }
      } catch {
        toast.error("Failed to resend OTP. Please try again.");
      } finally {
        setIsResending(false);
      }
    }

    setTimer(59);
    setCanResend(false);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const otpValue = otp.join("");
    if (otpValue.length !== 6) return;

    if (flow === "first-login") {
      verifyLoginOtpMutation.mutate({
        email,
        otp: otpValue,
      });
    } else if (flow === "forgot-password") {
      validateResetPasswordOtpMutation.mutate({
        identifier: email,
        otp: otpValue,
        isActivation: false,
      });
    } else {
      validateOtpMutation.mutate({
        identifier: email,
        otp: otpValue,
        isActivation: false,
      });
    }
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, "0")}s`;
  };

  const isLoading = validateOtpMutation.isPending || verifyLoginOtpMutation.isPending || validateResetPasswordOtpMutation.isPending;

  return (
    <div className="w-full max-w-[487px] border border-card-stroke rounded-[10px] p-[32px] overflow-hidden">
      <div className="flex flex-col gap-[24px]">
        {/* Header Row */}
        <div className="flex items-center justify-between">
          <Link
            href={backHref.includes("?") ? backHref : `${backHref}${email ? `?email=${encodeURIComponent(email)}` : ""}`}
            className="w-[40px] h-[40px] rounded-full bg-[#F2F4F7] flex items-center justify-center"
          >
            <ArrowLeft
              className="text-[#0D111C] w-[20px] h-[20px]"
              strokeWidth={2}
            />
          </Link>
          <span className="bg-[#F7F7F7] text-[12px] font-[700] text-text-header rounded-full px-[16px] h-[28px] flex items-center justify-center">
            {step}
          </span>
        </div>

        {/* Illustration */}
        <div className="w-[88px] h-[84px] relative">
          <Image
            src={`/images/${isEmail ? "email" : "phone"}-verify-icon.png`}
            alt={`Verify ${isEmail ? "Email" : "Phone"}`}
            fill
            className="object-contain block w-[88px] h-[84px]"
          />
        </div>

        {/* Title & Description */}
        <div className="flex flex-col gap-[8px]">
          <h1 className="font-bold text-[24px] text-text-header leading-[28px] pb-[24px]">
            Verify your {isEmail ? "email address" : "phone number"}
          </h1>
          <p className="font-normal text-[14px] text-text-body leading-[20px]">
            Enter the 6-digits code we sent to your {isEmail ? "email" : "phone"}
          </p>
          <p className="font-semibold text-[16px] text-text-header leading-[20px]">
            {displayValue}
          </p>
        </div>

        {/* OTP Input */}
        <form onSubmit={handleSubmit} className="flex flex-col gap-[24px]">
          <OtpInput value={otp} onChange={setOtp} />

          {/* Helper Text */}
          <p className="font-normal text-[13px] text-text-body leading-[18px]">
            {isEmail
              ? "If you haven't received an email in 3 minutes, check your spam or resend or send to phone number"
              : "If you haven't received an SMS in 3 minutes, try to resend or send to email address"}
          </p>

          {/* Timer & Actions */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-[16px]">
              <span className="text-[14px] font-medium text-text-header">
                {formatTime(timer)}
              </span>
              <button
                type="button"
                onClick={handleResend}
                disabled={!canResend || isResending}
                className={`text-[14px] font-semibold ${canResend ? "text-primary" : "text-primary disabled:opacity-70"}`}
              >
                {isResending ? "Sending..." : "Resend"}
              </button>
            </div>
            <Link
              href={`${alternateHref}?email=${encodeURIComponent(email)}`}
              className="text-[14px] font-semibold text-[#8D9DA8]"
            >
              Send to {isEmail ? "phone number" : "email address"}
            </Link>
          </div>

          {/* Continue Button */}
          <button
            type="submit"
            disabled={isLoading || otp.join("").length !== 6}
            className="w-full h-[48px] bg-primary rounded-[4px] flex items-center justify-center overflow-hidden px-[16px] py-[12px] disabled:opacity-70"
          >
            <span className="font-semibold text-[14px] text-white text-center leading-normal">
              {isLoading ? "Verifying..." : "Continue"}
            </span>
          </button>
        </form>
      </div>
    </div>
  );
}

export function VerifyOtpPage(props: VerifyOtpPageProps) {
  return (
    <Suspense
      fallback={
        <div className="w-full max-w-[487px] flex items-center justify-center p-[32px]">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary" />
        </div>
      }
    >
      <VerifyOtpContent {...props} />
    </Suspense>
  );
}
