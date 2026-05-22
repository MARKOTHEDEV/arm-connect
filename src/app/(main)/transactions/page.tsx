"use client";

import { useState } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight, ChevronUp } from "lucide-react";

const TABS = ["All", "Mutual Funds", "Stocks", "Treasury Bills", "Others"];

const TRANSACTIONS = [
  { name: "ARM Discovery Fund", date: "Mar 13, 2026", type: "Purchase/ Subscription", amount: "+₦25,000,000", amountColor: "text-[#16b364]", status: "Successful" as const, icon: "purchase" },
  { name: "Equities Market (MTN)", date: "Mar 13, 2026", type: "Dividend Payout", amount: "-₦4,250,000", amountColor: "text-[#d92d20]", status: "Successful" as const, icon: "withdrawal" },
  { name: "Fixed Income (FGN Bond)", date: "Mar 13, 2026", type: "New Allocation", amount: "+₦250,000,000", amountColor: "text-[#16b364]", status: "Processing" as const, icon: "deposit" },
  { name: "ARM Ethical Fund", date: "Mar 13, 2026", type: "Redemption", amount: "-₦12,500,000", amountColor: "text-[#d92d20]", status: "Successful" as const, icon: "withdrawal" },
  { name: "Fixed Income (FGN Bond)", date: "Mar 13, 2026", type: "New Allocation", amount: "+₦250,000,000", amountColor: "text-[#16b364]", status: "Processing" as const, icon: "deposit" },
  { name: "Money Market Fund", date: "Mar 13, 2026", type: "Purchase/ Subscription", amount: "+₦150,000,000", amountColor: "text-[#16b364]", status: "Successful" as const, icon: "purchase" },
];

export default function TransactionsPage() {
  const [activeTab, setActiveTab] = useState("All");

  return (
    <div className="flex flex-col gap-[39px] items-center pb-[32px]">
      <div className="w-full max-w-[1132px] px-[24px] flex flex-col gap-[32px] pt-[32px]">
        {/* Page Header */}
        <div className="flex flex-col gap-[12px] tracking-[-0.64px]">
          <h1 className="text-[32px] font-semibold text-text-header leading-[1.21]">
            Transactions
          </h1>
          <p className="text-[16px] font-normal text-text-body-2 leading-[1.4]">
            Monitor, filter, and export every transaction across your portfolio in one place
          </p>
        </div>

        {/* Tabs */}
        <div className="bg-white border border-card-stroke rounded-[34px] p-[4px] flex gap-[16px] items-center w-fit">
          {TABS.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-[14px] py-[6px] rounded-[34px] text-[13px] leading-[22px] ${
                activeTab === tab
                  ? "bg-[#1a212a] text-white font-bold shadow-[0px_6px_6px_-6px_rgba(0,0,0,0.16),0px_0px_1px_0px_rgba(0,0,0,0.4)]"
                  : "text-[#667085] font-medium"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Table */}
        <div className="bg-white border border-[#eaecf0] rounded-[12px] overflow-hidden">
          {/* Search */}
          <div className="px-[24px] py-[16px]">
            <div className="bg-white border border-card-stroke rounded-[8px] h-[40px] flex items-center gap-[8px] px-[16px] py-[8px] w-fit">
              <Image src="/icons/search.svg" alt="" width={20} height={20} />
              <span className="text-[14px] font-medium text-[#4f5877] leading-[20px]">
                Search for transactions
              </span>
            </div>
          </div>

          {/* Filters */}
          <div className="px-[24px] pb-[24px] pt-[8px] flex gap-[24px]">
            <button className="flex-1 bg-white border border-card-stroke rounded-[8px] h-[40px] flex items-center justify-between px-[16px] py-[8px]">
              <span className="text-[14px] font-semibold text-[#4f5877] leading-[20px]">Date range</span>
              <Image src="/icons/calendar-small.svg" alt="" width={16} height={16} />
            </button>
            <button className="flex-1 bg-white border border-card-stroke rounded-[8px] h-[40px] flex items-center justify-between px-[16px] py-[8px]">
              <span className="text-[14px] font-semibold text-[#4f5877] leading-[20px]">Status</span>
              <Image src="/icons/chevron-down.svg" alt="" width={20} height={20} />
            </button>
            <button className="flex-1 bg-white border border-card-stroke rounded-[8px] h-[40px] flex items-center justify-between px-[16px] py-[8px]">
              <span className="text-[14px] font-semibold text-[#4f5877] leading-[20px]">Transaction Type</span>
              <Image src="/icons/chevron-down.svg" alt="" width={20} height={20} />
            </button>
          </div>

          {/* Table Header */}
          <div className="bg-[#efece9] flex items-center h-[52px]">
            <div className="w-[25%] px-[24px] py-[16px]">
              <span className="text-[14px] font-semibold text-[#000e24] leading-[20px]">Asset Class</span>
            </div>
            <div className="flex-1 px-[24px] py-[16px]">
              <span className="text-[14px] font-semibold text-[#000e24] leading-[20px]">Transaction Type</span>
            </div>
            <div className="w-[14%] px-[24px] py-[16px]">
              <span className="text-[14px] font-semibold text-[#000e24] leading-[20px]">Date</span>
            </div>
            <div className="flex-1 px-[24px] py-[16px]">
              <span className="text-[14px] font-semibold text-[#000e24] leading-[20px]">Amount</span>
            </div>
            <div className="w-[15%] px-[24px] py-[16px]">
              <span className="text-[14px] font-semibold text-[#000e24] leading-[20px]">Status</span>
            </div>
          </div>

          {/* Table Body */}
          {TRANSACTIONS.map((tx, i) => (
            <div key={i} className={`flex items-center ${i > 0 ? "border-t border-[#eaecf0]" : ""}`}>
              <div className="w-[25%] px-[24px] py-[20px] flex gap-[16px] items-center">
                <div className="relative w-[32px] h-[32px] shrink-0">
                  <Image src={`/icons/tx-${tx.icon}.png`} alt="" fill className="object-contain" />
                </div>
                <div className="flex flex-col">
                  <span className="text-[14px] font-bold text-black leading-[18px]">{tx.name}</span>
                  <span className="text-[14px] font-normal text-text-body leading-[18px]">{tx.date}</span>
                </div>
              </div>
              <div className="flex-1 px-[24px] py-[20px]">
                <span className="text-[14px] font-normal text-[#454b52] leading-[18px]">{tx.type}</span>
              </div>
              <div className="w-[14%] px-[24px] py-[20px]">
                <span className="text-[14px] font-normal text-[#454b52] leading-[18px]">{tx.date}</span>
              </div>
              <div className="flex-1 px-[24px] py-[20px]">
                <span className={`text-[14px] font-bold tracking-[-0.07px] leading-[1.45] ${tx.amountColor}`}>{tx.amount}</span>
              </div>
              <div className="w-[15%] px-[24px] py-[20px]">
                <div className="flex gap-[7px] items-center">
                  <div className={`w-[6px] h-[6px] rounded-full ${tx.status === "Successful" ? "bg-[#079455]" : "bg-[#dc6803]"}`} />
                  <span className={`text-[10px] font-medium leading-[1.45] ${tx.status === "Successful" ? "text-[#079455]" : "text-[#dc6803]"}`}>
                    {tx.status}
                  </span>
                </div>
              </div>
            </div>
          ))}

          {/* Pagination */}
          <div className="border-t border-[#eaecf0] px-[24px] py-[16px] flex items-center justify-between">
            <div className="flex gap-[24px] items-center">
              <button className="w-[32px] h-[32px] border border-[#eaecf0] rounded-[8px] flex items-center justify-center">
                <ChevronLeft className="w-[16px] h-[16px] text-text-header" />
              </button>
              <div className="flex items-center">
                <button className="w-[32px] h-[32px] bg-[#ebebeb] rounded-[8px] flex items-center justify-center">
                  <span className="text-[12px] font-bold text-text-header leading-[18px]">1</span>
                </button>
                {[2, 3].map((n) => (
                  <button key={n} className="w-[32px] h-[32px] flex items-center justify-center">
                    <span className="text-[12px] font-bold text-text-header leading-[18px]">{n}</span>
                  </button>
                ))}
                <div className="w-[32px] h-[32px] flex items-center justify-center">
                  <span className="text-[12px] font-semibold text-text-header tracking-[-0.12px]">...</span>
                </div>
                <button className="w-[32px] h-[32px] flex items-center justify-center">
                  <span className="text-[12px] font-bold text-text-header leading-[18px]">10</span>
                </button>
              </div>
              <button className="w-[32px] h-[32px] border border-[#eaecf0] rounded-[8px] flex items-center justify-center">
                <ChevronRight className="w-[16px] h-[16px] text-text-header" />
              </button>
            </div>
            <div className="flex gap-[16px] items-center">
              <span className="text-[12px] font-medium text-paragraph-2 leading-[18px]">
                Showing 1 to 6 of 50 entries
              </span>
              <button className="bg-white border border-[#eaecf0] rounded-[8px] h-[32px] flex items-center gap-[10px] px-[10px]">
                <span className="text-[12px] font-medium text-text-header leading-[18px]">Show 6</span>
                <ChevronUp className="w-[16px] h-[16px] text-text-header" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
