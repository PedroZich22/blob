"use client";

import { useFormContext } from "react-hook-form";

import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { InterestItem, InterestItemSkeleton } from "@/components/interest-item";
import { useQuery } from "@tanstack/react-query";
import { getInterests } from "@/actions/interests";

export function RegisterStepInterests() {
  const form = useFormContext();
  const { data: interests, isLoading } = useQuery({
    queryKey: ["interests"],
    queryFn: () => getInterests(),
  });

  if (isLoading) {
    return <InterestItemsSkeleton />;
  }

  function handleSelectInterest(id: string) {
    const currentInterests = form.getValues("interests") || [];

    if (currentInterests.includes(id)) {
      form.setValue(
        "interests",
        currentInterests.filter((interestId: string) => interestId !== id)
      );
    } else {
      form.setValue("interests", [...currentInterests, id]);
    }
  }

  return (
    <div>
      <FormField
        control={form.control}
        name="interests"
        render={() => (
          <FormItem className="flex flex-row flex-wrap items-start space-y-0 gap-2">
            <FormLabel />
            {interests?.map((interest) => (
              <FormField
                key={interest.id}
                control={form.control}
                name="interests"
                render={({ field }) => {
                  return (
                    <FormItem
                      key={interest.id}
                      className="flex flex-row items-start"
                    >
                      <FormControl>
                        <InterestItem
                          interest={interest}
                          onClick={() => handleSelectInterest(interest.id)}
                          selected={field.value?.includes(interest.id)}
                        />
                      </FormControl>
                    </FormItem>
                  );
                }}
              />
            ))}
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
}

function InterestItemsSkeleton() {
  return (
    <div className="flex flex-row flex-wrap items-start space-y-0 gap-2">
      {Array.from({ length: 4 }).map((_, i) => (
        <InterestItemSkeleton key={i} />
      ))}
    </div>
  );
}
