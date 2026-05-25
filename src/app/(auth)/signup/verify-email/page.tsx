"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { OtpInput } from "@/components/auth/OtpInput";
import { useSignupStore } from "@/components/auth/signup-store";
import { validateOtp, resendOtp } from "@/lib/services/auth";

export default function SignupVerifyEmailPage() {
  const router = useRouter();
  const { email, firstName, lastName } = useSignupStore();

  const [otp, setOtp] = useState<string[]>(["", "", "", "", "", ""]);
  const [timer, setTimer] = useState(59);
  const [canResend, setCanResend] = useState(false);

  useEffect(() => {
    if (!email) {
      router.replace("/signup");
    }
  }, [email, router]);

  useEffect(() => {
    if (timer > 0) {
      const interval = setInterval(() => setTimer((prev) => prev - 1), 1000);
      return () => clearInterval(interval);
    } else {
      setCanResend(true);
    }
  }, [timer]);

  const validateMutation = useMutation({
    mutationFn: validateOtp,
    onSuccess: (response) => {
      if (!response.success && !response.status) {
        toast.error(response.message || "Invalid OTP.");
        return;
      }
      toast.success(response.message || "OTP verified.");
      router.push("/signup/create-password");
    },
    onError: (error: { response?: { data?: { message?: string } } }) => {
      toast.error(error.response?.data?.message || "OTP verification failed.");
    },
  });

  const resendMutation = useMutation({
    mutationFn: resendOtp,
    onSuccess: (response) => {
      if (!response.success && !response.status) {
        toast.error(response.message || "Failed to resend OTP.");
        return;
      }
      toast.success(response.message || "OTP resent to your email.");
      setTimer(59);
      setCanResend(false);
    },
    onError: () => {
      toast.error("Failed to resend OTP.");
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const otpValue = otp.join("");
    if (otpValue.length !== 6) return;
    validateMutation.mutate({
      identifier: email,
      isActivation: false,
      otp: otpValue,
      otpPurpose: "Register",
    });
  };

  const handleResend = () => {
    if (!canResend || resendMutation.isPending) return;
    resendMutation.mutate({
      email,
      firstName,
      lastName,
      source: "",
      otpPurpose: "Register",
    });
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, "0")}s`;
  };

  const otpFilled = otp.join("").length === 6;

  if (!email) return null;

  return (
    <div className="w-full max-w-[487px] bg-white border border-card-stroke rounded-[10px] p-[32px] overflow-hidden mx-auto">
      <div className="flex flex-col gap-[24px]">
        {/* Back Button */}
        <div className="flex items-center">
          <Link
            href="/signup"
            className="w-[38px] h-[38px] rounded-full bg-[#ebebeb] flex items-center justify-center"
          >
            <ArrowLeft className="text-[#0D111C] w-[18px] h-[18px]" strokeWidth={2} />
          </Link>
        </div>

        {/* Email Icon */}
        <div className="w-[88px] h-[84px] relative">
          <Image
            src="/images/email-verify-icon.png"
            alt="Verify Email"
            fill
            className="object-contain"
          />
        </div>

        {/* Title */}
        <h1 className="font-bold text-[20px] text-text-header leading-[30px]">
          Verify your email
        </h1>

        {/* Description */}
        <div className="flex flex-col gap-[24px]">
          <div>
            <p className="text-[14px] font-normal text-[#999ca0] leading-[20px]">
              Enter the 6-digits code we sent to your email
            </p>
            <p className="font-bold text-[20px] text-text-header leading-[30px]">
              {email}
            </p>
          </div>

          {/* OTP Input */}
          <form onSubmit={handleSubmit} className="flex flex-col gap-[24px]">
            <OtpInput value={otp} onChange={setOtp} />

            {/* Helper Text */}
            <p className="text-[14px] font-normal text-[#999ca0] leading-[20px]">
              If you haven&apos;t received an email in 3 minutes, check your spam, resend or try a different email
            </p>

            {/* Timer & Actions */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-[16px]">
                <span className="text-[14px] font-medium text-paragraph-2 leading-[20px]">
                  {formatTime(timer)}
                </span>
                <button
                  type="button"
                  onClick={handleResend}
                  disabled={!canResend || resendMutation.isPending}
                  className="text-[14px] font-bold text-primary leading-[24px] disabled:opacity-50"
                >
                  {resendMutation.isPending ? "Sending..." : "Resend"}
                </button>
              </div>
              <button
                type="button"
                onClick={() => router.push("/signup")}
                className="text-[14px] font-bold text-text-body tracking-[-0.14px] leading-[24px]"
              >
                Try a different email
              </button>
            </div>

            {/* Continue Button */}
            <button
              type="submit"
              disabled={!otpFilled || validateMutation.isPending}
              className="w-full h-[56px] bg-primary rounded-[4px] flex items-center justify-center disabled:opacity-50"
            >
              <span className="font-semibold text-[14px] text-white">
                {validateMutation.isPending ? "Verifying..." : "Continue"}
              </span>
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
