"use client";

import { z } from "zod";
import { FcGoogle } from "react-icons/fc";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import Link from "next/link";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import axios from "axios";
import { useToast } from "@/hooks/use-toast";
import { signIn } from "next-auth/react";

const formSchema = z.object({
  name: z.string().trim().min(1, "Required"),
  email: z.string().email(),
  password: z.string().min(8, "Minumum 8 characters"),
});

type SignUpData = z.infer<typeof formSchema>;

export const SignUpCard = () => {
  const { toast } = useToast();
  const form = useForm<SignUpData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  const onSubmit = async (values: SignUpData) => {
    try {
      await axios.post("/api/register", values);

      toast({ description: "Account created!", variant: "success" });

      signIn("credentials", {
        email: values.email,
        password: values.password,
        redirect: false,
      });
    } catch (error) {
      console.log(error);
      toast({ description: "Something went wrong.", variant: "destructive" });
    }
  };

  return (
    <Card className="w-full md:w-[487px] h-full">
      <CardHeader className="flex items-center justify-center text-center p-7">
        <CardTitle className="text-xl">Sign Up</CardTitle>
        <CardDescription>
          By signing up, you agree to our{" "}
          <Link href="/privacy">
            <span className="underline">Privacy Policy</span>
          </Link>{" "}
          and{" "}
          <Link href="/terms">
            <span className="underline">Terms of Service</span>
          </Link>
        </CardDescription>
      </CardHeader>
      <Separator />
      <CardContent className="p-7">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              name="name"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input {...field} type="name" placeholder="Name" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
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
        <Button disabled={false} className="w-full" variant="secondary">
          <FcGoogle className="mr-2 size-5" />
          Login with Google
        </Button>
      </CardContent>
      <div className="px-7">
        <Separator />
      </div>
      <CardContent className="p-7 flex items-center justify-center">
        <p>Already have an account?&nbsp;</p>
        <Link href="/sign-in">
          <span className="underline">Login</span>
        </Link>
      </CardContent>
    </Card>
  );
};
