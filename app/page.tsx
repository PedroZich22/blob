import { MainFeed } from "@/components/main-feed";
import { prisma } from "@/lib/prisma";
import type { PostType } from "@/types/post";

export default async function HomePage() {
  const posts = await prisma.post.findMany({
    take: 20,
    orderBy: {
      createdAt: "desc",
    },
    include: {
      user: {
        select: {
          id: true,
          name: true,
          username: true,
          image: true,
        },
      },
      interests: true,
      _count: {
        select: {
          likes: true,
          reposts: true,
        },
      },
    },
  }) as PostType[];

  return <MainFeed initialPosts={posts} />;
}
