import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowLeftIcon } from "lucide-react";

export function ErrorCard() {
  return (
    <Card className="w-full md:w-[487px] shadow-lg h-full">
      <CardHeader>
        <CardTitle className="text-2xl">Boops! Algo deu errado.</CardTitle>
        <CardDescription>
          Não foi possível processar a sua solicitação.
        </CardDescription>
      </CardHeader>
      <CardFooter className="flex justify-center">
        <Button variant="link" asChild>
          <Link href="/auth/login">
            <ArrowLeftIcon className="size-4 mr-2" />
            Voltar para o login
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
}
