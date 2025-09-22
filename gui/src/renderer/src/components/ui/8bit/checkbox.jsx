import * as React from "react";

import { cva } from "class-variance-authority";

import { cn } from "@/lib/utils";

import { Checkbox as ShadcnCheckbox } from "@/components/ui/checkbox";

import "./styles/retro.css";

export const checkboxVariants = cva("", {
  variants: {
    font: {
      normal: "",
      retro: "retro",
    },
  },
  defaultVariants: {
    font: "retro",
  },
});

function Checkbox({
  className,
  font,
  ...props
}) {
  return (
    <div
      className={cn(
        "relative flex items-center justify-center border-y-6 border-foreground dark:border-ring",
        className
      )}>
      <ShadcnCheckbox
        className={cn(
          "rounded-none size-5 ring-0 border-none",
          font !== "normal" && "retro",
          className
        )}
        {...props} />
      <div
        className="absolute inset-0 border-x-6 -mx-1.5 border-foreground dark:border-ring pointer-events-none"
        aria-hidden="true" />
    </div>
  );
}

export { Checkbox };
