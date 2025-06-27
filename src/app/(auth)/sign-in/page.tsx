"use client";

import { redirect } from "next/navigation";
import { useCallback, useState } from "react";

import { Button, Field, Heading, Input, Label, toast } from "@/components/base";
import { useUserSessionStore } from "@/stores";

export default function SignUpPage() {
  const createSession = useUserSessionStore((state) => state.createSession);

  const [code, setCode] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const onButtonClick = useCallback(
    async (token: string) => {
      setIsLoading(true);
      const user = await createSession(token);
      if (user) {
        toast.info({
          title: "계정 복원 성공",
          description: `${user.username}님 돌아오신것을 환영합니다.`,
        });
        redirect("/");
      } else {
        toast.error({
          title: "복원하기 실패",
          description: "복원에 실패했습니다. 올바른 토큰을 입력해주세요.",
        });
      }
      setIsLoading(false);
    },
    [createSession],
  );

  return (
    <div className="grid w-full max-w-sm grid-cols-1 gap-8">
      <Heading>계정 찾기</Heading>
      <Field>
        <Label>복원 코드</Label>
        <Input
          value={code}
          onChange={(e) => setCode(e.target.value)}
          disabled={isLoading}
        />
      </Field>
      <div className="flex w-full flex-col gap-2">
        <Button onClick={() => onButtonClick(code)} disabled={isLoading}>
          복원
        </Button>
        <Button plain href="/sign-up" disabled={isLoading}>
          회원가입
        </Button>
      </div>
    </div>
  );
}
