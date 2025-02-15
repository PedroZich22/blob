import { auth } from "@/auth";
import { Interests } from "@/components/interests";
import { BlobFeed } from "@/components/blob-feed";
import { redirect } from "next/navigation";

export default async function HomePage() {
  const session = await auth();
  if (!session) redirect("/auth/login");

  return (
    <div className="p-6 space-y-4">
      <Interests />
      <BlobFeed />
    </div>
  );
}
