"use client";

import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { AVATAR_ICONS, AVATAR_COLORS } from "@/constants/avatar-options";
import {
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useFormContext } from "react-hook-form";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";
import { useAvatar } from "@/hooks/use-avatar";

export function RegisterStepProfile() {
  const form = useFormContext();

  const [iconId, colorId, username, name] = form.watch([
    "avatar.icon",
    "avatar.color",
    "username",
    "name",
  ]);
  const { Icon, color } = useAvatar({ iconId, colorId });

  return (
    <div className="space-y-4">
      <div className="flex justify-center gap-2">
        <Avatar size="lg">
          <AvatarFallback className={cn(color)}>
            {Icon && <Icon className="size-full" />}
          </AvatarFallback>
        </Avatar>
        <div className="flex flex-col">
          <span className="text-medium">{name}</span>
          <span className="text-xs text-muted-foreground">@{username}</span>
        </div>
      </div>
      <FormField
        control={form.control}
        name="avatar.icon"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Ícone do perfil</FormLabel>
            <RadioGroup
              className="grid grid-cols-4 gap-2"
              onValueChange={field.onChange}
              defaultValue={field.value}
            >
              {AVATAR_ICONS.map((item) => {
                const Icon = item.icon;
                return (
                  <Label
                    key={item.id}
                    className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground [&:has([data-state=checked])]:border-primary"
                  >
                    <RadioGroupItem value={item.id} className="sr-only" />
                    <Icon className="h-6 w-6 mb-2" />
                    <span className="text-xs">{item.label}</span>
                  </Label>
                );
              })}
            </RadioGroup>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="avatar.color"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Cor do avatar</FormLabel>
            <RadioGroup
              className="grid grid-cols-4 gap-2"
              onValueChange={field.onChange}
              defaultValue={field.value}
            >
              {AVATAR_COLORS.map((color) => (
                <Label
                  key={color.id}
                  className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground [&:has([data-state=checked])]:border-primary"
                >
                  <RadioGroupItem value={color.id} className="sr-only" />
                  <div
                    className={cn("size-6 rounded-full mb-2", color.class)}
                  />
                  <span className="text-xs">{color.label}</span>
                </Label>
              ))}
            </RadioGroup>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
}
