import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { CalendarDays } from "lucide-react";
import { formatDistanceToNow } from "date-fns";
import { ptBR } from "date-fns/locale";
import { User } from "@prisma/client";

interface UserHoverCardProps {
  user: User;
}

export function UserHoverCard({ user }: UserHoverCardProps) {
  return (
    <HoverCard>
      <HoverCardTrigger asChild>
        <Avatar
          className="h-10 w-10 cursor-pointer rounded-[1rem] ring-2 ring-cyan-100 
                         hover:ring-cyan-300 transition-all duration-300
                         dark:ring-cyan-900 dark:hover:ring-cyan-700"
        >
          <AvatarImage src={user.image ?? ""} alt={user.name ?? ""} />
          <AvatarFallback className="bg-gradient-to-br from-cyan-500 to-sky-500 text-white">
            {user.name?.substring(0, 2).toUpperCase() ?? ""}
          </AvatarFallback>
        </Avatar>
      </HoverCardTrigger>
      <HoverCardContent className="blob-card w-80 p-4 z-50" align="start">
        <div className="flex justify-between space-x-4">
          <div className="flex items-center gap-2">
            <Avatar className="h-12 w-12 rounded-lg">
              <AvatarImage src={user.image ?? ""} />
              <AvatarFallback>
                {user.name?.substring(0, 2).toUpperCase() ?? ""}
              </AvatarFallback>
            </Avatar>
            <div>
              <h4 className="text-sm font-semibold">{user.name}</h4>
              <p className="text-sm text-muted-foreground">{user.username}</p>
            </div>
          </div>
          <Button className="mr-auto" variant="outline">
            Seguir
          </Button>
        </div>
        <div className="mt-2">
          <p className="text-sm">{user.bio}</p>
        </div>
        <div className="mt-2 flex items-center gap-4 text-sm text-muted-foreground">
          <div className="flex items-center gap-1">
            <span className="font-semibold text-foreground">
              {user.followingCount || 0}
            </span>
            Seguindo
          </div>
          <div className="flex items-center gap-1">
            <span className="font-semibold text-foreground">
              {user.followersCount || 0}
            </span>
            Seguidores
          </div>
        </div>
        <div className="flex items-center pt-4 text-xs text-muted-foreground">
          <CalendarDays className="mr-2 h-4 w-4" />
          Entrou{" "}
          {user.createdAt &&
            formatDistanceToNow(user.createdAt, {
              addSuffix: true,
              locale: ptBR,
            })}
        </div>
      </HoverCardContent>
    </HoverCard>
  );
}
