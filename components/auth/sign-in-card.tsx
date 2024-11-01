"use client";

import { FcGoogle } from "react-icons/fc";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import Link from "next/link";
import { useCallback } from "react";
import axios from "axios";
import { useAuth } from "@/hooks/use-auth";
const formSchema = z.object({
  email: z.string().email(),
  password: z.string().min(1, "Required"),
});

type SignInData = z.infer<typeof formSchema>;

export function SignInCard() {
  const { login } = useAuth();
  const form = useForm<SignInData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = useCallback(async (values: SignInData) => {
    await axios.post("/api/auth/", values);
  }, []);

  return (
    <Card className="w-full md:w-[487px]">
      <CardHeader className="flex items-center justify-center text-center p-7">
        <CardTitle className="text-xl">Welcome back!</CardTitle>
      </CardHeader>
      <Separator />
      <CardContent className="p-7">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              name="email"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input {...field} type="email" placeholder="Email" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              name="password"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input {...field} type="password" placeholder="Password" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button className="w-full">Login</Button>
          </form>
        </Form>
      </CardContent>
      <div className="px-7">
        <Separator />
      </div>
      <CardContent className="p-7 flex flex-col gap-y-4">
        <Button
          disabled={false}
          className="w-full"
          variant="secondary"
          onClick={() => login("google")}
        >
          <FcGoogle className="mr-2 size-5" />
          Login with Google
        </Button>
      </CardContent>
      <div className="px-7">
        <Separator />
      </div>
      <CardContent className="p-7 flex items-center justify-center">
        <p>Don&apos;t have an account?&nbsp;</p>
        <Link href="/sign-up">
          <span className="underline text-primary">Sign Up</span>
        </Link>
      </CardContent>
    </Card>
  );
}
