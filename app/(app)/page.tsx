import { auth } from "@/auth";

export default async function HomePage() {
  const session = await auth();

  return <div>{JSON.stringify(session)}</div>;
}
