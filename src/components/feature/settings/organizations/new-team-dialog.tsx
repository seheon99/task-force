import { useCallback } from "react";
import { SubmitHandler, useForm } from "react-hook-form";

import {
  Button,
  Description,
  Dialog,
  DialogActions,
  DialogBody,
  DialogTitle,
  ErrorMessage,
  Field,
  FieldGroup,
  Input,
  Label,
  Textarea,
  toast,
} from "@/components/base";
import { useOrganizationCreation } from "@/swr";

export function NewTeamDialog({
  open,
  onClose: close,
}: {
  open?: boolean;
  onClose: (value: boolean) => void;
}) {
  const { trigger: createOrganization, isMutating } = useOrganizationCreation();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<Inputs>();

  const onClose = useCallback(
    (value: boolean) => {
      reset();
      close(value);
    },
    [close, reset],
  );

  const onSubmit = useCallback<SubmitHandler<Inputs>>(
    async ({ name, description }) => {
      try {
        const organization = await createOrganization({ name, description });
        if (organization) {
          toast.success({
            title: "팀 생성 성공",
            description: `${organization.name} 팀을 생성되었습니다`,
          });
          onClose(false);
        }
      } catch (error) {
        toast.error({
          title: "팀 생성 실패",
          description:
            error instanceof Error
              ? error.message
              : `알 수 없는 오류가 발생했습니다. (${error})`,
        });
      }
    },
    [createOrganization, onClose],
  );

  return (
    <Dialog open={open} onClose={onClose}>
      <form action="#" onSubmit={handleSubmit(onSubmit)}>
        <DialogTitle>새 팀 만들기</DialogTitle>
        <DialogBody>
          <FieldGroup>
            <Field>
              <Label>팀명</Label>
              <Input
                disabled={isMutating}
                invalid={!!errors.name}
                {...register("name", {
                  required: "팀명을 입력해주세요.",
                  minLength: {
                    value: 3,
                    message: "세 글자 이상 작성해주세요.",
                  },
                })}
              />
              <ErrorMessage>{errors.name?.message}</ErrorMessage>
            </Field>
            <Field>
              <Label>소개</Label>
              <Description>
                초대받은 사람에게 보여줄 간단한 소개를 작성해주세요.
              </Description>
              <Textarea
                disabled={isMutating}
                invalid={!!errors.description}
                {...register("description", {
                  required: "소개를 작성해주세요.",
                  minLength: { value: 10, message: "10자 이상 작성해주세요." },
                })}
              />
              <ErrorMessage>{errors.description?.message}</ErrorMessage>
            </Field>
          </FieldGroup>
        </DialogBody>
        <DialogActions>
          <Button plain disabled={isMutating} onClick={() => onClose(false)}>
            취소
          </Button>
          <Button disabled={isMutating} type="submit">
            만들기
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
}

type Inputs = {
  name: string;
  description: string;
};
