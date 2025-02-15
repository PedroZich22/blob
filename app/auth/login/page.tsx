import { auth } from "@/auth";
import { LoginCard } from "./_components/login-card";
import { redirect } from "next/navigation";

export default async function LoginPage() {
  const session = await auth();
  if (session) redirect("/");

  return <LoginCard />;
}
