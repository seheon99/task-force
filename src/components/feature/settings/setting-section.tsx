import clsx from "clsx";

import { FieldGroup, Fieldset } from "@/components/base";

import type { ComponentPropsWithoutRef } from "react";

export function SettingSection({
  className,
  ...props
}: { className?: string } & ComponentPropsWithoutRef<typeof Fieldset>) {
  return (
    <Fieldset
      className={clsx(
        className,
        "grid grid-cols-1 gap-x-6 gap-y-4 md:grid-cols-3 md:gap-y-10",
      )}
      {...props}
    />
  );
}
export function SettingSectionName({
  className,
  ...props
}: { className?: string } & ComponentPropsWithoutRef<"div">) {
  return <div className={className} {...props} />;
}

export function SettingFieldGroup({
  className,
  ...props
}: { className?: string } & ComponentPropsWithoutRef<typeof FieldGroup>) {
  return (
    <FieldGroup
      className={clsx(
        className,
        "mt-0! grid grid-cols-1 gap-x-6 sm:max-w-xl sm:grid-cols-6 md:col-span-2",
      )}
      {...props}
    />
  );
}
