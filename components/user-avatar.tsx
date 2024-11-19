"use client";

import { useAvatar } from "@/hooks/use-avatar";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useCurrentUser } from "@/hooks/use-current-user";
import { Button } from "./ui/button";
import { LogOut, MoreHorizontal } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { logout } from "@/actions/logout";

export function UserAvatar() {
  const user = useCurrentUser();

  const { Icon, color } = useAvatar({
    iconId: user?.avatarIcon,
    colorId: user?.avatarColor,
  });

  const handleLogout = async () => {
    await logout();
  };

  return (
    <div className="flex items-center justify-between gap-2 w-full">
      <div className="flex items-center gap-2">
        <Avatar>
          <AvatarImage
            src={user?.image ?? undefined}
            alt={user?.name ?? "Avatar"}
          />
          <AvatarFallback className={color}>
            <Icon className="size-6" />
          </AvatarFallback>
        </Avatar>
        <div className="flex flex-col">
          <p className="text-sm font-medium">{user?.name}</p>
          <p className="text-xs text-muted-foreground">{user?.username}</p>
        </div>
      </div>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="icon">
            <MoreHorizontal className="size-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem onClick={handleLogout}>
            <LogOut className="size-4" />
            <span>Sair</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
