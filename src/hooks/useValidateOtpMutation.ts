import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { validateOtp } from "@/lib/services/auth";
import type { ValidateOtpRequest } from "@/types";

interface UseValidateOtpMutationOptions {
  onSuccess?: () => void;
}

export function useValidateOtpMutation({ onSuccess }: UseValidateOtpMutationOptions = {}) {
  return useMutation({
    mutationFn: (data: ValidateOtpRequest) => validateOtp(data),
    onSuccess: (response) => {
      if (!response.success) {
        toast.error(response.message || "Invalid OTP.");
        return;
      }

      toast.success(response.message || "OTP verified successfully.");
      onSuccess?.();
    },
    onError: (error: { response?: { data?: { message?: string; title?: string } } }) => {
      const message =
        error.response?.data?.message || error.response?.data?.title || "OTP verification failed. Please try again.";
      toast.error(message);
    },
  });
}
