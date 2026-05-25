"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { CountryCodeSelect, DEFAULT_COUNTRY, type Country } from "@/components/auth/CountryCodeSelect";
import { useSignupStore } from "@/components/auth/signup-store";
import { validateSignup } from "@/lib/services/auth";
import { ROUTES } from "@/lib/routes";

const signupSchema = z.object({
  businessName: z.string().min(1, "Business name is required"),
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  email: z.string().min(1, "Email is required").email("Enter a valid email"),
  phone: z.string().min(1, "Phone number is required"),
});

type SignupFormData = z.infer<typeof signupSchema>;

export default function SignupPage() {
  const router = useRouter();
  const [selectedCountry, setSelectedCountry] = useState<Country>(DEFAULT_COUNTRY);
  const { setSignupData } = useSignupStore();

  const {
    register,
    handleSubmit,
    formState: { isValid },
  } = useForm<SignupFormData>({
    resolver: zodResolver(signupSchema),
    mode: "onChange",
  });

  const validateMutation = useMutation({
    mutationFn: validateSignup,
    onSuccess: (response, variables) => {
      if (!response.success && !response.status) {
        toast.error(response.message || "Validation failed.");
        return;
      }
      toast.success(response.message || "OTP sent to your email.");
      router.push("/signup/verify-email");
    },
    onError: (error: { response?: { data?: { message?: string } } }) => {
      toast.error(error.response?.data?.message || "Something went wrong. Please try again.");
    },
  });

  const onSubmit = (data: SignupFormData) => {
    const payload = {
      businessName: data.businessName,
      firstName: data.firstName,
      lastName: data.lastName,
      email: data.email,
      phoneNumber: data.phone,
    };
    setSignupData(payload);
    validateMutation.mutate(payload);
  };

  return (
    <div className="w-full max-w-[487px] mx-auto">
      {/* Top right link */}
      <div className="flex justify-end mb-8">
        <p className="text-[12px] text-[#6b7280] font-medium leading-[18px]">
          Already have an account?{" "}
          <Link
            href={ROUTES.LOGIN}
            className="text-[14px] font-bold text-primary leading-[20px]"
          >
            Log in
          </Link>
        </p>
      </div>

      {/* Signup Card */}
      <div className="border border-card-stroke rounded-[10px] p-[32px] overflow-hidden">
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-[24px]">
          {/* Title */}
          <div className="flex flex-col gap-[8px]">
            <h1 className="font-bold text-[24px] text-text-header leading-[28px]">
              Welcome, let&apos;s get to know you
            </h1>
          </div>

          {/* Form Fields */}
          <div className="flex flex-col gap-[24px]">
            {/* Business Name */}
            <div className="flex flex-col gap-[8px]">
              <div className="w-full border-[1.5px] border-card-stroke rounded-[6px] h-[56px] flex items-center px-[16px]">
                <input
                  type="text"
                  placeholder="Business Name"
                  className="flex-1 bg-transparent text-[12px] font-medium text-text-header placeholder:text-forms-input leading-[18px] outline-none"
                  {...register("businessName")}
                />
              </div>
              <p className="text-[11px] font-medium text-text-body leading-[18px]">
                Please enter the corrected registered Business Name
              </p>
            </div>

            {/* First Name + Last Name */}
            <div className="flex flex-col gap-[4px]">
              <div className="flex gap-[12px]">
                <div className="flex-1 border-[1.5px] border-card-stroke rounded-[8px] h-[56px] flex items-center px-[16px]">
                  <input
                    type="text"
                    placeholder="First name"
                    className="flex-1 bg-transparent text-[12px] font-medium text-text-header placeholder:text-forms-input leading-[18px] outline-none"
                    {...register("firstName")}
                  />
                </div>
                <div className="flex-1 border-[1.5px] border-card-stroke rounded-[8px] h-[56px] flex items-center px-[16px]">
                  <input
                    type="text"
                    placeholder="Last name"
                    className="flex-1 bg-transparent text-[12px] font-medium text-text-header placeholder:text-forms-input leading-[18px] outline-none"
                    {...register("lastName")}
                  />
                </div>
              </div>
              <p className="text-[11px] font-medium text-text-body leading-[18px]">
                Please enter the legal names as seen on your government ID
              </p>
            </div>

            {/* Email */}
            <div className="flex flex-col gap-[8px]">
              <div className="w-full border-[1.5px] border-card-stroke rounded-[6px] h-[56px] flex items-center px-[16px]">
                <input
                  type="email"
                  placeholder="E-mail address"
                  className="flex-1 bg-transparent text-[12px] font-medium text-text-header placeholder:text-forms-input leading-[18px] outline-none"
                  {...register("email")}
                />
              </div>
              <p className="text-[11px] font-medium text-text-body leading-[18px]">
                You will be required to verify this your email
              </p>
            </div>

            {/* Phone Number */}
            <div className="flex gap-[12px]">
              <CountryCodeSelect
                selected={selectedCountry}
                onChange={setSelectedCountry}
              />
              <div className="flex-1 border-[1.5px] border-card-stroke rounded-[8px] h-[56px] flex items-center px-[16px]">
                <input
                  type="tel"
                  placeholder="Phone number"
                  className="flex-1 bg-transparent text-[12px] font-medium text-text-header placeholder:text-forms-input leading-[18px] outline-none"
                  {...register("phone")}
                />
              </div>
            </div>
          </div>

          {/* Terms */}
          <div className="flex items-start justify-center">
            <p className="text-[12px] font-semibold text-text-body leading-[18px] text-center w-[353px]">
              By clicking on continue, I agree to ARM One&apos;s{" "}
              <span className="text-black underline">Terms and Conditions</span>{" "}
              and acknowledge{" "}
              <span className="text-black">the </span>
              <span className="text-black underline">Privacy Policy</span>
            </p>
          </div>

          {/* Submit Button */}
          <Button
            type="submit"
            disabled={!isValid || validateMutation.isPending}
            isLoading={validateMutation.isPending}
            className="w-full h-[48px] rounded-[4px] text-[14px] font-semibold disabled:opacity-50"
          >
            Agree and Continue
          </Button>
        </form>
      </div>
    </div>
  );
}
