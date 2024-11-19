"use client";

import { Post } from "@prisma/client";
import { PostItem } from "./post-item";
import { Skeleton } from "@/components/ui/skeleton";

interface PostFeedProps {
  posts: Post[];
}

export function PostFeed({ posts }: PostFeedProps) {
  return (
    <div className="space-y-4 divide-y divide-border/40 pb-16 lg:pb-0">
      {posts.map((post) => (
        <PostItem key={post.id} post={post} />
      ))}
    </div>
  );
}

function PostFeedSkeleton() {
  return (
    <div className="space-y-4">
      {Array.from({ length: 3 }).map((_, i) => (
        <div key={i} className="p-4 space-y-3">
          <Skeleton className="h-12 w-12 rounded-full" />
          <Skeleton className="h-4 w-3/4" />
          <Skeleton className="h-4 w-1/2" />
        </div>
      ))}
    </div>
  );
}
