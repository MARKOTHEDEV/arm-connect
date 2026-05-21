"use client";

const REVIEW_SECTIONS = [
  { title: "Corporate Details", description: "Corporate profile, address and registration", status: "SAVED" },
  { title: "Contact & Bank Details", description: "Primary contact and settlement account", status: "SAVED" },
  { title: "Risk & Signatories", description: "Authorised persons, IDs and utility bills", status: "SAVED" },
  { title: "Mandate & Declaration", description: "Signing mandate, signature and declarations", status: "SAVED" },
  { title: "Declarations", description: "Investment profile, PEP and T&C agreement", status: "SAVED" },
  { title: "Upload Documents", description: "8 company documents required", status: "SAVED" },
];

export function ReviewSubmitStep() {
  return (
    <div className="flex flex-col gap-[32px]">
      {/* Header */}
      <div className="flex flex-col gap-[4px]">
        <h2 className="font-bold text-[20px] text-text-header leading-[30px]">
          Review & Submit
        </h2>
        <p className="text-[14px] font-normal text-text-body leading-[20px]">
          Make sure all sections are complete before submitting. Incomplete or inaccurate information will delay your activation.
        </p>
      </div>

      {/* Success Banner */}
      <div className="bg-[#ecfdf3] border border-[#abefc6] rounded-[12px] p-[25px] flex gap-[12px] items-start">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="shrink-0">
          <circle cx="12" cy="12" r="10" stroke="#079455" strokeWidth="2" />
          <path d="M8 12l2.5 2.5L16 9" stroke="#079455" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
        <div className="flex flex-col gap-[4px]">
          <p className="text-[14px] font-bold text-[#079455] leading-[20px]">
            Almost there, Babatunde.
          </p>
          <p className="text-[14px] font-medium text-text-header leading-[20px]">
            Complete all sections below, then submit to activate your ARM Connect account. ARM will review your application within 2-3 business days.
          </p>
        </div>
      </div>

      {/* Section Review Cards */}
      <div className="flex flex-col gap-[16px]">
        {REVIEW_SECTIONS.map((section) => (
          <div
            key={section.title}
            className="border border-card-stroke rounded-[8px] px-[24px] py-[20px] flex items-center justify-between"
          >
            <div className="flex flex-col gap-[4px]">
              <h3 className="font-bold text-[16px] text-text-header leading-[24px]">
                {section.title}
              </h3>
              <p className="text-[14px] font-normal text-text-body leading-[20px]">
                {section.description}
              </p>
            </div>
            <span className="text-[12px] font-bold text-text-body tracking-[1px] leading-[18px]">
              {section.status}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
