"use client";

import { redirect } from "next/navigation";
import { useEffect } from "react";

import { useUserSessionStore } from "@/stores";

export function SessionRegister() {
  const { token, refreshSession } = useUserSessionStore();

  useEffect(() => {
    async function verifySession() {
      const token = await refreshSession();
      if (!token) {
        redirect("/sign-in");
      }
    }
    if (!token) {
      verifySession();
    }
  }, [token, refreshSession]);

  return null;
}
