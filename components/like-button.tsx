"use client";

import { useLike } from "@/hooks/use-like";
import { Button } from "./ui/button";
import { cn } from "@/lib/utils";
import { Droplets } from "lucide-react";
import { formatCompactNumber } from "@/lib/formatter";
import { useCurrentUser } from "@/hooks/use-current-user";
import { useRouter } from "next/navigation";
import { Tooltip, TooltipContent, TooltipTrigger } from "./ui/tooltip";

interface LikeButtonProps {
  blobId: string;
  userId: string;
}

export function LikeButton({ blobId, userId }: LikeButtonProps) {
  const currentUser = useCurrentUser();
  const router = useRouter();

  const { isLiked, isPending, likes, toggleLike } = useLike(blobId, userId);

  function handleLike() {
    if (!currentUser) return router.push("/auth/login");
    toggleLike();
  }

  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <Button
          variant="ghost"
          size="sm"
          className={cn(
            "flex items-center gap-2 hover:text-blue-500 hover:bg-blue-500/10",
            isLiked && "text-blue-500"
          )}
          onClick={handleLike}
          aria-label={`Gota. ${formatCompactNumber(likes ?? 0)} gotas`}
          disabled={isPending}
        >
          <Droplets className="h-4 w-4" />
          <span className="text-xs">{formatCompactNumber(likes ?? 0)}</span>
        </Button>
      </TooltipTrigger>
      <TooltipContent>
        <p className="text-xs">
          {isLiked ? "Remover gota" : "Dar gota (curtir)"}
        </p>
      </TooltipContent>
    </Tooltip>
  );
}
