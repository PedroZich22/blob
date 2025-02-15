import { useAvatar } from "@/hooks/use-avatar";
import { Avatar, AvatarFallback, AvatarImage, AvatarProps } from "./ui/avatar";
import { User } from "@prisma/client";

interface UserAvatarProps extends AvatarProps {
  user?: User;
}

export function UserAvatar({ user, ...props }: UserAvatarProps) {
  const { Icon, color } = useAvatar({
    colorId: user?.avatarColor,
    iconId: user?.avatarIcon,
  });

  return (
    <Avatar {...props}>
      <AvatarImage src={user?.image ?? undefined} />
      <AvatarFallback className={color}>{Icon && <Icon />}</AvatarFallback>
    </Avatar>
  );
}
