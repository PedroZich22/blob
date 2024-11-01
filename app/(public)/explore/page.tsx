import { prisma } from "@/lib/prisma";
import { ExploreView } from "@/components/explore/explore-view";

export default async function ExplorePage() {
  // Busca posts recentes e interests populares
  const recentPosts = await prisma.post.findMany({
    take: 20,
    orderBy: {
      createdAt: 'desc'
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
  });

  const popularInterests = await prisma.interest.findMany({
    take: 10,
    orderBy: {
      posts: {
        _count: 'desc'
      },
    },
  });

  return (
    <ExploreView 
      recentPosts={recentPosts} 
      popularInterests={popularInterests} 
    />
  );
} 