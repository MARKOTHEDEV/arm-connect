"use client";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import Image from "next/image";

const contactBankSchema = z.object({
  contactName: z.string().min(1, "Required"),
  positionDesignation: z.string().min(1, "Required"),
  emailAddress: z.string().min(1, "Required").email("Enter a valid email"),
  phoneNumber: z.string().min(1, "Required"),
  bankName: z.string().min(1, "Required"),
  accountName: z.string().min(1, "Required"),
  accountNumber: z.string().min(1, "Required"),
});

type ContactBankFormData = z.infer<typeof contactBankSchema>;

export function ContactBankStep() {
  const { register } = useForm<ContactBankFormData>({
    resolver: zodResolver(contactBankSchema),
    mode: "onChange",
  });

  return (
    <div className="flex flex-col gap-[32px]">
      {/* Header */}
      <div className="flex flex-col gap-[4px]">
        <h2 className="font-bold text-[20px] text-text-header leading-[30px]">
          Contact & Bank Details
        </h2>
        <p className="text-[14px] font-normal text-text-body leading-[20px]">
          The primary contact will receive all official correspondence and account activation updates from ARM.
        </p>
      </div>

      {/* Primary Contact Details */}
      <div className="flex flex-col gap-[24px]">
        <div className="flex flex-col gap-[4px]">
          <h3 className="font-extrabold text-[16px] text-text-header leading-[20px]">
            Primary Contact Details
          </h3>
          <p className="text-[14px] font-normal text-paragraph-2 leading-[20px]">
            Personnel responsible for official correspondence
          </p>
        </div>

        {/* Contact Name + Position */}
        <div className="flex gap-[24px]">
          <div className="flex-1 flex flex-col gap-[12px]">
            <label className="text-[14px] font-normal text-text-body leading-[20px]">
              Contact Name <span className="text-[#d92d20]">*</span>
            </label>
            <div className="w-full border-[1.5px] border-card-stroke rounded-[8px] h-[56px] flex items-center px-[16px]">
              <input
                type="text"
                placeholder="Enter Full Name"
                className="flex-1 bg-transparent text-[14px] font-medium text-text-header placeholder:text-forms-input leading-[20px] outline-none"
                {...register("contactName")}
              />
            </div>
          </div>
          <div className="flex-1 flex flex-col gap-[12px]">
            <label className="text-[14px] font-normal text-text-body leading-[20px]">
              Position/ Designation <span className="text-[#d92d20]">*</span>
            </label>
            <div className="w-full border-[1.5px] border-card-stroke rounded-[8px] h-[56px] flex items-center px-[16px]">
              <input
                type="text"
                placeholder="e.g. Operations Director"
                className="flex-1 bg-transparent text-[14px] font-medium text-text-header placeholder:text-forms-input leading-[20px] outline-none"
                {...register("positionDesignation")}
              />
            </div>
          </div>
        </div>

        {/* Email + Phone */}
        <div className="flex gap-[24px]">
          <div className="flex-1 flex flex-col gap-[12px]">
            <label className="text-[14px] font-normal text-text-body leading-[20px]">
              Email Address <span className="text-[#d92d20]">*</span>
            </label>
            <div className="w-full border-[1.5px] border-card-stroke rounded-[8px] h-[56px] flex items-center px-[16px]">
              <input
                type="email"
                placeholder="john.doe@gmail.com"
                className="flex-1 bg-transparent text-[14px] font-medium text-text-header placeholder:text-forms-input leading-[20px] outline-none"
                {...register("emailAddress")}
              />
            </div>
          </div>
          <div className="flex-1 flex flex-col gap-[12px]">
            <label className="text-[14px] font-normal text-text-body leading-[20px]">
              Phone Number <span className="text-[#d92d20]">*</span>
            </label>
            <div className="w-full border-[1.5px] border-card-stroke rounded-[8px] h-[56px] flex items-center px-[16px]">
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

      {/* Bank Account Details */}
      <div className="flex flex-col gap-[24px]">
        <div className="flex flex-col gap-[4px]">
          <h3 className="font-extrabold text-[16px] text-text-header leading-[20px]">
            Bank Account Details
          </h3>
          <p className="text-[14px] font-normal text-paragraph-2 leading-[20px]">
            Settlement account for distributions
          </p>
        </div>

        {/* Bank Name + Account Name + Account Number */}
        <div className="flex gap-[24px]">
          <div className="flex-1 flex flex-col gap-[12px]">
            <label className="text-[14px] font-normal text-text-body leading-[20px]">
              Bank Name <span className="text-[#d92d20]">*</span>
            </label>
            <div className="w-full border-[1.5px] border-card-stroke rounded-[8px] h-[56px] flex items-center gap-[8px] px-[16px]">
              <select
                className="flex-1 bg-transparent text-[14px] font-medium text-text-header leading-[20px] outline-none appearance-none"
                {...register("bankName")}
              >
                <option value="">Select Bank</option>
                <option value="access">Access Bank</option>
                <option value="gtbank">GTBank</option>
                <option value="first-bank">First Bank</option>
                <option value="uba">UBA</option>
                <option value="zenith">Zenith Bank</option>
                <option value="stanbic">Stanbic IBTC</option>
                <option value="fidelity">Fidelity Bank</option>
                <option value="fcmb">FCMB</option>
                <option value="sterling">Sterling Bank</option>
                <option value="wema">Wema Bank</option>
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
          <div className="flex-1 flex flex-col gap-[12px]">
            <label className="text-[14px] font-normal text-text-body leading-[20px]">
              Account Name <span className="text-[#d92d20]">*</span>
            </label>
            <div className="w-full border-[1.5px] border-card-stroke rounded-[8px] h-[56px] flex items-center px-[16px]">
              <input
                type="text"
                placeholder="Enter your account number"
                className="flex-1 bg-transparent text-[14px] font-medium text-text-header placeholder:text-forms-input leading-[20px] outline-none"
                {...register("accountName")}
              />
            </div>
          </div>
          <div className="flex-1 flex flex-col gap-[12px]">
            <label className="text-[14px] font-normal text-text-body leading-[20px]">
              Account Number <span className="text-[#d92d20]">*</span>
            </label>
            <div className="w-full border-[1.5px] border-card-stroke rounded-[8px] h-[56px] flex items-center px-[16px]">
              <input
                type="text"
                placeholder="1234567890"
                className="flex-1 bg-transparent text-[14px] font-medium text-text-header placeholder:text-forms-input leading-[20px] outline-none"
                {...register("accountNumber")}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
