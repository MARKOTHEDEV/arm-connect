"use client";

import { useRef } from "react";

interface OtpInputProps {
  value: string[];
  onChange: (value: string[]) => void;
  length?: number;
  type?: "text" | "password";
}

export function OtpInput({
  value,
  onChange,
  length = 6,
  type = "text",
}: OtpInputProps) {
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  const handleChange = (index: number, inputValue: string) => {
    if (!/^\d*$/.test(inputValue)) return;

    const newOtp = [...value];
    newOtp[index] = inputValue.slice(-1);
    onChange(newOtp);

    if (inputValue && index < length - 1) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent) => {
    if (e.key === "Backspace" && !value[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handlePaste = (e: React.ClipboardEvent) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData("text").slice(0, length);
    if (!/^\d+$/.test(pastedData)) return;

    const newOtp = [...value];
    pastedData.split("").forEach((char, index) => {
      if (index < length) newOtp[index] = char;
    });
    onChange(newOtp);
  };

  return (
    <div className="flex gap-[12px]" onPaste={handlePaste}>
      {value.map((digit, index) => (
        <input
          key={index}
          ref={(el) => {
            inputRefs.current[index] = el;
          }}
          type={type}
          inputMode="numeric"
          maxLength={1}
          value={digit}
          onChange={(e) => handleChange(index, e.target.value)}
          onKeyDown={(e) => handleKeyDown(index, e)}
          className="w-[60px] h-[60px] border-[1.5px] border-card-stroke rounded-[8px] text-center text-[20px] font-semibold text-text-header outline-none focus:border-primary"
        />
      ))}
    </div>
  );
}
