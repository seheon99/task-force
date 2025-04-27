import clsx from "clsx";
import Link from "next/link";

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
    <Link
      href={href}
      aria-current={current}
      className={clsx(
        current
          ? "border-zinc-500 text-zinc-600"
          : "border-transparent text-zinc-500 hover:border-zinc-300 hover:text-zinc-700",
        "w-full border-b-2 px-1 py-4 text-center text-sm font-medium"
      )}
    >
      {children}
    </Link>
  );
}

export function Tabs({
  className,
  ...props
}: React.ComponentPropsWithoutRef<"nav">) {
  return (
    <nav
      {...props}
      aria-label="Tabs"
      className={clsx(className, "-mb-px flex")}
    />
  );
}
