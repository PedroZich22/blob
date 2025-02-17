import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import { Button } from "@/components/ui/button";
import { CalendarDays } from "lucide-react";
import { formatDateDistanceToNowWithSuffix } from "@/lib/formatter";
import { UserAvatar } from "./user-avatar";
import Link from "next/link";
import { User } from "@prisma/client";

interface UserHoverCardProps {
  user: User;
}

export function UserHoverCard({ user }: UserHoverCardProps) {
  return (
    <HoverCard>
      <HoverCardTrigger>
        <UserAvatar user={user} />
      </HoverCardTrigger>
      <HoverCardContent className="blob-card w-80 p-4 z-50" align="start">
        <div className="flex justify-between space-x-4">
          <div className="flex items-center gap-2">
            <UserAvatar user={user} />
            <div>
              <Link
                href={"/profile/" + user.id}
                className="text-sm font-semibold truncate hover:underline cursor-pointer"
              >
                {user.name}
              </Link>
              <p className="text-sm text-muted-foreground">@{user.username}</p>
            </div>
          </div>
          {/* <Button className="mr-auto" variant="outline">
            Seguir
          </Button> */}
        </div>
        <div className="mt-2">
          <p className="text-sm">{user.bio}</p>
        </div>
        {/* <div className="mt-2 flex items-center gap-4 text-sm text-muted-foreground">
          <div className="flex items-center gap-1">
            <span className="font-semibold text-foreground">
              {user._count?.following || 0}
            </span>
            Seguindo
          </div>
          <div className="flex items-center gap-1">
            <span className="font-semibold text-foreground">
              {user._count?.followers || 0}
            </span>
            Seguidores
          </div>
        </div> */}
        <div className="flex items-center pt-4 text-xs text-muted-foreground">
          <CalendarDays className="mr-2 h-4 w-4" />
          Entrou {formatDateDistanceToNowWithSuffix(user.createdAt)}
        </div>
      </HoverCardContent>
    </HoverCard>
  );
}
