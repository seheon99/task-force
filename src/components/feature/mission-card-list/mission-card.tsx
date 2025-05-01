import {
  ShieldCheckIcon,
  ShieldExclamationIcon,
} from "@heroicons/react/16/solid";

import {
  Badge,
  Button,
  Card,
  CardBody,
  CardHeader,
  CardHeading,
  Code,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
  Text,
} from "@/components/base";
import { VoteButton } from "@/components/feature";
import { useMission, useUser } from "@/swr";

import type { Mission } from "@prisma";

export function MissionCard({ id }: { id: Mission["id"] }) {
  const { data: mission } = useMission({ id });
  const { data: user } = useUser();
  return (
    <Card>
      <CardHeader className="flex gap-2">
        <div className="shrink">
          <CardHeading className="col-span-1">{mission?.title}</CardHeading>
          <Text className="text-sm">{mission?.organization.name}</Text>
        </div>
        {mission?.participants.find((p) => p.userId === user?.id)?.user
          .randomSeeds.length ? (
          <Button className="shrink-0 text-sm" disabled outline>
            <ShieldCheckIcon className="hidden fill-lime-500 sm:block" /> 완료
          </Button>
        ) : (
          <VoteButton className="shrink-0 text-sm" outline>
            <ShieldExclamationIcon className="hidden fill-rose-500 sm:block" />
            난수 만들기
          </VoteButton>
        )}
      </CardHeader>
      <CardBody>
        <Table striped>
          <TableHead>
            <TableRow>
              <TableHeader>이름</TableHeader>
              <TableHeader>난수</TableHeader>
            </TableRow>
          </TableHead>
          <TableBody>
            {mission?.participants.map(({ user: p }) => {
              return (
                <TableRow key={p.id}>
                  <TableCell>{p.name}</TableCell>
                  <TableCell className="flex items-center justify-between">
                    {p.exempts.length ? (
                      <Badge color="zinc">{p.exempts[0].excuse.reason}</Badge>
                    ) : p.randomSeeds.length ? (
                      <Code>{p.randomSeeds.at(-1)!.number}</Code>
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
