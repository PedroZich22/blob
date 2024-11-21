"use client";

import { useSearchParams } from "next/navigation";
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
import { InterestItem } from "./interest-item";
import { useInterests } from "@/hooks/use-interests";
import { useState } from "react";

export function Interests() {
  const [selectedInterests, setSelectedInterests] = useState<string[]>([]);
  const { data: interests } = useInterests();

  function handleInterestClick(id: string) {
    if (selectedInterests.includes(id)) {
      setSelectedInterests((prev) => prev.filter((i) => i !== id));
    } else {
      setSelectedInterests((prev) => [...prev, id]);
    }
  }

  return (
    <div className="py-2 px-2 lg:px-4 mx-8 my-2">
      <div className="px-2 lg:px-4">
        <Carousel opts={{ align: "start" }} className="w-full">
          <TooltipProvider>
            <CarouselContent className="-ml-2">
              {interests?.map((item) => (
                <CarouselItem key={item.id} className="pl-2 basis-auto">
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <div>
                        <InterestItem
                          interest={item}
                          onClick={() => handleInterestClick(item.id)}
                          selected={selectedInterests.includes(item.id)}
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
