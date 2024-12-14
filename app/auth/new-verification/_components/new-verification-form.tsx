"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useRouter, useSearchParams } from "next/navigation";
import { useCallback, useTransition } from "react";
import { ArrowLeftIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { newVerification } from "@/actions/auth/new-verification";
import { useToast } from "@/hooks/use-toast";
import Link from "next/link";
import { DEFAULT_LOGIN_REDIRECT } from "@/routes";
import { BubbleSpinner } from "@/components/ui/bubble-spinner";

export function NewVerificationForm() {
  const router = useRouter();
  const { toast } = useToast();

  const [isPending, startTransition] = useTransition();
  const searchParams = useSearchParams();
  const token = searchParams.get("token");

  const onSubmit = useCallback(() => {
    if (!token) {
      toast({
        variant: "destructive",
        title: "Token inválido",
        description: "O token não foi encontrado",
      });
      return;
    }

    startTransition(async () => {
      const result = await newVerification(token);

      if (result?.error) {
        toast({
          variant: "destructive",
          title: "Erro ao confirmar email",
          description: result.error,
        });
      }

      if (result?.success) {
        toast({
          variant: "success",
          title: "Email confirmado com sucesso",
          description: result.success,
        });

        router.push("/auth/login");
      }
    });
  }, [token, toast]);

  return (
    <Card className="w-full md:w-[487px] shadow-lg h-full">
      <CardHeader>
        <CardTitle>Confirmando seu email</CardTitle>
        <CardDescription>
          Você estará pronto para começar a usar o Blob!
        </CardDescription>
      </CardHeader>
      <CardContent className="flex justify-center items-center">
        {isPending ? (
          <BubbleSpinner size="lg" variant="primary" />
        ) : (
          <Button onClick={onSubmit}>Verificar email</Button>
        )}
      </CardContent>
      <CardFooter className="flex justify-center">
        <Button
          variant="link"
          Icon={ArrowLeftIcon}
          iconPlacement="left"
          asChild
        >
          <Link href="/auth/login">Voltar ao login</Link>
        </Button>
      </CardFooter>
    </Card>
  );
}
