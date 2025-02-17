"use client";

import {
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";

import {
  Waves,
  Sparkles,
  MoreHorizontal,
  Bookmark,
  AlertTriangle,
  Copy,
} from "lucide-react";
import { Button } from "./ui/button";
import {
  TooltipProvider,
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "./ui/tooltip";
import { DropdownMenu } from "./ui/dropdown-menu";
import { ExtendedBlob } from "@/types/db";
import { useRouter } from "next/navigation";
import { useCurrentUser } from "@/hooks/use-current-user";
import { LikeButton } from "./like-button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { useCopyToClipboard } from "@/hooks/use-clipboard";
import { useToast } from "@/hooks/use-toast";

interface ActionsBlobProps {
  blob: ExtendedBlob;
}

export function ActionsBlob({ blob }: ActionsBlobProps) {
  const user = useCurrentUser();
  const router = useRouter();
  const { toast } = useToast();
  const [, copy] = useCopyToClipboard();

  function handleAddComment() {
    if (!user?.id) {
      router.push("/auth/login");
      return;
    }

    router.push(`/profile/${blob.userId}/blob/${blob.id}`);
  }

  const blobUrl = `${process.env.NEXT_PUBLIC_APP_URL}/profile/${blob.userId}/blob/${blob.id}`;

  function handleCopyUrlProfile() {
    copy(blobUrl).then(() => {
      toast({
        variant: "success",
        title: "Link copiado com sucesso",
        description: "O link do blob foi copiado com sucesso.",
      });
    });
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

        <LikeButton blobId={blob.id} userId={user?.id!} />

        <Tooltip>
          <Dialog>
            <TooltipTrigger asChild>
              <DialogTrigger asChild>
                <Button
                  variant="ghost"
                  size="sm"
                  className="flex items-center gap-2 hover:text-amber-500 hover:bg-amber-500/10"
                  aria-label="Espalhar bolhas"
                >
                  <Sparkles className="h-4 w-4" />
                </Button>
              </DialogTrigger>
            </TooltipTrigger>
            <DialogContent className="sm:max-w-md">
              <DialogHeader>
                <DialogTitle>Compartilhe o blob</DialogTitle>
                <DialogDescription>
                  Qualquer pessoa com este link poderá ver este blob.
                </DialogDescription>
              </DialogHeader>
              <div className="flex items-center space-x-2">
                <div className="grid flex-1 gap-2">
                  <Label htmlFor="link" className="sr-only">
                    Link
                  </Label>
                  <Input id="link" defaultValue={blobUrl} readOnly />
                </div>
                <DialogClose asChild>
                  <Button type="submit" onClick={handleCopyUrlProfile}>
                    <span className="sr-only">Copy</span>
                    <Copy className="h-4 w-4" />
                  </Button>
                </DialogClose>
              </div>
            </DialogContent>
            <TooltipContent>
              <p className="text-xs">Espalhar bolhas (compartilhar)</p>
            </TooltipContent>
          </Dialog>
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
