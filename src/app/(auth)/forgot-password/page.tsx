"use client";

import { useState } from "react";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { ArrowLeft, CheckCircle, Loader2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const forgotSchema = z.object({
  email: z.string().email("E-mail inválido"),
});

type ForgotFormValues = z.infer<typeof forgotSchema>;

export default function ForgotPasswordPage() {
  const [submittedEmail, setSubmittedEmail] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ForgotFormValues>({
    resolver: zodResolver(forgotSchema),
  });

  async function onSubmit(data: ForgotFormValues) {
    await new Promise((resolve) => setTimeout(resolve, 800));
    setSubmittedEmail(data.email);
  }

  if (submittedEmail) {
    return (
      <div className="rounded-xl border border-zinc-800 bg-zinc-900 p-6 text-center">
        <div className="mb-4 flex justify-center">
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-emerald-950">
            <CheckCircle className="h-6 w-6 text-emerald-400" />
          </div>
        </div>
        <h2 className="text-lg font-semibold text-zinc-50">
          Verifique seu e-mail
        </h2>
        <p className="mt-2 text-sm text-zinc-500">
          Enviamos as instruções para{" "}
          <span className="font-medium text-zinc-300">{submittedEmail}</span>.
          Verifique também a pasta de spam.
        </p>
        <Link
          href="/login"
          className="mt-6 flex items-center justify-center gap-2 text-sm text-zinc-400 transition-colors hover:text-zinc-200"
        >
          <ArrowLeft className="h-4 w-4" />
          Voltar ao login
        </Link>
      </div>
    );
  }

  return (
    <div className="rounded-xl border border-zinc-800 bg-zinc-900 p-6">
      <div className="mb-6">
        <h1 className="text-lg font-semibold text-zinc-50">Recuperar senha</h1>
        <p className="mt-1 text-sm text-zinc-500">
          Enviaremos um link para redefinir sua senha
        </p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4" noValidate>
        <div className="space-y-1.5">
          <Label htmlFor="email" className="text-zinc-300">
            E-mail da conta
          </Label>
          <Input
            id="email"
            type="email"
            placeholder="voce@empresa.com"
            autoComplete="email"
            aria-invalid={!!errors.email}
            {...register("email")}
          />
          {errors.email && (
            <p className="text-xs text-red-400">{errors.email.message}</p>
          )}
        </div>

        <Button
          type="submit"
          className="h-9 w-full"
          disabled={isSubmitting}
        >
          {isSubmitting ? (
            <>
              <Loader2 className="animate-spin" />
              Enviando...
            </>
          ) : (
            "Enviar link de recuperação"
          )}
        </Button>
      </form>

      <Link
        href="/login"
        className="mt-6 flex items-center justify-center gap-2 text-sm text-zinc-500 transition-colors hover:text-zinc-300"
      >
        <ArrowLeft className="h-4 w-4" />
        Voltar ao login
      </Link>
    </div>
  );
}
