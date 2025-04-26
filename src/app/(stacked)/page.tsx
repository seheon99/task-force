"use client";

import { TextLink } from "@/components/base";
import { MissionCardList } from "@/components/feature";
import { useUser } from "@/hooks";

export default function Home() {
  const { data: user } = useUser();
  return user ? (
    <MissionCardList />
  ) : (
    <TextLink href="/sign-in">로그인 하러 가기</TextLink>
  );
}
