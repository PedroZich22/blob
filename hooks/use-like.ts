"use client";

import { getLikesCount, getLikeStatus, toggleLike } from "@/actions/like";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export function useLike(blobId: string, userId: string) {
  const queryClient = useQueryClient();

  const { data: isLiked } = useQuery({
    queryKey: ["likes", blobId, userId],
    queryFn: () => getLikeStatus(blobId, userId),
  });

  const { data: likes } = useQuery({
    queryKey: ["likes", blobId],
    queryFn: () => getLikesCount(blobId),
  });

  const mutation = useMutation({
    mutationFn: () => toggleLike(blobId, userId),
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["likes", blobId, userId] });
      queryClient.invalidateQueries({ queryKey: ["likes", blobId] });
    },
  });

  return {
    isLiked,
    likes,
    toggleLike: mutation.mutate,
    isPending: mutation.isPending,
  };
}
