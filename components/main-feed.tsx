"use client";

import { Categories } from "@/components/categories";
import { PostList } from "@/components/post-list";
import { SearchInput } from "@/components/search-input";
import { SiteHeader } from "@/components/site-header";
import { TrendingTopics } from "@/components/trending-topics";
import { UserSuggestions } from "@/components/user-suggestions";
import { MainLayout } from "./layouts/main-layout";
import type { PostType } from "@/types/post";

interface MainFeedProps {
  initialPosts: PostType[];
}

export function MainFeed({ initialPosts }: MainFeedProps) {
  return (
    <MainLayout
      rightSidebar={
        <>
          <SearchInput />
          <div className="rounded-xl bg-card p-4 shadow-sm">
            <h2 className="font-semibold mb-3">Tópicos em alta</h2>
            <TrendingTopics />
          </div>
          <div className="rounded-xl bg-card p-4 shadow-sm">
            <h2 className="font-semibold mb-3">Quem seguir</h2>
            <UserSuggestions />
          </div>
        </>
      }
    >
      <main className="flex-1 w-full border-x border-border/40 lg:max-w-5xl">
        <div className="sticky top-0 z-30 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
          <SiteHeader />
          <div className="lg:hidden p-4">
            <SearchInput />
          </div>
        </div>
        <Categories />
        <div className="px-4">
          <PostList initialPosts={initialPosts} />
        </div>
      </main>
    </MainLayout>
  );
}
