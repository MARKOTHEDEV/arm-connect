"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import Image from "next/image";
import { Pen } from "lucide-react";

const mandateSchema = z.object({
  mandateInstruction: z.string().min(1, "Required"),
  otherDescription: z.string().optional(),
  signatureDate: z.string().min(1, "Required"),
});

type MandateFormData = z.infer<typeof mandateSchema>;

const DECLARATIONS = [
  "I confirm that all information provided in this application is accurate and complete to the best of my knowledge.",
  "I have read, understood, and agreed to the Platform Terms of Service and operational guidelines.",
  "I acknowledge the risks associated with architectural financial management and ledger integrity.",
  "I consent to the sharing of my data with regulatory bodies for compliance and verification purposes.",
];

export function MandateDeclarationStep() {
  const [checkedDeclarations, setCheckedDeclarations] = useState<Set<number>>(new Set());

  const { register } = useForm<MandateFormData>({
    resolver: zodResolver(mandateSchema),
    mode: "onChange",
  });

  const toggleDeclaration = (index: number) => {
    setCheckedDeclarations((prev) => {
      const next = new Set(prev);
      if (next.has(index)) {
        next.delete(index);
      } else {
        next.add(index);
      }
      return next;
    });
  };

  return (
    <div className="flex flex-col gap-[32px]">
      {/* Header */}
      <div className="flex flex-col gap-[4px]">
        <h2 className="font-bold text-[20px] text-text-header leading-[30px]">
          Sign the Mandate & Declaration
        </h2>
        <p className="text-[14px] font-normal text-text-body leading-[20px]">
          Define the signing authority for investment instructions on this platform and confirm the client declaration by ticking all statements below.
        </p>
      </div>

      {/* Signature Mandate */}
      <div className="flex flex-col gap-[24px]">
        <div className="flex flex-col gap-[4px]">
          <h3 className="font-extrabold text-[16px] text-text-header leading-[20px]">
            Signature Mandate
          </h3>
          <p className="text-[14px] font-normal text-paragraph-2 leading-[20px]">
            Fill and sign to proceed
          </p>
        </div>

        {/* Mandate Instruction */}
        <div className="flex flex-col gap-[12px]">
          <label className="text-[14px] font-normal text-text-body leading-[20px]">
            Mandate Instruction <span className="text-[#d92d20]">*</span>
          </label>
          <div className="w-full border-[1.5px] border-card-stroke rounded-[8px] h-[56px] flex items-center gap-[8px] px-[16px]">
            <select
              className="flex-1 bg-transparent text-[14px] font-medium text-text-header leading-[20px] outline-none appearance-none"
              {...register("mandateInstruction")}
            >
              <option value="">Select Mandate</option>
              <option value="sole">Sole Signatory</option>
              <option value="joint">Joint Signatories</option>
              <option value="either">Either to Sign</option>
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

        {/* Other Description */}
        <div className="flex flex-col gap-[12px]">
          <label className="text-[14px] font-normal text-text-body leading-[20px]">
            Other Description (If Applicable)
          </label>
          <div className="w-full border-[1.5px] border-card-stroke rounded-[8px] min-h-[80px] flex items-start px-[16px] py-[16px]">
            <textarea
              placeholder="Specify mandate requirements"
              rows={3}
              className="flex-1 bg-transparent text-[14px] font-medium text-text-header placeholder:text-forms-input leading-[20px] outline-none resize-none"
              {...register("otherDescription")}
            />
          </div>
        </div>

        {/* Signature + Date */}
        <div className="flex gap-[24px] items-start">
          {/* Signature Pad */}
          <div className="flex-1 flex flex-col gap-[12px]">
            <label className="text-[14px] font-normal text-text-body leading-[20px]">
              Signature A <span className="text-[#d92d20]">*</span>
            </label>
            <div
              className="w-full rounded-[12px] h-[160px] flex flex-col items-center justify-center gap-[8px] bg-white relative"
              style={{ backgroundImage: `url("data:image/svg+xml,%3csvg width='100%25' height='100%25' xmlns='http://www.w3.org/2000/svg'%3e%3crect width='100%25' height='100%25' fill='none' rx='12' ry='12' stroke='%23C4C6CE' stroke-width='1.5' stroke-dasharray='6%2c 6' stroke-dashoffset='0' stroke-linecap='round'/%3e%3c/svg%3e")` }}
            >
              <Pen className="w-[24px] h-[24px] text-text-body" />
              <span className="text-[14px] text-text-body leading-[20px]">
                Draw signature here
              </span>
              <button
                type="button"
                className="absolute bottom-[12px] right-[16px] text-[14px] font-bold text-primary leading-[20px]"
              >
                CLEAR
              </button>
            </div>
          </div>

          {/* Date of Signature */}
          <div className="w-[300px] flex flex-col gap-[12px] pt-[80px]">
            <label className="text-[14px] font-normal text-text-body leading-[20px]">
              Date of Signature <span className="text-[#d92d20]">*</span>
            </label>
            <div className="w-full border-[1.5px] border-card-stroke rounded-[8px] h-[56px] flex items-center gap-[8px] px-[16px]">
              <input
                type="date"
                className="flex-1 bg-transparent text-[14px] font-medium text-text-header placeholder:text-forms-input leading-[20px] outline-none [&::-webkit-calendar-picker-indicator]:opacity-0 [&::-webkit-calendar-picker-indicator]:absolute [&::-webkit-calendar-picker-indicator]:right-4 [&::-webkit-calendar-picker-indicator]:w-6 [&::-webkit-calendar-picker-indicator]:h-6 [&::-webkit-calendar-picker-indicator]:cursor-pointer"
                {...register("signatureDate")}
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

      {/* Client Declaration */}
      <div className="flex flex-col gap-[24px]">
        <div className="flex flex-col gap-[4px]">
          <h3 className="font-extrabold text-[16px] text-text-header leading-[20px]">
            Client Declaration
          </h3>
          <p className="text-[14px] font-normal text-paragraph-2 leading-[20px]">
            Tick all and proceed
          </p>
        </div>

        <div className="flex flex-col gap-[24px]">
          {DECLARATIONS.map((text, i) => (
            <label key={i} className="flex gap-[16px] items-start cursor-pointer">
              <button
                type="button"
                onClick={() => toggleDeclaration(i)}
                className={`mt-[2px] w-[20px] h-[20px] rounded-full border-2 flex items-center justify-center shrink-0 ${
                  checkedDeclarations.has(i)
                    ? "bg-primary border-primary"
                    : "bg-white border-[#d0d5dd]"
                }`}
              >
                {checkedDeclarations.has(i) && (
                  <svg width="10" height="8" viewBox="0 0 10 8" fill="none">
                    <path d="M1 4L3.5 6.5L9 1" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                )}
              </button>
              <span className="text-[14px] font-medium text-text-header leading-[20px]">
                {i === 1 ? (
                  <>
                    I have read, understood, and agreed to the{" "}
                    <span className="text-primary">Platform Terms of Service</span> and{" "}
                    <span className="text-primary">operational guidelines</span>.
                  </>
                ) : (
                  text
                )}
              </span>
            </label>
          ))}
        </div>
      </div>
    </div>
  );
}
