import clsx from "clsx";

export function Card({
  className,
  children,
  ...props
}: { children: React.ReactNode } & React.ComponentPropsWithoutRef<"div">) {
  return (
    <div
      className={clsx(
        className,
        "divide-y divide-zinc-200 overflow-hidden rounded-lg bg-white shadow-sm",
        "dark:divide-zinc-700 dark:bg-zinc-800 dark:ring-1 dark:ring-white/10",
      )}
      {...props}
    >
      {children}
    </div>
  );
}

export function CardHeader({
  className,
  children,
  ...props
}: { children: React.ReactNode } & React.ComponentPropsWithoutRef<"div">) {
  return (
    <div className={clsx(className, "px-4 py-5 sm:px-6")} {...props}>
      {children}
    </div>
  );
}

export function CardBody({
  className,
  children,
  ...props
}: {
  children: React.ReactNode;
} & React.ComponentPropsWithoutRef<"div">) {
  return (
    <div className={clsx(className, "px-4 py-5 sm:p-6")} {...props}>
      {children}
    </div>
  );
}

export function CardFooter({
  className,
  children,
  ...props
}: {
  gray?: boolean;
  children: React.ReactNode;
} & React.ComponentPropsWithoutRef<"div">) {
  return (
    <div className={clsx(className, "px-4 py-4 sm:px-6")} {...props}>
      {children}
    </div>
  );
}
