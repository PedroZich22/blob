import { UserProfile } from "@/components/user-profile";
import { notFound } from "next/navigation";

interface UserPageProps {
  params: {
    username: string;
  };
}

export default function UserPage({ params }: UserPageProps) {
  // Aqui você faria a busca do usuário na API
  const user = {
    id: "1",
    name: "Jane Cooper",
    username: params.username,
    avatar: "https://github.com/shadcn.png",
    bio: "Digital designer and developer",
    followersCount: 1234,
    followingCount: 567,
    isVerified: true,
    createdAt: new Date("2024-01-01"),
    coverImage: "https://github.com/shadcn.png",
  };

  if (!user) {
    notFound();
  }

  return <UserProfile user={user} />;
}
