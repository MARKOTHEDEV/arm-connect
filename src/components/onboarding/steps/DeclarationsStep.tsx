"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import Image from "next/image";

const declarationsSchema = z.object({
  fullName: z.string().optional(),
  phoneNumber: z.string().optional(),
  pepName: z.string().optional(),
  pepRelationship: z.string().optional(),
  pepPosition: z.string().optional(),
});

type DeclarationsFormData = z.infer<typeof declarationsSchema>;

export function DeclarationsStep() {
  const [isPep, setIsPep] = useState(false);
  const [acceptTerms, setAcceptTerms] = useState(false);

  const { register } = useForm<DeclarationsFormData>({
    resolver: zodResolver(declarationsSchema),
    mode: "onChange",
  });

  return (
    <div className="flex flex-col gap-[32px]">
      {/* Header */}
      <div className="flex flex-col gap-[4px]">
        <h2 className="font-bold text-[20px] text-text-header leading-[30px]">
          Declarations
        </h2>
        <p className="text-[14px] font-normal text-text-body leading-[20px]">
          Complete your investment profile and accept the Master Service Agreement to proceed.
        </p>
      </div>

      {/* Investment Profile */}
      <div className="flex flex-col gap-[24px]">
        <div className="flex flex-col gap-[4px]">
          <h3 className="font-extrabold text-[16px] text-text-header leading-[20px]">
            Investment Profile
          </h3>
          <p className="text-[14px] font-normal text-paragraph-2 leading-[20px]">
            Fill all understated
          </p>
        </div>

        {/* PEP Toggle */}
        <label className="flex gap-[16px] items-center cursor-pointer">
          <button
            type="button"
            onClick={() => setIsPep(!isPep)}
            className={`w-[20px] h-[20px] rounded-full border-2 flex items-center justify-center shrink-0 ${
              isPep ? "bg-primary border-primary" : "bg-white border-[#d0d5dd]"
            }`}
          >
            {isPep && (
              <div className="w-[8px] h-[8px] rounded-full bg-white" />
            )}
          </button>
          <span className="text-[14px] font-medium text-text-header leading-[20px]">
            Is anyone listed in this application a Politically Exposed Person (PEP)?
          </span>
        </label>

        {/* PEP Details - shown when toggled */}
        {isPep && (
          <div className="bg-[#f9fafb] rounded-[12px] p-[24px] flex gap-[24px]">
            <div className="flex-1 flex flex-col gap-[12px]">
              <label className="text-[14px] font-normal text-text-body leading-[20px]">
                PEP Name
              </label>
              <div className="w-full border-[1.5px] border-card-stroke rounded-[8px] h-[56px] flex items-center px-[16px] bg-white">
                <input
                  type="text"
                  placeholder="Enter Full Name"
                  className="flex-1 bg-transparent text-[14px] font-medium text-text-header placeholder:text-forms-input leading-[20px] outline-none"
                  {...register("pepName")}
                />
              </div>
            </div>
            <div className="flex-1 flex flex-col gap-[12px]">
              <label className="text-[14px] font-normal text-text-body leading-[20px]">
                Relationship
              </label>
              <div className="w-full border-[1.5px] border-card-stroke rounded-[8px] h-[56px] flex items-center gap-[8px] px-[16px] bg-white">
                <select
                  className="flex-1 bg-transparent text-[14px] font-medium text-text-header leading-[20px] outline-none appearance-none"
                  {...register("pepRelationship")}
                >
                  <option value="">Select Relationship</option>
                  <option value="self">Self</option>
                  <option value="spouse">Spouse</option>
                  <option value="parent">Parent</option>
                  <option value="child">Child</option>
                  <option value="sibling">Sibling</option>
                  <option value="associate">Close Associate</option>
                </select>
                <Image src="/icons/chevron-down.svg" alt="" width={24} height={24} className="shrink-0 pointer-events-none" />
              </div>
            </div>
            <div className="flex-1 flex flex-col gap-[12px]">
              <label className="text-[14px] font-normal text-text-body leading-[20px]">
                Position
              </label>
              <div className="w-full border-[1.5px] border-card-stroke rounded-[8px] h-[56px] flex items-center px-[16px] bg-white">
                <input
                  type="text"
                  placeholder="Official Role"
                  className="flex-1 bg-transparent text-[14px] font-medium text-text-header placeholder:text-forms-input leading-[20px] outline-none"
                  {...register("pepPosition")}
                />
              </div>
            </div>
          </div>
        )}
      </div>

      {/* T&C Agreement */}
      <div className="flex flex-col gap-[24px]">
        <div className="flex flex-col gap-[4px]">
          <h3 className="font-extrabold text-[16px] text-text-header leading-[20px]">
            T&C Agreement
          </h3>
          <p className="text-[14px] font-normal text-paragraph-2 leading-[20px]">
            Fill all understated
          </p>
        </div>

        {/* Accept Terms */}
        <label className="flex gap-[16px] items-center cursor-pointer">
          <button
            type="button"
            onClick={() => setAcceptTerms(!acceptTerms)}
            className={`w-[20px] h-[20px] rounded-full border-2 flex items-center justify-center shrink-0 ${
              acceptTerms ? "bg-primary border-primary" : "bg-white border-[#d0d5dd]"
            }`}
          >
            {acceptTerms && (
              <div className="w-[8px] h-[8px] rounded-full bg-white" />
            )}
          </button>
          <span className="text-[14px] font-medium text-text-header leading-[20px]">
            I Accept the <span className="text-primary">Master service Agreement (v2.1) and Privacy Policy</span>
          </span>
        </label>

        {/* Full Name + Phone Number */}
        <div className="flex gap-[24px]">
          <div className="flex-1 flex flex-col gap-[12px]">
            <label className="text-[14px] font-normal text-text-body leading-[20px]">
              Full Name
            </label>
            <div className="w-full border-[1.5px] border-card-stroke rounded-[8px] h-[56px] flex items-center px-[16px] bg-[#f9fafb]">
              <input
                type="text"
                placeholder="John Doe"
                className="flex-1 bg-transparent text-[14px] font-medium text-text-header placeholder:text-forms-input leading-[20px] outline-none"
                {...register("fullName")}
              />
            </div>
          </div>
          <div className="flex-1 flex flex-col gap-[12px]">
            <label className="text-[14px] font-normal text-text-body leading-[20px]">
              Phone Number
            </label>
            <div className="w-full border-[1.5px] border-card-stroke rounded-[8px] h-[56px] flex items-center px-[16px] bg-[#f9fafb]">
              <input
                type="tel"
                placeholder="+234 000 000 0000"
                className="flex-1 bg-transparent text-[14px] font-medium text-text-header placeholder:text-forms-input leading-[20px] outline-none"
                {...register("phoneNumber")}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
