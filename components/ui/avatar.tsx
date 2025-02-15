"use client";

import * as React from "react";
import * as AvatarPrimitive from "@radix-ui/react-avatar";

import { cn } from "@/lib/utils";
import { cva, VariantProps } from "class-variance-authority";

const avatarVariants = cva(
  "relative flex shrink-0 overflow-hidden border-muted",
  {
    variants: {
      size: {
        default: "h-10 w-10",
        sm: "h-8 w-8",
        lg: "h-12 w-12",
        xl: "h-16 w-16",
        "2xl": "h-20 w-20",
        "4xl": "h-32 w-32",
      },
      shape: {
        circle: "rounded-full",
        square: "rounded-lg",
      },
      border: {
        none: "",
        thin: "border",
        medium: "border-2",
        thick: "border-4",
      },
    },
    defaultVariants: {
      size: "default",
      shape: "square",
      border: "none",
    },
  }
);

const avatarFallbackVariants = cva(
  "flex h-full w-full items-center justify-center bg-muted",
  {
    variants: {
      size: {
        default: "text-sm p-2",
        sm: "text-xs p-1",
        lg: "text-base p-2",
        xl: "text-lg p-3",
        "2xl": "text-xl p-3",
        "4xl": "text-2xl p-4",
      },
    },
  }
);

type AvatarContextValue = VariantProps<typeof avatarVariants>;
const AvatarContext = React.createContext<AvatarContextValue>({
  size: "default",
});

export interface AvatarProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof avatarVariants> {}

const Avatar = React.forwardRef<
  React.ElementRef<typeof AvatarPrimitive.Root>,
  AvatarProps
>(({ className, size, border, shape, ...props }, ref) => (
  <AvatarContext.Provider value={{ size }}>
    <AvatarPrimitive.Root
      ref={ref}
      className={cn(avatarVariants({ size, border, shape }), className)}
      {...props}
    />
  </AvatarContext.Provider>
));
Avatar.displayName = AvatarPrimitive.Root.displayName;

const AvatarImage = React.forwardRef<
  React.ElementRef<typeof AvatarPrimitive.Image>,
  React.ComponentPropsWithoutRef<typeof AvatarPrimitive.Image>
>(({ className, ...props }, ref) => (
  <AvatarPrimitive.Image
    ref={ref}
    className={cn("aspect-square h-full w-full", className)}
    {...props}
  />
));
AvatarImage.displayName = AvatarPrimitive.Image.displayName;

const AvatarFallback = React.forwardRef<
  React.ElementRef<typeof AvatarPrimitive.Fallback>,
  React.ComponentPropsWithoutRef<typeof AvatarPrimitive.Fallback>
>(({ className, ...props }, ref) => {
  const { size } = React.useContext(AvatarContext);

  return (
    <AvatarPrimitive.Fallback
      ref={ref}
      className={cn(avatarFallbackVariants({ size }), className)}
      {...props}
    />
  );
});
AvatarFallback.displayName = AvatarPrimitive.Fallback.displayName;

export { Avatar, AvatarImage, AvatarFallback };
