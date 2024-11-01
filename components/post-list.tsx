"use client";

import { usePostsQuery } from "@/lib/queries/posts";
import { Post } from "./post";
import type { PostType } from "@/types/post";
import { Skeleton } from "@/components/ui/skeleton";

interface PostListProps {
  initialPosts: PostType[];
}

export function PostList({ initialPosts }: PostListProps) {
  const { data, isLoading } = usePostsQuery({
    initialData: { posts: initialPosts },
  });

  if (isLoading && !initialPosts.length) {
    return <PostListSkeleton />;
  }

  return (
    <div className="space-y-4 divide-y divide-border/40 pb-16 lg:pb-0">
      {data?.posts.map((post) => (
        <Post key={post.id} post={post} />
      ))}
    </div>
  );
}

function PostListSkeleton() {
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
