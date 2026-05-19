"use client";

import { Suspense, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import { ArrowLeft, Lock } from "lucide-react";
import {
  PasswordInput,
  PasswordCriteriaList,
  usePasswordValidation,
} from "@/components/auth/PasswordWithCriteria";

function CreatePasswordContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const email = searchParams.get("email") || "";

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const allCriteriaPassed = usePasswordValidation(password);
  const passwordsMatch = password === confirmPassword && confirmPassword !== "";
  const canSubmit = allCriteriaPassed && passwordsMatch;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!canSubmit) return;
    router.push("/login");
  };

  return (
    <div className="w-full max-w-[487px] bg-white border border-card-stroke rounded-[10px] p-[32px] overflow-hidden">
      <div className="flex flex-col gap-[24px]">
        {/* Back Button */}
        <div className="flex items-center">
          <Link
            href={`/signup/verify-email?email=${encodeURIComponent(email)}`}
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
            disabled={!canSubmit}
            className="w-full h-[48px] bg-primary rounded-[4px] flex items-center justify-center disabled:opacity-50"
          >
            <span className="font-semibold text-[14px] text-white">
              Continue
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
    </div>
  );
}

export default function SignupCreatePasswordPage() {
  return (
    <Suspense
      fallback={
        <div className="w-full max-w-[487px] flex items-center justify-center p-[32px]">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary" />
        </div>
      }
    >
      <CreatePasswordContent />
    </Suspense>
  );
}
