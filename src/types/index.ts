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
  email: string;
  firstname: string | null;
  lastname: string | null;
  membershipId: string | null;
  accountTier: string | null;
  accountCategory: number | null;
  phone: string;
  gender: string | null;
  dateOfBirth: string | null;
  approvalStatus: string;
  hasPin: boolean;
  isTemporaryPassword: boolean;
  isBVNVerified: boolean;
  isMigratedUser: boolean;
  zanibalId: string | null;
  tourGuideStatus: string | null;
  preferences: Record<string, unknown> | null;
  isPinSetup: boolean;
}

export interface LoginRequest {
  email: string;
  password: string;
  pin?: string;
  isPasswordEncrypted?: boolean;
}

export interface LoginResponse {
  token: string;
  refreshToken: string;
  expiresAt: string;
  email: string;
  firstname: string | null;
  lastname: string | null;
  membershipId: string | null;
  accountTier: string | null;
  accountCategory: number | null;
  phone: string;
  gender: string | null;
  dateOfBirth: string | null;
  approvalStatus: string;
  hasPin: boolean;
  isTemporaryPassword: boolean;
  isBVNVerified: boolean;
  isMigratedUser: boolean;
  zanibalId: string | null;
  tourGuideStatus: string | null;
  preferences: Record<string, unknown> | null;
  isFirstLogin: boolean;
  isPinSetup: boolean;
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
  success: boolean;
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
