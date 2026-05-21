"use client";

import { useState } from "react";
import { ArrowLeft, Check } from "lucide-react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { CorporateDetailsStep, CORPORATE_DETAILS_SUB_STEP_COUNT } from "./steps/CorporateDetailsStep";
import { ContactBankStep } from "./steps/ContactBankStep";
import { RiskSignatoriesStep } from "./steps/RiskSignatoriesStep";
import { MandateDeclarationStep } from "./steps/MandateDeclarationStep";
import { DeclarationsStep } from "./steps/DeclarationsStep";
import { UploadDocumentsStep } from "./steps/UploadDocumentsStep";
import { ReviewSubmitStep } from "./steps/ReviewSubmitStep";

const STEPS = [
  "Documents",
  "Corporate Details",
  "Contact & Bank",
  "Risk & Signatories",
  "Mandate & Declaration",
  "Declarations",
  "Upload Documents",
  "Review & Submit",
] as const;

interface OnboardingModalProps {
  currentStep: number;
  onStepChange: (step: number) => void;
  onClose: () => void;
  onSubmit: () => void;
}

export function OnboardingModal({
  currentStep,
  onStepChange,
  onClose,
  onSubmit,
}: OnboardingModalProps) {
  const [completedSteps, setCompletedSteps] = useState<Set<number>>(new Set());
  const [subStep, setSubStep] = useState(1);

  const completedCount = completedSteps.size;

  // Steps that have sub-steps
  const subStepCounts: Record<number, number> = {
    2: CORPORATE_DETAILS_SUB_STEP_COUNT,
  };

  const currentSubStepCount = subStepCounts[currentStep] || 0;
  const hasSubSteps = currentSubStepCount > 0;

  const handleProceed = () => {
    if (hasSubSteps && subStep < currentSubStepCount) {
      setSubStep(subStep + 1);
    } else if (currentStep === STEPS.length) {
      onSubmit();
    } else {
      setCompletedSteps((prev) => new Set(prev).add(currentStep));
      setSubStep(1);
      onStepChange(currentStep + 1);
    }
  };

  const handleBack = () => {
    if (hasSubSteps && subStep > 1) {
      setSubStep(subStep - 1);
    } else if (currentStep > 1) {
      const prevStep = currentStep - 1;
      const prevSubStepCount = subStepCounts[prevStep] || 0;
      setSubStep(prevSubStepCount > 0 ? prevSubStepCount : 1);
      onStepChange(prevStep);
    }
  };

  const handleStepClick = (stepNum: number) => {
    setSubStep(1);
    onStepChange(stepNum);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/50" />

      {/* Modal */}
      <div className="relative bg-white border border-card-stroke rounded-[10px] p-[32px] w-[1200px] max-w-[95vw] max-h-[90vh] flex flex-col gap-[24px] overflow-hidden">
        {/* Header */}
        <div className="flex flex-col gap-[10px] shrink-0">
          <div className="flex items-center justify-between">
            {/* Back Button */}
            <button
              onClick={onClose}
              className="w-[38px] h-[38px] rounded-full bg-[#ebebeb] flex items-center justify-center"
            >
              <ArrowLeft className="w-[18px] h-[18px] text-text-header" strokeWidth={2} />
            </button>

            {/* Activation Progress */}
            <div className="flex flex-col gap-[4px] items-end">
              <span className="text-[12px] font-medium text-forms-input tracking-[1.44px] leading-[20px]">
                Activation Progress
              </span>
              <div className="flex gap-[4px] items-center">
                {STEPS.map((_, i) => (
                  <div
                    key={i}
                    className={`rounded-[6.769px] ${
                      i + 1 === currentStep
                        ? "bg-black h-[11px] w-[40px]"
                        : i + 1 < currentStep || completedSteps.has(i + 1)
                        ? "bg-black size-[10px]"
                        : "bg-text-body-2 size-[10px]"
                    }`}
                  />
                ))}
              </div>
              <span className="text-[12px] font-medium text-text-header tracking-[1.44px] leading-[20px]">
                {completedCount} of {STEPS.length} sections completed
              </span>
            </div>
          </div>
        </div>

        {/* Body */}
        <div className="flex gap-[48px] flex-1 min-h-0 overflow-y-auto">
          {/* Sidebar */}
          <div className="w-[272px] shrink-0 pt-[48px]">
            <div className="flex flex-col gap-[12px]">
              {STEPS.map((step, i) => {
                const stepNum = i + 1;
                const isActive = stepNum === currentStep;
                const isCompleted = completedSteps.has(stepNum);

                return (
                  <button
                    key={step}
                    onClick={() => handleStepClick(stepNum)}
                    className={`flex items-center justify-between px-[12px] py-[8px] rounded-[4px] text-left w-full ${
                      isActive ? "bg-[#f7eaf1]" : ""
                    }`}
                  >
                    <span
                      className={`text-[16px] ${
                        isActive
                          ? "font-semibold text-primary leading-[24px]"
                          : "font-medium text-text-body-2 leading-[20px]"
                      }`}
                    >
                      {step}
                    </span>
                    {isActive && (
                      <div className="w-[10px] h-[10px] rounded-full bg-primary" />
                    )}
                    {!isActive && isCompleted && (
                      <Check className="w-[20px] h-[20px] text-green-500" strokeWidth={2.5} />
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Content Area */}
          <div className="flex-1 min-w-0 flex flex-col gap-[48px]">
            <StepContent step={currentStep} subStep={subStep} />

            {/* Footer */}
            <div className="flex items-center justify-between shrink-0 pt-[16px]">
              {currentStep === 1 ? (
                <div />
              ) : currentStep === STEPS.length ? (
                /* Review & Submit footer: Back + Submit Application */
                <button
                  onClick={handleBack}
                  className="min-w-[180px] px-[32px] h-[48px] border border-forms-input rounded-[4px] flex items-center justify-center"
                >
                  <span className="font-semibold text-[14px] text-text-header">Back</span>
                </button>
              ) : (
                <div className="flex gap-[24px] items-center">
                  <button
                    onClick={handleBack}
                    className="min-w-[180px] px-[32px] h-[48px] border border-forms-input rounded-[4px] flex items-center justify-center"
                  >
                    <span className="font-semibold text-[14px] text-text-header">Back</span>
                  </button>
                  <button className="min-w-[180px] px-[32px] h-[48px] border border-forms-input rounded-[4px] flex items-center justify-center">
                    <span className="font-semibold text-[14px] text-text-header">Save Draft</span>
                  </button>
                </div>
              )}
              <Button
                onClick={handleProceed}
                className="min-w-[200px] px-[40px] h-[48px] rounded-[4px] text-[14px] font-semibold"
              >
                {currentStep === 1
                  ? "Get started"
                  : currentStep === STEPS.length
                  ? "Submit Application"
                  : hasSubSteps && subStep === currentSubStepCount
                  ? "Confirm & Continue"
                  : "Proceed"}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// Step 1: Documents
function DocumentsStep() {
  return (
    <div className="flex flex-col gap-[32px]">
      {/* Header */}
      <div className="flex flex-col gap-[4px]">
        <h2 className="font-bold text-[20px] text-text-header leading-[30px]">
          Activate Your Account With ARM
        </h2>
        <p className="text-[14px] font-normal text-text-body leading-[20px]">
          As a regulated financial services company, ARM must verify your business before you can go live. Prepare these documents before you start.
        </p>
      </div>

      {/* Info Note */}
      <div className="bg-[#fff6e6] border border-[#f6dfa9] rounded-[12px] p-[25px] flex gap-[12px] items-start">
        <Image src="/icons/bulb.svg" alt="" width={24} height={24} className="shrink-0" />
        <p className="text-[14px] font-medium text-[#8b5a00] leading-[20px]">
          This process takes most businesses <strong>15-20 minutes</strong> to complete. You can save your progress at any time and return to finish later.
        </p>
      </div>

      {/* Company Documents */}
      <div className="flex flex-col gap-[16px]">
        <h3 className="font-bold text-[16px] text-text-header leading-[20px]">
          Company Documents
        </h3>
        <div className="flex flex-col gap-[16px]">
          <div className="flex gap-[16px]">
            <DocumentCard
              title="Certificate of Incorporation"
              description="Signed and stamped copy from CAC"
              badge="REQUIRED"
            />
            <DocumentCard
              title="MEMART"
              description="Memorandum & Articles of Association"
              badge="REQUIRED"
            />
          </div>
          <div className="flex gap-[16px]">
            <DocumentCard
              title="Board Resolution"
              description="Authorizing the integration & naming signatories"
              badge="REQUIRED"
            />
            <DocumentCard
              title="CAC 7 & CAC 2"
              description="Particulars of directors and shareholders"
              badge="REQUIRED"
            />
          </div>
          <div className="flex gap-[16px]">
            <DocumentCard
              title="Proof of Business Address"
              description="Utility bill not older than 3 months"
              badge="REQUIRED"
            />
          </div>
        </div>
      </div>

      {/* Signatory Documents */}
      <div className="flex flex-col gap-[16px]">
        <h3 className="font-bold text-[16px] text-text-header leading-[20px]">
          For each Authorized Signatory
        </h3>
        <div className="flex flex-col gap-[16px]">
          <div className="flex gap-[16px]">
            <DocumentCard
              title="Government - Issued ID"
              description="International Passport, National ID, or Voter's Card"
              badge="REQUIRED PER SIGNATORY"
            />
            <DocumentCard
              title="Passport Photograph"
              description="Clear, recent photograph"
              badge="REQUIRED PER SIGNATORY"
            />
          </div>
          <div className="flex gap-[16px]">
            <DocumentCard
              title="Proof of Residential Address"
              description="Utility bill not older than 3 months"
              badge="REQUIRED PER SIGNATORY"
            />
            <DocumentCard
              title="BVN & NIN"
              description="11-digit Bank Verification Number and NIN"
              badge="REQUIRED PER SIGNATORY"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

function DocumentCard({
  title,
  description,
  badge,
}: {
  title: string;
  description: string;
  badge: string;
}) {
  return (
    <div className="flex-1 border border-card-stroke rounded-[8px] p-[16px]">
      <div className="flex flex-col gap-[4px]">
        <div className="flex items-center justify-between">
          <p className="font-extrabold text-[16px] text-text-header leading-[28px]">
            {title}
          </p>
          <span className="bg-[#fffaeb] text-[10px] font-bold text-[#b54708] leading-[18px] px-[8px] py-[2px] rounded-full whitespace-nowrap">
            {badge}
          </span>
        </div>
        <p className="text-[14px] font-normal text-text-body leading-[20px]">
          {description}
        </p>
      </div>
    </div>
  );
}

// Placeholder for other steps
function PlaceholderStep({ name }: { name: string }) {
  return (
    <div className="flex flex-col gap-[16px]">
      <h2 className="font-bold text-[20px] text-text-header leading-[30px]">
        {name}
      </h2>
      <p className="text-[14px] text-text-body leading-[20px]">
        This section will be built when the design is provided.
      </p>
    </div>
  );
}

function StepContent({ step, subStep }: { step: number; subStep: number }) {
  switch (step) {
    case 1:
      return <DocumentsStep />;
    case 2:
      return <CorporateDetailsStep subStep={subStep} />;
    case 3:
      return <ContactBankStep />;
    case 4:
      return <RiskSignatoriesStep />;
    case 5:
      return <MandateDeclarationStep />;
    case 6:
      return <DeclarationsStep />;
    case 7:
      return <UploadDocumentsStep />;
    case 8:
      return <ReviewSubmitStep />;
    default:
      return <DocumentsStep />;
  }
}
