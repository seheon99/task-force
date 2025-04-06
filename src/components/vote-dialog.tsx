"use client";

import clsx from "clsx";
import { useRef, useState } from "react";

import { Button, Dialog, DialogActions, DialogBody, DialogTitle } from "./base";

export function VoteDialog({
  open,
  onClose,
}: Omit<React.ComponentPropsWithoutRef<typeof Dialog>, "children">) {
  const [seed, setSeed] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>난수 만들기</DialogTitle>
      <DialogBody>
        <div className="flex justify-center gap-[1rem]">
          {[...Array(2)].map((_, i) => (
            <div
              key={i}
              className={clsx(
                "rounded-md p-1 w-[1em] h-[1.2em] shadow text-6xl text-center font-mono",
                "bg-transparent dark:bg-white/5",
                "border border-zinc-950/10 dark:border-white/10"
              )}
              onClick={() => inputRef.current?.focus()}
            >
              {seed[i]}
            </div>
          ))}
        </div>
        <input
          autoFocus
          ref={inputRef}
          className="h-0 w-0 opacity-0"
          name="seed"
          type="number"
          min={0}
          max={99}
          maxLength={2}
          value={seed}
          onChange={(e) => setSeed(e.target.value.substring(0, 2))}
        />
      </DialogBody>
      <DialogActions>
        <Button disabled={seed.length < 2}>제출하기</Button>
      </DialogActions>
    </Dialog>
  );
}
