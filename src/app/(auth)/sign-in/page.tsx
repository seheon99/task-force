"use client";

import {
  browserSessionPersistence,
  setPersistence,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { useRouter } from "next/navigation";
import { useCallback, useState } from "react";

import {
  Button,
  Field,
  Heading,
  Input,
  Label,
  Strong,
  Text,
  TextLink,
} from "@/components/base";
import { firebaseAuth } from "@/utilities";

import type { FirebaseError } from "firebase/app";

export default function SignInPage() {
  const router = useRouter();

  const [isLoading, setIsLoading] = useState(false);
  const handleSubmit = useCallback(
    async (email: string, password: string) => {
      if (!isLoading) {
        setIsLoading(true);
        try {
          await setPersistence(firebaseAuth, browserSessionPersistence);
          const userCredential = await signInWithEmailAndPassword(
            firebaseAuth,
            email,
            password
          );
          if (userCredential.user.uid) {
            router.replace("/");
          }
        } catch (error) {
          setIsLoading(false);
          if ("code" in (error as FirebaseError)) {
            if ((error as FirebaseError).code === "auth/invalid-credential") {
              console.log(JSON.stringify(error));
            }
          }
        }
      }
    },
    [isLoading, setIsLoading, router]
  );

  return (
    <form
      action="#"
      className="grid w-full max-w-sm grid-cols-1 gap-8"
      onSubmit={async (e) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const email = formData.get("email") as string;
        const password = formData.get("password") as string;
        handleSubmit(email, password);
      }}
    >
      <Heading>로그인</Heading>
      <Field>
        <Label>이메일</Label>
        <Input type="email" name="email" />
      </Field>
      <Field>
        <Label>비밀번호</Label>
        <Input type="password" name="password" />
      </Field>
      <Button type="submit" className="w-full" disabled={isLoading}>
        로그인
      </Button>
      <Text>
        아직 아이디가 없다면?{" "}
        <TextLink href="/sign-up">
          <Strong>회원가입하기</Strong>
        </TextLink>
      </Text>
    </form>
  );
}
