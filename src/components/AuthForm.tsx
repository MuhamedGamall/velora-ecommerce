"use client";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { signUp } from "next-auth-sanity/client";
import { signIn } from "next-auth/react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { asLoadable } from "sanity";
import { toast } from "sonner";
import * as z from "zod";
const AuthForm = ({
  type,
  formSchema,
}: {
  type: "login" | "register";
  formSchema: any;
}) => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      ...(type === "register" && { name: "" }),
      email: "",
      password: "",
    },
  });

  const onSubmit: SubmitHandler<z.infer<typeof formSchema>> = async (data) => {
    setIsLoading(true);
    if (type === "login") {
      await signIn("sanity-login", {
        ...data,
        callbackUrl: "/",
        redirect: false,
      })
        .then((callback) => {
          if (callback?.ok) {
            toast.success("Logged in successfully");
            router.refresh();
            router.replace("/");
          } else if (callback?.error) {
            console.log({ error });

            if (callback.status === 401) {
              setError("Invalid email or password");
            } else {
              toast.error("Something went wrong");
            }
          }
        })
        .finally(() => {
          setIsLoading(false);
        });
    } else if (type === "register") {
      await signUp(data)
        .then(() => {
          toast.success("Account created successfully");
          setTimeout(() => {
            router.replace("/auth/signIn");
          }, 1500);
        })
        .catch((error) => {
          console.log(error);

          toast.error("Something went wrong, please try again");
        })
        .finally(() => {
          setIsLoading(false);
        });
    }
  };

  return (
    <div className="flex items-center h-screen justify-center w-full">
      <div className="max-w-[450px] w-full border p-3">
        <h2 className="text-lg font-semibold">
          {type === "login" ? "Do you have an account?" : "Create an account"}
        </h2>
        <hr className="my-3" />

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            {type === "register" && (
              <FormField
                disabled={isLoading}
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Username</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Enter username"
                        className="rounded-none"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            )}
            <FormField
              control={form.control}
              name="email"
              disabled={isLoading}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email Address</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Enter your email"
                      className="rounded-none"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              disabled={isLoading}
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input
                      className="rounded-none"
                      type="password"
                      placeholder="Enter your password"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            {error && (
              <div className="flex justify-center">
                <p className="text-red-500">{error}</p>
              </div>
            )}
            <Button
              disabled={isLoading}
              type="submit"
              className="w-full rounded-none bg-mainBlack text-white"
            >
              {type === "login" ? "Sign In" : "Sign Up"}
            </Button>
          </form>
        </Form>

        <Button
          disabled={isLoading}
          variant={"outline"}
          onClick={() => signIn("google", { callbackUrl: "/" })}
          className=" flex items-center mt-1 gap-2 w-full rounded-none "
        >
          <Image
            src={
              "https://img.icons8.com/?size=100&id=17949&format=png&color=000000"
            }
            width={30}
            height={30}
            priority={true}
            alt="google icon"
          />
          Sign {type === "register" ? "Up" : "In"} with Google
        </Button>
        <hr className="my-3" />

        <div className=" text-sm text-neutral-500 w-fit">
          {type === "login" ? "Don't" : "Already"} have an account?
          <button
            disabled={isLoading}
            onClick={() =>
              router.push(type === "login" ? "/auth/register" : "/auth/signIn")
            }
            className="text-slate-700 ml-2 cursor-pointer underline"
          >
            {type === "login" ? "Sign Up" : "Sign In"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default AuthForm;
