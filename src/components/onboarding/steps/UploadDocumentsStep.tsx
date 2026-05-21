"use client";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import Image from "next/image";

const uploadSchema = z.object({
  utilityBillType: z.string().min(1, "Required"),
  issueDate: z.string().min(1, "Required"),
  expiryDate: z.string().min(1, "Required"),
});

type UploadFormData = z.infer<typeof uploadSchema>;

const UPLOAD_ITEMS = [
  { label: "Proof of Address", description: "Electricity bill, Water bill (within 3 months old)", required: true },
  { label: "Means of Identification", description: "Int'l Passport, National ID or Voter's Card", required: true },
  { label: "Passport Photo", description: "Clear Photograph", required: true },
  { label: "Board Resolution", description: "Signed and Stamped Company Document", required: true },
  { label: "Certificate of Incorporation", description: "Signed and Stamped Company Document", required: true },
  { label: "CAC 7", description: "Signed and Stamped Company Document", required: true },
  { label: "CAC 2", description: "Signed and Stamped Company Document", required: true },
  { label: "MEMART", description: "Signed and Stamped Company Document", required: true },
];

export function UploadDocumentsStep() {
  const { register } = useForm<UploadFormData>({
    resolver: zodResolver(uploadSchema),
    mode: "onChange",
  });

  return (
    <div className="flex flex-col gap-[32px]">
      {/* Header */}
      <div className="flex flex-col gap-[4px]">
        <h2 className="font-bold text-[20px] text-text-header leading-[30px]">
          Upload Documents
        </h2>
        <p className="text-[14px] font-normal text-text-body leading-[20px]">
          Upload all required company documents. Accepted formats are PDF, PNG, or JPG. Each file must not exceed 5MB.
        </p>
      </div>

      {/* Company Upload Checklist */}
      <div className="flex flex-col gap-[24px]">
        <div className="flex flex-col gap-[4px]">
          <h3 className="font-extrabold text-[16px] text-text-header leading-[20px]">
            Company Upload Checklist
          </h3>
          <p className="text-[14px] font-normal text-paragraph-2 leading-[20px]">
            Kindly upload all company documents
          </p>
        </div>

        {/* Utility Bill Type + Issue Date + Expiry Date */}
        <div className="flex gap-[24px]">
          <div className="flex-1 flex flex-col gap-[12px]">
            <label className="text-[14px] font-normal text-text-body leading-[20px]">
              Utility Bill Type <span className="text-[#d92d20]">*</span>
            </label>
            <div className="w-full border-[1.5px] border-card-stroke rounded-[8px] h-[56px] flex items-center gap-[8px] px-[16px]">
              <select
                className="flex-1 bg-transparent text-[14px] font-medium text-text-header leading-[20px] outline-none appearance-none"
                {...register("utilityBillType")}
              >
                <option value="">Select Utility Bill</option>
                <option value="electricity">Electricity Bill</option>
                <option value="water">Water Bill</option>
                <option value="waste">Waste Disposal Bill</option>
              </select>
              <Image src="/icons/chevron-down.svg" alt="" width={24} height={24} className="shrink-0 pointer-events-none" />
            </div>
          </div>
          <div className="flex-1 flex flex-col gap-[12px]">
            <label className="text-[14px] font-normal text-text-body leading-[20px]">
              Issue Date <span className="text-[#d92d20]">*</span>
            </label>
            <div className="w-full border-[1.5px] border-card-stroke rounded-[8px] h-[56px] flex items-center gap-[8px] px-[16px]">
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
            <div className="w-full border-[1.5px] border-card-stroke rounded-[8px] h-[56px] flex items-center gap-[8px] px-[16px]">
              <input
                type="date"
                className="flex-1 bg-transparent text-[14px] font-medium text-text-header placeholder:text-forms-input leading-[20px] outline-none [&::-webkit-calendar-picker-indicator]:opacity-0 [&::-webkit-calendar-picker-indicator]:absolute [&::-webkit-calendar-picker-indicator]:right-4 [&::-webkit-calendar-picker-indicator]:w-6 [&::-webkit-calendar-picker-indicator]:h-6 [&::-webkit-calendar-picker-indicator]:cursor-pointer"
                {...register("expiryDate")}
              />
              <Image src="/icons/calendar.svg" alt="" width={24} height={24} className="shrink-0 pointer-events-none" />
            </div>
          </div>
        </div>

        {/* Upload Grid */}
        <div className="flex flex-col gap-[24px]">
          {/* Row pairs */}
          {[
            UPLOAD_ITEMS.slice(0, 3),
            UPLOAD_ITEMS.slice(3, 6),
            UPLOAD_ITEMS.slice(6, 8),
          ].map((row, rowIndex) => (
            <div key={rowIndex} className="flex gap-[24px]">
              {row.map((item) => (
                <div key={item.label} className="flex-1 flex flex-col gap-[8px]">
                  <label className="text-[14px] font-normal text-text-body leading-[20px]">
                    {item.label} {item.required && <span className="text-[#d92d20]">*</span>}
                  </label>
                  <div className="w-full border-[1.5px] border-dashed border-card-stroke rounded-[7px] py-[17px] px-[12px] flex items-center gap-[12px] bg-white cursor-pointer hover:border-primary/40 transition-colors">
                    <Image
                      src="/icons/document-upload.svg"
                      alt=""
                      width={48}
                      height={48}
                      className="shrink-0"
                    />
                    <div className="flex flex-col gap-[4px]">
                      <span className="font-extrabold text-[14px] text-text-header leading-normal text-nowrap">
                        Upload document
                      </span>
                      <span className="text-[10px] font-normal text-[#475467] leading-[18px] text-nowrap">
                        {item.description}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ))}
        </div>

        <p className="text-[12px] font-normal text-text-body leading-[18px]">
          All Document Uploads should be PDF, PNG, or JPG (File must not exceed 5MB)
        </p>
      </div>
    </div>
  );
}
