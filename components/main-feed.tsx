"use client";

import { SearchInput } from "@/components/search-input";
import { SiteHeader } from "@/components/site-header";
import { MainLayout } from "./layouts/main-layout";
import { Interests } from "./interests";
import { CreatePost } from "./create-post";
import { PostFeed } from "./post-list";

export function MainFeed() {
  return (
    <MainLayout>
      <main className="flex-1 w-full border-x border-border/40 lg:max-w-6xl">
        <div className="sticky top-0 z-30 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
          <SiteHeader />
          <div className="lg:hidden p-4">
            <SearchInput />
          </div>
        </div>
        <Interests />
        <div>
          <PostFeed posts={[]} />
        </div>
      </main>
    </MainLayout>
  );
}
