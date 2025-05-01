"use client";

import clsx from "clsx";
import { useState } from "react";

import { Button } from "@/components/base";

import type { Mission } from "@prisma";

import { RandomSeedDialog } from "./random-seed-dialog";

export function RandomSeedButton({
  missionId,
  className,
  children,
  ...props
}: { missionId: Mission["id"] } & React.ComponentPropsWithoutRef<
  typeof Button
>) {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <>
      <Button
        className={clsx(className)}
        onClick={() => setIsOpen((isOpen) => !isOpen)}
        {...props}
      >
        {children}
      </Button>
      <RandomSeedDialog
        missionId={missionId}
        open={isOpen}
        onClose={setIsOpen}
      />
    </>
  );
}
