import { sampleSize } from "es-toolkit";

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
    <div className="flex flex-col gap-4 p-4">
      <Heading className="mt-8 mb-2">Cleaning TF</Heading>
      <Table striped>
        <TableHead>
          <TableRow>
            <TableHeader>이름</TableHeader>
            <TableHeader>역할</TableHeader>
          </TableRow>
        </TableHead>
        <TableBody>
          {sampleSize(users, roles.length).map((user, index) => (
            <TableRow key={user.id}>
              <TableCell className="">{user.name}</TableCell>
              <TableCell className="">{roles[index].title}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
