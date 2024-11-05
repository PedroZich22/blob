"use client";

import { useAvatar } from "@/hooks/use-avatar";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import type { User } from "@prisma/client";

interface UserAvatarProps {
  user: Pick<User, "name" | "image" | "avatarIcon" | "avatarColor">;
  className?: string;
}

export function UserAvatar({ user, className }: UserAvatarProps) {
  const { Icon, color } = useAvatar({
    iconId: user.avatarIcon,
    colorId: user.avatarColor,
  });

  return (
    <Avatar className={className}>
      <AvatarImage src={user.image ?? undefined} alt={user.name ?? "Avatar"} />
      <AvatarFallback className={color}>
        <Icon className="h-6 w-6" />
      </AvatarFallback>
    </Avatar>
  );
}
