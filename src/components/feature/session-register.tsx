"use client";

import { useCallback, useEffect, useState } from "react";
import { mutate } from "swr";

import { setAccessTokenCookie } from "@/actions/auth";
import {
  Button,
  Dialog,
  DialogActions,
  DialogBody,
  DialogDescription,
  DialogTitle,
  Field,
  Input,
  Label,
  toast,
} from "@/components/base";
import { ACCESS_TOKEN } from "@/constants";
import { SWR_KEY_ME, useTokenRestoration, useUserCreation } from "@/swr";

export function SessionRegister() {
  const [mode, setMode] = useState<"none" | "register" | "restore">("none");
  const [username, setUsername] = useState("");
  const [token, setToken] = useState("");

  const { trigger: createUser, isMutating: isCreating } = useUserCreation();
  const {
    trigger: restoreToken,
    isMutating: isRestoring,
    error: restorationError,
  } = useTokenRestoration();
  useTokenRestoration();

  const onSetButtonClick = useCallback(
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
      setAccessTokenCookie(token);
      localStorage.setItem(ACCESS_TOKEN, token);
      toast.info({
        title: "회원가입 완료",
        description: `${username}님 안녕하세요`,
      });
      mutate(SWR_KEY_ME);
      setMode("none");
    },
    [createUser],
  );

  const onRestoreButtonClick = useCallback(
    async (token: string) => {
      const accessToken = await restoreToken({ token });
      setAccessTokenCookie(accessToken);
      localStorage.setItem(ACCESS_TOKEN, accessToken);
      toast.info({
        title: "계정 복원 성공",
        description: "계정 복원에 성공했습니다",
      });
      mutate(SWR_KEY_ME);
      setMode("none");
    },
    [restoreToken],
  );

  useEffect(() => {
    const token = localStorage.getItem(ACCESS_TOKEN);
    if (!token) {
      setMode("register");
      return;
    }
    setAccessTokenCookie(token);
  }, []);

  useEffect(() => {
    if (restorationError) {
      toast.error({
        title: "복원하기 실패",
        description: "복원에 실패했습니다. 올바른 토큰을 입력해주세요.",
      });
    }
  }, [restorationError]);

  return (
    <>
      <Dialog open={mode === "register"} onClose={() => {}}>
        <DialogTitle>회원가입</DialogTitle>
        <DialogDescription>
          앞으로 사용하게 될 이름을 입력해주세요.
        </DialogDescription>
        <DialogBody>
          <Field>
            <Label>이름</Label>
            <Input
              autoFocus
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </Field>
        </DialogBody>
        <DialogActions>
          <Button
            disabled={isCreating}
            onClick={() => onSetButtonClick(username)}
          >
            설정하기
          </Button>
          <Button
            disabled={isCreating}
            plain
            onClick={() => setMode("restore")}
          >
            계정찾기
          </Button>
        </DialogActions>
      </Dialog>
      <Dialog open={mode === "restore"} onClose={() => {}}>
        <DialogTitle>계정 복원</DialogTitle>
        <DialogDescription>
          관리자에게 전달받은 복원 코드를 입력해주세요.
        </DialogDescription>
        <DialogBody>
          <Field>
            <Label>코드</Label>
            <Input
              autoFocus
              value={token}
              onChange={(e) => setToken(e.target.value)}
            />
          </Field>
        </DialogBody>
        <DialogActions>
          <Button
            disabled={isRestoring}
            onClick={() => onRestoreButtonClick(token)}
          >
            복원하기
          </Button>
          <Button
            disabled={isRestoring}
            plain
            onClick={() => setMode("register")}
          >
            가입하기
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
