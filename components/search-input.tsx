"use client";

import * as React from "react";
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

interface User {
  id: string;
  name: string;
  username: string;
  avatar: string;
  bio: string;
  followersCount: number;
  isVerified?: boolean;
}

export function SearchInput() {
  const [open, setOpen] = React.useState(false);
  const [query, setQuery] = React.useState("");

  React.useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((open) => !open);
      }
    };
    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, []);

  // Simulação de usuários (depois você pode substituir por uma chamada API)
  const users: User[] = [
    {
      id: "1",
      name: "Jane Cooper",
      username: "@janecooper",
      avatar: "https://github.com/shadcn.png",
      bio: "Digital designer and developer",
      followersCount: 1234,
      isVerified: true,
    },
    {
      id: "2",
      name: "John Doe",
      username: "@johndoe",
      avatar: "https://github.com/shadcn.png",
      bio: "Frontend Developer",
      followersCount: 567,
    },
    {
      id: "3",
      name: "Alice Johnson",
      username: "@alicej",
      avatar: "https://github.com/shadcn.png",
      bio: "UI/UX Designer",
      followersCount: 890,
      isVerified: true,
    },
  ];

  // Filtra usuários baseado na busca
  const filteredUsers = React.useMemo(() => {
    if (!query) return users;
    const lowerQuery = query.toLowerCase();
    return users.filter(
      (user) =>
        user.name.toLowerCase().includes(lowerQuery) ||
        user.username.toLowerCase().includes(lowerQuery) ||
        user.bio.toLowerCase().includes(lowerQuery)
    );
  }, [query]);

  const handleSelectUser = React.useCallback((userId: string) => {
    // Aqui você pode implementar a navegação para o perfil do usuário
    console.log(`Navegando para o perfil do usuário ${userId}`);
    setOpen(false);
  }, []);

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
          value={query}
          onValueChange={setQuery}
        />
        <CommandList>
          <CommandEmpty>Nenhum usuário encontrado.</CommandEmpty>
          <CommandGroup heading="Pessoas">
            {filteredUsers.map((user) => (
              <CommandItem
                key={user.id}
                onSelect={() => handleSelectUser(user.id)}
                className="flex items-center gap-3 p-2"
              >
                <Avatar className="h-9 w-9">
                  <AvatarImage src={user.avatar} />
                  <AvatarFallback>
                    {user.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </AvatarFallback>
                </Avatar>
                <div className="flex flex-col flex-1 overflow-hidden">
                  <div className="flex items-center gap-1">
                    <span className="font-medium truncate">{user.name}</span>
                    {user.isVerified && (
                      <span className="inline-flex items-center rounded-md bg-blue-50 px-1.5 py-0.5 text-xs font-medium text-blue-700 ring-1 ring-inset ring-blue-700/10">
                        Verificado
                      </span>
                    )}
                  </div>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <span className="truncate">{user.username}</span>
                    <span>·</span>
                    <span className="truncate">
                      {user.followersCount.toLocaleString("pt-BR")} seguidores
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
