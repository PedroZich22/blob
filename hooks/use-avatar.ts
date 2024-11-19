import { AVATAR_ICONS, AVATAR_COLORS } from "@/constants/avatar-options";
import type { LucideIcon } from "lucide-react";

interface UseAvatarProps {
  iconId?: string | null;
  colorId?: string | null;
}

export function useAvatar({ iconId, colorId }: UseAvatarProps) {
  const icon = AVATAR_ICONS.find((i) => i.id === iconId) ?? AVATAR_ICONS[0];
  const color = AVATAR_COLORS.find((c) => c.id === colorId) ?? AVATAR_COLORS[0];

  return {
    Icon: icon.icon as LucideIcon,
    color: color.class,
    label: icon.label,
  };
}
