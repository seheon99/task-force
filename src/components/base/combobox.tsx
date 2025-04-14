"use client";

import * as Headless from "@headlessui/react";
import { clsx } from "clsx";
import React, { Fragment } from "react";

export function Combobox<T>({
  invalid,
  children,
  ...props
}: {
  invalid?: boolean;
  children?: React.ReactNode;
} & Omit<Headless.ComboboxProps<T, false>, "multiple">) {
  return (
    <Headless.Combobox {...props} data-slot="control" multiple={false}>
      <div className="group" data-invalid={invalid || undefined}>
        {children}
      </div>
    </Headless.Combobox>
  );
}

export function ComboboxInput<T>({
  className,
  autoComplete = "off",
  ...props
}: { className?: string } & Omit<
  Headless.ComboboxInputProps<"input", T>,
  "className"
>) {
  return (
    <Headless.ComboboxInput
      {...props}
      autoComplete={autoComplete}
      className={clsx(
        className,
        // Basic layout
        "relative block w-full appearance-none rounded-lg py-[calc(theme(spacing[2.5])-1px)] sm:py-[calc(theme(spacing[1.5])-1px)]",
        // Set minimum height for when no value is selected
        "min-h-11 sm:min-h-9",
        // Horizontal padding
        "pl-[calc(theme(spacing[3.5])-1px)] pr-[calc(theme(spacing.7)-1px)] sm:pl-[calc(theme(spacing.3)-1px)]",
        // Typography
        "text-left text-base/6 text-zinc-950 placeholder:text-zinc-500 sm:text-sm/6 dark:text-white forced-colors:text-[CanvasText]",
        // Border
        "border border-zinc-950/10 hover:border-zinc-950/20 group-data-[active]:border-zinc-950/20 dark:border-white/10 dark:hover:border-white/20 dark:group-data-[active]:border-white/20",
        // Background color
        "bg-transparent dark:bg-white/5",
        // Invalid state
        "group-data-[invalid]:border-red-500 group-data-[invalid]:group-data-[hover]:border-red-500 group-data-[invalid]:dark:border-red-600 group-data-[invalid]:data-[hover]:dark:border-red-600",
        // Disabled state
        "group-data-[disabled]:border-zinc-950/20 group-data-[disabled]:opacity-100 group-data-[disabled]:dark:border-white/15 group-data-[disabled]:dark:bg-white/[2.5%] dark:data-[hover]:group-data-[disabled]:border-white/15"
      )}
    />
  );
}

export function ComboboxOptions({
  className,
  children,
}: { className?: string } & Omit<Headless.ComboboxOptionsProps, "className">) {
  return (
    <Headless.ComboboxOptions
      anchor="bottom"
      className={clsx(
        className,
        // Anchor positioning
        "[--anchor-offset:-1.625rem] [--anchor-padding:theme(spacing.4)] sm:[--anchor-offset:-1.375rem]",
        // Base styles
        "isolate w-max min-w-[calc(var(--input-width)+1.75rem)] select-none scroll-py-1 rounded-xl p-1 empty:invisible",
        // Invisible border that is only visible in `forced-colors` mode for accessibility purposes
        "outline-1 outline-transparent focus:outline-none",
        // Handle scrolling when menu won't fit in viewport
        "overflow-y-scroll overscroll-contain",
        // Popover background
        "bg-white/95 backdrop-blur-xl dark:bg-zinc-800/95",
        // Shadows
        "shadow-lg ring-1 ring-zinc-950/10 dark:ring-inset dark:ring-white/10"
      )}
    >
      {children}
    </Headless.ComboboxOptions>
  );
}

export function ComboboxOption<T>({
  className,
  children,
  ...props
}: { children: React.ReactNode } & Headless.ComboboxOptionProps<"div", T>) {
  return (
    <Headless.ComboboxOption as={Fragment} {...props}>
      <div
        className={clsx(
          // Basic layout
          "group/option cursor-default items-baseline gap-x-2 rounded-lg py-2.5 pl-2 pr-3.5 sm:py-1.5 sm:pl-1.5 sm:pr-3",
          // Typography
          "text-base/6 text-zinc-950 sm:text-sm/6 dark:text-white forced-colors:text-[CanvasText]",
          // Focus
          "outline-none data-[focus]:bg-blue-500 data-[focus]:text-white",
          // Forced colors mode
          "forced-color-adjust-none forced-colors:data-[focus]:bg-[Highlight] forced-colors:data-[focus]:text-[HighlightText]",
          // Disabled
          "data-[disabled]:opacity-50"
        )}
      >
        <span
          className={clsx(
            className,
            // Base
            "grid min-w-0 grid-cols-[auto_1fr_1.5rem_0.5rem_auto] items-center",
            // Icons
            "[&>[data-slot=icon]]:col-start-1 [&>[data-slot=icon]]:row-start-1 [&>[data-slot=icon]]:-ml-0.5 [&>[data-slot=icon]]:mr-2.5 [&>[data-slot=icon]]:size-5 sm:[&>[data-slot=icon]]:mr-2 [&>[data-slot=icon]]:sm:size-4",
            "[&>[data-slot=icon]]:text-zinc-500 [&>[data-slot=icon]]:group-data-[focus]/option:text-white [&>[data-slot=icon]]:dark:text-zinc-400 [&>[data-slot=icon]]:group-data-[focus]/option:dark:text-white",
            // Avatar
            "[&>[data-slot=avatar]]:-ml-1 [&>[data-slot=avatar]]:mr-2.5 [&>[data-slot=avatar]]:size-6 sm:[&>[data-slot=avatar]]:mr-2 sm:[&>[data-slot=avatar]]:size-5"
          )}
        >
          {children}
        </span>
      </div>
    </Headless.ComboboxOption>
  );
}

export function ComboboxLabel({
  className,
  ...props
}: { className?: string } & Omit<Headless.LabelProps, "className">) {
  return (
    <Headless.Label
      {...props}
      data-slot="label"
      className={clsx(className, "col-start-2 row-start-1")}
    />
  );
}

export function ComboboxDescription({
  className,
  ...props
}: { className?: string } & Omit<Headless.DescriptionProps, "className">) {
  return (
    <Headless.Description
      data-slot="description"
      {...props}
      className={clsx(
        className,
        "col-span-2 col-start-2 row-start-2 text-sm/5 text-zinc-500 group-data-[focus]/option:text-white sm:text-xs/5 dark:text-zinc-400 forced-colors:group-data-[focus]:text-[HighlightText]"
      )}
    />
  );
}

export function ComboboxTag({
  className,
  ...props
}: { className?: string } & Omit<Headless.DescriptionProps, "className">) {
  return (
    <Headless.Description
      {...props}
      className={clsx(
        className,
        "col-start-5 row-start-1 flex justify-self-end",
        "min-w-[2ch] text-center font-sans capitalize text-zinc-400 group-data-[focus]/option:text-white forced-colors:group-data-[focus]/option:text-[HighlightText]"
      )}
    />
  );
}
