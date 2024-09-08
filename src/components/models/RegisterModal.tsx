"use client";

import { signIn } from "next-auth/react";

import { useCallback, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";

import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTrigger } from "@/components/ui/dialog";
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
import axios from "axios";
import Image from "next/image";
import { toast } from "sonner";
import * as z from "zod";
import useLoginModal from "../../hooks/useLoginModal";
import useRegisterModal from "../../hooks/useRegisterModal";
import { signUp } from "next-auth-sanity/client";

const formSchema = z.object({
  name: z.string().trim().min(2, { message: "Please enter a name" }),
  password: z
    .string()
    .trim()
    .min(6, { message: "Password must be at least 6 characters" }),
  email: z.string().trim().email({ message: "Please enter a valid email" }),
});

const RegisterModel = () => {
  const [isLoading, setIsLoading] = useState(false);
  const registerModal = useRegisterModal();
  const loginModal = useLoginModal();
  const [error, setError] = useState("");
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
      name: "",
    },
  });

  const onSubmit: SubmitHandler<z.infer<typeof formSchema>> = async (data) => {
    setIsLoading(true);
    const user = await signUp(data)
      .then(() => {
        toast("Account created successfully");
        registerModal.onClose();
        loginModal.onOpen();
      })
      .catch((err) => {
        if (err.status === 409) {
          setError("This email is already taken");
        } else toast.error("Something went wrong");
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const toggle = useCallback(() => {
    loginModal.onOpen();
    registerModal.onClose();
  }, [loginModal, registerModal]);

  return (
    <Dialog open={registerModal.isOpen} onOpenChange={registerModal.onClose}>
      <DialogContent>
        <DialogTrigger>
          <Button variant="ghost" onClick={toggle}>
            Register
          </Button>
        </DialogTrigger>
        <div className="flex flex-col gap-4">
          <DialogHeader></DialogHeader>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <FormField
                disabled={isLoading}
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Username</FormLabel>
                    <FormControl>
                      <Input placeholder="name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                disabled={isLoading}
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input placeholder="email" {...field} />
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
                        type="password"
                        placeholder="password"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="flex flex-col gap-4 mt-3">
                {error && <span className="text-red-500 ">{error}</span>}

                <Button
                  disabled={isLoading}
                  variant={"outline"}
                  className="rounded-none"
                >
                  Continue
                </Button>

                <hr />
                <Button
                  disabled={isLoading}
                  variant={"outline"}
                  onClick={() => signIn("google")}
                >
                  <Image
                    src={
                      "https://img.icons8.com/?size=100&id=17949&format=png&color=000000"
                    }
                    width={25}
                    height={25}
                    className="mr-2"
                    alt="Google"
                  />
                  Continue with Google
                </Button>
                <div
                  className="
					text-neutral-500
					text-center
					mt-4
					font-light
				"
                >
                  <div className="justify-center flex flex-row items-center gap-2">
                    <div>Already have an account?</div>
                    <div
                      onClick={toggle}
                      className="
							text-neutral-800
							cursor-pointer
							hover:underline
						"
                    >
                      Log in
                    </div>
                  </div>
                </div>
              </div>
            </form>
          </Form>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default RegisterModel;
