import { UserProfile } from "@/app/(app)/(protected)/profile/[userId]/_components/user-profile";

export default async function UserPage({
  params,
}: {
  params: Promise<{ userId: string }>;
}) {
  const userId = (await params).userId;

  return <UserProfile userId={userId} />;
}
