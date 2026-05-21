"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import Image from "next/image";

const SUB_STEPS = [
  { number: 1, label: "Profile" },
  { number: 2, label: "Address" },
  { number: 3, label: "Verification" },
];

const profileSchema = z.object({
  legalBusinessName: z.string().min(1, "Required"),
  rcNumber: z.string().min(1, "Required"),
  tinVat: z.string().optional(),
  natureOfBusiness: z.string().optional(),
  sector: z.string().optional(),
  companyWebsite: z.string().min(1, "Required"),
  countryOfOperation: z.string().min(1, "Required"),
  incorporationDate: z.string().optional(),
});

type ProfileFormData = z.infer<typeof profileSchema>;

interface CorporateDetailsStepProps {
  subStep: number;
}

export const CORPORATE_DETAILS_SUB_STEP_COUNT = 3;

export function CorporateDetailsStep({ subStep }: CorporateDetailsStepProps) {
  return (
    <div className="flex flex-col gap-[32px]">
      {/* Header */}
      <div className="flex flex-col gap-[4px]">
        <h2 className="font-bold text-[20px] text-text-header leading-[30px]">
          Tell us about your business
        </h2>
        <p className="text-[14px] font-normal text-text-body leading-[20px]">
          As a regulated financial services company, ARM needs to verify your business registration and identity information.
        </p>
      </div>

      {/* Sub-step Progress */}
      <SubStepProgress activeStep={subStep} />

      {/* Sub-step Content */}
      {subStep === 1 && <ProfileSubStep />}
      {subStep === 2 && <AddressSubStep />}
      {subStep === 3 && <VerificationSubStep />}
    </div>
  );
}

function SubStepProgress({ activeStep }: { activeStep: number }) {
  return (
    <div className="flex gap-[12px] items-center pr-[128px]">
      {SUB_STEPS.map((step, i) => {
        const isCompleted = step.number < activeStep;
        const isActive = step.number === activeStep;
        const isFuture = step.number > activeStep;

        return (
          <div key={step.number} className="contents">
            <div className="flex gap-[12px] items-center shrink-0">
              <div
                className={`w-[28px] h-[28px] rounded-full flex items-center justify-center ${
                  isCompleted
                    ? "bg-[#079455]"
                    : isActive
                    ? "bg-primary"
                    : "bg-[#e9ecee]"
                }`}
              >
                <span
                  className={`font-semibold text-[14px] leading-[20px] ${
                    isFuture ? "text-[#b2b9bf]" : "text-white"
                  }`}
                >
                  {step.number}
                </span>
              </div>
              <span
                className={`font-semibold text-[14px] leading-[20px] ${
                  isCompleted
                    ? "text-[#079455]"
                    : isActive
                    ? "text-primary"
                    : "text-[#b2b9bf]"
                }`}
              >
                {step.label}
              </span>
            </div>
            {i < SUB_STEPS.length - 1 && (
              <div className={`flex-1 h-[1px] ${isCompleted ? "bg-[#079455]" : "bg-[#eaecf0]"}`} />
            )}
          </div>
        );
      })}
    </div>
  );
}

function ProfileSubStep() {
  const { register } = useForm<ProfileFormData>({
    resolver: zodResolver(profileSchema),
    mode: "onChange",
  });

  return (
    <div className="flex flex-col gap-[24px]">
      {/* Section Title */}
      <div className="flex flex-col gap-[4px]">
        <h3 className="font-extrabold text-[16px] text-text-header leading-[20px]">
          Corporate Profile
        </h3>
        <p className="text-[14px] font-normal text-paragraph-2 leading-[20px]">
          Fill all details
        </p>
      </div>

      {/* Form Fields */}
      <div className="flex flex-col gap-[24px]">
        {/* Row 1: Legal Business Name + RC Number */}
        <div className="flex gap-[24px]">
          <div className="flex-[2] flex flex-col gap-[12px]">
            <label className="text-[14px] font-normal text-text-body leading-[20px]">
              Legal Business Name <span className="text-[#d92d20]">*</span>
            </label>
            <div className="w-full border-[1.5px] border-card-stroke rounded-[8px] h-[56px] flex items-center px-[16px]">
              <input
                type="text"
                placeholder="Enter Company Name"
                className="flex-1 bg-transparent text-[14px] font-medium text-text-header placeholder:text-forms-input leading-[20px] outline-none"
                {...register("legalBusinessName")}
              />
            </div>
          </div>
          <div className="flex-1 flex flex-col gap-[12px]">
            <label className="text-[14px] font-normal text-text-body leading-[20px]">
              RC Number <span className="text-[#d92d20]">*</span>
            </label>
            <div className="w-full border-[1.5px] border-card-stroke rounded-[8px] h-[56px] flex items-center px-[16px]">
              <input
                type="text"
                placeholder="RC-0000000"
                className="flex-1 bg-transparent text-[14px] font-medium text-text-header placeholder:text-forms-input leading-[20px] outline-none"
                {...register("rcNumber")}
              />
            </div>
          </div>
        </div>

        {/* Row 2: TIN/VAT + Nature of Business + Sector */}
        <div className="flex gap-[24px]">
          <div className="flex-1 flex flex-col gap-[12px]">
            <label className="text-[14px] font-normal text-text-body leading-[20px]">
              TIN/ VAT (MAX 14)
            </label>
            <div className="w-full border-[1.5px] border-card-stroke rounded-[8px] h-[56px] flex items-center px-[16px]">
              <input
                type="text"
                placeholder="TIN/ VAT"
                className="flex-1 bg-transparent text-[14px] font-medium text-text-header placeholder:text-forms-input leading-[20px] outline-none"
                maxLength={14}
                {...register("tinVat")}
              />
            </div>
          </div>
          <div className="flex-1 flex flex-col gap-[12px]">
            <label className="text-[14px] font-normal text-text-body leading-[20px]">
              Nature of Business
            </label>
            <div className="w-full border-[1.5px] border-card-stroke rounded-[8px] h-[56px] flex items-center px-[16px]">
              <input
                type="text"
                placeholder="Business Nature"
                className="flex-1 bg-transparent text-[14px] font-medium text-text-header placeholder:text-forms-input leading-[20px] outline-none"
                {...register("natureOfBusiness")}
              />
            </div>
          </div>
          <div className="flex-1 flex flex-col gap-[12px]">
            <label className="text-[14px] font-normal text-text-body leading-[20px]">
              Sector
            </label>
            <div className="w-full border-[1.5px] border-card-stroke rounded-[8px] h-[56px] flex items-center gap-[8px] px-[16px]">
              <select
                className="flex-1 bg-transparent text-[14px] font-medium text-text-header leading-[20px] outline-none appearance-none"
                {...register("sector")}
              >
                <option value="">Select sector</option>
                <option value="technology">Technology</option>
                <option value="finance">Finance</option>
                <option value="healthcare">Healthcare</option>
                <option value="education">Education</option>
                <option value="manufacturing">Manufacturing</option>
                <option value="real-estate">Real Estate</option>
                <option value="other">Other</option>
              </select>
              <Image
                src="/icons/chevron-down.svg"
                alt=""
                width={24}
                height={24}
                className="shrink-0 pointer-events-none"
              />
            </div>
          </div>
        </div>

        {/* Row 3: Company Website + Country of Operation */}
        <div className="flex gap-[24px]">
          <div className="flex-1 flex flex-col gap-[12px]">
            <label className="text-[14px] font-normal text-text-body leading-[20px]">
              Company Website <span className="text-[#d92d20]">*</span>
            </label>
            <div className="w-full border-[1.5px] border-card-stroke rounded-[8px] h-[56px] flex items-center px-[16px]">
              <input
                type="url"
                placeholder="Paste Website Link"
                className="flex-1 bg-transparent text-[14px] font-medium text-text-header placeholder:text-forms-input leading-[20px] outline-none"
                {...register("companyWebsite")}
              />
            </div>
          </div>
          <div className="flex-1 flex flex-col gap-[12px]">
            <label className="text-[14px] font-normal text-text-body leading-[20px]">
              Country of Operation <span className="text-[#d92d20]">*</span>
            </label>
            <div className="w-full border-[1.5px] border-card-stroke rounded-[8px] h-[56px] flex items-center gap-[8px] px-[16px]">
              <select
                className="flex-1 bg-transparent text-[14px] font-medium text-text-header leading-[20px] outline-none appearance-none"
                {...register("countryOfOperation")}
              >
                <option value="">Select country</option>
                <option value="nigeria">Nigeria</option>
                <option value="ghana">Ghana</option>
                <option value="kenya">Kenya</option>
                <option value="south-africa">South Africa</option>
                <option value="uk">United Kingdom</option>
                <option value="us">United States</option>
              </select>
              <Image
                src="/icons/chevron-down.svg"
                alt=""
                width={24}
                height={24}
                className="shrink-0 pointer-events-none"
              />
            </div>
          </div>
        </div>

        {/* Row 4: Incorporation Date */}
        <div className="flex gap-[24px]">
          <div className="flex-1 flex flex-col gap-[12px]">
            <label className="text-[14px] font-normal text-text-body leading-[20px]">
              Incorporation Date
            </label>
            <div className="w-full border-[1.5px] border-card-stroke rounded-[8px] h-[56px] flex items-center gap-[8px] px-[16px]">
              <input
                type="date"
                placeholder="MM/DD/YYYY"
                className="flex-1 bg-transparent text-[14px] font-medium text-text-header placeholder:text-forms-input leading-[20px] outline-none [&::-webkit-calendar-picker-indicator]:opacity-0 [&::-webkit-calendar-picker-indicator]:absolute [&::-webkit-calendar-picker-indicator]:right-4 [&::-webkit-calendar-picker-indicator]:w-6 [&::-webkit-calendar-picker-indicator]:h-6 [&::-webkit-calendar-picker-indicator]:cursor-pointer"
                {...register("incorporationDate")}
              />
              <Image
                src="/icons/calendar.svg"
                alt=""
                width={24}
                height={24}
                className="shrink-0 pointer-events-none"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

const addressSchema = z.object({
  businessFullAddress: z.string().min(1, "Required"),
  businessCity: z.string().min(1, "Required"),
  businessState: z.string().min(1, "Required"),
  businessCountry: z.string().min(1, "Required"),
  regFullAddress: z.string().min(1, "Required"),
  regCity: z.string().min(1, "Required"),
  regState: z.string().min(1, "Required"),
  regCountry: z.string().min(1, "Required"),
});

type AddressFormData = z.infer<typeof addressSchema>;

function AddressSubStep() {
  const [sameAsBusinessAddress, setSameAsBusinessAddress] = useState(true);

  const { register, watch, setValue } = useForm<AddressFormData>({
    resolver: zodResolver(addressSchema),
    mode: "onChange",
  });

  const businessAddress = watch("businessFullAddress");
  const businessCity = watch("businessCity");
  const businessState = watch("businessState");
  const businessCountry = watch("businessCountry");

  const handleSameAddress = (checked: boolean) => {
    setSameAsBusinessAddress(checked);
    if (checked) {
      setValue("regFullAddress", businessAddress || "");
      setValue("regCity", businessCity || "");
      setValue("regState", businessState || "");
      setValue("regCountry", businessCountry || "");
    }
  };

  return (
    <div className="flex flex-col gap-[24px]">
      {/* Business Address */}
      <h3 className="font-extrabold text-[16px] text-text-header leading-[20px]">
        Business Address
      </h3>

      <div className="flex flex-col gap-[24px]">
        {/* Full Address */}
        <div className="flex flex-col gap-[12px]">
          <label className="text-[14px] font-normal text-text-body leading-[20px]">
            Full Address <span className="text-[#d92d20]">*</span>
          </label>
          <div className="w-full border-[1.5px] border-card-stroke rounded-[8px] h-[56px] flex items-center px-[16px]">
            <input
              type="text"
              placeholder="Address as filled on the CAC"
              className="flex-1 bg-transparent text-[14px] font-medium text-text-header placeholder:text-forms-input leading-[20px] outline-none"
              {...register("businessFullAddress")}
            />
          </div>
        </div>

        {/* City + State + Country */}
        <div className="flex gap-[24px]">
          <div className="flex-1 flex flex-col gap-[12px]">
            <label className="text-[14px] font-normal text-text-body leading-[20px]">
              City <span className="text-[#d92d20]">*</span>
            </label>
            <div className="w-full border-[1.5px] border-card-stroke rounded-[8px] h-[56px] flex items-center px-[16px]">
              <input
                type="text"
                placeholder="Enter City"
                className="flex-1 bg-transparent text-[14px] font-medium text-text-header placeholder:text-forms-input leading-[20px] outline-none"
                {...register("businessCity")}
              />
            </div>
          </div>
          <div className="flex-1 flex flex-col gap-[12px]">
            <label className="text-[14px] font-normal text-text-body leading-[20px]">
              State <span className="text-[#d92d20]">*</span>
            </label>
            <div className="w-full border-[1.5px] border-card-stroke rounded-[8px] h-[56px] flex items-center px-[16px]">
              <input
                type="text"
                placeholder="Select State"
                className="flex-1 bg-transparent text-[14px] font-medium text-text-header placeholder:text-forms-input leading-[20px] outline-none"
                {...register("businessState")}
              />
            </div>
          </div>
          <div className="flex-1 flex flex-col gap-[12px]">
            <label className="text-[14px] font-normal text-text-body leading-[20px]">
              Country <span className="text-[#d92d20]">*</span>
            </label>
            <div className="w-full border-[1.5px] border-card-stroke rounded-[8px] h-[56px] flex items-center gap-[8px] px-[16px]">
              <select
                className="flex-1 bg-transparent text-[14px] font-medium text-text-header leading-[20px] outline-none appearance-none"
                {...register("businessCountry")}
              >
                <option value="">Select Country</option>
                <option value="nigeria">Nigeria</option>
                <option value="ghana">Ghana</option>
                <option value="kenya">Kenya</option>
                <option value="south-africa">South Africa</option>
                <option value="uk">United Kingdom</option>
                <option value="us">United States</option>
              </select>
              <Image
                src="/icons/chevron-down.svg"
                alt=""
                width={24}
                height={24}
                className="shrink-0 pointer-events-none"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Registration Address */}
      <div className="flex flex-col gap-[4px]">
        <h3 className="font-extrabold text-[16px] text-text-header leading-[20px]">
          Registration Address
        </h3>
        <label className="flex gap-[12px] items-center cursor-pointer">
          <button
            type="button"
            onClick={() => handleSameAddress(!sameAsBusinessAddress)}
            className={`w-[16px] h-[16px] rounded-[4px] border flex items-center justify-center shrink-0 ${
              sameAsBusinessAddress
                ? "bg-[#17b26a] border-card-stroke"
                : "bg-white border-card-stroke"
            }`}
          >
            {sameAsBusinessAddress && (
              <svg width="10" height="8" viewBox="0 0 10 8" fill="none">
                <path d="M1 4L3.5 6.5L9 1" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            )}
          </button>
          <span className="text-[14px] font-normal text-paragraph-2 leading-[20px]">
            Same as Business Address
          </span>
        </label>
      </div>

      <div className="flex flex-col gap-[24px]">
        {/* Full Address */}
        <div className="flex flex-col gap-[12px]">
          <label className="text-[14px] font-normal text-text-body leading-[20px]">
            Full Address <span className="text-[#d92d20]">*</span>
          </label>
          <div className="w-full border-[1.5px] border-card-stroke rounded-[8px] h-[56px] flex items-center px-[16px]">
            <input
              type="text"
              placeholder="Address as filled on the CAC"
              className="flex-1 bg-transparent text-[14px] font-medium text-text-header placeholder:text-forms-input leading-[20px] outline-none"
              {...register("regFullAddress")}
            />
          </div>
        </div>

        {/* City + State + Country */}
        <div className="flex gap-[24px]">
          <div className="flex-1 flex flex-col gap-[12px]">
            <label className="text-[14px] font-normal text-text-body leading-[20px]">
              City <span className="text-[#d92d20]">*</span>
            </label>
            <div className="w-full border-[1.5px] border-card-stroke rounded-[8px] h-[56px] flex items-center px-[16px]">
              <input
                type="text"
                placeholder="Enter City"
                className="flex-1 bg-transparent text-[14px] font-medium text-text-header placeholder:text-forms-input leading-[20px] outline-none"
                {...register("regCity")}
              />
            </div>
          </div>
          <div className="flex-1 flex flex-col gap-[12px]">
            <label className="text-[14px] font-normal text-text-body leading-[20px]">
              State <span className="text-[#d92d20]">*</span>
            </label>
            <div className="w-full border-[1.5px] border-card-stroke rounded-[8px] h-[56px] flex items-center px-[16px]">
              <input
                type="text"
                placeholder="Select State"
                className="flex-1 bg-transparent text-[14px] font-medium text-text-header placeholder:text-forms-input leading-[20px] outline-none"
                {...register("regState")}
              />
            </div>
          </div>
          <div className="flex-1 flex flex-col gap-[12px]">
            <label className="text-[14px] font-normal text-text-body leading-[20px]">
              Country <span className="text-[#d92d20]">*</span>
            </label>
            <div className="w-full border-[1.5px] border-card-stroke rounded-[8px] h-[56px] flex items-center gap-[8px] px-[16px]">
              <select
                className="flex-1 bg-transparent text-[14px] font-medium text-text-header leading-[20px] outline-none appearance-none"
                {...register("regCountry")}
              >
                <option value="">Select Country</option>
                <option value="nigeria">Nigeria</option>
                <option value="ghana">Ghana</option>
                <option value="kenya">Kenya</option>
                <option value="south-africa">South Africa</option>
                <option value="uk">United Kingdom</option>
                <option value="us">United States</option>
              </select>
              <Image
                src="/icons/chevron-down.svg"
                alt=""
                width={24}
                height={24}
                className="shrink-0 pointer-events-none"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

const verificationSchema = z.object({
  rcNumber: z.string().min(1, "Required"),
  tinVat: z.string().min(1, "Required"),
});

type VerificationFormData = z.infer<typeof verificationSchema>;

function VerificationSubStep() {
  const { register } = useForm<VerificationFormData>({
    resolver: zodResolver(verificationSchema),
    mode: "onChange",
  });

  return (
    <div className="flex flex-col gap-[24px]">
      {/* Info Banner */}
      <div className="bg-[#eff8ff] border border-[#b2ddff] rounded-[12px] p-[25px] flex gap-[12px] items-start">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="shrink-0">
          <circle cx="12" cy="12" r="10" stroke="#2E90FA" strokeWidth="2" />
          <path d="M12 8v4M12 16h.01" stroke="#2E90FA" strokeWidth="2" strokeLinecap="round" />
        </svg>
        <p className="text-[14px] font-medium text-[#1849a9] leading-[20px]">
          We&apos;ll verify your RC Number against the CAC public registry automatically. This usually takes a few seconds.
        </p>
      </div>

      {/* Section Title */}
      <div className="flex flex-col gap-[4px]">
        <h3 className="font-extrabold text-[16px] text-text-header leading-[20px]">
          Registration Verification
        </h3>
        <p className="text-[14px] font-normal text-paragraph-2 leading-[20px]">
          Fill all details
        </p>
      </div>

      {/* Form Fields */}
      <div className="flex gap-[24px]">
        <div className="flex-1 flex flex-col gap-[12px]">
          <label className="text-[14px] font-normal text-text-body leading-[20px]">
            RC Number <span className="text-[#d92d20]">*</span>
          </label>
          <div className="w-full border-[1.5px] border-card-stroke rounded-[8px] h-[56px] flex items-center px-[16px]">
            <input
              type="text"
              placeholder="RC Number"
              className="flex-1 bg-transparent text-[14px] font-medium text-text-header placeholder:text-forms-input leading-[20px] outline-none"
              {...register("rcNumber")}
            />
          </div>
        </div>
        <div className="flex-1 flex flex-col gap-[12px]">
          <label className="text-[14px] font-normal text-text-body leading-[20px]">
            TIN/ VAT (MAX 14) <span className="text-[#d92d20]">*</span>
          </label>
          <div className="w-full border-[1.5px] border-card-stroke rounded-[8px] h-[56px] flex items-center px-[16px]">
            <input
              type="text"
              placeholder="TIN/ VAT"
              maxLength={14}
              className="flex-1 bg-transparent text-[14px] font-medium text-text-header placeholder:text-forms-input leading-[20px] outline-none"
              {...register("tinVat")}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

function PlaceholderSubStep({ name }: { name: string }) {
  return (
    <div className="flex flex-col gap-[16px]">
      <h3 className="font-extrabold text-[16px] text-text-header leading-[20px]">
        {name}
      </h3>
      <p className="text-[14px] text-text-body leading-[20px]">
        This sub-section will be built when the design is provided.
      </p>
    </div>
  );
}
