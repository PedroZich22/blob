import { getLikeStatus, toggleLike } from "@/actions/like";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export function useLike(postId: string, userId: string) {
  const queryClient = useQueryClient();

  const { data: isLiked } = useQuery({
    queryKey: ["likes", postId, userId],
    queryFn: () => getLikeStatus(postId, userId).then(Boolean),
  });

  const mutation = useMutation({
    mutationFn: () => toggleLike(postId, userId),
    onMutate: async () => {
      await queryClient.cancelQueries({ queryKey: ["likes", postId] });

      const previousStatus = queryClient.getQueryData([
        "likes",
        postId,
        userId,
      ]);
      queryClient.setQueryData(["likes", postId, userId], !previousStatus);

      return { previousStatus };
    },
    onError: (err, variables, context) => {
      queryClient.setQueryData(
        ["likes", postId, userId],
        context?.previousStatus
      );
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["likes", postId] });
    },
  });

  return {
    isLiked,
    toggleLike: mutation.mutate,
    isPending: mutation.isPending,
  };
}
