"use client";

import { cn } from "@/lib/utils";
import { Button } from "./ui/button";
import { Skeleton } from "./ui/skeleton";
import { ExtendedInterest } from "@/types/db";

interface InterestItemProps {
  interest: Partial<ExtendedInterest>;
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
      className={"data-[selected=true]:bg-primary/50 hover:bg-primary/30"}
      data-selected={selected}
    >
      <span className="truncate">#{interest.name}</span>
      <span className="ml-1.5 text-muted-foreground">
        {interest._count?.posts}
      </span>
    </Button>
  );
}

export function InterestItemSkeleton({
  className,
  ...props
}: React.ComponentProps<typeof Skeleton>) {
  return <Skeleton className={cn("w-20 h-8", className)} {...props} />;
}
