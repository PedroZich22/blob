import { ExtendedComment } from "@/types/db";
import { formatDateDistanceToNowWithSuffix } from "@/lib/formatter";
import { UserHoverCard } from "./user-hover-card";

interface CommentProps {
  comment: ExtendedComment;
}

export function Comment({ comment }: CommentProps) {
  return (
    <div
      key={comment.id}
      className="blob-card p-4 hover:bg-cyan-50/50 dark:hover:bg-cyan-900/20 transition-all duration-300"
    >
      <div className="flex items-start gap-3">
        <UserHoverCard user={comment.user} />
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 text-sm">
            <span className="font-semibold">{comment.user.name}</span>
            <span className="text-muted-foreground">
              @{comment.user.username}
            </span>
            <span className="text-muted-foreground">·</span>
            <time className="text-muted-foreground">
              {formatDateDistanceToNowWithSuffix(comment.createdAt)}
            </time>
          </div>
          <div className="mt-1 text-sm whitespace-pre-wrap break-words">
            {comment.content}
          </div>
        </div>
      </div>
    </div>
  );
}
