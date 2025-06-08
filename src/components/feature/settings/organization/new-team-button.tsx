import { useState } from "react";

import { Button } from "@/components/base";
import { twcn } from "@/utilities";

import { NewTeamDialog } from "./new-team-dialog";

export function NewTeamButton({
  className,
  children,
  ...props
}: Parameters<typeof Button>[0]) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <Button
        className={twcn(className)}
        {...props}
        onClick={() => setIsOpen(true)}
      >
        {children}
      </Button>
      <NewTeamDialog open={isOpen} onClose={setIsOpen} />
    </>
  );
}
