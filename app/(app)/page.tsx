"use client";

import { Interests } from "@/components/interests";
import { PostFeed } from "@/components/post-list";

export default function HomePage() {
  return (
    <div>
      <Interests />
      <PostFeed />
    </div>
  );
}
