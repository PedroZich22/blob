import { useQuery } from "@tanstack/react-query";
import { User } from "@/types/user";

export function useUserQuery(options?: {
  initialData?: User;
}) {
  return useQuery<User>({
    queryKey: ["user", options],
    queryFn: async () => {
      const response = await fetch("/api/users?" + new URLSearchParams({
        id: options?.id || "",
      }));

      if (!response.ok) throw new Error("Erro ao carregar usuário");
      return response.json();
    },
    initialData: options?.initialData,
  });
}
  