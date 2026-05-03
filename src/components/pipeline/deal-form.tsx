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
import { MOCK_LEADS, MOCK_OWNERS } from "@/lib/mock/leads";
import { type Deal, STAGE_CONFIG, STAGES_ORDER } from "@/lib/mock/deals";
import { type DealStage } from "@/types/database";

const dealSchema = z.object({
  title: z.string().min(2, "Título deve ter ao menos 2 caracteres"),
  valueStr: z.string().optional(),
  stage: z.enum([
    "new_lead",
    "contacted",
    "proposal_sent",
    "negotiation",
    "closed_won",
    "closed_lost",
  ]),
  lead_id: z.string().optional(),
  owner_id: z.string(),
  due_date: z.string().optional(),
});

type DealFormValues = z.infer<typeof dealSchema>;

export interface DealSubmitValues {
  title: string;
  value: number | null;
  stage: DealStage;
  lead_id?: string;
  owner_id: string;
  due_date?: string;
}

interface DealFormProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  deal?: Deal | null;
  defaultStage?: DealStage;
  onSubmit: (values: DealSubmitValues, isEdit: boolean) => void;
}

export function DealForm({
  open,
  onOpenChange,
  deal,
  defaultStage = "new_lead",
  onSubmit,
}: DealFormProps) {
  const isEdit = !!deal;

  const form = useForm<DealFormValues>({
    resolver: zodResolver(dealSchema),
    defaultValues: {
      title: "",
      valueStr: "",
      stage: defaultStage,
      lead_id: "",
      owner_id: MOCK_OWNERS[0]!.id,
      due_date: "",
    },
  });

  useEffect(() => {
    if (open) {
      form.reset(
        deal
          ? {
              title: deal.title,
              valueStr: deal.value != null ? String(deal.value) : "",
              stage: deal.stage,
              lead_id: deal.lead_id ?? "",
              owner_id: deal.owner.id,
              due_date: deal.due_date ?? "",
            }
          : {
              title: "",
              valueStr: "",
              stage: defaultStage,
              lead_id: "",
              owner_id: MOCK_OWNERS[0]!.id,
              due_date: "",
            }
      );
    }
  }, [open, deal, defaultStage, form]);

  function handleSubmit(values: DealFormValues) {
    const parsed = parseFloat(values.valueStr ?? "");
    onSubmit(
      {
        ...values,
        value: Number.isFinite(parsed) && parsed >= 0 ? parsed : null,
      },
      isEdit
    );
    onOpenChange(false);
  }

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent
        showCloseButton={false}
        className="flex flex-col gap-0 border-zinc-800 bg-zinc-900 p-0 sm:max-w-md"
      >
        <SheetHeader className="border-b border-zinc-800 px-6 py-4">
          <SheetTitle className="text-zinc-50">
            {isEdit ? "Editar Negócio" : "Novo Negócio"}
          </SheetTitle>
          <SheetDescription className="text-zinc-500">
            {isEdit
              ? "Atualize as informações do negócio abaixo."
              : "Preencha os dados para adicionar um novo negócio ao pipeline."}
          </SheetDescription>
        </SheetHeader>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleSubmit)}
            className="flex flex-1 flex-col overflow-hidden"
          >
            <div className="flex-1 space-y-4 overflow-y-auto px-6 py-5">
              {/* Title */}
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-zinc-300">
                      Título <span className="text-red-500">*</span>
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Ex: Contrato Anual — Empresa XYZ"
                        className="border-zinc-700 bg-zinc-800 text-zinc-100 placeholder:text-zinc-600 focus-visible:ring-indigo-500"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage className="text-red-400" />
                  </FormItem>
                )}
              />

              {/* Value + Stage */}
              <div className="grid grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="valueStr"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-zinc-300">Valor (R$)</FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          min="0"
                          step="0.01"
                          placeholder="Ex: 4800"
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
                  name="stage"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-zinc-300">Estágio</FormLabel>
                      <Select onValueChange={field.onChange} value={field.value}>
                        <FormControl>
                          <SelectTrigger className="w-full border-zinc-700 bg-zinc-800 text-zinc-100 focus:ring-indigo-500">
                            <SelectValue />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent className="border-zinc-700 bg-zinc-800">
                          {STAGES_ORDER.map((s) => (
                            <SelectItem
                              key={s}
                              value={s}
                              className="text-zinc-200 focus:bg-zinc-700 focus:text-zinc-50"
                            >
                              {STAGE_CONFIG[s].label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage className="text-red-400" />
                    </FormItem>
                  )}
                />
              </div>

              {/* Lead */}
              <FormField
                control={form.control}
                name="lead_id"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-zinc-300">Lead vinculado</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      value={field.value ?? ""}
                    >
                      <FormControl>
                        <SelectTrigger className="w-full border-zinc-700 bg-zinc-800 text-zinc-100 focus:ring-indigo-500">
                          <SelectValue placeholder="Nenhum" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent className="border-zinc-700 bg-zinc-800">
                        <SelectItem
                          value=""
                          className="text-zinc-400 focus:bg-zinc-700 focus:text-zinc-50"
                        >
                          Nenhum
                        </SelectItem>
                        {MOCK_LEADS.map((lead) => (
                          <SelectItem
                            key={lead.id}
                            value={lead.id}
                            className="text-zinc-200 focus:bg-zinc-700 focus:text-zinc-50"
                          >
                            {lead.name}
                            {lead.company && ` · ${lead.company}`}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage className="text-red-400" />
                  </FormItem>
                )}
              />

              {/* Owner + Due Date */}
              <div className="grid grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="owner_id"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-zinc-300">Responsável</FormLabel>
                      <Select onValueChange={field.onChange} value={field.value}>
                        <FormControl>
                          <SelectTrigger className="w-full border-zinc-700 bg-zinc-800 text-zinc-100 focus:ring-indigo-500">
                            <SelectValue />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent className="border-zinc-700 bg-zinc-800">
                          {MOCK_OWNERS.map((owner) => (
                            <SelectItem
                              key={owner.id}
                              value={owner.id}
                              className="text-zinc-200 focus:bg-zinc-700 focus:text-zinc-50"
                            >
                              {owner.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage className="text-red-400" />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="due_date"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-zinc-300">Prazo</FormLabel>
                      <FormControl>
                        <Input
                          type="date"
                          className="border-zinc-700 bg-zinc-800 text-zinc-100 focus-visible:ring-indigo-500 [color-scheme:dark]"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage className="text-red-400" />
                    </FormItem>
                  )}
                />
              </div>
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
                {form.formState.isSubmitting && (
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                )}
                {isEdit ? "Salvar alterações" : "Criar negócio"}
              </Button>
            </SheetFooter>
          </form>
        </Form>
      </SheetContent>
    </Sheet>
  );
}
