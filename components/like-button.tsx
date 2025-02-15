"use client";

import { useLike } from "@/hooks/use-like";
import { Button } from "./ui/button";
import { cn } from "@/lib/utils";
import { Droplets } from "lucide-react";

interface LikeButtonProps {
  blobId: string;
  userId: string;
  initalLikes: number;
}

export function LikeButton({ blobId, userId, initalLikes }: LikeButtonProps) {
  const { isLiked, isPending, toggleLike } = useLike(blobId, userId);

  console.log(isLiked, isPending, toggleLike);

  const likes = initalLikes + (isLiked ? 1 : 0);

  return (
    <Button
      variant="ghost"
      size="sm"
      className={cn(
        "flex items-center gap-2 hover:text-blue-500 hover:bg-blue-500/10",
        isLiked && "text-blue-500"
      )}
      onClick={() => toggleLike()}
      aria-label={`Gota. ${likes} gotas`}
      disabled={isPending}
    >
      <Droplets className="h-4 w-4" />
      <span className="text-xs">{likes}</span>
    </Button>
  );
}
