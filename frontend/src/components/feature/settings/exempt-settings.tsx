import { EllipsisHorizontalIcon } from "@heroicons/react/16/solid";

import {
  Button,
  Dropdown,
  DropdownButton,
  DropdownItem,
  DropdownMenu,
  Heading,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/base";

export function ExemptSettings() {
  return (
    <div>
      <div className="flex justify-between">
        <Heading>열외</Heading>
        <Button outline className="text-sm">
          새 일정 만들기
        </Button>
      </div>
      <Table
        striped
        bleed
        className="[--gutter:--spacing(6)] sm:[--gutter:--spacing(8)]"
      >
        <TableHead>
          <TableRow>
            <TableHeader>내용</TableHeader>
            <TableHeader>시작 일시</TableHeader>
            <TableHeader>종료 일시</TableHeader>
            <TableHeader className="hidden sm:table-cell">기간</TableHeader>
            <TableHeader className="relative w-0">
              <span className="sr-only">actions</span>
            </TableHeader>
          </TableRow>
        </TableHead>
        <TableBody>
          <TableRow>
            <TableCell>평일 외출</TableCell>
            <TableCell>4월 22일 17:10</TableCell>
            <TableCell>4월 22일 21:30</TableCell>
            <TableCell className="hidden sm:table-cell">4시간 20분</TableCell>
            <TableCell>
              <div className="-mx-3 -my-1.5 sm:-mx-2.5">
                <Dropdown>
                  <DropdownButton plain aria-label="More options">
                    <EllipsisHorizontalIcon />
                  </DropdownButton>
                  <DropdownMenu anchor="bottom end">
                    <DropdownItem>View</DropdownItem>
                    <DropdownItem>Edit</DropdownItem>
                    <DropdownItem>Delete</DropdownItem>
                  </DropdownMenu>
                </Dropdown>
              </div>
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell>휴가</TableCell>
            <TableCell>5월 2일 07:30</TableCell>
            <TableCell>5월 3일 21:00</TableCell>
            <TableCell className="hidden sm:table-cell">
              1일 13시간 30분
            </TableCell>
            <TableCell>
              <div className="-mx-3 -my-1.5 sm:-mx-2.5">
                <Dropdown>
                  <DropdownButton plain aria-label="More options">
                    <EllipsisHorizontalIcon />
                  </DropdownButton>
                  <DropdownMenu anchor="bottom end">
                    <DropdownItem>View</DropdownItem>
                    <DropdownItem>Edit</DropdownItem>
                    <DropdownItem>Delete</DropdownItem>
                  </DropdownMenu>
                </Dropdown>
              </div>
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </div>
  );
}
