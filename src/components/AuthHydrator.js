"use client";

import { useEffect } from "react";
import useAuthStore from "@/store/authstore";

export default function AuthHydrator() {
  const hydrate = useAuthStore((state) => state.hydrate);

  useEffect(() => {
    hydrate();
  }, [hydrate]);

  return null;
}