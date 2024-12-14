import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ArrowLeft, BadgeCheck } from "lucide-react";
import Link from "next/link";

export default function SuccessPage() {
  return (
    <Card className="w-full md:max-w-md mx-auto mt-10">
      <CardHeader>
        <CardTitle className="text-2xl">
          Sua conta foi criada com sucesso!
        </CardTitle>
        <CardDescription>Seja bem-vindo à plataforma!</CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col items-center justify-center gap-2">
        <BadgeCheck size={64} className="text-success" />
        <p className="mt-4 text-center">
          Dê uma olhadinha no seu email para verificar a sua conta
        </p>
      </CardContent>
      <CardFooter className="flex justify-center">
        <Button variant="link" Icon={ArrowLeft} iconPlacement="left" asChild>
          <Link href="/auth/login">Voltar ao login</Link>
        </Button>
      </CardFooter>
    </Card>
  );
}
