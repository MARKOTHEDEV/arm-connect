"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { ArrowLeft, Lock } from "lucide-react";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import {
  PasswordInput,
  PasswordCriteriaList,
  usePasswordValidation,
} from "@/components/auth/PasswordWithCriteria";
import { SignupSuccessModal } from "@/components/auth/SignupSuccessModal";
import { useSignupStore } from "@/components/auth/signup-store";
import { registerUser } from "@/lib/services/auth";
import { ROUTES } from "@/lib/routes";

export default function SignupCreatePasswordPage() {
  const router = useRouter();
  const { businessName, firstName, lastName, email, phoneNumber, clear } = useSignupStore();

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const allCriteriaPassed = usePasswordValidation(password);
  const passwordsMatch = password === confirmPassword && confirmPassword !== "";
  const canSubmit = allCriteriaPassed && passwordsMatch;

  useEffect(() => {
    if (!email && !showSuccess) {
      router.replace("/signup");
    }
  }, [email, showSuccess, router]);

  const registerMutation = useMutation({
    mutationFn: registerUser,
    onSuccess: (response) => {
      if (!response.success && !response.status) {
        toast.error(response.message || "Registration failed.");
        return;
      }
      setShowSuccess(true);
      // clear store after showing modal, not before
    },
    onError: (error: { response?: { data?: { message?: string } } }) => {
      toast.error(error.response?.data?.message || "Registration failed. Please try again.");
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!canSubmit) return;
    registerMutation.mutate({
      businessName,
      contactEmail: email,
      firstName,
      lastName,
      contactPhone: phoneNumber,
      password,
      callbackUrl: "",
    });
  };

  if (!email) return null;

  return (
    <div className="w-full max-w-[487px] bg-white border border-card-stroke rounded-[10px] p-[32px] overflow-hidden mx-auto">
      <div className="flex flex-col gap-[24px]">
        {/* Back Button */}
        <div className="flex items-center">
          <Link
            href="/signup/verify-email"
            className="w-[38px] h-[38px] rounded-full bg-[#ebebeb] flex items-center justify-center"
          >
            <ArrowLeft className="text-[#0D111C] w-[18px] h-[18px]" strokeWidth={2} />
          </Link>
        </div>

        {/* Shield Icon */}
        <div className="w-[75px] h-[85px] relative">
          <Image
            src="/images/security-shield.png"
            alt=""
            fill
            className="object-contain"
          />
        </div>

        {/* Title */}
        <h1 className="font-bold text-[24px] text-text-header leading-[32px]">
          Create a password
        </h1>

        {/* Form */}
        <form onSubmit={handleSubmit} className="flex flex-col gap-[24px]">
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
            disabled={!canSubmit || registerMutation.isPending}
            className="w-full h-[48px] bg-primary rounded-[4px] flex items-center justify-center disabled:opacity-50"
          >
            <span className="font-semibold text-[14px] text-white">
              {registerMutation.isPending ? "Creating account..." : "Continue"}
            </span>
          </button>

          {/* Security Notice */}
          <div className="flex items-center justify-center gap-[4px]">
            <Lock className="w-[16px] h-[16px] text-text-body" />
            <span className="text-[12px] font-medium text-text-body leading-[20px]">
              Keep your transaction password safe to prevent fraud
            </span>
          </div>
        </form>
      </div>

      {showSuccess && (
        <SignupSuccessModal onClose={() => {
          clear();
          router.push(ROUTES.LOGIN);
        }} />
      )}
    </div>
  );
}
