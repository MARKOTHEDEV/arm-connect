import { create } from "zustand";

export interface PageTab {
  id: string;
  label: string;
}

interface PageTabsState {
  tabs: PageTab[];
  activeTab: string | null;
  setTabs: (tabs: PageTab[], activeTab?: string) => void;
  setActiveTab: (tabId: string) => void;
  clearTabs: () => void;
}

export const usePageTabsStore = create<PageTabsState>((set) => ({
  tabs: [],
  activeTab: null,
  setTabs: (tabs, activeTab) =>
    set({ tabs, activeTab: activeTab ?? (tabs[0]?.id ?? null) }),
  setActiveTab: (tabId) => set({ activeTab: tabId }),
  clearTabs: () => set({ tabs: [], activeTab: null }),
}));
