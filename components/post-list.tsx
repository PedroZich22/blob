"use client";

import { PostItem } from "./post-item";
import { Skeleton } from "@/components/ui/skeleton";
import { useQuery } from "@tanstack/react-query";
import { getPosts } from "@/actions/post";
import { useCurrentUser } from "@/hooks/use-current-user";

export function PostFeed() {
  const user = useCurrentUser();
  const userId = user?.id;

  const { data: posts, isPending } = useQuery({
    queryKey: ["post"],
    queryFn: () => getPosts(userId),
    enabled: !!userId,
  });

  if (isPending) {
    return <PostFeedSkeleton />;
  }

  return (
    <div className="space-y-4 divide-y divide-border/40 p-4 pb-16 lg:pb-0">
      {posts?.map((post) => (
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
