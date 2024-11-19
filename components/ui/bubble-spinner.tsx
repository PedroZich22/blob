import { cn } from "@/lib/utils";
import { cva } from "class-variance-authority";

const spinnerVariants = cva("relative flex items-center", {
  variants: {
    size: {
      sm: "h-4 gap-0.5",
      md: "h-6 gap-1",
      lg: "h-8 gap-1.5",
    },
    variant: {
      default: "text-current",
      primary: "text-primary",
      secondary: "text-secondary",
      accent: "text-accent",
    },
  },
  defaultVariants: {
    size: "md",
    variant: "default",
  },
});

const bubbleVariants = cva("rounded-full bg-current", {
  variants: {
    size: {
      sm: "h-1 w-1",
      md: "h-1.5 w-1.5",
      lg: "h-2 w-2",
    },
  },
  defaultVariants: {
    size: "md",
  },
});

interface SpinnerProps {
  className?: string;
  size?: "sm" | "md" | "lg";
  variant?: "default" | "primary" | "secondary" | "accent";
}

export function BubbleSpinner({ className, size, variant }: SpinnerProps) {
  return (
    <div className={cn(spinnerVariants({ size, variant, className }))}>
      <div
        className={cn(
          bubbleVariants({ size }),
          "animate-bubble-bounce [animation-delay:-0.3s] opacity-60"
        )}
      />
      <div
        className={cn(
          bubbleVariants({ size }),
          "animate-bubble-bounce [animation-delay:-0.15s] opacity-80"
        )}
      />
      <div
        className={cn(
          bubbleVariants({ size }),
          "animate-bubble-bounce opacity-100"
        )}
      />
    </div>
  );
}
