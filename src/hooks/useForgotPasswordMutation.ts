import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { ROUTES } from "@/lib/routes";
import type { ForgotPasswordRequest } from "@/types";

// TODO: wire to merchant API when endpoint is available
async function forgotPassword(data: ForgotPasswordRequest) {
  return { success: true, message: "OTP sent to your email." };
}

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
    onError: () => {
      toast.error("Something went wrong. Please try again.");
    },
  });
}
