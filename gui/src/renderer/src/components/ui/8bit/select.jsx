import { cva } from "class-variance-authority";

import { cn } from "@/lib/utils";

import {
  Select as ShadcnSelect,
  SelectContent as ShadcnSelectContent,
  SelectGroup as ShadcnSelectGroup,
  SelectItem as ShadcnSelectItem,
  SelectLabel as ShadcnSelectLabel,
  SelectScrollDownButton as ShadcnSelectScrollDownButton,
  SelectScrollUpButton as ShadcnSelectScrollUpButton,
  SelectSeparator as ShadcnSelectSeparator,
  SelectTrigger as ShadcnSelectTrigger,
  SelectValue as ShadcnSelectValue,
} from "@/components/ui/select";

import "./styles/retro.css";

export const inputVariants = cva("", {
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

function Select({
  ...props
}) {
  return <ShadcnSelect {...props} />;
}

function SelectGroup({
  ...props
}) {
  return <ShadcnSelectGroup {...props} />;
}

function SelectValue({
  ...props
}) {
  const { font } = props;

  return (<ShadcnSelectValue className={cn(font !== "normal" && "retro")} {...props} />);
}

function SelectTrigger({
  children,
  ...props
}) {
  const { className, font } = props;

  return (
    <div
      className={cn(
        "relative border-y-6 border-foreground dark:border-ring",
        className,
        font !== "normal" && "retro"
      )}>
      <ShadcnSelectTrigger
        {...props}
        className={cn("rounded-none ring-0 w-full border-0", className)}>
        {children}
      </ShadcnSelectTrigger>
      <div
        className="absolute inset-0 border-x-6 -mx-1.5 border-foreground dark:border-ring pointer-events-none"
        aria-hidden="true" />
    </div>
  );
}

function SelectContent({
  className,
  children,
  ...props
}) {
  const { font } = props;

  return (
    <ShadcnSelectContent
      className={cn(
        font !== "normal" && "retro",
        className,
        "relative rounded-none border-4 border-foreground dark:border-ring -ml-1 mt-1"
      )}
      {...props}>
      {children}
    </ShadcnSelectContent>
  );
}

function SelectLabel({
  className,
  ...props
}) {
  return <ShadcnSelectLabel className={cn(className)} {...props} />;
}

function SelectItem({
  className,
  children,
  ...props
}) {
  return (
    <ShadcnSelectItem
      className={cn(
        className,
        "rounded-none border-y-3 border-dashed border-ring/0 hover:border-foreground dark:hover:border-ring"
      )}
      {...props}>
      {children}
    </ShadcnSelectItem>
  );
}

function SelectSeparator({
  className,
  ...props
}) {
  return <ShadcnSelectSeparator className={cn(className)} {...props} />;
}

function SelectScrollUpButton({
  className,
  ...props
}) {
  return <ShadcnSelectScrollUpButton className={cn(className)} {...props} />;
}

function SelectScrollDownButton({
  className,
  ...props
}) {
  return <ShadcnSelectScrollDownButton className={cn(className)} {...props} />;
}

export {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectScrollDownButton,
  SelectScrollUpButton,
  SelectSeparator,
  SelectTrigger,
  SelectValue,
};
