"use client";

import { LoginCard } from "./_components/login-card";
import { useToast } from "@/hooks/use-toast";
import { useSearchParams } from "next/navigation";
import { useEffect } from "react";

export default function LoginPage() {
  const { toast } = useToast();
  const searchParams = useSearchParams();
  const error = searchParams.get("error");

  useEffect(() => {
    if (error === "OAuthAccountNotLinked") {
      toast({
        variant: "destructive",
        title: "Conta Google já vinculada",
        description: "Conta Google já cadastrada, faça login com o Google",
      });
    }
  }, [error, toast]);

  return <LoginCard />;
}
