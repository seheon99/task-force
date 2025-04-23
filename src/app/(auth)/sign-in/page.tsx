"use client";

import {
  browserSessionPersistence,
  setPersistence,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { useRouter } from "next/navigation";
import { useCallback, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";

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
import { firebaseAuth } from "@/utilities";

import type { FirebaseError } from "firebase/app";

export default function SignInPage() {
  const router = useRouter();

  const [isLoading, setIsLoading] = useState(false);
  const onSubmit = useCallback<SubmitHandler<Inputs>>(
    async ({ email, password }) => {
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
                description:
                  "가입하지 않은 아이디이거나 잘못된 비밀번호입니다.",
              });
            }
          }
        }
      }
    },
    [isLoading, setIsLoading, router]
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
        <Label>이메일</Label>
        <Input
          type="email"
          invalid={!!errors.email}
          {...register("email", { required: "이메일을 입력해주세요" })}
        />
        {errors.email && <ErrorMessage>{errors.email.message}</ErrorMessage>}
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
  email: string;
  password: string;
};
