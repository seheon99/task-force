"use client";

import { FirebaseError } from "firebase/app";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { useRouter } from "next/navigation";
import { useState } from "react";
import useSWRMutation from "swr/mutation";

import { createUser } from "@/actions";
import {
  Button,
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

async function signUp(
  url: string,
  {
    arg: { name, email, password, enlistedAt },
  }: {
    arg: { name: string; email: string; password: string; enlistedAt: Date };
  }
) {
  try {
    const { user: firebaseUser } = await createUserWithEmailAndPassword(
      firebaseAuth,
      email,
      password
    );
    await updateProfile(firebaseUser, {
      displayName: name,
    });
    const user = await createUser({
      id: firebaseUser.uid,
      name,
      email,
      enlistedAt,
    });
    return user;
  } catch (error) {
    toast.error({
      title: "회원가입 실패",
      description: `(${(error as FirebaseError).code})`,
    });
  }
}

export default function SignUpPage() {
  const [isLoading, setIsLoading] = useState(false);
  const { trigger } = useSWRMutation("/sign-up", signUp);
  const router = useRouter();

  return (
    <form
      action={async (formData) => {
        setIsLoading(true);

        const name = formData.get("name") as string;
        const email = formData.get("email") as string;
        const password = formData.get("password") as string;
        const enlistedAt = formData.get("enlistedAt") as string;

        if (!name || !email || !password || !enlistedAt) {
          setIsLoading(false);
          return;
        }

        const user = await trigger({
          name,
          email,
          password,
          enlistedAt: new Date(enlistedAt),
        });
        if (user) {
          router.push("/");
        }
      }}
      className="grid w-full max-w-sm grid-cols-1 gap-8"
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
      <Field>
        <Label>비밀번호 확인</Label>
        <Input type="password" name="passwordConfirm" />
      </Field>
      <Field>
        <Label>이름</Label>
        <Input type="text" name="name" />
      </Field>
      <Field>
        <Label>입대일</Label>
        <Input type="date" name="enlistedAt" />
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
