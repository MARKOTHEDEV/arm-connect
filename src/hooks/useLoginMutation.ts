import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { loginUser, extractUserFromLoginResponse } from "@/lib/services/auth";
import { useUserStore } from "@/components/common/user-store";
import { ROUTES } from "@/lib/routes";
import type { LoginRequest } from "@/types";

export function useLoginMutation() {
  const router = useRouter();
  const { setUser, setAccessToken, setRefreshToken, setFirstLogin } = useUserStore();

  return useMutation({
    mutationFn: (data: LoginRequest) =>
      loginUser({ email: data.email, password: data.password }),
    onSuccess: (response) => {
      if (!response.success) {
        toast.error(response.message || "Login failed.");
        return;
      }

      const { token, refreshToken, expiresAt, isFirstLogin } = response.data;
      const user = extractUserFromLoginResponse(response.data);

      setAccessToken(token);
      setRefreshToken(refreshToken, expiresAt);
      setUser(user);

      if (isFirstLogin) {
        setFirstLogin(true);
        router.push(`${ROUTES.FIRST_LOGIN}/verify-otp`);
      } else {
        router.push(ROUTES.DASHBOARD);
      }
    },
    onError: (error: { response?: { status?: number; data?: { message?: string; title?: string } } }) => {
      const message = error.response?.data?.message
        || error.response?.data?.title
        || (error.response?.status === 401 ? "Invalid email or password." : "Something went wrong. Please try again.");
      toast.error(message);
    },
  });
}
