import { Badge } from "@/components/base";
import { affiliations } from "@/constants/affiliations";

export function AffiliationBadge({
  className,
  affiliation,
  ...props
}: {
  affiliation: string;
} & React.ComponentPropsWithoutRef<"span">) {
  return (
    <Badge
      className={className}
      // @ts-expect-error: color is a valid prop
      color={affiliations.find((o) => o.name === affiliation)?.color}
      {...props}
    >
      {affiliation}
    </Badge>
  );
}
