"use client";

import { MainLayout } from "./layouts/main-layout";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Button } from "./ui/button";
import { CalendarDays } from "lucide-react";
import { PostFeed } from "./post-list";
import { useCurrentUser } from "@/hooks/use-current-user";
import { formatDateDistanceToNowWithSuffix } from "@/lib/formatter";

export function UserProfile() {
  const user = useCurrentUser();
  return (
    <MainLayout>
      <main className="flex-1 w-full border-x border-border/40 lg:max-w-5xl">
        {/* Cover Image */}
        <div className="relative h-48 lg:h-64 bg-muted"></div>

        {/* Profile Info */}
        <div className="px-4 pb-4 -mt-20">
          <div className="flex justify-between items-start mb-4">
            <Avatar className="h-32 w-32 rounded-full border-4 border-background">
              <AvatarImage src={user?.image ?? undefined} />
              <AvatarFallback>{user?.name}</AvatarFallback>
            </Avatar>
            <Button className="mt-24">Seguir</Button>
          </div>

          <div className="space-y-4">
            <div>
              <h1 className="text-2xl font-bold flex items-center gap-2">
                {user?.name}
              </h1>
              <p className="text-muted-foreground">{user?.username}</p>
            </div>

            <p className="text-sm">{user?.bio}</p>

            <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
              <div className="flex items-center gap-1">
                <CalendarDays className="h-4 w-4" />
                <span>
                  Entrou{" "}
                  {formatDateDistanceToNowWithSuffix(
                    user?.createdAt ?? new Date()
                  )}
                </span>
              </div>
            </div>

            <div className="flex gap-4 text-sm">
              <span>
                <strong>{user?.followingCount}</strong>{" "}
                <span className="text-muted-foreground">Seguindo</span>
              </span>
              <span>
                <strong>{user?.followersCount}</strong>{" "}
                <span className="text-muted-foreground">Seguidores</span>
              </span>
            </div>
          </div>
        </div>

        <div className="p-4 border-t border-border/40">
          <PostFeed posts={user?.posts ?? []} />
        </div>
      </main>
    </MainLayout>
  );
}
