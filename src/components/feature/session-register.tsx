"use client";

import { useCallback, useEffect, useState } from "react";

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
} from "@/components/base";
import { ACCESS_TOKEN } from "@/constants";
import { useUserCreation } from "@/swr";

export function SessionRegister() {
  const [username, setUsername] = useState("");
  const [registed, setRegisted] = useState(true);

  const { trigger: createUser, isMutating: isCreating } = useUserCreation();

  const onSetButtonClick = useCallback(async () => {
    const { token } = await createUser({ username });
    localStorage.setItem(ACCESS_TOKEN, token);
    setAccessTokenCookie(token);
    setRegisted(true);
  }, [createUser, username]);

  useEffect(() => {
    const token = localStorage.getItem(ACCESS_TOKEN);
    if (!token) {
      setRegisted(false);
      return;
    }
    setAccessTokenCookie(token);
  }, []);

  return (
    <Dialog open={!registed} onClose={() => {}}>
      <DialogTitle>이름 설정</DialogTitle>
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
        <Button disabled={isCreating} onClick={onSetButtonClick}>
          설정하기
        </Button>
        <Button disabled={isCreating} plain>
          계정찾기
        </Button>
      </DialogActions>
    </Dialog>
  );
}
