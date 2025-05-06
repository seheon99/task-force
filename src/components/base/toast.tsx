"use client";

import {
  CheckCircleIcon,
  ExclamationTriangleIcon,
  InformationCircleIcon,
  XCircleIcon,
} from "@heroicons/react/16/solid";
import clsx from "clsx";
import { isPlainObject, isPrimitive, isSymbol } from "es-toolkit";
import React from "react";
import { toast as sonnerToast } from "sonner";

interface ToastProps {
  id: string | number;
  title: string;
  description?: string | unknown;
  level: "info" | "warn" | "success" | "error";
  button?: {
    label: string;
    onClick: () => void;
  };
}

export function toast(props: Omit<ToastProps, "id">) {
  return sonnerToast.custom((id) => <Toast id={id} {...props} />);
}

toast.info = (props: Omit<ToastProps, "id" | "level">) =>
  toast({ ...props, level: "info" });
toast.warn = (props: Omit<ToastProps, "id" | "level">) =>
  toast({ ...props, level: "warn" });
toast.success = (props: Omit<ToastProps, "id" | "level">) =>
  toast({ ...props, level: "success" });
toast.error = (props: Omit<ToastProps, "id" | "level">) =>
  toast({ ...props, level: "error" });

function Toast({ id, title, description, level }: ToastProps) {
  return (
    <div
      id={id.toString()}
      className={clsx(
        "rounded-md p-4",
        level === "info" && "bg-blue-50",
        level === "warn" && "bg-yellow-50",
        level === "success" && "bg-green-50",
        level === "error" && "bg-red-50",
      )}
    >
      <div className="flex">
        <div className="shrink-0">
          {level === "info" && (
            <InformationCircleIcon
              aria-hidden="true"
              className="size-5 text-blue-400"
            />
          )}
          {level === "warn" && (
            <ExclamationTriangleIcon
              aria-hidden="true"
              className="size-5 text-yellow-400"
            />
          )}
          {level === "success" && (
            <CheckCircleIcon
              aria-hidden="true"
              className="size-5 text-green-400"
            />
          )}
          {level === "error" && (
            <XCircleIcon aria-hidden="true" className="size-5 text-red-400" />
          )}
        </div>
        <div className="ml-3">
          <h3
            className={clsx(
              "text-sm font-medium",
              level === "info" && "text-blue-800",
              level === "warn" && "text-yellow-800",
              level === "success" && "text-green-800",
              level === "error" && "text-red-800",
            )}
          >
            {title}
          </h3>
          <div
            className={clsx(
              "mt-2 text-sm",
              level === "info" && "text-blue-700",
              level === "warn" && "text-yellow-700",
              level === "success" && "text-green-700",
              level === "error" && "text-red-700",
            )}
          >
            <p>
              {isPrimitive(description) && !isSymbol(description)
                ? description
                : isPlainObject(description) && "message" in description
                  ? (description.message as string)
                  : `${description}`}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
