"use client";

import clsx from "clsx";
import { useState } from "react";

import { Button } from "@/components/base";

import { RandomSeedDialog } from "./random-seed-dialog";

export function RandomSeedButton({
  className,
  children,
  ...props
}: React.ComponentPropsWithoutRef<typeof Button>) {
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
      <RandomSeedDialog open={isOpen} onClose={setIsOpen} />
    </>
  );
}
