"use client";

import { useFormContext } from "react-hook-form";

import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useInterests } from "@/hooks/use-interests";
import { Checkbox } from "@radix-ui/react-checkbox";

export function RegisterStepInterests() {
  const form = useFormContext();
  const { data: interests } = useInterests();

  if (!interests) {
    return null;
  }

  return (
    <div className="space-y-4">
      {interests.map((interest) => (
        <FormField
          key={interest.id}
          control={form.control}
          name="interests"
          render={({ field }) => (
            <FormItem
              key={interest.id}
              className="flex flex-row items-start space-x-3 space-y-0"
            >
              <FormControl>
                <Checkbox
                  checked={field.value?.includes(interest.id)}
                  onCheckedChange={(checked) => {
                    return checked
                      ? field.onChange([...field.value, interest.id])
                      : field.onChange(
                          field.value?.filter((value) => value !== interest.id)
                        );
                  }}
                />
              </FormControl>
              <FormLabel className="font-normal">{interest.name}</FormLabel>
            </FormItem>
          )}
        />
      ))}
      <FormMessage />
    </div>
  );
}
