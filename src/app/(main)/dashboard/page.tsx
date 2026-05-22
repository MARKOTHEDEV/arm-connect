"use client";

import { Suspense, useState } from "react";
import Image from "next/image";
import { ChevronRight } from "lucide-react";
import { useQueryState, parseAsBoolean, parseAsString, parseAsInteger } from "nuqs";
import { ModelSelectionModal, type OnboardingModel } from "@/components/onboarding/ModelSelectionModal";
import { OnboardingModal } from "@/components/onboarding/OnboardingModal";
import { SubmissionSuccessModal } from "@/components/onboarding/SubmissionSuccessModal";

export default function DashboardPage() {
  return (
    <Suspense fallback={<div className="px-[24px] py-[32px] max-w-[1132px] mx-auto w-full"><div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary" /></div>}>
      <DashboardContent />
    </Suspense>
  );
}

function DashboardContent() {
  const [onboarding, setOnboarding] = useQueryState("onboarding", parseAsBoolean.withDefault(false));
  const [model, setModel] = useQueryState("model", parseAsString.withDefault(""));
  const [step, setStep] = useQueryState("step", parseAsInteger.withDefault(0));
  const [showSuccess, setShowSuccess] = useState(false);
  const [testEnv, setTestEnv] = useState(false);

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
    <div className="px-[24px] py-[32px] flex flex-col gap-[32px] max-w-[1132px] mx-auto w-full">
      {/* Welcome Section */}
      <div className="flex items-center justify-between">
        <h1 className="text-[32px] font-semibold text-text-header tracking-[-0.64px] leading-[1.21]">
          Welcome Babatunde,
        </h1>
        <div className="flex items-center gap-[10px]">
          <span className="text-[16px] font-semibold text-text-body-2 leading-normal">
            Test Environment
          </span>
          <button
            type="button"
            onClick={() => setTestEnv(!testEnv)}
            className={`relative w-[62px] h-[28px] rounded-full transition-colors ${
              testEnv ? "bg-primary" : "bg-[rgba(60,60,67,0.3)]"
            }`}
          >
            <div
              className={`absolute top-[2px] w-[24px] h-[24px] rounded-full bg-white transition-transform ${
                testEnv ? "translate-x-[36px]" : "translate-x-[2px]"
              }`}
            />
          </button>
        </div>
      </div>

      {/* Net Asset Value + Active Products */}
      <div className="bg-[rgba(239,236,233,0.8)] rounded-[12px] p-[32px] flex items-center gap-[10px] overflow-hidden relative">
        <div className="flex flex-col gap-[32px] w-[778px]">
          {/* Total Net Asset Value */}
          <div className="flex flex-col gap-[12px]">
            <span className="text-[18px] font-medium text-primary leading-[28px]">
              Total Net Asset Value
            </span>
            <div className="flex gap-[8px] items-end">
              <span className="text-[32px] font-bold text-text-header tracking-[-0.64px] leading-[1.21]">
                ₦14,820,000,000.00
              </span>
              <div className="flex gap-[2px] items-center flex-1">
                <Image src="/icons/arrow-up-green.svg" alt="" width={16} height={16} />
                <span className="text-[14px] font-semibold text-[#079455] tracking-[-0.28px] leading-[1.5]">
                  ₦15.2M (+3.2%) this month
                </span>
              </div>
            </div>
          </div>

          {/* Divider + Active Products */}
          <div className="flex flex-col gap-[12px]">
            <div className="h-[1px] bg-[#eaecf0]" />
            <span className="text-[18px] font-medium text-primary leading-[28px]">
              Active Products
            </span>
            <div className="flex gap-[24px]">
              {/* Mutual Funds */}
              <div className="flex-1 bg-white border border-card-stroke rounded-[8px] p-[18px] flex flex-col gap-[16px] overflow-hidden">
                <div className="flex flex-col gap-[4px]">
                  <span className="text-[14px] font-medium text-text-body-2 leading-[20px]">
                    Mutual Funds
                  </span>
                  <div className="flex gap-[8px] items-end">
                    <span className="text-[24px] font-bold text-text-header leading-[32px]">
                      ₦8.54Bn
                    </span>
                    <div className="flex gap-[2px] items-center flex-1">
                      <Image src="/icons/arrow-up-green.svg" alt="" width={16} height={16} />
                      <span className="text-[14px] font-semibold text-[#079455] tracking-[-0.28px] leading-[1.5]">
                        + 2.3% vs benchmark
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Equities */}
              <div className="flex-1 bg-white border border-card-stroke rounded-[8px] p-[18px] flex flex-col gap-[16px] overflow-hidden">
                <div className="flex flex-col gap-[4px]">
                  <span className="text-[14px] font-medium text-text-body-2 leading-[20px]">
                    Equities
                  </span>
                  <div className="flex gap-[8px] items-end">
                    <span className="text-[24px] font-bold text-text-header leading-[32px]">
                      ₦6.28Bn
                    </span>
                    <div className="flex gap-[2px] items-center flex-1">
                      <Image src="/icons/arrow-up-green.svg" alt="" width={16} height={16} />
                      <span className="text-[14px] font-semibold text-[#079455] tracking-[-0.28px] leading-[1.5]">
                        + 2.3% vs benchmark
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Decorative house icon */}
        <div className="absolute right-[32px] top-[46px] w-[255px] h-[255px]">
          <Image src="/images/dashboard-house.svg" alt="" fill className="object-contain opacity-30" />
        </div>
      </div>

      {/* Explore Other Investments */}
      <div className="bg-white border border-card-stroke rounded-[8px] p-[24px] flex flex-col gap-[16px] overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between">
          <h2 className="font-extrabold text-[18px] text-text-header leading-[20px]">
            Explore Other Investments
          </h2>
          <button className="bg-[#ebebeb] rounded-[4px] px-[14px] py-[6px]">
            <span className="text-[14px] font-bold text-primary leading-normal">
              View Products
            </span>
          </button>
        </div>

        {/* Cards */}
        <div className="flex gap-[24px]">
          {[
            {
              title: "Mutual Funds",
              description: "View all Mutual Funds offerings",
              image: "/images/invest-mutual-funds.png",
            },
            {
              title: "Treasury Bills",
              description: "View all Treasury Bills offerings",
              image: "/images/invest-treasury-bills.png",
            },
            {
              title: "Stocks",
              description: "View all Stock offerings",
              image: "/images/invest-stocks.png",
            },
          ].map((item) => (
            <div
              key={item.title}
              className="flex-1 bg-white border border-card-stroke rounded-[8px] p-[18px] flex gap-[10px] overflow-hidden cursor-pointer hover:border-primary/30 transition-colors"
            >
              <div className="flex-1 flex flex-col gap-[8px] justify-center">
                <div className="relative w-[66px] h-[57px]">
                  <Image src={item.image} alt="" fill className="object-contain" />
                </div>
                <div className="flex flex-col gap-[4px]">
                  <div className="flex items-center justify-between">
                    <span className="text-[18px] font-bold text-text-body-2 leading-normal">
                      {item.title}
                    </span>
                    <ChevronRight className="w-[24px] h-[24px] text-text-body-2" />
                  </div>
                  <span className="text-[14px] font-normal text-text-body leading-[20px]">
                    {item.description}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Recent Transactions */}
      <div className="bg-white border border-[#eaecf0] rounded-[12px] overflow-hidden">
        {/* Header */}
        <div className="px-[24px] py-[16px] flex items-center justify-between">
          <h2 className="font-extrabold text-[18px] text-text-header leading-[20px]">
            Recent Transactions
          </h2>
          <button className="bg-[#ebebeb] rounded-[4px] px-[14px] py-[6px]">
            <span className="text-[14px] font-bold text-black leading-normal">View all</span>
          </button>
        </div>

        {/* Table Header */}
        <div className="bg-[#f0eeeb] flex items-center h-[52px]">
          <div className="w-[27%] px-[24px] py-[16px]">
            <span className="text-[14px] font-semibold text-[#000e24] leading-[20px]">Asset Class</span>
          </div>
          <div className="w-[29%] px-[24px] py-[16px]">
            <span className="text-[14px] font-semibold text-[#000e24] leading-[20px]">Transaction Type</span>
          </div>
          <div className="w-[24%] px-[24px] py-[16px]">
            <span className="text-[14px] font-semibold text-[#000e24] leading-[20px]">Amount</span>
          </div>
          <div className="w-[20%] px-[24px] py-[16px]">
            <span className="text-[14px] font-semibold text-[#000e24] leading-[20px]">Status</span>
          </div>
        </div>

        {/* Table Body */}
        {[
          { name: "ARM Discovery Fund", date: "Mar 13, 2026", type: "Purchase/ Subscription", amount: "+₦25,000,000", amountColor: "text-[#16b364]", status: "Successful", icon: "purchase" },
          { name: "Equities Market (MTN)", date: "Mar 13, 2026", type: "Dividend Payout", amount: "-₦4,250,000", amountColor: "text-[#d92d20]", status: "Successful", icon: "withdrawal" },
          { name: "Fixed Income (FGN Bond)", date: "Mar 13, 2026", type: "New Allocation", amount: "+₦250,000,000", amountColor: "text-[#16b364]", status: "Processing", icon: "deposit" },
          { name: "ARM Ethical Fund", date: "Mar 13, 2026", type: "Redemption", amount: "-₦12,500,000", amountColor: "text-[#d92d20]", status: "Successful", icon: "withdrawal" },
          { name: "Money Market Fund", date: "Mar 13, 2026", type: "Purchase/ Subscription", amount: "+₦150,000,000", amountColor: "text-[#16b364]", status: "Successful", icon: "purchase" },
        ].map((tx, i) => (
          <div key={i} className={`flex items-center ${i > 0 ? "border-t border-[#eaecf0]" : ""}`}>
            <div className="w-[27%] px-[24px] py-[24px] flex gap-[16px] items-center">
              <div className="relative w-[32px] h-[32px] shrink-0">
                <Image
                  src={`/icons/tx-${tx.icon}.png`}
                  alt=""
                  fill
                  className="object-contain"
                />
              </div>
              <div className="flex flex-col">
                <span className="text-[14px] font-bold text-black leading-[18px]">{tx.name}</span>
                <span className="text-[14px] font-normal text-text-body leading-[18px]">{tx.date}</span>
              </div>
            </div>
            <div className="w-[29%] px-[24px] py-[20px]">
              <span className="text-[14px] font-normal text-[#454b52] leading-[18px]">{tx.type}</span>
            </div>
            <div className="w-[24%] px-[24px] py-[24px]">
              <span className={`text-[14px] font-bold tracking-[-0.07px] leading-[1.45] ${tx.amountColor}`}>{tx.amount}</span>
            </div>
            <div className="w-[20%] px-[24px] py-[24px]">
              <div className="flex gap-[7px] items-center">
                <div className={`w-[6px] h-[6px] rounded-full ${tx.status === "Successful" ? "bg-[#079455]" : "bg-[#dc6803]"}`} />
                <span className={`text-[10px] font-medium leading-[1.45] ${tx.status === "Successful" ? "text-[#079455]" : "text-[#dc6803]"}`}>
                  {tx.status}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>

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
