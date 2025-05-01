"use client";

import clsx from "clsx";
import { useState } from "react";

import { Button } from "@/components/base";

import { VoteDialog } from "./vote-dialog";

export function VoteButton({
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
      <VoteDialog open={isOpen} onClose={setIsOpen} />
    </>
  );
}
