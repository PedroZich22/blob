import { FcGoogle } from "react-icons/fc";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";

export const SignInCard = () => {
  return (
    <Card className="w-full md:w-[487px] h-full">
      <CardHeader className="flex items-center justify-center text-center p-7">
        <CardTitle className="text-xl">Welcome back!</CardTitle>
      </CardHeader>
      <Separator />
      <CardContent className="p-7">
        <form className="space-y-4">
          <Input
            required
            type="email"
            value={""}
            onChange={() => {}}
            placeholder="Email"
            disabled={false}
          />
          <Input
            required
            type="password"
            value={""}
            onChange={() => {}}
            placeholder="Password"
            min={8}
            max={64}
            disabled={false}
          />
          <Button className="w-full">Login</Button>
        </form>
      </CardContent>
      <div>
        <Separator />
        <CardContent className="p-7 flex flex-col gap-y-4">
          <Button disabled={false} className="w-full" variant="secondary">
            <FcGoogle className="mr-2 size-5" />
            Login with Google
          </Button>
        </CardContent>
      </div>
    </Card>
  );
};
