import { useQuery } from "@tanstack/react-query";
import { getUsers } from "@/actions/user";

import { Button } from "./ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Skeleton } from "./ui/skeleton";
import { Card, CardHeader, CardTitle, CardContent } from "./ui/card";

export function UserSuggestions() {
  const { data: users, isLoading } = useQuery({
    queryKey: ["user"],
    queryFn: () => getUsers(),
  });

  if (isLoading) {
    return <UserSuggestionsSkeleton />;
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Quem seguir</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {users?.map((user) => (
            <div className="flex items-center justify-between" key={user.email}>
              <div className="flex gap-2">
                <Avatar>
                  <AvatarImage src={user.image ?? undefined} />
                  <AvatarFallback>{user.avatarIcon}</AvatarFallback>
                </Avatar>
                <div className="flex flex-col">
                  <span className="text-sm font-medium">{user.name}</span>
                  <div className="text-xs text-muted-foreground">
                    <span>@{user.username}</span>
                  </div>
                </div>
              </div>
              <Button size="sm">Seguir</Button>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

function UserSuggestionsSkeleton() {
  return (
    <div className="space-y-4">
      {Array.from({ length: 3 }).map((_, index) => (
        <div className="flex items-center justify-between" key={index}>
          <div className="flex gap-2">
            <Avatar>
              <AvatarFallback />
            </Avatar>
            <div className="flex flex-col gap-1">
              <Skeleton className="w-20 h-4" />
              <Skeleton className="w-10 h-3" />
            </div>
          </div>
          <Skeleton className="w-16 h-6" />
        </div>
      ))}
    </div>
  );
}
