import { useUsers } from "@/hooks/use-users";
import { Button } from "./ui/button";

export function UserSuggestions() {
  const { users, isLoading } = useUsers();

  if (isLoading) return <div>Loading...</div>;

  return (
    <div className="space-y-4">
      {users?.map((user) => (
        <div className="flex items-center justify-between" key={user.email}>
          {user.username}
          <Button variant="outline" size="sm">
            Seguir
          </Button>
        </div>
      ))}
    </div>
  );
}
