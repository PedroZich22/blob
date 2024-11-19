import { getUsers, updateUser } from "@/data/user";
import { useMutation, useQuery } from "@tanstack/react-query";

export function useUsers() {
  return useQuery({
    queryKey: ["users"],
    queryFn: getUsers,
  });
}

export function useUpdateUser() {
  return useMutation({
    mutationFn: updateUser,
  });
}
