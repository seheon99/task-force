"use client";

import { DocumentPlusIcon } from "@heroicons/react/16/solid";
import { useState } from "react";

import { Button } from "@/components/base";

import { MissionCreateDialog } from "../";

export function MissionCreateButton() {
  const [open, setOpen] = useState(false);
  return (
    <>
      <Button
        outline
        className="min-h-40 flex-col items-center border-2 border-dashed"
        onClick={() => setOpen((v) => !v)}
      >
        <div className="size-12">
          <DocumentPlusIcon className="text-gray-400" />
        </div>
        <span className="mt-2 block text-sm font-semibold text-gray-900">
          새로운 협동과제 만들기
        </span>
      </Button>
      <MissionCreateDialog open={open} onClose={() => setOpen(false)} />
    </>
  );
}
