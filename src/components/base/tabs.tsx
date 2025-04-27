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
    <li
      className={clsx(
        current
          ? "border-zinc-500 text-zinc-600"
          : "border-transparent text-zinc-500 hover:border-zinc-300 hover:text-zinc-700",
        "not-sm:w-full border-b-2 px-1 py-4 text-center text-sm font-medium"
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
      className={clsx(className, "flex overflow-x-auto py-4")}
    >
      <ul
        role="list"
        className="flex min-w-full flex-none gap-x-6 px-4 text-sm/6 font-semibold text-gray-400 sm:px-6 lg:px-8"
      >
        {children}
      </ul>
    </nav>
  );
}
