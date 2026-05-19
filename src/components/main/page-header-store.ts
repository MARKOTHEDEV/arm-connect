import { create } from "zustand";

export interface Breadcrumb {
  label: string;
  href?: string;
}

interface PageHeaderState {
  title: string;
  breadcrumbs: Breadcrumb[];
  backHref: string | null;
  setTitle: (title: string) => void;
  setBreadcrumbs: (breadcrumbs: Breadcrumb[]) => void;
  setBackHref: (href: string | null) => void;
}

export const usePageHeaderStore = create<PageHeaderState>((set) => ({
  title: "",
  breadcrumbs: [],
  backHref: null,
  setTitle: (title) => set({ title }),
  setBreadcrumbs: (breadcrumbs) => set({ breadcrumbs }),
  setBackHref: (backHref) => set({ backHref }),
}));
