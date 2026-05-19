"use client";

interface PageTab {
  id: string;
  label: string;
}

interface PageTabsProps {
  tabs: PageTab[];
  activeTab: string;
  onTabChange: (tabId: string) => void;
}

export function PageTabs({ tabs, activeTab, onTabChange }: PageTabsProps) {
  if (tabs.length === 0) return null;

  return (
    <div className="flex items-center gap-[6px]">
      {tabs.map((tab) => (
        <button
          key={tab.id}
          onClick={() => onTabChange(tab.id)}
          className={`cursor-pointer px-[16px] !h-[34px] rounded-full text-[13px] font-[700] leading-[18px] transition-colors ${
            activeTab === tab.id
              ? "text-white"
              : "text-white/70 hover:text-white"
          }`}
          style={{
            backgroundColor: activeTab === tab.id ? "#FFFFFF33" : "transparent",
          }}
        >
          {tab.label}
        </button>
      ))}
    </div>
  );
}
