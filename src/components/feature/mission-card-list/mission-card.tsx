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
import { useMission, useUser } from "@/swr";

import type { Mission } from "@prisma";

import { RandomSeedButton } from "./random-seed-button";

export function MissionCard({
  id,
  href,
}: {
  id: Mission["id"];
  href?: string;
}) {
  const { data: mission } = useMission({ id });
  const { data: user } = useUser();
  return (
    <Card href={href}>
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
          <RandomSeedButton className="shrink-0 text-sm" outline missionId={id}>
            <ShieldExclamationIcon className="hidden fill-rose-500 sm:block" />
            난수 만들기
          </RandomSeedButton>
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
                  <TableCell>{p.username}</TableCell>
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
