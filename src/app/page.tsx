import { sample } from "es-toolkit";

import { AffiliationBadge } from "@/components";
import {
  Heading,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/base";
import { prisma } from "@/prisma.client";

export default async function Home() {
  const users = await prisma.user.findMany({
    orderBy: { dateEnlisted: "asc" },
  });
  const roles = await prisma.role.findMany();

  return (
    <div>
      <Heading>Cleaning TF</Heading>
      <Table striped>
        <TableHead>
          <TableRow>
            <TableHeader>소속</TableHeader>
            <TableHeader>계급</TableHeader>
            <TableHeader>이름</TableHeader>
            <TableHeader>역할</TableHeader>
          </TableRow>
        </TableHead>
        <TableBody>
          {users.map((user) => (
            <TableRow key={user.id}>
              <TableCell className="">
                <AffiliationBadge affiliation={user.affiliation} />
              </TableCell>
              <TableCell className="">{user.rank}</TableCell>
              <TableCell className="">{user.name}</TableCell>
              <TableCell className="">{sample(roles).title}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
