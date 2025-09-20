import { forwardRef } from "react";

import * as AvatarPrimitive from "@radix-ui/react-avatar";
import { cva } from "class-variance-authority";

import { cn } from "@/lib/utils";

import "./styles/retro.css";

export const avatarVariants = cva("", {
  variants: {
    font: {
      normal: "",
      retro: "retro",
    },
    variant: {
      default: "",
      retro: "",
      pixel: "",
    },
  },
  defaultVariants: {
    font: "retro",
    variant: "pixel",
  },
});

const Avatar = forwardRef(({ className = "", font, variant = "pixel", ...props }, ref) => {
  const isPixel = variant === "pixel";

  return (
    <div className={cn("relative size-max", className)}>
      {/* Pixel frame (only show if pixel variant) */}
      {isPixel && (
        <div
          className="absolute inset-0 w-full h-full pointer-events-none"
          style={{ zIndex: 10 }}>
          {/* Top black border */}
          <div
            className="absolute top-0 left-[25%] right-[25%] h-[6.25%] bg-foreground dark:bg-ring"></div>

          {/* Second row */}
          <div
            className="absolute top-[6.25%] left-[18.75%] right-[18.75%] h-[6.25%] bg-foreground dark:bg-ring"></div>

          {/* Third row */}
          <div
            className="absolute top-[12.5%] left-[12.5%] h-[6.25%] bg-foreground dark:bg-ring w-[18.75%]"></div>
          <div
            className="absolute top-[12.5%] right-[12.5%] h-[6.25%] bg-foreground dark:bg-ring w-[18.75%]"></div>

          {/* Fourth row */}
          <div
            className="absolute top-[18.75%] left-[6.25%] w-[18.75%] h-[6.25%] bg-foreground dark:bg-ring"></div>
          <div
            className="absolute top-[18.75%] right-[6.25%] w-[18.75%] h-[6.25%] bg-foreground dark:bg-ring"></div>

          {/* Fifth row */}
          <div
            className="absolute top-[25%] left-0 w-[18.75%] h-[6.25%] bg-foreground dark:bg-ring"></div>
          <div
            className="absolute top-[25%] right-0 w-[18.75%] h-[6.25%] bg-foreground dark:bg-ring"></div>

          {/* Rows 6-7 */}
          <div
            className="absolute top-[31.25%] left-0 w-[12.5%] h-[12.5%] bg-foreground dark:bg-ring"></div>
          <div
            className="absolute top-[31.25%] right-0 w-[12.5%] h-[12.5%] bg-foreground dark:bg-ring"></div>

          {/* Rows 8-10 */}
          <div
            className="absolute top-[43.75%] left-0 w-[12.5%] h-[18.75%] bg-foreground dark:bg-ring"></div>
          <div
            className="absolute top-[43.75%] right-0 w-[12.5%] h-[18.75%] bg-foreground dark:bg-ring"></div>

          {/* Rows 11-12 */}
          <div
            className="absolute top-[62.5%] left-0 w-[12.5%] h-[12.5%] bg-foreground dark:bg-ring"></div>
          <div
            className="absolute top-[62.5%] right-0 w-[12.5%] h-[12.5%] bg-foreground dark:bg-ring"></div>

          {/* Row 13 */}
          <div
            className="absolute top-[75%] left-0 w-[18.75%] h-[6.25%] bg-foreground dark:bg-ring"></div>
          <div
            className="absolute top-[75%] right-0 w-[18.75%] h-[6.25%] bg-foreground dark:bg-ring"></div>

          {/* Row 14 */}
          <div
            className="absolute top-[81.25%] left-[6.25%] w-[18.75%] h-[6.25%] bg-foreground dark:bg-ring"></div>
          <div
            className="absolute top-[81.25%] right-[6.25%] w-[18.75%] h-[6.25%] bg-foreground dark:bg-ring"></div>

          {/* Row 15 */}
          <div
            className="absolute top-[87.5%] left-[12.5%] right-[12.5%] h-[6.25%] bg-foreground dark:bg-ring"></div>

          {/* Row 16 */}
          <div
            className="absolute top-[93.75%] left-[18.75%] right-[18.75%] h-[6.25%] bg-foreground dark:bg-ring"></div>

          {/* Bottom row */}
          <div
            className="absolute bottom-0 left-[25%] right-[25%] h-[6.25%] bg-foreground dark:bg-ring"></div>
        </div>
      )}
      <AvatarPrimitive.Root
        ref={ref}
        data-slot="avatar"
        className={cn(
          "relative flex size-10 shrink-0 overflow-hidden text-xs",
          !isPixel && "rounded-none",
          isPixel && "rounded-full",
          font !== "normal" && "retro",
          variant === "retro" && "image-rendering-pixelated",
          className
        )}
        {...props} />
      {/* Original border styling (only show if not pixel variant) */}
      {!isPixel && (
        <>
          <div
            className="absolute top-0 left-0 w-full h-1.5 bg-foreground dark:bg-ring pointer-events-none" />
          <div
            className="absolute bottom-0 w-full h-1.5 bg-foreground dark:bg-ring pointer-events-none" />
          <div
            className="absolute top-1.5 -left-1.5 w-1.5 h-1/2 bg-foreground dark:bg-ring pointer-events-none" />
          <div
            className="absolute bottom-1.5 -left-1.5 w-1.5 h-1/2 bg-foreground dark:bg-ring pointer-events-none" />
          <div
            className="absolute top-1.5 -right-1.5 w-1.5 h-1/2 bg-foreground dark:bg-ring pointer-events-none" />
          <div
            className="absolute bottom-1.5 -right-1.5 w-1.5 h-1/2 bg-foreground dark:bg-ring pointer-events-none" />
        </>
      )}
    </div>
  );
});
Avatar.displayName = AvatarPrimitive.Root.displayName;

const AvatarImage = forwardRef(({ className, font, ...props }, ref) => {
  return (
    <AvatarPrimitive.Image
      ref={ref}
      data-slot="avatar-image"
      className={cn("aspect-square h-full w-full", font === "retro" && "retro", className)}
      {...props} />
  );
});
AvatarImage.displayName = AvatarPrimitive.Image.displayName;

const AvatarFallback = forwardRef(({ className, ...props }, ref) => (
  <AvatarPrimitive.Fallback
    ref={ref}
    data-slot="avatar-fallback"
    className={cn(
      "flex h-full w-full items-center justify-center rounded-full bg-muted text-foreground",
      className
    )}
    {...props} />
));
AvatarFallback.displayName = AvatarPrimitive.Fallback.displayName;

export { Avatar, AvatarImage, AvatarFallback };
