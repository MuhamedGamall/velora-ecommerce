"use client";

import { signIn } from "next-auth/react";

import { useCallback, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
} from "@/components/ui/dialog";
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
import Image from "next/image";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import * as z from "zod";
import useLoginModal from "../../hooks/useLoginModal";
import useRegisterModal from "../../hooks/useRegisterModal";
const formSchema = z.object({
  email: z.string().trim().email("Please enter valid email address"),
  password: z
    .string()
    .trim()
    .min(6, { message: "Password must be at least 6 characters" }),
});

const LoginModal = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const registerModal = useRegisterModal();
  const loginModal = useLoginModal();
  const [error, setError] = useState("");
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit: SubmitHandler<z.infer<typeof formSchema>> = (data) => {
    setIsLoading(true);
    signIn("credentials", {
      ...data,
      redirect: false,
    })
      .then((callback) => {
        if (callback?.ok) {
          toast.success("Logged in successfully");
          router.refresh();
          loginModal.onClose();
        }
        console.log(callback);

        if (callback?.error) {
          if (callback.status === 401) {
            setError("Invalid email or password");
          } else toast.error("Something went wrong");
        }
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const toggle = useCallback(() => {
    loginModal.onClose();
    registerModal.onOpen();
  }, [loginModal, registerModal]);

  return (
    <Dialog open={loginModal.isOpen} onOpenChange={loginModal.onClose}>
      <DialogContent>
        <div className="flex flex-col gap-4">
          <DialogHeader>
            <Heading title="Login" subtitle="Login to your account" />
          </DialogHeader>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
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
                      <Input type="password" placeholder="password" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="flex flex-col gap-4 mt-3">
                {error && <span className="text-red-500 ">{error}</span>}

                <SubmitButton
                  isLoading={isLoading}
                  className="w-full py-6 bg-rose-500"
                >
                  Continue
                </SubmitButton>

                <hr />
                <Button disabled={isLoading} variant={"outline"} onClick={() => signIn("google")}>
                  <Image
                    src={
                      "https://img.icons8.com/?size=100&id=17949&format=png&color=000000"
                    }
                    width={25}
                    height={25}
                    alt="Google"
                    className="mr-2"
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
                    <div>First time using Airbnb?</div>
                    <div
                      onClick={toggle}
                      className="
							text-neutral-800
							cursor-pointer
							hover:underline
						"
                    >
                      Create an account
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

export default LoginModal;
