import { useEffect } from "react";
import { getBlobs } from "@/actions/blob";
import { useInfiniteQuery } from "@tanstack/react-query";
import { useInView } from "react-intersection-observer";
import { useSearchParams } from "next/navigation";

interface UseInfinitePostsOptions {
  userId?: string;
}

export function useInfinitePosts({ userId }: UseInfinitePostsOptions = {}) {
  const { ref, inView } = useInView();
  const searchParams = useSearchParams();
  const selectedInterests = searchParams.get("interests")?.split(",") || [];

  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    error,
    isLoading,
  } = useInfiniteQuery({
    queryKey: ["posts", userId, selectedInterests],
    queryFn: ({ pageParam }) =>
      getBlobs(userId, pageParam, undefined, selectedInterests),
    initialPageParam: undefined,
    getNextPageParam: (lastPage) => lastPage.nextCursor,
    enabled: !!userId,
  });

  useEffect(() => {
    if (inView && hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [inView, hasNextPage, isFetchingNextPage, fetchNextPage]);

  const posts = data?.pages.flatMap((page) => page.items) ?? [];
  const isEmpty = !isLoading && posts.length === 0;

  return {
    posts,
    isEmpty,
    isLoading,
    isLoadingMore: isFetchingNextPage,
    loadMoreRef: ref,
    error,
  };
}
