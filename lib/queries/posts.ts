import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import type { PostType, PostsResponse } from "@/types/post";

export function usePostsQuery(options?: {
  initialData?: PostsResponse;
  take?: number;
  cursor?: string;
  userId?: string;
}) {
  return useQuery<PostsResponse>({
    queryKey: ["posts", options],
    queryFn: async () => {
      const response = await fetch("/api/posts?" + new URLSearchParams({
        take: String(options?.take || 20),
        ...(options?.cursor && { cursor: options.cursor }),
        ...(options?.userId && { userId: options.userId }),
      }));
      
      if (!response.ok) throw new Error("Erro ao carregar posts");
      return response.json();
    },
    initialData: options?.initialData,
  });
}

export function useLikePostMutation() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async (postId: string) => {
      const response = await fetch(`/api/posts/${postId}/like`, {
        method: "POST",
      });
      if (!response.ok) throw new Error("Erro ao curtir post");
      return response.json();
    },
    onMutate: async (postId) => {
      // Atualização otimista
      await queryClient.cancelQueries({ queryKey: ["posts"] });
      const previousPosts = queryClient.getQueryData<PostsResponse>(["posts"]);

      queryClient.setQueryData<PostsResponse>(["posts"], (old) => {
        if (!old) return { posts: [] };
        return {
          ...old,
          posts: old.posts.map((post) => {
            if (post.id === postId) {
              return {
                ...post,
                _count: {
                  ...post._count,
                  likes: post._count.likes + 1,
                },
              };
            }
            return post;
          }),
        };
      });

      return { previousPosts };
    },
    onError: (_, __, context) => {
      if (context?.previousPosts) {
        queryClient.setQueryData(["posts"], context.previousPosts);
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["posts"] });
    },
  });
}

export function useRepostPostMutation() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async (postId: string) => {
      const response = await fetch(`/api/posts/${postId}/repost`, {
        method: "POST",
      });
      if (!response.ok) throw new Error("Erro ao repostar");
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["posts"] });
    },
  });
}

export function useCreatePostMutation() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async (data: { content: string; interests?: string[] }) => {
      const response = await fetch("/api/posts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!response.ok) throw new Error("Erro ao criar post");
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["posts"] });
    },
  });
} 