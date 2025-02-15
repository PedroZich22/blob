import { Button } from "@/components/ui/button";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex h-screen items-center justify-center">
      <Card>
        <CardHeader>
          <CardTitle>Boops! Página não encontrada</CardTitle>
          <CardDescription>
            A página que você procura não foi encontrada.
          </CardDescription>
        </CardHeader>
        <CardFooter>
          <Button variant="link" iconPlacement="left" Icon={ArrowLeft} asChild>
            <Link href="/">Voltar para a página inicial</Link>
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
