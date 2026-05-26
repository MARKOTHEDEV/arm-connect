"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { useLoginMutation } from "@/hooks/useLoginMutation";
import { ROUTES } from "@/lib/routes";

const loginSchema = z.object({
  email: z.string().min(1, "Email is required").email("Enter a valid email"),
  password: z.string().min(1, "Password is required"),
});

type LoginFormData = z.infer<typeof loginSchema>;

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const loginMutation = useLoginMutation();

  const {
    register,
    handleSubmit,
    formState: { isValid },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    mode: "onChange",
  });

  const onSubmit = (data: LoginFormData) => {
    loginMutation.mutate(data);
  };

  return (
    <div className="w-full max-w-[487px] mx-auto">
      {/* Top right link */}
      <div className="flex justify-end mb-8">
        <p className="text-[12px] text-[#6b7280] font-medium leading-[18px]">
          Don&apos;t have an account yet?{" "}
          <Link
            href="/signup"
            className="text-[14px] font-bold text-primary leading-[20px]"
          >
            Sign Up
          </Link>
        </p>
      </div>

      {/* Login Card */}
      <div className="bg-white border border-card-stroke rounded-[10px] p-[32px] flex flex-col gap-[10px]">
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-[24px] w-full">
          {/* Header + Form */}
          <div className="flex flex-col gap-[24px] w-full">
            {/* Title */}
            <h1 className="font-bold text-[24px] text-text-header leading-[32px]">
              Welcome back
            </h1>

            {/* Form Fields */}
            <div className="flex flex-col gap-[24px] w-full">
              {/* Email Field */}
              <div className="flex flex-col gap-[12px] w-full">
                <label className="text-[14px] font-normal text-text-body leading-[20px]">
                  Enter Email address
                </label>
                <div className="w-full border border-card-stroke rounded-[8px] h-[56px] flex items-center px-[16px]">
                  <input
                    type="email"
                    placeholder="E-mail address"
                    className="flex-1 bg-transparent text-[12px] font-medium text-text-header placeholder:text-forms-input leading-[18px] outline-none"
                    {...register("email")}
                  />
                </div>
              </div>

              {/* Password Field */}
              <div className="flex flex-col gap-[12px] w-full">
                <div className="flex flex-col gap-[14px] w-full">
                  <div className="w-full border-[1.5px] border-card-stroke rounded-[8px] h-[56px] flex items-center gap-[8px] px-[16px]">
                    <input
                      type={showPassword ? "text" : "password"}
                      placeholder="Password"
                      className="flex-1 bg-transparent text-[14px] font-medium text-text-header placeholder:text-forms-input leading-[20px] outline-none"
                      {...register("password")}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="w-[24px] h-[24px] flex items-center justify-center"
                    >
                      <Image
                        src={showPassword ? "/icons/eye-off.svg" : "/icons/eye.svg"}
                        alt={showPassword ? "Hide password" : "Show password"}
                        width={20}
                        height={14}
                        className="object-contain"
                      />
                    </button>
                  </div>
                  <Link
                    href={ROUTES.FORGOT_PASSWORD}
                    className="text-[14px] font-medium text-primary leading-[16px] text-right"
                  >
                    Forgot Password?
                  </Link>
                </div>
              </div>
            </div>

            {/* Activate Existing Account */}
            {/* <div className="flex items-center justify-center h-[31px] px-[16px] py-[12px] rounded-[4px]">
              <Link
                href="/activate-account"
                className="text-[14px] font-bold text-primary text-center"
              >
                Activate Existing Account
              </Link>
            </div> */}
          </div>

          {/* Confirm Button */}
          <div className="flex flex-col gap-[31px] items-center w-full">
            <Button
              type="submit"
              disabled={!isValid || loginMutation.isPending}
              isLoading={loginMutation.isPending}
              className="w-full h-[48px] rounded-[4px] text-[14px] font-semibold"
            >
              Confirm
            </Button>
          </div>
        </form>

        {/* Bottom Sign Up Link */}
        <div className="flex items-center justify-center gap-[8px] mt-[10px]">
          <p className="text-[12px] font-medium text-[#6b7280] leading-[18px]">
            Don&apos;t have an account?
          </p>
          <Link
            href="/signup"
            className="text-[14px] font-bold text-primary leading-[20px]"
          >
            Sign up
          </Link>
        </div>
      </div>
    </div>
  );
}
