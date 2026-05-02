"use client";

import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod/v4";
import { Loader2 } from "lucide-react";

import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
  SheetFooter,
} from "@/components/ui/sheet";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { type Lead, STATUS_CONFIG } from "@/lib/mock/leads";
import { type LeadStatus } from "@/types/database";

const leadSchema = z.object({
  name: z.string().min(2, "Nome deve ter ao menos 2 caracteres"),
  email: z.string().email("E-mail inválido").or(z.literal("")).optional(),
  phone: z.string().optional(),
  company: z.string().optional(),
  position: z.string().optional(),
  status: z.enum(["new", "contacted", "qualified", "unqualified", "customer"]),
});

type LeadFormValues = z.infer<typeof leadSchema>;

interface LeadFormProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  lead?: Lead | null;
  onSubmit: (values: LeadFormValues, isEdit: boolean) => void;
}

export function LeadForm({ open, onOpenChange, lead, onSubmit }: LeadFormProps) {
  const isEdit = !!lead;

  const form = useForm<LeadFormValues>({
    resolver: zodResolver(leadSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      company: "",
      position: "",
      status: "new",
    },
  });

  useEffect(() => {
    if (open) {
      form.reset(
        lead
          ? {
              name: lead.name,
              email: lead.email ?? "",
              phone: lead.phone ?? "",
              company: lead.company ?? "",
              position: lead.position ?? "",
              status: lead.status,
            }
          : { name: "", email: "", phone: "", company: "", position: "", status: "new" }
      );
    }
  }, [open, lead, form]);

  function handleSubmit(values: LeadFormValues) {
    onSubmit(values, isEdit);
    onOpenChange(false);
  }

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent showCloseButton={false} className="flex flex-col gap-0 border-zinc-800 bg-zinc-900 p-0 sm:max-w-md">
        <SheetHeader className="border-b border-zinc-800 px-6 py-4">
          <SheetTitle className="text-zinc-50">
            {isEdit ? "Editar Lead" : "Novo Lead"}
          </SheetTitle>
          <SheetDescription className="text-zinc-500">
            {isEdit
              ? "Atualize as informações do lead abaixo."
              : "Preencha os dados para adicionar um novo lead ao seu pipeline."}
          </SheetDescription>
        </SheetHeader>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleSubmit)}
            className="flex flex-1 flex-col overflow-hidden"
          >
            <div className="flex-1 space-y-4 overflow-y-auto px-6 py-5">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-zinc-300">
                      Nome <span className="text-red-500">*</span>
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Ex: Fernanda Oliveira"
                        className="border-zinc-700 bg-zinc-800 text-zinc-100 placeholder:text-zinc-600 focus-visible:ring-indigo-500"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage className="text-red-400" />
                  </FormItem>
                )}
              />

              <div className="grid grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="company"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-zinc-300">Empresa</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Ex: Tech Solutions"
                          className="border-zinc-700 bg-zinc-800 text-zinc-100 placeholder:text-zinc-600 focus-visible:ring-indigo-500"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage className="text-red-400" />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="position"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-zinc-300">Cargo</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Ex: Diretor de Vendas"
                          className="border-zinc-700 bg-zinc-800 text-zinc-100 placeholder:text-zinc-600 focus-visible:ring-indigo-500"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage className="text-red-400" />
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-zinc-300">E-mail</FormLabel>
                    <FormControl>
                      <Input
                        type="email"
                        placeholder="ex@empresa.com.br"
                        className="border-zinc-700 bg-zinc-800 text-zinc-100 placeholder:text-zinc-600 focus-visible:ring-indigo-500"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage className="text-red-400" />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="phone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-zinc-300">Telefone</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="(11) 99999-9999"
                        className="border-zinc-700 bg-zinc-800 text-zinc-100 placeholder:text-zinc-600 focus-visible:ring-indigo-500"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage className="text-red-400" />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="status"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-zinc-300">Status</FormLabel>
                    <Select onValueChange={field.onChange} value={field.value}>
                      <FormControl>
                        <SelectTrigger className="w-full border-zinc-700 bg-zinc-800 text-zinc-100 focus:ring-indigo-500">
                          <SelectValue />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent className="border-zinc-700 bg-zinc-800">
                        {(Object.keys(STATUS_CONFIG) as LeadStatus[]).map((s) => (
                          <SelectItem
                            key={s}
                            value={s}
                            className="text-zinc-200 focus:bg-zinc-700 focus:text-zinc-50"
                          >
                            {STATUS_CONFIG[s].label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage className="text-red-400" />
                  </FormItem>
                )}
              />
            </div>

            <SheetFooter className="border-t border-zinc-800 px-6 py-4">
              <Button
                type="button"
                variant="outline"
                onClick={() => onOpenChange(false)}
                className="border-zinc-700 bg-transparent text-zinc-400 hover:bg-zinc-800 hover:text-zinc-200"
              >
                Cancelar
              </Button>
              <Button
                type="submit"
                disabled={form.formState.isSubmitting}
                className="bg-indigo-600 text-white hover:bg-indigo-500"
              >
                {form.formState.isSubmitting ? (
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                ) : null}
                {isEdit ? "Salvar alterações" : "Criar lead"}
              </Button>
            </SheetFooter>
          </form>
        </Form>
      </SheetContent>
    </Sheet>
  );
}
