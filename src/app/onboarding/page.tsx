"use client";

import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Building2, GitBranch, Loader2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const workspaceSchema = z.object({
  name: z
    .string()
    .min(2, "Nome deve ter pelo menos 2 caracteres")
    .max(50, "Nome deve ter no máximo 50 caracteres"),
});

type WorkspaceFormValues = z.infer<typeof workspaceSchema>;

const STEPS = ["Workspace", "Equipe", "Primeiro lead"] as const;

export default function OnboardingPage() {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<WorkspaceFormValues>({
    resolver: zodResolver(workspaceSchema),
  });

  async function onSubmit(_data: WorkspaceFormValues) {
    await new Promise((resolve) => setTimeout(resolve, 800));
    router.push("/dashboard");
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-zinc-950 p-4">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="mb-10 flex flex-col items-center gap-2">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-indigo-600">
            <GitBranch className="h-5 w-5 text-white" />
          </div>
          <span className="text-xl font-semibold text-zinc-50">
            PipeFlow CRM
          </span>
        </div>

        {/* Step indicator */}
        <div className="mb-8 flex items-center justify-center">
          {STEPS.map((step, index) => (
            <div key={step} className="flex items-center">
              <div className="flex items-center gap-2">
                <div
                  className={
                    index === 0
                      ? "flex h-6 w-6 items-center justify-center rounded-full bg-indigo-600 text-xs font-semibold text-white"
                      : "flex h-6 w-6 items-center justify-center rounded-full bg-zinc-800 text-xs font-semibold text-zinc-500"
                  }
                >
                  {index + 1}
                </div>
                <span
                  className={
                    index === 0
                      ? "text-sm font-medium text-zinc-300"
                      : "text-sm text-zinc-600"
                  }
                >
                  {step}
                </span>
              </div>
              {index < STEPS.length - 1 && (
                <div className="mx-3 h-px w-8 bg-zinc-800" />
              )}
            </div>
          ))}
        </div>

        {/* Card */}
        <div className="rounded-xl border border-zinc-800 bg-zinc-900 p-6">
          <div className="mb-6 flex items-start gap-4">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-indigo-950">
              <Building2 className="h-5 w-5 text-indigo-400" />
            </div>
            <div>
              <h1 className="text-lg font-semibold text-zinc-50">
                Qual o nome do seu workspace?
              </h1>
              <p className="mt-0.5 text-sm text-zinc-500">
                Pode ser o nome da sua empresa, equipe ou projeto.
              </p>
            </div>
          </div>

          <form
            onSubmit={handleSubmit(onSubmit)}
            className="space-y-4"
            noValidate
          >
            <div className="space-y-1.5">
              <Label htmlFor="name" className="text-zinc-300">
                Nome do workspace
              </Label>
              <Input
                id="name"
                type="text"
                placeholder="Ex: Acme Vendas, Minha Startup..."
                autoFocus
                aria-invalid={!!errors.name}
                {...register("name")}
              />
              {errors.name && (
                <p className="text-xs text-red-400">{errors.name.message}</p>
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
                  Criando workspace...
                </>
              ) : (
                "Criar workspace e continuar"
              )}
            </Button>
          </form>
        </div>

        <p className="mt-4 text-center text-xs text-zinc-600">
          Você pode alterar o nome do workspace depois nas configurações.
        </p>
      </div>
    </div>
  );
}
