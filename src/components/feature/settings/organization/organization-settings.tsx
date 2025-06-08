"use client";

import { XMarkIcon } from "@heroicons/react/16/solid";
import { useCallback, useEffect, useState } from "react";
import { useForm } from "react-hook-form";

import {
  Badge,
  Button,
  Description,
  Dialog,
  DialogActions,
  DialogDescription,
  DialogTitle,
  ErrorMessage,
  Field,
  FieldGroup,
  Fieldset,
  Input,
  Label,
  Legend,
  Loading,
  Subheading,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
  Text,
  Textarea,
  toast,
} from "@/components/base";
import { UsersCombobox } from "@/components/feature";
import {
  useMemberCreation,
  useMemberDeletion,
  useOrganization,
  useOrganizationMutation,
  useUser,
} from "@/swr";

import type { Member, Organization, User } from "@prisma";
import type { SubmitHandler } from "react-hook-form";

export function OrganizationSettings({ id }: { id: Organization["id"] }) {
  const [invitedUser, setInvitedUser] = useState<User | null>(null);
  const [deletionMember, setDeletionMember] = useState<
    (Member & { user: User }) | null
  >(null);

  const { data: user } = useUser();
  const { data: organization, isLoading } = useOrganization({ id });
  const { trigger: updateOrganization, isMutating } = useOrganizationMutation({
    id,
  });
  const { trigger: createMember, isMutating: isCreatingMember } =
    useMemberCreation();
  const { trigger: deleteMember, isMutating: isDeletingMember } =
    useMemberDeletion();

  const {
    register,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();

  const onSubmit = useCallback<SubmitHandler<Inputs>>(
    async (data) => {
      try {
        const organization = await updateOrganization(data);
        toast.success({
          title: "업데이트 성공",
          description: organization.updatedAt.toString(),
        });
      } catch (error) {
        toast.error({
          title: "업데이트 실패",
          description: error,
        });
      }
    },
    [updateOrganization],
  );

  const onInviteButtonClickHandler = useCallback(
    async (user: User | null) => {
      if (user) {
        try {
          await createMember({
            userId: user.id,
            organizationId: id,
          });
          setInvitedUser(null);
          toast.success({
            title: "초대하기 성공",
            description: "초대장은 이틀 뒤 만료됩니다.",
          });
        } catch (error) {
          toast.error({
            title: "초대하기 실패",
            description: error,
          });
        }
      }
    },
    [createMember, id],
  );

  const onExpulsionButtonClickHandler = useCallback(
    async (member: (Member & { user: User }) | null) => {
      if (member) {
        try {
          await deleteMember({ id: member.id });
          toast.success({
            title: "내보내기 성공",
            description: `${member.user.nickname}은 더이상 ${organization?.name}의 멤버가 아닙니다.`,
          });
          setDeletionMember(null);
        } catch (error) {
          toast.error({
            title: "내보내기 실패",
            description: error,
          });
        }
      }
    },
    [deleteMember, organization?.name],
  );

  useEffect(() => {
    if (organization) {
      const { name, description } = organization;
      setValue("name", name);
      setValue("description", description);
    }
  }, [organization, setValue]);

  return isLoading ? (
    <Loading />
  ) : (
    <div className="flex flex-col gap-16">
      <form onSubmit={handleSubmit(onSubmit)}>
        <Fieldset className="grid grid-cols-1 gap-x-6 gap-y-4 md:grid-cols-3 md:gap-y-10">
          <div>
            <Legend>팀 설정</Legend>
            <Text>
              팀에 초대된 사람은 팀명과 소개로 초대를 받을지 말지 결정하게 돼요.
            </Text>
          </div>
          <FieldGroup className="grid grid-cols-1 gap-x-6 sm:max-w-xl sm:grid-cols-6 md:col-span-2">
            <Field className="col-span-full">
              <Label>팀명</Label>
              <Input
                disabled={isLoading}
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
            <Field className="col-span-full">
              <Label>소개</Label>
              <Description>
                초대받은 사람에게 보여줄 간단한 소개를 작성해주세요.
              </Description>
              <Textarea
                disabled={isLoading}
                invalid={!!errors.description}
                {...register("description", {
                  required: "소개를 작성해주세요.",
                  minLength: { value: 10, message: "10자 이상 작성해주세요." },
                })}
              />
              <ErrorMessage>{errors.description?.message}</ErrorMessage>
            </Field>
            <Button type="submit" disabled={isMutating}>
              저장
            </Button>
          </FieldGroup>
        </Fieldset>
      </form>

      <Fieldset className="grid grid-cols-1 gap-x-6 gap-y-4 md:grid-cols-3 md:gap-y-10">
        <div>
          <Legend>팀원 관리</Legend>
          <Text>팀원 초대는 누구나, 팀원 추방은 팀장만 할 수 있어요.</Text>
        </div>
        <div className="grid grid-cols-1 gap-x-6 gap-y-4 sm:max-w-xl sm:grid-cols-6 md:col-span-2 md:gap-y-10">
          <div className="col-span-full flex flex-col gap-4">
            <Subheading>팀원 초대</Subheading>
            <div className="flex gap-2">
              <UsersCombobox value={invitedUser} onChange={setInvitedUser} />
              <Button
                outline
                disabled={!invitedUser || !!isCreatingMember}
                className="shrink-0 text-sm"
                onClick={() => onInviteButtonClickHandler(invitedUser)}
              >
                초대하기
              </Button>
            </div>
          </div>
          <div className="col-span-full flex flex-col gap-4">
            <Subheading>팀원 목록</Subheading>
            <div>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableHeader>소속</TableHeader>
                    <TableHeader>계급</TableHeader>
                    <TableHeader>이름</TableHeader>
                    <TableHeader>
                      <span className="sr-only">action</span>
                    </TableHeader>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {organization?.members.map((member) => (
                    <TableRow key={member.user.id}>
                      <TableCell>{member.user.unit}</TableCell>
                      <TableCell>{member.user.rank}</TableCell>
                      <TableCell>
                        {member.user.nickname}
                        {member.isLeader && (
                          <Badge className="ml-1" color="lime">
                            팀장
                          </Badge>
                        )}
                      </TableCell>
                      <TableCell>
                        {!member.isLeader && member.user.id !== user?.id && (
                          <Button
                            plain
                            onClick={() => setDeletionMember(member)}
                          >
                            <XMarkIcon />
                          </Button>
                        )}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
              <Dialog
                open={!!deletionMember}
                onClose={() => setDeletionMember(null)}
              >
                <DialogTitle>이 결정은 되돌릴 수 없습니다.</DialogTitle>
                <DialogDescription>
                  {deletionMember?.user.nickname}을 {organization?.name}에서
                  내보내시겠습니까?
                </DialogDescription>
                <DialogActions>
                  <Button plain onClick={() => setDeletionMember(null)}>
                    아니요
                  </Button>
                  <Button
                    color="red"
                    disabled={!deletionMember || isDeletingMember}
                    onClick={() =>
                      onExpulsionButtonClickHandler(deletionMember)
                    }
                  >
                    네
                  </Button>
                </DialogActions>
              </Dialog>
            </div>
          </div>
        </div>
      </Fieldset>
    </div>
  );
}

type Inputs = {
  name: Organization["name"];
  description: Organization["description"];
};
