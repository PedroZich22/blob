"use client";

import { cn } from "@/lib/utils";
import { Button } from "./ui/button";

interface Category {
  id: string;
  name: string;
  count: number;
  isPopular?: boolean;
  color?: string;
}

interface CategoryItemProps {
  category: Category;
  variant?: "default" | "trending" | "label";
  onClick?: () => void;
  selected?: boolean;
}

const categoryColors = {
  dev: "cyan",
  tech: "blue",
  ai: "violet",
  design: "pink",
  ux: "rose",
  blockchain: "orange",
  cloud: "sky",
  devops: "emerald",
} as const;

export function CategoryItem({
  category,
  variant = "default",
  onClick,
  selected,
}: CategoryItemProps) {
  const color =
    category.color ||
    categoryColors[category.name as keyof typeof categoryColors] ||
    "cyan";

  const variants = {
    trending: cn(
      "inline-flex items-center gap-1.5 px-3 py-1 text-xs font-medium",
      "rounded-full bg-gradient-to-r",
      `from-${color}-50/80 to-${color}-100/80`,
      `text-${color}-700 ring-1 ring-inset ring-${color}-700/10`,
      `dark:from-${color}-400/10 dark:to-${color}-500/10`,
      `dark:text-${color}-400 dark:ring-${color}-400/20`,
      `hover:from-${color}-100 hover:to-${color}-200`,
      `dark:hover:from-${color}-400/20 dark:hover:to-${color}-500/20`,
      "transition-all duration-300 cursor-pointer"
    ),
    label: cn(
      "inline-flex items-center gap-1 px-2 py-0.5 text-xs font-medium",
      "rounded-full",
      `bg-${color}-50 text-${color}-700`,
      `dark:bg-${color}-900/30 dark:text-${color}-300`,
      "transition-colors"
    ),
    default: cn(
      "h-7 rounded-full px-3 text-xs font-medium",
      "bg-transparent",
      `hover:bg-${color}-50 hover:text-${color}-700`,
      `dark:hover:bg-${color}-950 dark:hover:text-${color}-300`,
      selected && `bg-${color}-100 text-${color}-900 hover:bg-${color}-200`,
      selected &&
        `dark:bg-${color}-900 dark:text-${color}-100 dark:hover:bg-${color}-800`
    ),
  };

  if (variant === "trending" || variant === "label") {
    return (
      <div className={variants[variant]} onClick={onClick}>
        <span>#{category.name}</span>
        {variant === "trending" && (
          <span className={`text-${color}-600/70 dark:text-${color}-400/70`}>
            {formatCompactNumber(category.count)}
          </span>
        )}
      </div>
    );
  }

  return (
    <Button variant="outline" className={variants.default} onClick={onClick}>
      <span>#{category.name}</span>
      <span className="ml-1.5 text-muted-foreground">
        {formatCompactNumber(category.count)}
      </span>
    </Button>
  );
}

// Função auxiliar para formatar números grandes
function formatCompactNumber(num: number): string {
  return Intl.NumberFormat("pt-BR", {
    notation: "compact",
    maximumFractionDigits: 1,
  }).format(num);
}
