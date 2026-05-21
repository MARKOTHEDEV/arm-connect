"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { ChevronDown, ChevronUp } from "lucide-react";
import Image from "next/image";

const signatorySchema = z.object({
  fullLegalName: z.string().min(1, "Required"),
  designation: z.string().min(1, "Required"),
  gender: z.string().min(1, "Required"),
  dateOfBirth: z.string().min(1, "Required"),
  phoneNumber: z.string().min(1, "Required"),
  personalAddress: z.string().min(1, "Required"),
  idType: z.string().min(1, "Required"),
  idNumber: z.string().min(1, "Required"),
  issueDate: z.string().min(1, "Required"),
  expiryDate: z.string().min(1, "Required"),
  nin: z.string().min(1, "Required"),
  bvn: z.string().min(1, "Required"),
  utilityBillType: z.string().min(1, "Required"),
});

type SignatoryFormData = z.infer<typeof signatorySchema>;

export function RiskSignatoriesStep() {
  return (
    <div className="flex flex-col gap-[32px]">
      {/* Header */}
      <div className="flex flex-col gap-[4px]">
        <h2 className="font-bold text-[20px] text-text-header leading-[30px]">
          Risk & Authorised signatories
        </h2>
        <p className="text-[14px] font-normal text-text-body leading-[20px]">
          Add all persons authorized to act on behalf of your business. Each signatory&apos;s utility bill is uploaded here; company documents are uploaded in the final step.
        </p>
      </div>

      {/* Info Banner */}
      <div className="bg-[#eff8ff] border border-[#b2ddff] rounded-[12px] p-[25px] flex gap-[12px] items-start">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="shrink-0">
          <circle cx="12" cy="12" r="10" stroke="#2E90FA" strokeWidth="2" />
          <path d="M12 8v4M12 16h.01" stroke="#2E90FA" strokeWidth="2" strokeLinecap="round" />
        </svg>
        <p className="text-[14px] font-medium text-[#1849a9] leading-[20px]">
          Each signatory requires a valid NIN, BVN, government-issued ID, and a utility bill not older than 3 months. Passport photographs and ID document uploads happen in Section 6.
        </p>
      </div>

      {/* Signatories */}
      <SignatoryCard index={1} defaultOpen />
      <SignatoryCard index={2} defaultOpen={false} />
    </div>
  );
}

function SignatoryCard({ index, defaultOpen }: { index: number; defaultOpen: boolean }) {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  const { register } = useForm<SignatoryFormData>({
    resolver: zodResolver(signatorySchema),
    mode: "onChange",
  });

  return (
    <div className="bg-[#f9fafb] rounded-[12px] overflow-hidden">
      {/* Header */}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between px-[24px] py-[20px]"
      >
        <h3 className="font-bold text-[18px] text-text-header leading-[28px]">
          Signatory {index}
        </h3>
        {isOpen ? (
          <ChevronDown className="w-[24px] h-[24px] text-text-header" />
        ) : (
          <ChevronUp className="w-[24px] h-[24px] text-text-header" />
        )}
      </button>

      {/* Content */}
      {isOpen && (
        <div className="px-[24px] pb-[24px] flex flex-col gap-[24px]">
          {/* Row 1: Full Legal Name + Designation */}
          <div className="flex gap-[24px]">
            <div className="flex-1 flex flex-col gap-[12px]">
              <label className="text-[14px] font-normal text-text-body leading-[20px]">
                Full Legal Name <span className="text-[#d92d20]">*</span>
              </label>
              <div className="w-full border-[1.5px] border-card-stroke rounded-[8px] h-[56px] flex items-center px-[16px] bg-white">
                <input
                  type="text"
                  placeholder="Enter Legal Name"
                  className="flex-1 bg-transparent text-[14px] font-medium text-text-header placeholder:text-forms-input leading-[20px] outline-none"
                  {...register("fullLegalName")}
                />
              </div>
            </div>
            <div className="flex-1 flex flex-col gap-[12px]">
              <label className="text-[14px] font-normal text-text-body leading-[20px]">
                Designation <span className="text-[#d92d20]">*</span>
              </label>
              <div className="w-full border-[1.5px] border-card-stroke rounded-[8px] h-[56px] flex items-center gap-[8px] px-[16px] bg-white">
                <select
                  className="flex-1 bg-transparent text-[14px] font-medium text-text-header leading-[20px] outline-none appearance-none"
                  {...register("designation")}
                >
                  <option value="">Select Designation</option>
                  <option value="director">Director</option>
                  <option value="ceo">CEO</option>
                  <option value="cfo">CFO</option>
                  <option value="company-secretary">Company Secretary</option>
                  <option value="authorized-signatory">Authorized Signatory</option>
                </select>
                <Image src="/icons/chevron-down.svg" alt="" width={24} height={24} className="shrink-0 pointer-events-none" />
              </div>
            </div>
          </div>

          {/* Row 2: Gender + Date of Birth + Phone Number */}
          <div className="flex gap-[24px]">
            <div className="flex-1 flex flex-col gap-[12px]">
              <label className="text-[14px] font-normal text-text-body leading-[20px]">
                Gender <span className="text-[#d92d20]">*</span>
              </label>
              <div className="w-full border-[1.5px] border-card-stroke rounded-[8px] h-[56px] flex items-center gap-[8px] px-[16px] bg-white">
                <select
                  className="flex-1 bg-transparent text-[14px] font-medium text-text-header leading-[20px] outline-none appearance-none"
                  {...register("gender")}
                >
                  <option value="">Select Gender</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                </select>
                <Image src="/icons/chevron-down.svg" alt="" width={24} height={24} className="shrink-0 pointer-events-none" />
              </div>
            </div>
            <div className="flex-1 flex flex-col gap-[12px]">
              <label className="text-[14px] font-normal text-text-body leading-[20px]">
                Date of Birth <span className="text-[#d92d20]">*</span>
              </label>
              <div className="w-full border-[1.5px] border-card-stroke rounded-[8px] h-[56px] flex items-center gap-[8px] px-[16px] bg-white">
                <input
                  type="date"
                  className="flex-1 bg-transparent text-[14px] font-medium text-text-header placeholder:text-forms-input leading-[20px] outline-none [&::-webkit-calendar-picker-indicator]:opacity-0 [&::-webkit-calendar-picker-indicator]:absolute [&::-webkit-calendar-picker-indicator]:right-4 [&::-webkit-calendar-picker-indicator]:w-6 [&::-webkit-calendar-picker-indicator]:h-6 [&::-webkit-calendar-picker-indicator]:cursor-pointer"
                  {...register("dateOfBirth")}
                />
                <Image src="/icons/calendar.svg" alt="" width={24} height={24} className="shrink-0 pointer-events-none" />
              </div>
            </div>
            <div className="flex-1 flex flex-col gap-[12px]">
              <label className="text-[14px] font-normal text-text-body leading-[20px]">
                Phone Number <span className="text-[#d92d20]">*</span>
              </label>
              <div className="w-full border-[1.5px] border-card-stroke rounded-[8px] h-[56px] flex items-center px-[16px] bg-white">
                <input
                  type="tel"
                  placeholder="234 000 000 0000"
                  className="flex-1 bg-transparent text-[14px] font-medium text-text-header placeholder:text-forms-input leading-[20px] outline-none"
                  {...register("phoneNumber")}
                />
              </div>
            </div>
          </div>

          {/* Row 3: Personal Address */}
          <div className="flex flex-col gap-[12px]">
            <label className="text-[14px] font-normal text-text-body leading-[20px]">
              Personal Address <span className="text-[#d92d20]">*</span>
            </label>
            <div className="w-full border-[1.5px] border-card-stroke rounded-[8px] h-[56px] flex items-center px-[16px] bg-white">
              <input
                type="text"
                placeholder="Enter Full Address"
                className="flex-1 bg-transparent text-[14px] font-medium text-text-header placeholder:text-forms-input leading-[20px] outline-none"
                {...register("personalAddress")}
              />
            </div>
          </div>

          {/* Row 4: ID Type + ID Number + Issue Date + Expiry Date */}
          <div className="flex gap-[24px]">
            <div className="flex-1 flex flex-col gap-[12px]">
              <label className="text-[14px] font-normal text-text-body leading-[20px]">
                ID Type <span className="text-[#d92d20]">*</span>
              </label>
              <div className="w-full border-[1.5px] border-card-stroke rounded-[8px] h-[56px] flex items-center gap-[8px] px-[16px] bg-white">
                <select
                  className="flex-1 bg-transparent text-[14px] font-medium text-text-header leading-[20px] outline-none appearance-none"
                  {...register("idType")}
                >
                  <option value="">Select ID Type</option>
                  <option value="international-passport">International Passport</option>
                  <option value="national-id">National ID</option>
                  <option value="voters-card">Voter&apos;s Card</option>
                  <option value="drivers-license">Driver&apos;s License</option>
                </select>
                <Image src="/icons/chevron-down.svg" alt="" width={24} height={24} className="shrink-0 pointer-events-none" />
              </div>
            </div>
            <div className="flex-1 flex flex-col gap-[12px]">
              <label className="text-[14px] font-normal text-text-body leading-[20px]">
                ID Number <span className="text-[#d92d20]">*</span>
              </label>
              <div className="w-full border-[1.5px] border-card-stroke rounded-[8px] h-[56px] flex items-center px-[16px] bg-white">
                <input
                  type="text"
                  placeholder="1234567890"
                  className="flex-1 bg-transparent text-[14px] font-medium text-text-header placeholder:text-forms-input leading-[20px] outline-none"
                  {...register("idNumber")}
                />
              </div>
            </div>
            <div className="flex-1 flex flex-col gap-[12px]">
              <label className="text-[14px] font-normal text-text-body leading-[20px]">
                Issue Date <span className="text-[#d92d20]">*</span>
              </label>
              <div className="w-full border-[1.5px] border-card-stroke rounded-[8px] h-[56px] flex items-center gap-[8px] px-[16px] bg-white">
                <input
                  type="date"
                  className="flex-1 bg-transparent text-[14px] font-medium text-text-header placeholder:text-forms-input leading-[20px] outline-none [&::-webkit-calendar-picker-indicator]:opacity-0 [&::-webkit-calendar-picker-indicator]:absolute [&::-webkit-calendar-picker-indicator]:right-4 [&::-webkit-calendar-picker-indicator]:w-6 [&::-webkit-calendar-picker-indicator]:h-6 [&::-webkit-calendar-picker-indicator]:cursor-pointer"
                  {...register("issueDate")}
                />
                <Image src="/icons/calendar.svg" alt="" width={24} height={24} className="shrink-0 pointer-events-none" />
              </div>
            </div>
            <div className="flex-1 flex flex-col gap-[12px]">
              <label className="text-[14px] font-normal text-text-body leading-[20px]">
                Expiry Date <span className="text-[#d92d20]">*</span>
              </label>
              <div className="w-full border-[1.5px] border-card-stroke rounded-[8px] h-[56px] flex items-center gap-[8px] px-[16px] bg-white">
                <input
                  type="date"
                  className="flex-1 bg-transparent text-[14px] font-medium text-text-header placeholder:text-forms-input leading-[20px] outline-none [&::-webkit-calendar-picker-indicator]:opacity-0 [&::-webkit-calendar-picker-indicator]:absolute [&::-webkit-calendar-picker-indicator]:right-4 [&::-webkit-calendar-picker-indicator]:w-6 [&::-webkit-calendar-picker-indicator]:h-6 [&::-webkit-calendar-picker-indicator]:cursor-pointer"
                  {...register("expiryDate")}
                />
                <Image src="/icons/calendar.svg" alt="" width={24} height={24} className="shrink-0 pointer-events-none" />
              </div>
            </div>
          </div>

          {/* Row 5: NIN + BVN + Utility Bill Type */}
          <div className="flex gap-[24px]">
            <div className="flex-1 flex flex-col gap-[12px]">
              <label className="text-[14px] font-normal text-text-body leading-[20px]">
                NIN <span className="text-[#d92d20]">*</span>
              </label>
              <div className="w-full border-[1.5px] border-card-stroke rounded-[8px] h-[56px] flex items-center px-[16px] bg-white">
                <input
                  type="text"
                  placeholder="12345678901"
                  maxLength={11}
                  className="flex-1 bg-transparent text-[14px] font-medium text-text-header placeholder:text-forms-input leading-[20px] outline-none"
                  {...register("nin")}
                />
              </div>
            </div>
            <div className="flex-1 flex flex-col gap-[12px]">
              <label className="text-[14px] font-normal text-text-body leading-[20px]">
                BVN <span className="text-[#d92d20]">*</span>
              </label>
              <div className="w-full border-[1.5px] border-card-stroke rounded-[8px] h-[56px] flex items-center px-[16px] bg-white">
                <input
                  type="text"
                  placeholder="12345678901"
                  maxLength={11}
                  className="flex-1 bg-transparent text-[14px] font-medium text-text-header placeholder:text-forms-input leading-[20px] outline-none"
                  {...register("bvn")}
                />
              </div>
            </div>
            <div className="flex-1 flex flex-col gap-[12px]">
              <label className="text-[14px] font-normal text-text-body leading-[20px]">
                Utility Bill Type <span className="text-[#d92d20]">*</span>
              </label>
              <div className="w-full border-[1.5px] border-card-stroke rounded-[8px] h-[56px] flex items-center gap-[8px] px-[16px] bg-white">
                <select
                  className="flex-1 bg-transparent text-[14px] font-medium text-text-header leading-[20px] outline-none appearance-none"
                  {...register("utilityBillType")}
                >
                  <option value="">Select Utility Bill Type</option>
                  <option value="electricity">Electricity Bill</option>
                  <option value="water">Water Bill</option>
                  <option value="waste">Waste Disposal Bill</option>
                  <option value="gas">Gas Bill</option>
                </select>
                <Image src="/icons/chevron-down.svg" alt="" width={24} height={24} className="shrink-0 pointer-events-none" />
              </div>
            </div>
          </div>

          {/* Row 6: Utility Bill Upload */}
          <div className="flex flex-col gap-[8px]">
            <label className="text-[14px] font-normal text-text-body leading-[20px]">
              Utility Bill <span className="text-[#d92d20]">*</span>
            </label>
            <div className="w-full border-[1.5px] border-dashed border-card-stroke rounded-[7px] py-[17px] px-[12px] flex items-center gap-[12px] bg-white cursor-pointer hover:border-primary/40 transition-colors">
              <Image
                src="/icons/document-upload.svg"
                alt=""
                width={48}
                height={48}
                className="shrink-0"
              />
              <div className="flex flex-col gap-[12px]">
                <span className="font-extrabold text-[14px] text-text-header leading-normal">
                  Upload document
                </span>
                <span className="text-[10px] font-normal text-[#475467] leading-[18px]">
                  PDF, PNG, or JPG  (File must not exceed 5MB)
                </span>
              </div>
            </div>
            <p className="text-[12px] text-text-body leading-[18px]">
              Electricity bill, Water bill, not more than 3 months old
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
