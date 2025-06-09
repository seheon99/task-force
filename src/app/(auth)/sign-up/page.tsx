"use client";

import { FirebaseError } from "firebase/app";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { useRouter } from "next/navigation";
import { useCallback, useState } from "react";
import { useForm } from "react-hook-form";
import useSWRMutation from "swr/mutation";

import { createUser } from "@/actions/database";
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

import type { SubmitHandler } from "react-hook-form";

async function signUp(
  url: string,
  {
    arg: { username, password },
  }: {
    arg: Inputs;
  },
) {
  const { user: firebaseUser } = await createUserWithEmailAndPassword(
    firebaseAuth,
    `${username}@${emailDomain}`,
    password,
  );
  const user = await createUser({
    id: firebaseUser.uid,
    username,
  });
  return user;
}

export default function SignUpPage() {
  const [isLoading, setIsLoading] = useState(false);
  const { trigger } = useSWRMutation("/sign-up", signUp);
  const router = useRouter();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<Inputs>();

  const onSubmit = useCallback<SubmitHandler<Inputs>>(
    async (props) => {
      if (isLoading) {
        return;
      }

      setIsLoading(true);
      try {
        const user = await trigger(props);
        toast.success({
          title: "회원가입 성공",
          description: `${user.username}님 환영합니다`,
        });
        router.push("/");
      } catch (error) {
        if (error instanceof FirebaseError) {
          toast.error({
            title: "회원가입 실패",
            description: `(${error.code}) ${error.message}`,
          });
        } else {
          toast.error({
            title: "회원가입 실패",
            description: error,
          });
        }
      }
    },
    [isLoading, router, trigger],
  );

  return (
    <form
      className="grid w-full max-w-sm grid-cols-1 gap-8"
      onSubmit={handleSubmit(onSubmit)}
    >
      <Heading>회원가입</Heading>
      <Field>
        <Label>이름</Label>
        <Input
          type="text"
          invalid={!!errors.username}
          {...register("username", { required: "이름을 입력해주세요" })}
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
      <Field>
        <Label>비밀번호 확인</Label>
        <Input
          type="password"
          invalid={!!errors.passwordConfirm}
          {...register("passwordConfirm", {
            required: "비밀번호를 입력해주세요",
            validate: (password) => {
              if (watch("password") !== password) {
                return "비밀번호가 일치하지 않습니다";
              }
            },
          })}
        />
        {errors.passwordConfirm && (
          <ErrorMessage>{errors.passwordConfirm.message}</ErrorMessage>
        )}
      </Field>
      <Button type="submit" className="w-full" disabled={isLoading}>
        회원가입
      </Button>
      <Text>
        아이디가 있다면?{" "}
        <TextLink href="/sign-in">
          <Strong>로그인하기</Strong>
        </TextLink>
      </Text>
    </form>
  );
}

type Inputs = {
  unit: string;
  username: string;
  password: string;
  passwordConfirm: string;
};
