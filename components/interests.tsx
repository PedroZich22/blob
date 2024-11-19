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
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "./ui/tooltip";
import { useInterests } from "@/lib/api/queries";
import { InterestItem } from "./interest-item";

export function Interests() {
  const interests = useInterests();

  function handleInterestClick() {}

  return (
    <div className="py-2 px-2 lg:px-4 mx-8 my-2">
      <div className="px-2 lg:px-4">
        <Carousel opts={{ align: "start" }} className="w-full">
          <TooltipProvider>
            <CarouselContent className="-ml-2">
              {interests.data?.map((item) => (
                <CarouselItem key={item.id} className="pl-2 basis-auto">
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <div>
                        <InterestItem
                          interest={item}
                          onClick={() => handleInterestClick(item.id)}
                          selected={currentInterest === item.id}
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
