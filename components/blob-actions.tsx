"use client";

import {
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";

import { Tooltip, TooltipContent, TooltipTrigger } from "./ui/tooltip";

import { cn } from "@/lib/utils";

import {
  Waves,
  Droplets,
  Sparkles,
  MoreHorizontal,
  Bookmark,
  AlertTriangle,
} from "lucide-react";
import { Button } from "./ui/button";
import { TooltipProvider } from "./ui/tooltip";
import { DropdownMenu } from "./ui/dropdown-menu";
import { ExtendedBlob } from "@/types/db";
import { useRouter } from "next/navigation";
import { useCurrentUser } from "@/hooks/use-current-user";
import { LikeButton } from "./like-button";

interface ActionsBlobProps {
  blob: ExtendedBlob;
}

export function ActionsBlob({ blob }: ActionsBlobProps) {
  const user = useCurrentUser();
  const router = useRouter();

  function handleAddComment() {
    if (!user?.id) {
      router.push("/auth/login");
      return;
    }

    router.push(`/profile/${blob.userId}/blob/${blob.id}?focus=comment`);
  }

  return (
    <div className="mt-3 flex items-center gap-2 text-muted-foreground">
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant="ghost"
              size="sm"
              className="flex items-center gap-2 hover:text-cyan-600 hover:bg-cyan-100/50
                      dark:hover:text-cyan-400 dark:hover:bg-cyan-900/50"
              aria-label={`Fazer onda. ${blob._count.comments} ondas`}
              onClick={handleAddComment}
            >
              <Waves className="h-4 w-4" />
              <span className="text-xs">{blob._count.comments}</span>
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <p className="text-xs">Fazer onda (comentar)</p>
          </TooltipContent>
        </Tooltip>

        <Tooltip>
          <TooltipTrigger asChild>
            <LikeButton
              blobId={blob.id}
              userId={user?.id!}
              initalLikes={blob._count.likes}
            />
          </TooltipTrigger>
          <TooltipContent>
            <p className="text-xs">
              {blob.isLiked ? "Remover gota" : "Dar gota (curtir)"}
            </p>
          </TooltipContent>
        </Tooltip>

        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant="ghost"
              size="sm"
              className="flex items-center gap-2 hover:text-amber-500 hover:bg-amber-500/10"
              aria-label="Espalhar bolhas"
            >
              <Sparkles className="h-4 w-4" />
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <p className="text-xs">Espalhar bolhas (compartilhar)</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>

      <DropdownMenu>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8 ml-auto"
                  aria-label="Mais bolhas"
                >
                  <MoreHorizontal className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
            </TooltipTrigger>
            <TooltipContent>
              <p className="text-xs">Mais bolhas</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
        <DropdownMenuContent align="end">
          <DropdownMenuItem>
            <Bookmark className="mr-2 h-4 w-4" />
            Guardar na bolha
          </DropdownMenuItem>
          <DropdownMenuItem className="text-destructive">
            <AlertTriangle className="mr-2 h-4 w-4" />
            Estourar bolha
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
