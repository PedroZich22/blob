"use client";

import type { PostType } from "@/types/post";
import { UserHoverCard } from "./user-hover-card";
import { formatDistanceToNow } from "date-fns";
import { ptBR } from "date-fns/locale";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@radix-ui/react-tooltip";
import { CategoryItem } from "./category-item";
import { TooltipProvider } from "@radix-ui/react-tooltip";
import { Button } from "./ui/button";
import {
  AlertTriangle,
  Bookmark,
  Droplets,
  MoreHorizontal,
  Orbit,
  Sparkles,
  Waves,
} from "lucide-react";
import { cn } from "@/lib/utils";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@radix-ui/react-dropdown-menu";

interface PostProps {
  post: PostType;
}

export function Post({ post }: PostProps) {
  const user = post.user;

  return (
    <article className="blob-card p-4 hover:bg-cyan-50/50 dark:hover:bg-cyan-900/20 transition-all duration-300">
      <div className="flex items-start gap-3">
        {/* Avatar e conteúdo principal */}
        <UserHoverCard user={user} />

        <div className="flex-1 min-w-0">
          {/* Cabeçalho do post */}
          <div className="flex items-center gap-2 text-sm">
            <span className="font-semibold hover:underline cursor-pointer">
              {user.name}
            </span>
            <span className="text-muted-foreground">{user.username}</span>
            <span className="text-muted-foreground">·</span>
            <time className="text-muted-foreground hover:underline cursor-pointer">
              {formatDistanceToNow(post.createdAt, {
                addSuffix: true,
                locale: ptBR,
              })}
            </time>
          </div>

          {/* Conteúdo do post */}
          <div className="mt-1 text-sm whitespace-pre-wrap break-words">
            {post.content}
          </div>

          {/* Categorias do post */}
          <div className="mt-2 flex flex-wrap gap-1.5">
            {post.categories.map((category) => (
              <CategoryItem
                key={category.id}
                category={{
                  id: label,
                  name: label,
                  count: 0,
                }}
                variant="label"
              />
            ))}
          </div>

          {/* Ações do post */}
          <div className="mt-3 flex items-center gap-2 text-muted-foreground">
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="flex items-center gap-2 hover:text-cyan-600 hover:bg-cyan-100/50
                              dark:hover:text-cyan-400 dark:hover:bg-cyan-900/50"
                    aria-label={`Fazer onda. ${post.commentsCount} ondas`}
                  >
                    <Waves className="h-4 w-4" />
                    <span className="text-xs">{post.commentsCount}</span>
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Fazer onda (comentar)</p>
                </TooltipContent>
              </Tooltip>

              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant="ghost"
                    size="sm"
                    className={cn(
                      "flex items-center gap-2 hover:text-violet-500 hover:bg-violet-500/10",
                      isReposted && "text-violet-500"
                    )}
                    aria-label={`Orbitar. ${post.repostIds.length} órbitas`}
                    aria-pressed={isReposted}
                  >
                    <Orbit className="h-4 w-4" />
                    <span className="text-xs">{post.repostIds.length}</span>
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>{isReposted ? "Desfazer órbita" : "Orbitar (repostar)"}</p>
                </TooltipContent>
              </Tooltip>

              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant="ghost"
                    size="sm"
                    className={cn(
                      "flex items-center gap-2 hover:text-blue-500 hover:bg-blue-500/10",
                      isLiked && "text-blue-500"
                    )}
                    aria-label={`Gota. ${post.likedIds.length} gotas`}
                    aria-pressed={isLiked}
                  >
                    <Droplets className="h-4 w-4" />
                    <span className="text-xs">{post.likedIds.length}</span>
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>{isLiked ? "Remover gota" : "Dar gota (curtir)"}</p>
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
                  <p>Espalhar bolhas (compartilhar)</p>
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
                    <p>Mais bolhas</p>
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
        </div>
      </div>
    </article>
  );
}
