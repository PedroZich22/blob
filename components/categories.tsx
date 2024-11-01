"use client";

import { useCallback } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { CategoryItem } from "./category-item";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "./ui/tooltip";

interface Category {
  id: string;
  name: string;
  count: number;
  isPopular?: boolean;
  color?: string;
}

export function Categories() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const currentCategory = searchParams.get("category");

  const items: Category[] = [
    { id: "1", name: "desenvolvimento", count: 1234, isPopular: true },
    { id: "2", name: "tech", count: 856, isPopular: true, color: "blue" },
    { id: "3", name: "dev", count: 654, color: "cyan" },
    { id: "4", name: "ai", count: 432, isPopular: true, color: "violet" },
    { id: "5", name: "design", count: 345, color: "pink" },
    { id: "6", name: "ux", count: 234, color: "rose" },
    { id: "7", name: "blockchain", count: 198, color: "orange" },
    { id: "8", name: "cloud", count: 187, color: "sky" },
    { id: "9", name: "devops", count: 165, color: "emerald" },
  ];

  const handleCategoryClick = useCallback(
    (categoryId: string) => {
      const params = new URLSearchParams(searchParams);
      if (params.get("category") === categoryId) {
        params.delete("category");
      } else {
        params.set("category", categoryId);
      }
      router.push(`?${params.toString()}`);
    },
    [router, searchParams]
  );

  return (
    <div className="py-2 px-2 lg:px-4 mx-8 my-2">
      <div className="px-2 lg:px-4">
        <Carousel opts={{ align: "start" }} className="w-full">
          <TooltipProvider>
            <CarouselContent className="-ml-2">
              {items.map((item) => (
                <CarouselItem key={item.id} className="pl-2 basis-auto">
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <div>
                        <CategoryItem
                          category={item}
                          onClick={() => handleCategoryClick(item.id)}
                          selected={currentCategory === item.id}
                        />
                      </div>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p className="font-medium">#{item.name}</p>
                      <p className="text-xs text-muted-foreground">
                        {item.count.toLocaleString("pt-BR")} posts
                      </p>
                    </TooltipContent>
                  </Tooltip>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="hidden lg:flex" />
            <CarouselNext className="hidden lg:flex" />
          </TooltipProvider>
        </Carousel>
      </div>
    </div>
  );
}
