"use client";

import { useRouter } from "next/navigation";
import { getClientAuthToken, isClientAuthenticated } from "@/store/authstore";

export function getLoginRedirect(nextPath = "/") {
  return `/login?next=${encodeURIComponent(nextPath)}`;
}

export function useAuthRedirect() {
  const router = useRouter();

  const requireAuth = (nextPath = "/") => {
    if (isClientAuthenticated()) {
      return true;
    }

    router.push(getLoginRedirect(nextPath));
    return false;
  };

  return { requireAuth };
}