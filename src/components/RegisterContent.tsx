"use client";
import AuthForm from "@/components/AuthForm";
import { parseStringify } from "@/lib/utils";
import { z } from "zod";

const formSchema = z.object({
  name: z
    .string()
    .trim()
    .min(3, { message: "Name must be at least 3 characters" }),
  email: z.string().trim().email("Please enter a valid email address"),
  password: z
    .string()
    .trim()
    .min(6, { message: "Password must be at least 6 characters" }),
});
export default function RegisterContent() {
  return <AuthForm type={"register"} formSchema={formSchema} />;
}
