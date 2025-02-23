import { auth } from "@/auth";
import { RegisterWizard } from "./_components/register-wizard";
import { redirect } from "next/navigation";

export default async function RegisterPage() {
  const session = await auth();
  if (session) redirect("/");

  return <RegisterWizard />;
}
