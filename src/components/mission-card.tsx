import {
  ShieldCheckIcon,
  ShieldExclamationIcon,
} from "@heroicons/react/16/solid";

import { VoteButton } from "@/components";
import {
  Badge,
  Button,
  Card,
  CardBody,
  CardHeader,
  Heading,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
  Text,
} from "@/components/base";
import { useMission, useUser } from "@/hooks";

import type { Mission } from "@prisma";

export function MissionCard({ id }: { id: Mission["id"] }) {
  const { data: mission } = useMission({ id });
  const { data: user } = useUser();
  return (
    <Card>
      <CardHeader className="flex justify-between">
        <div>
          <Heading>{mission?.title}</Heading>
          <Text>{mission?.description}</Text>
        </div>
        <div className="flex flex-col gap-2 shrink-0">
          {mission?.participants.some(
            ({ user: participant }) =>
              participant.id === user?.id && participant.randomSeeds.length
          ) ? (
            <Button disabled outline>
              <ShieldCheckIcon className="fill-lime-500" /> 완료
            </Button>
          ) : (
            <VoteButton outline>
              <ShieldExclamationIcon className="fill-rose-500" /> 난수 만들기
            </VoteButton>
          )}
        </div>
      </CardHeader>
      <CardBody>
        <Table striped>
          <TableHead>
            <TableRow>
              <TableHeader>이름</TableHeader>
              <TableHeader>참여</TableHeader>
            </TableRow>
          </TableHead>
          <TableBody>
            {mission?.participants.map(({ user }) => {
              return (
                <TableRow key={user.id}>
                  <TableCell>{user.name}</TableCell>
                  <TableCell>
                    {user.exempts.length ? (
                      <Badge color="zinc">
                        {user.exempts[0].excuse.reason}
                      </Badge>
                    ) : user.randomSeeds.length ? (
                      <Badge color="lime">난수 생성</Badge>
                    ) : (
                      <Badge color="rose">난수 미생성</Badge>
                    )}
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </CardBody>
    </Card>
  );
}
