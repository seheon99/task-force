import { Badge } from "@/components/base";

export const affiliations: {
  name: string;
  color: Parameters<typeof Badge>[0]["color"];
}[] = [
  { name: "국통사", color: "blue" },
  { name: "암호실", color: "red" },
  { name: "사방실", color: "purple" },
];
