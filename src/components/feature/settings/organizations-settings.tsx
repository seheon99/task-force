import {
  Button,
  Heading,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/base";

export function OrganizationsSettings() {
  return (
    <div>
      <div className="flex justify-between">
        <Heading>소속</Heading>
        <Button outline className="text-sm">
          새 팀 만들기
        </Button>
      </div>
      <Table>
        <TableHead>
          <TableRow>
            <TableHeader>팀 이름</TableHeader>
            <TableHeader className="hidden sm:table-cell">멤버 수</TableHeader>
            <TableHeader className="hidden sm:table-cell">미션 수</TableHeader>
            <TableHeader className="relative w-0">
              <span className="sr-only">actions</span>
            </TableHeader>
          </TableRow>
        </TableHead>
        <TableBody>
          <TableRow>
            <TableCell>운용대대 2생활관</TableCell>
            <TableCell className="hidden sm:table-cell">12명 활동 중</TableCell>
            <TableCell className="hidden sm:table-cell">
              1개 미션 진행 중
            </TableCell>
            <TableCell className="flex gap-1">
              <Button outline className="text-sm">
                설정
              </Button>
              <Button outline className="text-sm !text-red-500">
                나가기
              </Button>
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </div>
  );
}
