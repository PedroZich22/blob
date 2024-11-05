import { User, UserCircle, UserRound, CircleDot, Ghost, Bot, Brain, Smile } from "lucide-react";
import type { LucideIcon } from "lucide-react";

export interface AvatarIcon {
  id: string;
  icon: LucideIcon;
  label: string;
}

export interface AvatarColor {
  id: string;
  value: string;
  label: string;
  class: string;
}

export const AVATAR_ICONS: AvatarIcon[] = [
  { id: "user", icon: User, label: "Padrão" },
  { id: "circle", icon: UserCircle, label: "Círculo" },
  { id: "round", icon: UserRound, label: "Redondo" },
  { id: "dot", icon: CircleDot, label: "Ponto" },
  { id: "ghost", icon: Ghost, label: "Fantasma" },
  { id: "bot", icon: Bot, label: "Robô" },
  { id: "brain", icon: Brain, label: "Cérebro" },
  { id: "smile", icon: Smile, label: "Sorriso" },
];

export const AVATAR_COLORS: AvatarColor[] = [
  { id: "cyan", value: "cyan", label: "Ciano", class: "bg-cyan-500" },
  { id: "sky", value: "sky", label: "Céu", class: "bg-sky-500" },
  { id: "blue", value: "blue", label: "Azul", class: "bg-blue-500" },
  { id: "violet", value: "violet", label: "Violeta", class: "bg-violet-500" },
  { id: "purple", value: "purple", label: "Roxo", class: "bg-purple-500" },
  { id: "pink", value: "pink", label: "Rosa", class: "bg-pink-500" },
  { id: "emerald", value: "emerald", label: "Esmeralda", class: "bg-emerald-500" },
  { id: "amber", value: "amber", label: "Âmbar", class: "bg-amber-500" },
]; 