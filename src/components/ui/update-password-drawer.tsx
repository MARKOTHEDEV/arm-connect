"use client";

import { useState } from "react";
import { SideDrawer } from "./side-drawer";
import {
  PasswordInput,
  PasswordCriteriaList,
  usePasswordValidation,
} from "@/components/auth/PasswordWithCriteria";

interface UpdatePasswordDrawerProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: (data: {
    currentPassword: string;
    newPassword: string;
  }) => void;
  width?: string;
}

function UpdatePasswordDrawer({
  open,
  onOpenChange,
  onSubmit,
  width,
}: UpdatePasswordDrawerProps) {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showCurrent, setShowCurrent] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const isPasswordValid = usePasswordValidation(newPassword);
  const passwordsMatch = newPassword === confirmPassword && confirmPassword !== "";
  const isComplete =
    currentPassword !== "" && isPasswordValid && passwordsMatch;

  const handleSubmit = () => {
    if (isComplete) {
      onSubmit({ currentPassword, newPassword });
    }
  };

  return (
    <SideDrawer open={open} onOpenChange={onOpenChange} width={width}>
      <div className="flex flex-col gap-[20px]">
        <h2 className="text-[20px] font-bold text-text-header leading-[28px]">
          Update your log in password
        </h2>
        <p className="text-[13px] font-normal text-primary leading-[18px]">
          Set up a new secure password including the following criteria below
        </p>

        {/* Current Password */}
        <PasswordInput
          value={currentPassword}
          onChange={setCurrentPassword}
          placeholder="Current Password"
          showPassword={showCurrent}
          onToggleShow={() => setShowCurrent(!showCurrent)}
        />

        {/* New Password */}
        <PasswordInput
          value={newPassword}
          onChange={setNewPassword}
          placeholder="Password"
          showPassword={showNew}
          onToggleShow={() => setShowNew(!showNew)}
        />

        {/* Password Criteria */}
        <PasswordCriteriaList password={newPassword} />

        {/* Confirm Password */}
        <PasswordInput
          value={confirmPassword}
          onChange={setConfirmPassword}
          placeholder="Confirm password"
          showPassword={showConfirm}
          onToggleShow={() => setShowConfirm(!showConfirm)}
        />

        {/* Continue button */}
        <button
          onClick={handleSubmit}
          disabled={!isComplete}
          className="w-full h-[48px] bg-primary rounded-[8px] text-white text-[14px] font-semibold hover:bg-primary/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Continue
        </button>
      </div>
    </SideDrawer>
  );
}

export { UpdatePasswordDrawer };
