"use client";

import { TextLink } from "@/components/base";
import { useMissions, useUser } from "@/hooks";

import { MissionCard, MissionCreateButton } from "./";

export function MissionCardList() {
  const { data: user } = useUser();
  const { data: missions } = useMissions();
  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
      {user ? (
        <>
          {missions?.map(({ id }) => (
            <MissionCard key={id} id={id} />
          ))}
          <MissionCreateButton />
        </>
      ) : (
        <TextLink href="/sign-in">로그인 하러 가기</TextLink>
      )}
    </div>
  );
}
