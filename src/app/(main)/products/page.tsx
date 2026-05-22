"use client";

import { useState } from "react";
import Image from "next/image";
import { ChevronUp, ChevronDown, ArrowUpRight, ArrowDownLeft } from "lucide-react";

const HOLDING_TABS = ["All", "Mutual Funds", "Stocks", "Treasury Bills"];

const HOLDINGS = [
  {
    name: "Mutual Funds", color: "bg-primary", percentage: "40% of portfolio", count: "9 Mutual Funds", total: "₦8,543,006,000",
    items: [
      { name: "Money Market Fund", rate: "21% p.a.", rateColor: "text-[#079455]", value: "₦5,000,000.00", bookBalance: "₦6,500,000.30", badge: null },
      { name: "Equity Fund", rate: "15% p.a.", rateColor: "text-[#079455]", value: "₦3,000,000.00", bookBalance: "₦3,450,000.75", badge: "₦50,000 Processing" },
      { name: "Bond Fund", rate: null, rateColor: "", value: "₦2,000,000.00", bookBalance: null, badge: null },
    ],
  },
  {
    name: "Stocks", color: "bg-[#e9ecee]", percentage: "28% of portfolio", count: "9 Stocks", total: "₦29,583,006",
    items: [
      { name: "MTN", subtitle: "MTN Group Ltd", logo: "/images/logo-mtn.png", currentPrice: "₦460.00", holdingValue: "₦71,200,000.00", unitsOwned: "179,130", gainLoss: "₦1,000,000.44 (03.4%)", gainPositive: true },
      { name: "FCMB", subtitle: "First City Monument", logo: "/images/logo-fcmb.svg", currentPrice: "₦460.00", holdingValue: "₦71,200,000.00", unitsOwned: "245,000", gainLoss: "-₦100,000.44 (03.4%)", gainPositive: false },
      { name: "TOTAL", subtitle: "Total Energies Limited", logo: "/images/logo-total.svg", currentPrice: null, holdingValue: "₦71,200,000.00", unitsOwned: "320,500", gainLoss: "₦1,000,000.44", gainPositive: true },
    ],
  },
  {
    name: "Treasury Bills", color: "bg-[#c4c6ce]", percentage: "22% of portfolio", count: "200 Active", total: "₦29,583,006",
    items: [
      { label: "120 Days Treasury Bill", value: "₦5,000,000.00", discountRate: "16%", maturityDate: "Thu, 25 Apr 2026" },
      { label: "120 Days Treasury Bill", value: "₦5,000,000.00", discountRate: "16%", maturityDate: "Thu, 25 Apr 2026" },
      { label: "120 Days Treasury Bill", value: "₦5,000,000.00", discountRate: null, maturityDate: null },
    ],
  },
];

const TRANSACTIONS = [
  { name: "ARM Discovery Fund", date: "Mar 13, 2026", type: "Purchase/ Subscription", amount: "+₦25,000,000", amountColor: "text-[#16b364]", status: "Successful" as const, icon: "purchase" },
  { name: "Equities Market (MTN)", date: "Mar 13, 2026", type: "Dividend Payout", amount: "-₦4,250,000", amountColor: "text-[#d92d20]", status: "Successful" as const, icon: "withdrawal" },
  { name: "Fixed Income (FGN Bond)", date: "Mar 13, 2026", type: "New Allocation", amount: "+₦250,000,000", amountColor: "text-[#16b364]", status: "Processing" as const, icon: "deposit" },
  { name: "ARM Ethical Fund", date: "Mar 13, 2026", type: "Redemption", amount: "-₦12,500,000", amountColor: "text-[#d92d20]", status: "Successful" as const, icon: "withdrawal" },
  { name: "Money Market Fund", date: "Mar 13, 2026", type: "Purchase/ Subscription", amount: "+₦150,000,000", amountColor: "text-[#16b364]", status: "Successful" as const, icon: "purchase" },
];

export default function ProductsPage() {
  const [activeTab, setActiveTab] = useState("Active Products");
  const [activeHoldingTab, setActiveHoldingTab] = useState("All");

  return (
    <div className="px-[24px] py-[32px] flex flex-col gap-[32px] max-w-[1132px] mx-auto w-full">
      {/* Page Header */}
      <div className="flex flex-col gap-[12px]">
        <h1 className="text-[32px] font-semibold text-text-header tracking-[-0.64px] leading-[1.21]">
          Investment Products
        </h1>
        <p className="text-[16px] font-normal text-text-body-2 leading-[1.4]">
          Discover and manage the full range of investment products we offer across all asset classes.
        </p>
      </div>

      {/* Tabs */}
      <div className="border-b border-[#eaecf0]">
        <div className="flex gap-[32px]">
          {["Active Products", "More Products"].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`pb-[12px] text-[16px] leading-[24px] ${
                activeTab === tab
                  ? "font-bold text-text-header border-b-[3px] border-primary"
                  : "font-medium text-text-body-2"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      {/* Tab Content */}
      {activeTab === "Active Products" && (
        <ActiveProductsTab activeHoldingTab={activeHoldingTab} onHoldingTabChange={setActiveHoldingTab} />
      )}
      {activeTab === "More Products" && <MoreProductsTab />}
    </div>
  );
}

function ActiveProductsTab({ activeHoldingTab, onHoldingTabChange }: { activeHoldingTab: string; onHoldingTabChange: (tab: string) => void }) {
  return (
    <>
      {/* Stats Cards */}
      <div className="flex gap-[24px]">
        <div className="flex-1 bg-white border border-card-stroke rounded-[8px] p-[24px] flex flex-col gap-[8px]">
          <span className="text-[14px] font-normal text-text-body-2 leading-[20px]">Total Portfolio Net Asset Value</span>
          <span className="text-[32px] font-bold text-text-header tracking-[-0.64px] leading-[1.21]">₦14,820,000,000.00</span>
          <div className="flex gap-[2px] items-center">
            <Image src="/icons/arrow-up-green.svg" alt="" width={16} height={16} />
            <span className="text-[14px] font-semibold text-[#079455] tracking-[-0.28px] leading-[1.5]">₦15.2M (+3.2%) this month</span>
          </div>
        </div>
        <div className="flex-1 bg-white border border-card-stroke rounded-[8px] p-[24px] flex flex-col gap-[8px]">
          <span className="text-[14px] font-normal text-text-body-2 leading-[20px]">Overall YTD Return</span>
          <span className="text-[32px] font-bold text-text-header tracking-[-0.64px] leading-[1.21]">+17.4%</span>
          <div className="flex gap-[2px] items-center">
            <Image src="/icons/arrow-up-green.svg" alt="" width={16} height={16} />
            <span className="text-[14px] font-semibold text-[#079455] tracking-[-0.28px] leading-[1.5]">Above benchmark by 3.2%</span>
          </div>
        </div>
        <div className="flex-1 bg-white border border-card-stroke rounded-[8px] p-[24px] flex flex-col gap-[8px]">
          <span className="text-[14px] font-normal text-text-body-2 leading-[20px]">Active Positions</span>
          <span className="text-[32px] font-bold text-text-header tracking-[-0.64px] leading-[1.21]">24</span>
          <span className="text-[14px] font-normal text-text-body-2 leading-[20px]">Across 3 Asset Classes</span>
        </div>
      </div>

      <CurrentHoldings activeTab={activeHoldingTab} onTabChange={onHoldingTabChange} />

      {/* Recent Transactions */}
      <div className="bg-white border border-[#eaecf0] rounded-[12px] overflow-hidden">
        <div className="px-[24px] py-[16px] flex items-center justify-between">
          <h2 className="font-extrabold text-[18px] text-text-header leading-[20px]">Recent Transactions</h2>
          <button className="bg-[#ebebeb] rounded-[4px] px-[14px] py-[6px]">
            <span className="text-[14px] font-bold text-black leading-normal">View all</span>
          </button>
        </div>
        <div className="bg-[#f0eeeb] flex items-center h-[52px]">
          <div className="w-[27%] px-[24px] py-[16px]"><span className="text-[14px] font-semibold text-[#000e24] leading-[20px]">Asset Class</span></div>
          <div className="w-[29%] px-[24px] py-[16px]"><span className="text-[14px] font-semibold text-[#000e24] leading-[20px]">Transaction Type</span></div>
          <div className="w-[24%] px-[24px] py-[16px]"><span className="text-[14px] font-semibold text-[#000e24] leading-[20px]">Amount</span></div>
          <div className="w-[20%] px-[24px] py-[16px]"><span className="text-[14px] font-semibold text-[#000e24] leading-[20px]">Status</span></div>
        </div>
        {TRANSACTIONS.map((tx, i) => (
          <div key={i} className={`flex items-center ${i > 0 ? "border-t border-[#eaecf0]" : ""}`}>
            <div className="w-[27%] px-[24px] py-[24px] flex gap-[16px] items-center">
              <div className="relative w-[32px] h-[32px] shrink-0">
                <Image src={`/icons/tx-${tx.icon}.png`} alt="" fill className="object-contain" />
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
                <span className={`text-[10px] font-medium leading-[1.45] ${tx.status === "Successful" ? "text-[#079455]" : "text-[#dc6803]"}`}>{tx.status}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

const MORE_PRODUCT_TABS = ["Mutual Funds", "Stocks", "Treasury Bills", "Managed Portfolios"];
const STOCK_FILTER_TABS = ["All", "Strong buy", "Buy", "Sell", "Neutral", "Overweighted", "Underweight"];

const AVAILABLE_STOCKS = [
  { name: "MTN Nigeria", logo: "/images/logo-mtn.png", badge: "STRONG BUY", badgeBg: "bg-[#ecfdf3]", badgeColor: "text-[#17b26a]", currentPrice: "0.5%", targetPrice: "200.99", change: "2.5%", changePositive: true },
  { name: "TOTAL", logo: "/images/logo-total.svg", badge: "BUY", badgeBg: "bg-[#fbf4e6]", badgeColor: "text-[#db9308]", currentPrice: "0.5%", targetPrice: "200.99", change: "2.5%", changePositive: true },
  { name: "NESTLE", logo: "/images/logo-nestle.svg", badge: "OVERWEIGHT", badgeBg: "bg-[#fef3f2]", badgeColor: "text-[#d92d20]", currentPrice: "0.5%", targetPrice: "200.99", change: "2.5%", changePositive: false },
];

function MoreProductsTab() {
  const [activeProductTab, setActiveProductTab] = useState("Stocks");
  const [activeFilter, setActiveFilter] = useState("All");

  return (
    <>
      {/* Product Type Tabs */}
      <div className="bg-white border border-card-stroke rounded-[34px] p-[4px] flex gap-[16px] items-center w-fit">
        {MORE_PRODUCT_TABS.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveProductTab(tab)}
            className={`px-[14px] py-[6px] rounded-[34px] text-[13px] leading-[22px] ${
              activeProductTab === tab
                ? "bg-[#1a212a] text-white font-bold shadow-[0px_6px_6px_-6px_rgba(0,0,0,0.16),0px_0px_1px_0px_rgba(0,0,0,0.4)]"
                : "text-[#667085] font-medium"
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Available Stocks */}
      <div className="bg-white border border-card-stroke rounded-[12px] p-[24px] flex flex-col gap-[24px]">
        <h2 className="font-bold text-[20px] text-text-header leading-[1.21]">
          Available Stocks
        </h2>

        {/* Search */}
        <div className="bg-white border border-card-stroke rounded-[8px] h-[40px] flex items-center gap-[8px] px-[16px] py-[8px]">
          <Image src="/icons/search.svg" alt="" width={20} height={20} />
          <span className="text-[14px] font-medium text-[#4f5877] leading-[20px]">Search for stocks</span>
        </div>

        {/* Filter Tabs */}
        <div className="flex gap-[24px] items-center">
          {STOCK_FILTER_TABS.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveFilter(tab)}
              className={`px-[14px] py-[6px] rounded-[34px] text-[13px] leading-[22px] ${
                activeFilter === tab
                  ? "bg-[#1a212a] text-white font-bold shadow-[0px_6px_6px_-6px_rgba(0,0,0,0.16),0px_0px_1px_0px_rgba(0,0,0,0.4)]"
                  : "text-[#667085] font-medium"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Stock Cards Grid */}
        {[0, 1, 2].map((row) => (
          <div key={row} className="flex gap-[16px]">
            {AVAILABLE_STOCKS.map((stock, i) => (
              <div key={`${row}-${i}`} className="flex-1 border border-card-stroke rounded-[8px] p-[18px] flex flex-col gap-[16px]">
                {/* Header: Logo + Badge */}
                <div className="flex items-start justify-between">
                  <div className="relative w-[40px] h-[40px] rounded-full overflow-hidden">
                    <Image src={stock.logo} alt={stock.name} fill className="object-cover" />
                  </div>
                  <div className={`flex items-center gap-[4px] px-[8px] py-[2px] rounded-[34px] ${stock.badgeBg}`}>
                    <span className={`text-[10px] font-semibold uppercase ${stock.badgeColor}`}>{stock.badge}</span>
                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                      <circle cx="7" cy="7" r="6" stroke="currentColor" strokeWidth="1.5" className={stock.badgeColor} />
                      <path d="M7 5v2M7 9h.01" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" className={stock.badgeColor} />
                    </svg>
                  </div>
                </div>

                {/* Name */}
                <span className="text-[16px] font-bold text-text-header leading-[24px]">{stock.name}</span>

                {/* Current Price + Target Price */}
                <div className="flex items-end justify-between border-t border-[#eaecf0] pt-[12px]">
                  <div className="flex flex-col">
                    <span className="text-[12px] font-normal text-text-body leading-[18px]">Current Price</span>
                    <span className="text-[16px] font-bold text-text-header leading-[24px]">{stock.currentPrice}</span>
                  </div>
                  <div className="flex flex-col items-end">
                    <span className="text-[12px] font-normal text-text-body leading-[18px]">Target Price</span>
                    <div className="flex items-center gap-[4px]">
                      <span className="text-[14px] font-bold text-text-header leading-[20px]">{stock.targetPrice}</span>
                      <span className={`text-[14px] font-bold leading-[20px] ${stock.changePositive ? "text-[#079455]" : "text-[#d92d20]"}`}>
                        {stock.change}
                      </span>
                      {stock.changePositive ? (
                        <ArrowUpRight className="w-[14px] h-[14px] text-[#079455]" />
                      ) : (
                        <ArrowDownLeft className="w-[14px] h-[14px] text-[#d92d20]" />
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ))}
      </div>
    </>
  );
}

function CurrentHoldings({ activeTab, onTabChange }: { activeTab: string; onTabChange: (tab: string) => void }) {
  const [expandedSections, setExpandedSections] = useState<Set<string>>(new Set(HOLDINGS.map(h => h.name)));

  const toggleSection = (name: string) => {
    setExpandedSections((prev) => {
      const next = new Set(prev);
      if (next.has(name)) next.delete(name);
      else next.add(name);
      return next;
    });
  };

  return (
    <div className="bg-white border border-card-stroke rounded-[12px] p-[24px] flex flex-col gap-[24px]">
      {/* Header + Tabs */}
      <div className="flex items-center justify-between">
        <h2 className="font-bold text-[20px] text-text-header tracking-[-0.4px] leading-[1.21]">
          Current Holdings
        </h2>
        <div className="flex items-center gap-[24px]">
          {HOLDING_TABS.map((tab) => (
            <button
              key={tab}
              onClick={() => onTabChange(tab)}
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
      </div>

      {/* Holdings Sections */}
      <div className="flex flex-col gap-[24px]">
        {HOLDINGS.map((holding) => {
          const isExpanded = expandedSections.has(holding.name);
          return (
            <div key={holding.name} className="bg-[#f9fafb] rounded-[12px] overflow-hidden">
              {/* Section Header */}
              <button
                onClick={() => toggleSection(holding.name)}
                className="w-full flex items-center justify-between px-[24px] py-[20px]"
              >
                <div className="flex items-center gap-[12px]">
                  <div className={`w-[12px] h-[12px] rounded-full ${holding.color}`} />
                  <div className="flex flex-col items-start ">
                    <span className="text-[14px] font-bold text-text-header leading-[20px]">
                      {holding.name}
                    </span>
                    <div className="flex gap-[12px] mt-[8px] ">
                      <span className="text-[14px] font-normal text-[#6F6D6D] leading-[20px]">
                        {holding.percentage}
                      </span>
                      <span className="text-[14px] font-normal text-[#6F6D6D] leading-[20px]">
                        {holding.count}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-[24px]">
                  <div className="flex flex-col items-start">
                    <span className="text-[14px] font-normal text-[#6F6D6D] leading-[18px]">
                      Total Holdings
                    </span>
                    <span className="text-[20px] font-bold text-text-header leading-[28px]">
                      {holding.total}
                    </span>
                  </div>
                  {isExpanded ? (
                    <ChevronDown className="w-[20px] h-[20px] text-text-header" />
                  ) : (
                    <ChevronUp className="w-[20px] h-[20px] text-text-header" />
                  )}
                </div>
              </button>

              {/* Expanded Content */}
              {isExpanded && (
                <div className="px-[24px] pb-[24px]">
                  {holding.name === "Mutual Funds" && (
                    <MutualFundsCards items={holding.items as MutualFundItem[]} />
                  )}
                  {holding.name === "Stocks" && (
                    <StocksCards items={holding.items as StockItem[]} />
                  )}
                  {holding.name === "Treasury Bills" && (
                    <TreasuryBillsCards items={holding.items as TreasuryBillItem[]} />
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

type MutualFundItem = { name: string; rate: string | null; rateColor: string; value: string; bookBalance: string | null; badge: string | null };
type StockItem = { name: string; subtitle: string; logo: string; currentPrice: string | null; holdingValue: string; unitsOwned: string; gainLoss: string; gainPositive: boolean };
type TreasuryBillItem = { label: string; value: string; discountRate: string | null; maturityDate: string | null };

function MutualFundsCards({ items }: { items: MutualFundItem[] }) {
  return (
    <div className="flex gap-[16px] overflow-x-auto">
      {items.map((item, i) => (
        <div key={i} className="min-w-[300px] flex-1 bg-white border border-card-stroke rounded-[8px] p-[18px] flex flex-col gap-[16px]">
          <div className="flex items-center justify-between">
            <span className="text-[14px] font-medium text-text-body leading-[20px]">{item.name}</span>
            {item.rate && (
              <span className={`text-[14px] font-bold ${item.rateColor} leading-[20px]`}>{item.rate}</span>
            )}
            {item.badge && (
              <span className="text-[12px] font-bold text-[#dc6803] bg-[#fffaeb] px-[8px] py-[2px] rounded-full">{item.badge}</span>
            )}
          </div>
          <span className="text-[20px] font-bold text-text-header leading-[28px]">{item.value}</span>
          {item.bookBalance && (
            <div className="flex items-center justify-between border-t border-[#eaecf0] pt-[12px]">
              <span className="text-[14px] font-normal text-text-body leading-[20px]">Book Balance:</span>
              <span className="text-[14px] font-bold text-text-header leading-[20px]">{item.bookBalance}</span>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

function StocksCards({ items }: { items: StockItem[] }) {
  return (
    <div className="flex gap-[16px] overflow-x-auto">
      {items.map((item, i) => (
        <div key={i} className="min-w-[300px] flex-1 bg-white border border-card-stroke rounded-[8px] p-[18px] flex flex-col gap-[16px]">
          {/* Header with logo */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-[12px]">
              <div className="relative w-[40px] h-[40px] rounded-full overflow-hidden shrink-0">
                <Image src={item.logo} alt={item.name} fill className="object-cover" />
              </div>
              <div className="flex flex-col">
                <span className="text-[14px] font-bold text-text-header leading-[18px]">{item.name}</span>
                <span className="text-[12px] font-normal text-text-body leading-[18px]">{item.subtitle}</span>
              </div>
            </div>
            {item.currentPrice && (
              <div className="flex flex-col items-end">
                <span className="text-[12px] font-normal text-text-body leading-[18px]">Current Price</span>
                <span className="text-[14px] font-bold text-text-header leading-[20px]">{item.currentPrice}</span>
              </div>
            )}
          </div>

          {/* Holding Value */}
          <div className="flex flex-col gap-[2px]">
            <span className="text-[12px] font-normal text-text-body leading-[18px]">Holding Value</span>
            <span className="text-[20px] font-bold text-text-header leading-[28px]">{item.holdingValue}</span>
          </div>

          {/* Units + Gain/Loss */}
          <div className="flex items-end justify-between border-t border-[#eaecf0] pt-[12px]">
            <div className="flex flex-col">
              <span className="text-[12px] font-normal text-text-body leading-[18px]">Units Owned</span>
              <span className="text-[16px] font-bold text-text-header leading-[24px]">{item.unitsOwned}</span>
            </div>
            <div className="flex flex-col items-end">
              <span className="text-[12px] font-normal text-text-body leading-[18px]">Gain/Loss</span>
              <div className="flex items-center gap-[4px]">
                <span className={`text-[14px] font-bold leading-[20px] ${item.gainPositive ? "text-[#079455]" : "text-[#d92d20]"}`}>
                  {item.gainLoss}
                </span>
                {item.gainPositive ? (
                  <ArrowUpRight className="w-[14px] h-[14px] text-[#079455]" />
                ) : (
                  <ArrowDownLeft className="w-[14px] h-[14px] text-[#d92d20]" />
                )}
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

function TreasuryBillsCards({ items }: { items: TreasuryBillItem[] }) {
  return (
    <div className="flex gap-[16px] overflow-x-auto">
      {items.map((item, i) => (
        <div key={i} className="min-w-[300px] flex-1 bg-white border border-card-stroke rounded-[8px] p-[18px] flex flex-col gap-[16px]">
          {/* Badge */}
          <span className="text-[12px] font-bold text-[#dc6803] bg-[#fffaeb] px-[8px] py-[2px] rounded-[4px] w-fit">
            Processing
          </span>

          {/* Label + Value */}
          <div className="flex items-center justify-between">
            <div className="flex flex-col">
              <span className="text-[14px] font-normal text-text-body leading-[20px]">{item.label}</span>
              <span className="text-[20px] font-bold text-text-header leading-[28px]">{item.value}</span>
            </div>
            {item.discountRate && (
              <div className="flex flex-col items-end">
                <span className="text-[14px] font-bold text-text-header leading-[20px]">Discounted Rate</span>
                <span className="text-[16px] font-bold text-primary leading-[24px]">{item.discountRate}</span>
              </div>
            )}
          </div>

          {/* Maturity Date */}
          {item.maturityDate && (
            <div className="flex items-center justify-between border-t border-[#eaecf0] pt-[12px]">
              <span className="text-[14px] font-normal text-text-body leading-[20px]">Maturity Date:</span>
              <span className="text-[14px] font-bold text-primary leading-[20px]">{item.maturityDate}</span>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
