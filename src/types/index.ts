export const ACCOUNT_CATEGORY = {
  1: "HNI",
  2: "Mass Affluent",
  3: "Retail",
  4: "Mass Market",
  5: "UHNI",
  6: "IAM",
} as const;

export type AccountCategoryCode = keyof typeof ACCOUNT_CATEGORY;

export interface User {
  merchantId: string;
  businessName: string;
  contactEmail: string;
  apiKey: string;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface LoginResponse {
  token: string;
  refreshToken: string;
  expiresAt: string;
  merchantId: string;
  businessName: string;
  contactEmail: string;
  apiKey: string;
}

export interface ForgotPasswordRequest {
  email: string;
}

export interface ValidateOtpRequest {
  identifier: string;
  otp: string;
  isActivation: boolean;
}

export interface ApiResponse<T> {
  data: T;
  message: string;
  status: boolean;
  statusCode: number;
  success: boolean; // alias for status
  errors: string[] | null;
}

export enum OTP_PURPOSE {
  Unknown= 0,
  AccountVerification = 1,
  ResetPassword= 2,
  DeviceVerification= 3,
  TransactionApproval = 4,
  TwoFactorAuth= 5,
  Login= 6,
  Register= 7,
  ResetPin= 8,
  Activation= 9,
  Other= 99
}
