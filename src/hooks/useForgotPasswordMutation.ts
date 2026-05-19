import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { forgotPassword } from "@/lib/services/auth";
import { ROUTES } from "@/lib/routes";
import type { ForgotPasswordRequest } from "@/types";

export function useForgotPasswordMutation() {
  const router = useRouter();

  return useMutation({
    mutationFn: (data: ForgotPasswordRequest) => forgotPassword(data),
    onSuccess: (response, variables) => {
      if (!response.success) {
        toast.error(response.message || "Something went wrong.");
        return;
      }

      toast.success(response.message || "OTP sent to your email.");
      router.push(
        `${ROUTES.FORGOT_PASSWORD}/verify-email?email=${encodeURIComponent(variables.email)}`
      );
    },
    onError: (error: { response?: { data?: { message?: string; title?: string } } }) => {
      const message =
        error.response?.data?.message || error.response?.data?.title || "Something went wrong. Please try again.";
      toast.error(message);
    },
  });
}
