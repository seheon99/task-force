import Link from "next/link";

import { twcn } from "@/utilities";

export function Tab({
  href,
  current,
  children,
}: {
  href: string;
  current?: boolean;
  children: React.ReactNode;
}) {
  return (
    <li
      className={twcn(
        current
          ? "text-zinc-700 not-dark:bg-zinc-100 dark:text-zinc-100"
          : "text-zinc-500 hover:text-zinc-700",
        "rounded-md px-3 py-2 text-sm font-medium",
      )}
    >
      <Link href={href} aria-current={current}>
        {children}
      </Link>
    </li>
  );
}

export function Tabs({
  className,
  children,
  ...props
}: React.ComponentPropsWithoutRef<"nav">) {
  return (
    <nav
      {...props}
      aria-label="Tabs"
      className={twcn(className, "flex overflow-x-auto py-4")}
    >
      <ul
        role="list"
        className="flex min-w-full flex-none gap-x-6 text-sm/6 font-semibold text-zinc-400"
      >
        {children}
      </ul>
    </nav>
  );
}
