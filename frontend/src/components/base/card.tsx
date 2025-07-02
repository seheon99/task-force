import Link from "next/link";
import React from "react";

import { twcn } from "@/utilities";

export function Card({
  className,
  href,
  children,
  ...props
}: {
  href?: string;
  children: React.ReactNode;
} & React.ComponentPropsWithoutRef<"div">) {
  return (
    <div
      className={twcn(
        className,
        "divide-y overflow-hidden rounded-lg",
        "divide-zinc-200 bg-white shadow-sm",
        "dark:divide-zinc-700 dark:bg-zinc-800 dark:ring-1 dark:ring-white/10",
        href && "transition-colors hover:bg-zinc-500/5 dark:hover:bg-white/10",
      )}
      {...props}
    >
      {href ? <Link href={href}>{children}</Link> : children}
    </div>
  );
}

export function CardHeader({
  className,
  children,
  ...props
}: { children: React.ReactNode } & React.ComponentPropsWithoutRef<"div">) {
  return (
    <div
      className={twcn(
        className,
        "flex flex-wrap items-center justify-between px-4 py-5 sm:flex-nowrap sm:px-6",
      )}
      {...props}
    >
      {children}
    </div>
  );
}

export function CardHeading({
  className,
  children,
  ...props
}: { children: React.ReactNode } & React.ComponentPropsWithoutRef<"h3">) {
  return (
    <h3
      className={twcn(
        className,
        "text-base font-semibold text-gray-900 dark:text-gray-100",
      )}
      {...props}
    >
      {children}
    </h3>
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
    <div className={twcn(className, "px-4 py-5 sm:p-6")} {...props}>
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
    <div className={twcn(className, "px-4 py-4 sm:px-6")} {...props}>
      {children}
    </div>
  );
}
