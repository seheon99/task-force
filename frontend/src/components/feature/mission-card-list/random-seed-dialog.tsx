"use client";

import { useCallback, useRef, useState } from "react";

import {
  Button,
  Dialog,
  DialogActions,
  DialogBody,
  DialogTitle,
  toast,
} from "@/components/base";
import { useRandomSeedCreation } from "@/swr";
import { twcn } from "@/utilities";

import type { Mission } from "@prisma";

export function RandomSeedDialog({
  missionId,
  open,
  onClose,
}: { missionId: Mission["id"] } & Omit<
  React.ComponentPropsWithoutRef<typeof Dialog>,
  "children"
>) {
  const [seed, setSeed] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  const { trigger: createRandomSeed, isMutating: isCreating } =
    useRandomSeedCreation({
      missionId,
    });

  const onSubmit = useCallback(
    async (seedNumber: number) => {
      try {
        const randomSeed = await createRandomSeed({ seedNumber });
        toast.success({
          title: "난수 만들기 성공",
          description: randomSeed.createdAt.toLocaleString(),
        });
        onClose(false);
      } catch (error) {
        toast.error({ title: "난수 만들기 실패", description: error });
      }
    },
    [createRandomSeed, onClose],
  );

  return (
    <Dialog
      open={open}
      onClose={onClose}
      onFocus={() => inputRef.current?.focus()}
    >
      <DialogTitle>난수 만들기</DialogTitle>
      <DialogBody>
        <div className="flex justify-center gap-[1rem]">
          {[...Array(2)].map((_, i) => (
            <div
              key={i}
              className={twcn(
                "h-[1.2em] w-[1em] rounded-md p-1 text-center font-mono text-6xl shadow",
                "bg-transparent dark:bg-white/5",
                "border border-zinc-950/10 dark:border-white/10",
              )}
              onClick={() => inputRef.current?.focus()}
            >
              {seed[i]}
            </div>
          ))}
        </div>
        <input
          ref={inputRef}
          className="h-0 w-0 opacity-0"
          name="seed"
          type="number"
          min={0}
          max={99}
          value={seed}
          onChange={(e) => setSeed(e.target.value.substring(0, 2))}
        />
      </DialogBody>
      <DialogActions>
        <Button
          disabled={isCreating || seed.length < 2}
          onClick={() => onSubmit(parseInt(seed))}
        >
          제출하기
        </Button>
      </DialogActions>
    </Dialog>
  );
}
