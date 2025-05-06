"use client";

import { redirect } from "next/navigation";
import { useEffect } from "react";
import { mutate } from "swr";

import { deleteAccessTokenCookie } from "@/actions/auth";
import { Loading } from "@/components/base";

export default function SignOutPage() {
  useEffect(() => {
    (async () => {
      await deleteAccessTokenCookie();
      mutate(() => true, undefined, false);
      redirect("/");
    })();
  }, []);

  return <Loading />;
}
