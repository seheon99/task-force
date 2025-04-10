"use client";

import { useCallback } from "react";

import {
  Button,
  Dialog,
  DialogActions,
  DialogBody,
  DialogDescription,
  DialogTitle,
  Field,
  FieldGroup,
  Fieldset,
  Input,
  Label,
} from "./base";

export function MissionCreateDialog({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const onSubmit = useCallback(() => {}, []);

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>HELLO</DialogTitle>
      <DialogDescription>hello</DialogDescription>
      <DialogBody>
        <form onSubmit={onSubmit}>
          <Fieldset>
            <FieldGroup>
              <Field>
                <Label>제목</Label>
                <Input />
              </Field>
            </FieldGroup>
          </Fieldset>
        </form>
      </DialogBody>
      <DialogActions>
        <Button plain>취소</Button>
        <Button>만들기</Button>
      </DialogActions>
    </Dialog>
  );
}
