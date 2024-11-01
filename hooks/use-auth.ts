"use client";

import { signIn, signOut, useSession } from "next-auth/react";
import { useState, useCallback } from "react";

interface LoginCredentials {
  email: string;
  password: string;
}

interface RegisterData {
  email: string;
  password: string;
  name: string;
  username?: string;
}

export function useAuth() {
  const { data: session, status } = useSession();
  const [isLoading, setIsLoading] = useState(false);

  const isAuthenticated = !!session?.user;

  const login = useCallback(async (
    provider: string, 
    credentials?: LoginCredentials
  ) => {
    try {
      setIsLoading(true);
      if (provider === "credentials" && credentials) {
        await signIn("credentials", {
          ...credentials,
          callbackUrl: "/",
        });
      } else {
        await signIn(provider, {
          callbackUrl: "/",
        });
      }
    } catch (error) {
      console.error("Erro ao fazer login:", error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  }, []);

  const register = useCallback(async (data: RegisterData) => {
    try {
      setIsLoading(true);
      const response = await fetch("/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || "Erro ao registrar usuário");
      }

      await login("credentials", {
        email: data.email,
        password: data.password,
      });
    } catch (error) {
      console.error("Erro ao registrar:", error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  }, [login]);

  const logout = useCallback(async () => {
    try {
      setIsLoading(true);
      await signOut({ callbackUrl: "/login" });
    } catch (error) {
      console.error("Erro ao fazer logout:", error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  }, []);

  return {
    user: session?.user,
    session,
    status,
    isLoading,
    isAuthenticated,
    login,
    logout,
    register,
  };
}

// Tipos para melhor tipagem do usuário
declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      name?: string | null;
      email?: string | null;
      image?: string | null;
      username?: string | null;
    };
  }
}
