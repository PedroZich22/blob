"use client";

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
import { getInterests } from "@/actions/interests";
import { useQuery } from "@tanstack/react-query";
import { formatCompactNumber } from "@/lib/formatter";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Skeleton } from "./ui/skeleton";

export function Interests() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const {
    data: interests,
    error,
    isLoading,
  } = useQuery({
    queryKey: ["interests"],
    queryFn: () => getInterests(),
  });

  if (isLoading) {
    return <InterestsSkeleton />;
  }

  if (error) {
    return null;
  }

  const selectedInterests = searchParams.get("interests")?.split(",") || [];

  function handleInterestClick(id: string) {
    const params = new URLSearchParams(searchParams);

    if (selectedInterests.includes(id)) {
      const filtered = selectedInterests.filter((i) => i !== id);
      if (filtered.length > 0) {
        params.set("interests", filtered.join(","));
      } else {
        params.delete("interests");
      }
    } else {
      const newInterests = [...selectedInterests, id];
      params.set("interests", newInterests.join(","));
    }

    router.push(`${pathname}?${params.toString()}`);
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
                      {/* <p className="text-xs text-muted-foreground">
                        {formatCompactNumber(item._count.posts)} posts
                      </p> */}
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

function InterestsSkeleton() {
  return (
    <div className="py-2 px-2 lg:px-4 mx-8 my-2">
      <div className="px-2 lg:px-4">
        <Carousel opts={{ align: "start" }} className="w-full">
          <CarouselContent className="-ml-2">
            {Array.from({ length: 7 }).map((_, i) => (
              <CarouselItem key={i} className="pl-2 basis-auto">
                <Skeleton className="w-40 h-8" />
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="hidden lg:flex" />
          <CarouselNext className="hidden lg:flex" />
        </Carousel>
      </div>
    </div>
  );
}
