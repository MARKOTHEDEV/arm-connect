import api from "@/lib/axios";
import {
  type LoginRequest,
  type LoginResponse,
  type ApiResponse,
  type User,
  type ForgotPasswordRequest,
  type ValidateOtpRequest,
  OTP_PURPOSE,
} from "@/types";

export async function loginUser(
  data: LoginRequest
): Promise<ApiResponse<LoginResponse>> {
  const response = await api.post<ApiResponse<LoginResponse>>(
    "/auth/login",
    {
      ...data,
      isPasswordEncrypted: false,
    }
  );
  return response.data;
}

export async function forgotPassword(
  data: ForgotPasswordRequest
): Promise<ApiResponse<null>> {
  const response = await api.post<ApiResponse<null>>(
    "/auth/forgot-password-request",
    data
  );
  return response.data;
}

export async function verifyEmail(
  data: { email: string }
): Promise<ApiResponse<null>> {
  const response = await api.post<ApiResponse<null>>(
    "/users/verify-email",
    data
  );
  return response?.data;
}

export interface RegisterRequest {
  email: string;
  password: string;
  confirmPassword: string;
  consentedToShareData: boolean;
  referralCode: string | null;
}

export interface RegisterResponse {
  token: {
    token: string;
    refreshToken: string;
    expiresAt: string;
  };
}

export async function registerUser(
  data: RegisterRequest
): Promise<ApiResponse<RegisterResponse>> {
  const response = await api.post<ApiResponse<RegisterResponse>>(
    "/users/register",
    data
  );
  return response.data;
}

async function hashPin(pin: string): Promise<string> {
  const encoded = new TextEncoder().encode(pin);
  const hashBuffer = await crypto.subtle.digest("SHA-256", encoded);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map((b) => b.toString(16).padStart(2, "0")).join("");
}

export async function createPin(
  data: { pin: string; confirmPin: string; email: string }
): Promise<ApiResponse<null>> {
  const [hashedPin, confirmHashedPin] = await Promise.all([
    hashPin(data.pin),
    hashPin(data.confirmPin),
  ]);

  const response = await api.post<ApiResponse<null>>(
    "/auth/create-pin",
    { email: data.email, hashedPin, confirmHashedPin }
  );
  return response.data;
}

export async function validateOtp(
  data: ValidateOtpRequest
): Promise<ApiResponse<null>> {
  const response = await api.post<ApiResponse<null>>(
    "/auth/validate-otp",
    { ...data, purpose: OTP_PURPOSE.Register }
  );
  return response.data;
}

export async function verifyLoginOtp(
  data: { email: string; otp: string }
): Promise<ApiResponse<null>> {
  const response = await api.post<ApiResponse<null>>(
    "/auth/verify-login-otp",
  data
  );
  return response.data;
}

export async function validateResetPasswordOtp(
  data: { identifier: string; otp: string; isActivation: boolean }
): Promise<ApiResponse<null>> {
  const response = await api.post<ApiResponse<null>>(
    "/auth/validate-reset-password-otp",
    { ...data, purpose: OTP_PURPOSE.ResetPassword }
  );
  return response.data;
}

export async function resetPassword(
  data: { email: string; newPassword: string; confirmPassword: string }
): Promise<ApiResponse<null>> {
  const response = await api.post<ApiResponse<null>>(
    "/auth/confirm-reset-password",
    data
  );
  return response.data;
}

export function extractUserFromLoginResponse(data: LoginResponse): User {
  return {
    email: data.email,
    firstname: data.firstname,
    lastname: data.lastname,
    membershipId: data.membershipId,
    accountTier: data.accountTier,
    accountCategory: data.accountCategory,
    phone: data.phone,
    gender: data.gender,
    dateOfBirth: data.dateOfBirth,
    approvalStatus: data.approvalStatus,
    hasPin: data.hasPin,
    isTemporaryPassword: data.isTemporaryPassword,
    isBVNVerified: data.isBVNVerified,
    isMigratedUser: data.isMigratedUser,
    zanibalId: data.zanibalId,
    tourGuideStatus: data.tourGuideStatus,
    preferences: data.preferences,
    isPinSetup: data.isPinSetup,
  };
}
