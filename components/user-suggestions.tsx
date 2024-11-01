import { Button } from "./ui/button";

import { UserAvatar } from "./user-avatar";

const users = [
  {
    name: "John Doe",
    email: "john@example.com",
    avatar: "https://github.com/PedroZich22.png",
  },
];

export function UserSuggestions() {
  return (
    <div className="space-y-4">
      {users.map((user) => (
        <div className="flex items-center justify-between" key={user.email}>
          <UserAvatar user={user} />
          <Button variant="outline" size="sm">
            Seguir
          </Button>
        </div>
      ))}
    </div>
  );
}
