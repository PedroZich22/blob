import { signIn } from "next-auth/react";
import { FaGoogle } from "react-icons/fa";

import { Button } from "@/components/ui/button";

export function GoogleLoginButton() {
  const onClick = () => {
    signIn("google");
  };

  return (
    <Button variant="outline" className="w-full" onClick={onClick}>
      <FaGoogle className="mr-2 size-4" />
      Continuar com Google
    </Button>
  );
}
