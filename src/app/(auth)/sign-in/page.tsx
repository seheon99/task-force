"use client";

import {
  browserSessionPersistence,
  setPersistence,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { useRouter } from "next/navigation";
import { useCallback, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";

import { setAccessTokenCookie } from "@/actions/auth";
import {
  Button,
  ErrorMessage,
  Field,
  Heading,
  Input,
  Label,
  Strong,
  Text,
  TextLink,
  toast,
} from "@/components/base";
import { emailDomain } from "@/constants";
import { firebaseAuth } from "@/utilities/client-only";

import type { FirebaseError } from "firebase/app";

export default function SignInPage() {
  const router = useRouter();

  const [isLoading, setIsLoading] = useState(false);
  const onSubmit = useCallback<SubmitHandler<Inputs>>(
    async ({ username, password }) => {
      if (!isLoading) {
        setIsLoading(true);
        try {
          await setPersistence(firebaseAuth, browserSessionPersistence);
          const userCredential = await signInWithEmailAndPassword(
            firebaseAuth,
            `${username}@${emailDomain}`,
            password,
          );
          if (userCredential.user) {
            const accessToken = await userCredential.user.getIdToken();
            await setAccessTokenCookie(accessToken);
            toast.success({
              title: "로그인 성공",
              description: `${userCredential.user.displayName}님 환영합니다`,
            });
            router.replace("/");
          }
        } catch (error) {
          setIsLoading(false);
          if ("code" in (error as FirebaseError)) {
            if ((error as FirebaseError).code === "auth/invalid-credential") {
              toast.error({
                title: "로그인 실패",
                description: `가입하지 않은 아이디이거나 잘못된 비밀번호입니다. (${
                  (error as FirebaseError).code
                })`,
              });
            }
          }
        }
      }
    },
    [isLoading, setIsLoading, router],
  );

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();

  return (
    <form
      action="#"
      className="grid w-full max-w-sm grid-cols-1 gap-8"
      onSubmit={handleSubmit(onSubmit)}
    >
      <Heading>로그인</Heading>
      <Field>
        <Label>아이디</Label>
        <Input
          type="text"
          invalid={!!errors.username}
          {...register("username", { required: "아이디를 입력해주세요" })}
        />
        {errors.username && (
          <ErrorMessage>{errors.username.message}</ErrorMessage>
        )}
      </Field>
      <Field>
        <Label>비밀번호</Label>
        <Input
          type="password"
          invalid={!!errors.password}
          {...register("password", { required: "비밀번호를 입력해주세요" })}
        />
        {errors.password && (
          <ErrorMessage>{errors.password.message}</ErrorMessage>
        )}
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

type Inputs = {
  username: string;
  password: string;
};
