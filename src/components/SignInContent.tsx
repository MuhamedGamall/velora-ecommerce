"use client";
import AuthForm from "@/components/AuthForm";
import { parseStringify } from "@/lib/utils";
import { z } from "zod";

const formSchema = z.object({
  email: z.string().trim().email("Please enter a valid email address"),
  password: z
    .string()
    .trim()
    .min(6, { message: "Password must be at least 6 characters" }),
});
export default function SignInContent() {
  return <AuthForm type={"login"} formSchema={formSchema} />;
}
