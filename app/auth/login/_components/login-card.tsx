import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { LoginForm } from "./login-form";

export function LoginCard() {
  return (
    <Card className="w-full md:max-w-md mx-auto mt-10">
      <CardHeader>
        <CardTitle className="text-2xl">Bem-vindo de volta!</CardTitle>
        <CardDescription>
          Entre com seu email e senha para continuar
        </CardDescription>
      </CardHeader>
      <CardContent>
        <LoginForm />
      </CardContent>
    </Card>
  );
}
