import { Plus } from "lucide-react";

import { Button } from "@/components/ui/button";

const STAGES = [
  { id: "new_lead", label: "Novo Lead", color: "text-zinc-400" },
  { id: "contacted", label: "Contato Realizado", color: "text-indigo-400" },
  { id: "proposal_sent", label: "Proposta Enviada", color: "text-amber-400" },
  { id: "negotiation", label: "Negociação", color: "text-orange-400" },
  { id: "closed_won", label: "Fechado Ganho", color: "text-emerald-400" },
  { id: "closed_lost", label: "Fechado Perdido", color: "text-red-400" },
] as const;

export default function PipelinePage() {
  return (
    <div className="flex h-full flex-col gap-4">
      {/* Toolbar */}
      <div className="flex items-center justify-between">
        <p className="text-sm text-zinc-500">
          Arraste os cards entre as colunas para mover negócios
        </p>
        <Button
          size="sm"
          className="bg-indigo-600 text-white hover:bg-indigo-500"
          disabled
        >
          <Plus className="mr-1.5 h-4 w-4" />
          Novo Negócio
        </Button>
      </div>

      {/* Kanban board */}
      <div className="flex flex-1 gap-3 overflow-x-auto pb-4">
        {STAGES.map(({ id, label, color }) => (
          <div
            key={id}
            className="flex w-64 shrink-0 flex-col rounded-lg border border-zinc-800 bg-zinc-900"
          >
            {/* Column header */}
            <div className="flex items-center justify-between border-b border-zinc-800 px-3 py-2.5">
              <div className="flex items-center gap-2">
                <span className={`text-xs font-semibold ${color}`}>
                  {label}
                </span>
                <span className="rounded-full bg-zinc-800 px-1.5 py-0.5 text-[10px] font-medium text-zinc-500">
                  0
                </span>
              </div>
              <Button
                variant="ghost"
                size="icon"
                className="h-6 w-6 text-zinc-600 hover:bg-zinc-800 hover:text-zinc-400"
                disabled
              >
                <Plus className="h-3.5 w-3.5" />
              </Button>
            </div>

            {/* Column total */}
            <div className="border-b border-zinc-800 px-3 py-1.5">
              <span className="text-xs text-zinc-600">R$ 0,00</span>
            </div>

            {/* Empty state */}
            <div className="flex flex-1 flex-col items-center justify-center gap-2 px-3 py-8 text-center">
              <p className="text-xs text-zinc-600">Nenhum negócio aqui</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
