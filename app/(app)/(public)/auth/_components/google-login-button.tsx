import { signIn } from "next-auth/react";

import { Button } from "../ui/button";
import { Icons } from "../icons";

export function GoogleLoginButton() {
  const onClick = () => {
    signIn("google");
  };

  return (
    <Button variant="outline" className="w-full" onClick={onClick}>
      <Icons.google className="mr-2 size-4" />
      Continuar com Google
    </Button>
  );
}
