import type { Post as PrismaPost, User, Interest } from "@prisma/client";

export type PostType = PrismaPost & {
  user: Pick<User, "id" | "name" | "username" | "image">;
  interests: Interest[];
  _count: {
    likes: number;
    reposts: number;
  };
};

export interface PostsResponse {
  posts: PostType[];
  nextCursor?: string;
} 