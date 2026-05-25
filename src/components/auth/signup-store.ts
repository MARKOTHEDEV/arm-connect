import { create } from "zustand";

interface SignupState {
  businessName: string;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  setSignupData: (data: {
    businessName: string;
    firstName: string;
    lastName: string;
    email: string;
    phoneNumber: string;
  }) => void;
  clear: () => void;
}

export const useSignupStore = create<SignupState>()((set) => ({
  businessName: "",
  firstName: "",
  lastName: "",
  email: "",
  phoneNumber: "",
  setSignupData: (data) => set(data),
  clear: () =>
    set({
      businessName: "",
      firstName: "",
      lastName: "",
      email: "",
      phoneNumber: "",
    }),
}));
