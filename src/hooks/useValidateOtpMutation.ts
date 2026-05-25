import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import type { ValidateOtpRequest } from "@/types";

// TODO: wire to merchant API when endpoint is available
async function validateOtp(_data: ValidateOtpRequest) {
  return { success: true, message: "OTP validated." };
}

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
    onError: () => {
      toast.error("OTP verification failed. Please try again.");
    },
  });
}
