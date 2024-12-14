"use client";

import { useEffect, useState } from "react";
import { Search } from "lucide-react";

import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { Button } from "./ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { useRouter } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { getUsersFiltered } from "@/actions/user";
import { useDebounce } from "@/hooks/use-debounce";

export function SearchInput() {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const debouncerdQuery = useDebounce(query, 1000);

  // TODO: Paginar resultados
  const { data: filteredUsers } = useQuery({
    enabled: open,
    queryKey: ["search", debouncerdQuery],
    queryFn: () => getUsersFiltered(debouncerdQuery),
  });

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((open) => !open);
      }
    };
    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, []);

  function handleSelectUser(id: string) {
    setOpen(false);
    router.push("/profile/" + id);
  }

  return (
    <div className="relative">
      <Button
        variant="outline"
        className="relative h-9 w-full justify-start rounded-[0.5rem] text-sm text-muted-foreground blob-input"
        onClick={() => setOpen(true)}
      >
        <Search className="mr-2 h-4 w-4" />
        <span className="hidden lg:inline-flex">Encontrar pessoas...</span>
        <span className="inline-flex lg:hidden">Buscar pessoas...</span>
        <kbd className="pointer-events-none absolute right-3 top-1 hidden h-6 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium opacity-100 sm:flex">
          <span className="text-xs">⌘</span>K
        </kbd>
      </Button>
      <CommandDialog open={open} onOpenChange={setOpen}>
        <CommandInput
          placeholder="Digite o nome ou @username..."
          className="py-2"
          value={query}
          onValueChange={setQuery}
        />
        <CommandList>
          <CommandEmpty>Nenhum usuário encontrado.</CommandEmpty>
          <CommandGroup heading="Pessoas" className="p-2">
            {filteredUsers?.map((user) => (
              <CommandItem
                key={user.id}
                onSelect={() => handleSelectUser(user.id)}
                className="flex items-center gap-3 p-2 cursor-pointer"
              >
                <Avatar className="h-9 w-9">
                  <AvatarImage src={user.image ?? undefined} />
                  <AvatarFallback>{user.username}</AvatarFallback>
                </Avatar>
                <div className="flex flex-col flex-1 overflow-hidden">
                  <div className="flex items-center gap-1">
                    <span className="font-medium truncate">{user.name}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <span className="truncate">@{user.username}</span>
                    <span>·</span>
                    <span className="truncate">
                      {user._count.followers} seguidores
                    </span>
                  </div>
                  <p className="text-xs text-muted-foreground truncate">
                    {user.bio}
                  </p>
                </div>
              </CommandItem>
            ))}
          </CommandGroup>
        </CommandList>
      </CommandDialog>
    </div>
  );
}
