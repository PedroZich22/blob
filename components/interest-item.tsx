"use client";

import { cn } from "@/lib/utils";
import { Button } from "./ui/button";
import { formatCompactNumber } from "@/lib/formatter";
import { Skeleton } from "./ui/skeleton";

interface InterestItemProps {
  interest: any;
  selected: boolean;
  onClick: () => void;
}

export function InterestItem({
  interest,
  onClick,
  selected,
}: InterestItemProps) {
  return (
    <Button
      onClick={onClick}
      variant="outline"
      type="button"
      className={cn(selected && "bg-primary/50 hover:bg-primary/30")}
    >
      <span>#{interest.name}</span>
      {interest.count && (
        <span className="ml-1.5 text-muted-foreground">
          {formatCompactNumber(interest.count)}
        </span>
      )}
    </Button>
  );
}

export function InterestItemSkeleton({
  className,
  ...props
}: React.ComponentProps<typeof Skeleton>) {
  return <Skeleton className={cn("w-20 h-8", className)} {...props} />;
}
