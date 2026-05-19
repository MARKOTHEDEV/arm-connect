"use client";

import { Suspense, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import { ArrowLeft, Lock } from "lucide-react";
import { toast } from "sonner";
import {
  PasswordInput,
  PasswordCriteriaList,
  usePasswordValidation,
} from "./PasswordWithCriteria";
import Cookies from "js-cookie";
import { registerUser, resetPassword } from "@/lib/services/auth";

interface CreatePasswordPageProps {
  title: string;
  subtitle: string;
  backHref: string;
  nextHref: string;
  step: string;
  icon?: string;
  flow?: "activate-account" | "forgot-password" | "first-login";
}

function CreatePasswordContent({
  title,
  subtitle,
  backHref,
  nextHref,
  step,
  icon,
  flow,
}: CreatePasswordPageProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const email = searchParams.get("email") || "";

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const allCriteriaPassed = usePasswordValidation(password);
  const passwordsMatch = password === confirmPassword && confirmPassword !== "";
  const canSubmit = allCriteriaPassed && passwordsMatch;

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!canSubmit) return;

    setIsLoading(true);
    try {
      if (flow === "activate-account") {
        const response = await registerUser({
          email,
          password,
          confirmPassword,
          consentedToShareData: true,
          referralCode: null,
        });
        if (response.success) {
          const token = response.data?.token?.token;
          if (token) {
            Cookies.set("accessToken", token);
          }
          toast.success(response.message || "Account created successfully.");
          router.push(`${nextHref}${nextHref.includes("?") ? "&" : "?"}email=${encodeURIComponent(email)}`);
        } else {
          toast.error(response.message || "Registration failed.");
        }
      } else if (flow === "forgot-password") {
        const response = await resetPassword({
          email,
          newPassword: password,
          confirmPassword,
        });
        if (response.success) {
          toast.success(response.message || "Password reset successfully.");
          router.push(nextHref);
        } else {
          toast.error(response.message || "Password reset failed.");
        }
      } else {
        router.push(`${nextHref}${nextHref.includes("?") ? "&" : "?"}email=${encodeURIComponent(email)}`);
      }
    } catch (error: unknown) {
      const err = error as { response?: { data?: { message?: string } } };
      toast.error(err.response?.data?.message || "Something went wrong. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full max-w-[487px] border border-card-stroke rounded-[10px] p-[32px] overflow-hidden">
      <div className="flex flex-col gap-[24px]">
        {/* Header Row */}
        <div className="flex items-center justify-between">
          <Link
            href={`${backHref}${backHref.includes("?") ? "&" : "?"}email=${encodeURIComponent(email)}`}
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

        {/* Icon */}
        {icon && (
          <div className="w-[75px] h-[85px] relative">
            <Image
              src={icon}
              alt=""
              fill
              className="object-contain"
            />
          </div>
        )}

        {/* Title & Description */}
        <div className="flex flex-col gap-[8px]">
          <h1 className="font-bold text-[24px] text-text-header leading-[32px]">
            {title}
          </h1>
          {subtitle && (
            <p className="font-normal text-[14px] text-text-header leading-[20px]">
              {subtitle}
            </p>
          )}
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="flex flex-col gap-[16px]">
          <PasswordInput
            value={password}
            onChange={setPassword}
            placeholder="Password"
            showPassword={showPassword}
            onToggleShow={() => setShowPassword(!showPassword)}
          />

          <PasswordCriteriaList password={password} />

          <PasswordInput
            value={confirmPassword}
            onChange={setConfirmPassword}
            placeholder="Confirm password"
            showPassword={showConfirmPassword}
            onToggleShow={() => setShowConfirmPassword(!showConfirmPassword)}
          />

          {/* Continue Button */}
          <button
            type="submit"
            disabled={isLoading || !canSubmit}
            className="w-full h-[48px] bg-primary rounded-[4px] flex items-center justify-center overflow-hidden px-[16px] py-[12px] disabled:opacity-70 mt-[8px]"
          >
            <span className="font-semibold text-[14px] text-white text-center leading-normal">
              {isLoading ? "Processing..." : "Continue"}
            </span>
          </button>

          {/* Security Notice */}
          <div className="flex items-center justify-center gap-[8px] mt-[8px]">
            <Lock className="w-[16px] h-[16px] text-text-body" />
            <span className="text-[14px] text-text-body leading-[20px]">
              Keep your transaction password safe to prevent fraud
            </span>
          </div>
        </form>
      </div>
    </div>
  );
}

export function CreatePasswordPage(props: CreatePasswordPageProps) {
  return (
    <Suspense
      fallback={
        <div className="w-full max-w-[487px] flex items-center justify-center p-[32px]">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary" />
        </div>
      }
    >
      <CreatePasswordContent {...props} />
    </Suspense>
  );
}
