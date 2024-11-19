import { useQuery } from "@tanstack/react-query";
import { getInterests } from "@/data/interests";

export function useInterests() {
  return useQuery({
    queryKey: ["interests"],
    queryFn: getInterests,
  });
}

export function useUpdateInterests() {
  return;
}
