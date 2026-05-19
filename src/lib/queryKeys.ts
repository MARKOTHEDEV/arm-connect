export const queryKeys = {
  auth: {
    login: ["auth", "login"] as const,
    refresh: ["auth", "refresh"] as const,
  },
  user: {
    profile: ["user", "profile"] as const,
  },
} as const;
