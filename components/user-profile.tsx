"use client";

import { MainLayout } from "./layouts/main-layout";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Button } from "./ui/button";
import { formatDistanceToNow } from "date-fns";
import { ptBR } from "date-fns/locale";
import { CalendarDays, MapPin, Link as LinkIcon } from "lucide-react";
import { PostList } from "./post-list";
import Image from "next/image";

interface UserProfileProps {
  user: {
    id: string;
    name: string;
    username: string;
    avatar: string;
    bio: string;
    followersCount: number;
    followingCount: number;
    isVerified: boolean;
    createdAt: Date;
    coverImage?: string;
    location?: string;
    website?: string;
  };
}

export function UserProfile({ user }: UserProfileProps) {
  return (
    <MainLayout>
      <main className="flex-1 w-full border-x border-border/40 lg:max-w-5xl">
        {/* Cover Image */}
        <div className="relative h-48 lg:h-64 bg-muted">
          {user.coverImage && (
            <Image src={user.coverImage} alt="" fill className="object-cover" />
          )}
        </div>

        {/* Profile Info */}
        <div className="px-4 pb-4 -mt-20">
          <div className="flex justify-between items-start mb-4">
            <Avatar className="h-32 w-32 rounded-full border-4 border-background">
              <AvatarImage src={user.avatar} />
              <AvatarFallback>
                {user.name.substring(0, 2).toUpperCase()}
              </AvatarFallback>
            </Avatar>
            <Button className="mt-24">Seguir</Button>
          </div>

          <div className="space-y-4">
            <div>
              <h1 className="text-2xl font-bold flex items-center gap-2">
                {user.name}
                {user.isVerified && (
                  <span className="inline-flex items-center rounded-md bg-blue-50 px-2 py-1 text-xs font-medium text-blue-700 ring-1 ring-inset ring-blue-700/10">
                    Verificado
                  </span>
                )}
              </h1>
              <p className="text-muted-foreground">{user.username}</p>
            </div>

            <p className="text-sm">{user.bio}</p>

            <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
              {user.location && (
                <div className="flex items-center gap-1">
                  <MapPin className="h-4 w-4" />
                  <span>{user.location}</span>
                </div>
              )}
              {user.website && (
                <div className="flex items-center gap-1">
                  <LinkIcon className="h-4 w-4" />
                  <a
                    href={user.website}
                    className="text-primary hover:underline"
                  >
                    {user.website.replace(/^https?:\/\//, "")}
                  </a>
                </div>
              )}
              <div className="flex items-center gap-1">
                <CalendarDays className="h-4 w-4" />
                <span>
                  Entrou{" "}
                  {formatDistanceToNow(user.createdAt, {
                    locale: ptBR,
                    addSuffix: true,
                  })}
                </span>
              </div>
            </div>

            <div className="flex gap-4 text-sm">
              <span>
                <strong>{user.followingCount}</strong>{" "}
                <span className="text-muted-foreground">Seguindo</span>
              </span>
              <span>
                <strong>{user.followersCount}</strong>{" "}
                <span className="text-muted-foreground">Seguidores</span>
              </span>
            </div>
          </div>
        </div>

        {/* User Posts */}
        <div className="p-4 border-t border-border/40">
          <PostList />
        </div>
      </main>
    </MainLayout>
  );
}
