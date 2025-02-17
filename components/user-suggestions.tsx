"use client";

import { useQuery } from "@tanstack/react-query";
import { getUsers } from "@/actions/user";

import { Avatar, AvatarFallback } from "./ui/avatar";
import { Skeleton } from "./ui/skeleton";
import { Card, CardHeader, CardTitle, CardContent } from "./ui/card";
import Link from "next/link";
import { UserAvatar } from "./user-avatar";

export function UserSuggestions() {
  const { data: users, isLoading } = useQuery({
    queryKey: ["user"],
    queryFn: () => getUsers(),
  });

  if (isLoading) return <UserSuggestionsSkeleton />;

  return (
    <Card>
      <CardHeader>
        <CardTitle>Conheça novas pessoas</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {users?.map((user) => (
            <div className="flex items-center justify-between" key={user.email}>
              <div className="flex gap-2">
                <UserAvatar user={user} />
                <div className="flex flex-col justify-center">
                  <Link
                    href={"/profile/" + user.id}
                    className="text-sm font-medium hover:underline cursor-pointer"
                  >
                    {user.name}
                  </Link>
                  <div className="text-xs text-muted-foreground">
                    <span>@{user.username}</span>
                  </div>
                </div>
              </div>
              {/* <Button variant="outline" size="sm">
                Seguir
              </Button> */}
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

function UserSuggestionsSkeleton() {
  return <Skeleton className="w-full h-20" />;
}
