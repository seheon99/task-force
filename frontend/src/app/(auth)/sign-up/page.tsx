"use client";

import { redirect } from "next/navigation";
import { useCallback, useState } from "react";

import { Button, Field, Heading, Input, Label, toast } from "@/components/base";
import { useUserSessionStore } from "@/stores";
import { useUserCreation } from "@/swr";

export default function SignInPage() {
  const createSession = useUserSessionStore((state) => state.createSession);

  const [username, setUsername] = useState("");

  const { trigger: createUser, isMutating: isCreating } = useUserCreation();

  const onButtonClick = useCallback(
    async (username: string) => {
      if (username.length < 3) {
        toast.error({
          title: "이름이 너무 짧습니다",
          description: "3글자 이상 입력해주세요.",
        });
        return;
      } else if (username.length > 10) {
        toast.error({
          title: "이름이 너무 깁니다",
          description: "10글자 이하로 입력해주세요.",
        });
        return;
      }

      const { token } = await createUser({ username });
      const user = await createSession(token);
      if (user) {
        toast.info({
          title: "회원가입 완료",
          description: `${user.username}님 안녕하세요`,
        });
        redirect("/");
      } else {
        toast.info({
          title: "회원가입 실패",
          description: "회원가입에 실패했습니다. 다른 이름을 사용해보세요.",
        });
      }
    },
    [createSession, createUser],
  );

  return (
    <div className="grid w-full max-w-sm grid-cols-1 gap-8">
      <Heading>회원 가입</Heading>
      <Field>
        <Label>이름</Label>
        <Input
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          disabled={isCreating}
        />
      </Field>
      <div className="flex w-full flex-col gap-2">
        <Button onClick={() => onButtonClick(username)} disabled={isCreating}>
          회원가입
        </Button>
        <Button plain href="/sign-in" disabled={isCreating}>
          복원하기
        </Button>
      </div>
    </div>
  );
}
