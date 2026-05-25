import api from "@/lib/axios";
import {
  type LoginRequest,
  type LoginResponse,
  type ApiResponse,
  type User,
} from "@/types";

function normalize<T>(result: ApiResponse<T>): ApiResponse<T> {
  if (result.status !== undefined && result.success === undefined) {
    result.success = result.status;
  }
  return result;
}

export async function loginUser(
  data: LoginRequest
): Promise<ApiResponse<LoginResponse>> {
  const response = await api.post<ApiResponse<LoginResponse>>("/merchant2/login", data);
  return normalize(response.data);
}

export interface ValidateSignupRequest {
  businessName: string;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
}

export interface ValidateSignupResponse {
  businessNameExists: boolean;
  emailExists: boolean;
  otpSent: boolean;
}

export async function validateSignup(
  data: ValidateSignupRequest
): Promise<ApiResponse<ValidateSignupResponse>> {
  const response = await api.post<ApiResponse<ValidateSignupResponse>>("/merchant2/validate", data);
  return normalize(response.data);
}

export interface ValidateOtpRequest {
  identifier: string;
  isActivation: boolean;
  otp: string;
  otpPurpose: string;
}

export async function validateOtp(
  data: ValidateOtpRequest
): Promise<ApiResponse<{ isValid: boolean }>> {
  const response = await api.post<ApiResponse<{ isValid: boolean }>>("/Otp/validate-otp", data);
  return normalize(response.data);
}

export interface ResendOtpRequest {
  email: string;
  firstName: string;
  lastName: string;
  source: string;
  otpPurpose: string;
}

export async function resendOtp(
  data: ResendOtpRequest
): Promise<ApiResponse<null>> {
  const response = await api.post<ApiResponse<null>>("/otp/resend-otp", data);
  return normalize(response.data);
}

export interface RegisterRequest {
  businessName: string;
  contactEmail: string;
  firstName: string;
  lastName: string;
  contactPhone: string;
  password: string;
  callbackUrl: string;
}

export async function registerUser(
  data: RegisterRequest
): Promise<ApiResponse<null>> {
  const response = await api.post<ApiResponse<null>>("/merchant2/register", data);
  return normalize(response.data);
}

export function extractUserFromLoginResponse(data: LoginResponse): User {
  return {
    merchantId: data.merchantId,
    businessName: data.businessName,
    contactEmail: data.contactEmail,
    apiKey: data.apiKey,
  };
}
