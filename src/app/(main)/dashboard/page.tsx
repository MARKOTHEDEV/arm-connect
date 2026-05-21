"use client";

import { useEffect, useState } from "react";
import { useQueryState, parseAsBoolean, parseAsString, parseAsInteger } from "nuqs";
import { usePageHeaderStore } from "@/components/main/page-header-store";
import { ModelSelectionModal, type OnboardingModel } from "@/components/onboarding/ModelSelectionModal";
import { OnboardingModal } from "@/components/onboarding/OnboardingModal";
import { SubmissionSuccessModal } from "@/components/onboarding/SubmissionSuccessModal";

export default function DashboardPage() {
  const { setTitle, setBreadcrumbs, setBackHref } = usePageHeaderStore();

  const [onboarding, setOnboarding] = useQueryState("onboarding", parseAsBoolean.withDefault(false));
  const [model, setModel] = useQueryState("model", parseAsString.withDefault(""));
  const [step, setStep] = useQueryState("step", parseAsInteger.withDefault(0));
  const [showSuccess, setShowSuccess] = useState(false);

  useEffect(() => {
    setTitle("Dashboard");
    setBreadcrumbs([{ label: "Dashboard" }]);
    setBackHref(null);
  }, [setTitle, setBreadcrumbs, setBackHref]);

  const handleModelSelect = (selectedModel: OnboardingModel) => {
    setModel(selectedModel);
    setStep(1);
    setOnboarding(null);
  };

  const handleCloseOnboarding = () => {
    setOnboarding(null);
    setModel(null);
    setStep(null);
  };

  const handleStepChange = (newStep: number) => {
    setStep(newStep);
  };

  const handleSubmit = () => {
    setShowSuccess(true);
    setStep(null);
    setModel(null);
  };

  const handleCloseSuccess = () => {
    setShowSuccess(false);
  };

  return (
    <div>
      <p className="text-[14px] text-text-body">
        Welcome to your dashboard.
      </p>

      {/* Step 0: Model Selection Modal */}
      {onboarding && !step && !showSuccess && (
        <ModelSelectionModal
          onSelect={handleModelSelect}
          onClose={handleCloseOnboarding}
        />
      )}

      {/* Steps 1-8: Onboarding Modal */}
      {step > 0 && model && !showSuccess && (
        <OnboardingModal
          currentStep={step}
          onStepChange={handleStepChange}
          onClose={handleCloseOnboarding}
          onSubmit={handleSubmit}
        />
      )}

      {/* Submission Success Modal */}
      {showSuccess && (
        <SubmissionSuccessModal onClose={handleCloseSuccess} />
      )}
    </div>
  );
}
