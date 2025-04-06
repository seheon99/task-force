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
import { prisma } from "@/utilities/prisma-client";

export default async function Home() {
  const users = await prisma.user.findMany({
    orderBy: { enlistedAt: "asc" },
  });
  const order = await prisma.order.findFirst({
    where: {
      actedAt: {
        gte: new Date(new Date().setHours(0, 0, 0, 0)),
        lte: new Date(new Date().setHours(23, 59, 59, 999)),
      },
    },
  });
  const exempts = await prisma.exempt.findMany({
    select: {
      userId: true,
      excuse: {
        select: {
          reason: true,
        },
      },
    },
    where: {
      startedAt: {
        gte: new Date(new Date().setHours(0, 0, 0, 0)),
      },
      endedAt: {
        lte: new Date(new Date().setHours(23, 59, 59, 999)),
      },
    },
  });
  const votedUsers = await prisma.randomSeed.findMany({
    select: {
      userId: true,
    },
    where: {
      orderId: order?.id,
    },
  });

  return (
    <Card>
      <CardHeader className="flex justify-between">
        <div>
          <Heading>오늘의 난수</Heading>
          <Text>오늘의 난수에 대한 참여 현황을 확인할 수 있습니다.</Text>
        </div>
        <div className="flex flex-col gap-2 shrink-0">
          <VoteButton outline>
            <ShieldExclamationIcon className="fill-rose-500" /> 난수 만들기
          </VoteButton>
          <Button disabled outline>
            <ShieldCheckIcon className="fill-lime-500" /> 완료
          </Button>
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
            {users.map((user) => {
              const exempted = exempts.find((e) => e.userId === user.id);
              const voted = votedUsers.some((u) => u.userId === user.id);
              return (
                <TableRow key={user.id}>
                  <TableCell>{user.name}</TableCell>
                  <TableCell>
                    {exempted ? (
                      <Badge color="zinc">{exempted.excuse.reason}</Badge>
                    ) : voted ? (
                      <Badge color="lime">참여</Badge>
                    ) : (
                      <Badge color="rose">미참여</Badge>
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
