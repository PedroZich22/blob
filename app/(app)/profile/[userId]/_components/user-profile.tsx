"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { CalendarDays, Copy, Share2, SquarePen } from "lucide-react";
import { PostFeed } from "@/components/post-list";
import { useCurrentUser } from "@/hooks/use-current-user";
import { formatDateDistanceToNowWithSuffix } from "@/lib/formatter";
import { getUserById } from "@/actions/user";
import { useCopyToClipboard } from "@/hooks/use-clipboard";
import { useToast } from "@/hooks/use-toast";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { useQuery } from "@tanstack/react-query";
import { notFound } from "next/navigation";
import { DialogHeader } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { EditProfileForm } from "./edit-profile-form";
import { useAvatar } from "@/hooks/use-avatar";
import { cn } from "@/lib/utils";
import { getPostsByUserId } from "@/actions/post";

interface UserProfileProps {
  userId: string;
}

export function UserProfile({ userId }: UserProfileProps) {
  const currentUser = useCurrentUser();
  const { toast } = useToast();
  const [, copy] = useCopyToClipboard();

  const { data: user, isLoading: isLoadingUser } = useQuery({
    queryKey: ["user", userId],
    queryFn: () => getUserById(userId),
  });

  const { data: posts } = useQuery({
    enabled: !!user,
    queryKey: ["post", userId],
    queryFn: () => getPostsByUserId(userId),
  });

  if (isLoadingUser) {
    return "Loading...";
  }

  if (!user) {
    return notFound();
  }

  const isCurrentUser = currentUser?.id === user.id;
  const profileUrl = `${process.env.NEXT_PUBLIC_APP_URL}/profile/${user.id}`;
  const { Icon, color } = useAvatar({
    colorId: user.avatarColor,
    iconId: user.avatarIcon,
  });

  function handleCopyUrlProfile() {
    copy(profileUrl).then(() => {
      toast({
        variant: "success",
        title: "Link copiado com sucesso",
        description: "O link do perfil foi copiado com sucesso.",
      });
    });
  }

  function handleFollow() {}

  return (
    <div>
      {/* Cover Image */}
      <div className="h-48 lg:h-56 bg-muted">
        <div className={`bg-${user?.avatarColor}-500 w-full h-full`} />
      </div>

      {/* Profile Info */}
      <div className="px-4 pb-4 -mt-20">
        <div className="flex justify-between items-start mb-4">
          <Avatar className="h-32 w-32 rounded-full border-4 border-background">
            <AvatarImage src={user?.image ?? undefined} />
            <AvatarFallback className={cn(color)}>
              {Icon && <Icon />}
            </AvatarFallback>
          </Avatar>
          <div className="flex justify-end items-center gap-2 mt-24">
            <Dialog>
              <DialogTrigger asChild>
                <Button variant="outline" className="flex items-center">
                  Compartilhar
                  <Share2 className="h-4 w-4 ml-2" />
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-md">
                <DialogHeader>
                  <DialogTitle>Compartilhe o perfil</DialogTitle>
                  <DialogDescription>
                    Qualquer pessoa com este link poderá ver este perfil.
                  </DialogDescription>
                </DialogHeader>
                <div className="flex items-center space-x-2">
                  <div className="grid flex-1 gap-2">
                    <Label htmlFor="link" className="sr-only">
                      Link
                    </Label>
                    <Input id="link" defaultValue={profileUrl} readOnly />
                  </div>
                  <Button type="submit" onClick={handleCopyUrlProfile}>
                    <span className="sr-only">Copy</span>
                    <Copy className="h-4 w-4" />
                  </Button>
                </div>
              </DialogContent>
            </Dialog>
            {isCurrentUser ? (
              <Dialog>
                <DialogTrigger asChild>
                  <Button variant="outline" className="flex items-center">
                    Editar Perfil
                    <SquarePen className="h-4 w-4 ml-2" />
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Edite seu perfil</DialogTitle>
                    <DialogDescription>
                      Faça mudanças no seu perfil aqui. Clique em salvar quando
                      terminar.
                    </DialogDescription>
                  </DialogHeader>
                  <EditProfileForm user={user} />
                </DialogContent>
              </Dialog>
            ) : (
              <Button variant="shine" onClick={handleFollow}>
                Seguir
              </Button>
            )}
          </div>
        </div>

        <div className="space-y-4">
          <div>
            <h1 className="text-2xl font-bold flex items-center gap-2">
              {user?.name}
            </h1>
            <p className="text-muted-foreground">@{user?.username}</p>
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
              <strong>{user?._count?.following}</strong>{" "}
              <span className="text-muted-foreground">Seguindo</span>
            </span>
            <span>
              <strong>{user?._count?.followers}</strong>{" "}
              <span className="text-muted-foreground">Seguidores</span>
            </span>
          </div>
        </div>
      </div>

      <div className="p-4 border-t border-border">
        <PostFeed posts={posts} />
      </div>
    </div>
  );
}
