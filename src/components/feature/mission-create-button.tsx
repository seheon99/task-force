"use client";

import { PlusIcon } from "@heroicons/react/16/solid";
import { useState } from "react";

import { MissionCreateDialog } from "./";
import { Button } from "../base";

export function MissionCreateButton() {
  const [open, setOpen] = useState(false);
  return (
    <>
      <Button
        outline
        className="min-h-40 border-2 border-dashed"
        onClick={() => setOpen((v) => !v)}
      >
        <PlusIcon className="size-16" />
      </Button>
      <MissionCreateDialog open={open} onClose={() => setOpen(false)} />
    </>
  );
}
