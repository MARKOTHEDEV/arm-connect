"use client";

import { useMemo } from "react";
import Image from "next/image";
import { Check } from "lucide-react";

interface PasswordCriteria {
  label: string;
  test: (password: string) => boolean;
}

const PASSWORD_CRITERIA: PasswordCriteria[] = [
  { label: "At least 8 characters", test: (p) => p.length >= 8 },
  { label: "At least one numeric digit (0-9)", test: (p) => /\d/.test(p) },
  { label: "At least one lower case letter", test: (p) => /[a-z]/.test(p) },
  { label: "At least one upper case letter", test: (p) => /[A-Z]/.test(p) },
  {
    label: "At least one special symbol (@!><|.?*&%$)",
    test: (p) => /[@!><|.?*&%$]/.test(p),
  },
];

interface PasswordInputProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  showPassword: boolean;
  onToggleShow: () => void;
}

export function PasswordInput({
  value,
  onChange,
  placeholder = "Password",
  showPassword,
  onToggleShow,
}: PasswordInputProps) {
  return (
    <div className="w-full border-[1.5px] border-card-stroke rounded-[8px] h-[56px] flex items-center gap-[8px] px-[16px]">
      <input
        type={showPassword ? "text" : "password"}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="flex-1 bg-transparent text-[14px] font-medium text-text-header placeholder:text-forms-input leading-[20px] outline-none"
      />
      <button
        type="button"
        onClick={onToggleShow}
        className="w-[24px] h-[24px] flex items-center justify-center"
      >
        <Image
          src="/icons/eye.svg"
          alt={showPassword ? "Hide password" : "Show password"}
          width={20}
          height={14}
          className="object-contain"
        />
      </button>
    </div>
  );
}

interface PasswordCriteriaListProps {
  password: string;
}

export function PasswordCriteriaList({ password }: PasswordCriteriaListProps) {
  const criteriaStatus = useMemo(() => {
    return PASSWORD_CRITERIA.map((criteria) => ({
      ...criteria,
      passed: criteria.test(password),
    }));
  }, [password]);

  return (
    <div className="border border-card-stroke rounded-[8px] p-[16px] flex flex-col gap-[12px]">
      {criteriaStatus.map((criteria, index) => (
        <div key={index} className="flex items-center gap-[10px]">
          <div
            className={`w-[20px] h-[20px] rounded-full flex items-center justify-center ${
              criteria.passed ? "bg-primary" : "bg-[#E5E7EB]"
            }`}
          >
            <Check className="w-[12px] h-[12px] text-white" strokeWidth={3} />
          </div>
          <span
            className={`text-[14px] leading-[20px] ${
              criteria.passed ? "text-text-header" : "text-text-body"
            }`}
          >
            {criteria.label}
          </span>
        </div>
      ))}
    </div>
  );
}

export function usePasswordValidation(password: string) {
  return useMemo(() => {
    return PASSWORD_CRITERIA.every((criteria) => criteria.test(password));
  }, [password]);
}
