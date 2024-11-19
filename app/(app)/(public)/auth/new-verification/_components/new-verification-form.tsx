"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { BubbleSpinner } from "@/components/ui/bubble-spinner";
import { useSearchParams } from "next/navigation";
import { useCallback, useEffect } from "react";
import { ArrowLeftIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { newVerification } from "@/actions/new-verification";
import { useToast } from "@/hooks/use-toast";
import Link from "next/link";

export function NewVerificationForm() {
  const { toast } = useToast();
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

    newVerification(token).then((result) => {
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
      }
    });
  }, [token, toast]);

  useEffect(() => {
    onSubmit();
  }, [onSubmit]);

  return (
    <Card className="w-full md:w-[487px] shadow-lg h-full">
      <CardHeader>
        <CardTitle>Confirmando seu email</CardTitle>
        <CardDescription>
          Você estará pronto para começar a usar o Blob!
        </CardDescription>
      </CardHeader>
      <CardContent className="flex justify-center items-center">
        <BubbleSpinner size="lg" variant="primary" />
      </CardContent>
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
