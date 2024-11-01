import { cva, type VariantProps } from "class-variance-authority";
import { LucideIcon } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "./ui/button";

const backgroundVariants = cva("rounded-xl flex items-center justify-center", {
  variants: {
    variant: {
      default: "bg-primary-100",
      success: "bg-success-100",
    },
    size: {
      default: "p-2",
      sm: "p-1",
    },
  },
  defaultVariants: {
    variant: "default",
    size: "default",
  },
});

const iconVariants = cva("", {
  variants: {
    variant: {
      default: "text-primary-700",
      success: "text-success-700",
    },
    size: {
      default: "size-4",
      sm: "size-2",
    },
  },
  defaultVariants: {
    variant: "default",
    size: "default",
  },
});

type BackgroundVariantsProps = VariantProps<typeof backgroundVariants>;
type IconVariantsProps = VariantProps<typeof iconVariants>;

interface IconBadgeProps extends BackgroundVariantsProps, IconVariantsProps {
  icon: LucideIcon;
  count: number;
}

export const IconBadge = ({
  icon: Icon,
  variant,
  size,
  count,
}: IconBadgeProps) => {
  return (
    <Button className={cn(backgroundVariants({ variant, size }))}>
      <Icon className={cn(iconVariants({ variant, size }))} />
      <span className="text-xs text-primary-700">{count}</span>
    </Button>
  );
};
