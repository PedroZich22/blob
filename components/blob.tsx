"use client";

import Link from "next/link";

import { UserHoverCard } from "./user-hover-card";
import { Badge } from "./ui/badge";
import { formatDateDistanceToNowWithSuffix } from "@/lib/formatter";
import { useRouter } from "next/navigation";
import { ActionsBlob } from "./blob-actions";
import { ExtendedBlob } from "@/types/db";

interface BlobProps {
  blob: ExtendedBlob;
}

export function Blob({ blob }: BlobProps) {
  const router = useRouter();
  if (!blob) return null;

  function handleBlobClick(e: React.MouseEvent) {
    if (
      (e.target as HTMLElement).closest("button") ||
      (e.target as HTMLElement).closest("a")
    ) {
      return;
    }

    router.push(`/profile/${blob.userId}/blob/${blob.id}`);
  }

  return (
    <article
      className="blob-card p-4 hover:bg-cyan-50/50 dark:hover:bg-cyan-900/20 transition-all duration-300 cursor-pointer"
      onClick={handleBlobClick}
    >
      <div className="flex items-start gap-3">
        {/* Avatar e conteúdo principal */}
        <UserHoverCard user={blob.user} />

        <div className="flex-1 min-w-0">
          {/* Cabeçalho do blob */}
          <div className="flex items-center gap-2 text-sm">
            <Link
              href={"/profile/" + blob.userId}
              className="font-semibold hover:underline cursor-pointer"
            >
              {blob.user.name}
            </Link>
            <span className="text-muted-foreground">@{blob.user.username}</span>
            <span className="text-muted-foreground">·</span>
            <time className="text-muted-foreground hover:underline cursor-pointer">
              {formatDateDistanceToNowWithSuffix(blob.user.createdAt)}
            </time>
          </div>

          {/* Conteúdo do blob */}
          <div className="mt-1 text-sm whitespace-pre-wrap break-words">
            {blob.content}
          </div>

          {/* Categorias do blob */}
          <div className="mt-2 flex flex-wrap gap-1.5">
            {blob.interests?.map((interest) => (
              <Badge key={interest.id}>#{interest.name}</Badge>
            ))}
          </div>

          {/* Ações do blob */}
          <ActionsBlob blob={blob} />
        </div>
      </div>
    </article>
  );
}
