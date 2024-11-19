"use client";

import { UserProfile } from "@/components/user-profile";
import { useCurrentUser } from "@/hooks/use-current-user";

export default function UserPage() {
  const user = useCurrentUser();

  return <UserProfile user={user} />;
}
