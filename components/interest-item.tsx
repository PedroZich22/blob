"use client";

import { cn } from "@/lib/utils";
import { Button } from "./ui/button";
import { formatCompactNumber } from "@/utils/formatter";

interface InterestItemProps {
  interest: any;
  selected: boolean;
  onChange: () => void;
}

export function InterestItem({
  interest,
  onChange,
  selected,
}: InterestItemProps) {
  return (
    <Button
      onChange={onChange}
      variant="outline"
      className={cn(selected, "bg-primary/50")}
    >
      <span>#{interest.name}</span>
      <span className="ml-1.5 text-muted-foreground">
        {formatCompactNumber(interest.count)}
      </span>
    </Button>
  );
}
