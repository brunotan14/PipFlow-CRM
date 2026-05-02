import { Plus, Search, SlidersHorizontal, Users } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function LeadsPage() {
  return (
    <div className="space-y-4">
      {/* Toolbar */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-1 items-center gap-2">
          <div className="relative flex-1 max-w-sm">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-zinc-500" />
            <Input
              placeholder="Buscar leads..."
              className="border-zinc-700 bg-zinc-800 pl-9 text-zinc-200 placeholder:text-zinc-600 focus-visible:ring-indigo-500"
              disabled
            />
          </div>
          <Button
            variant="outline"
            size="sm"
            className="border-zinc-700 bg-zinc-800 text-zinc-400 hover:bg-zinc-700 hover:text-zinc-200"
            disabled
          >
            <SlidersHorizontal className="mr-1.5 h-3.5 w-3.5" />
            Filtros
          </Button>
        </div>
        <Button
          size="sm"
          className="bg-indigo-600 text-white hover:bg-indigo-500"
          disabled
        >
          <Plus className="mr-1.5 h-4 w-4" />
          Novo Lead
        </Button>
      </div>

      {/* Table header */}
      <div className="overflow-hidden rounded-lg border border-zinc-800 bg-zinc-900">
        <div className="grid grid-cols-[1fr_1fr_120px_100px_80px] gap-4 border-b border-zinc-800 px-4 py-3">
          {["Nome", "Empresa", "Status", "Responsável", ""].map((col) => (
            <span key={col} className="text-xs font-medium uppercase tracking-wide text-zinc-500">
              {col}
            </span>
          ))}
        </div>

        {/* Empty state */}
        <div className="flex flex-col items-center justify-center gap-3 py-20 text-center">
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-zinc-800">
            <Users className="h-5 w-5 text-zinc-500" />
          </div>
          <div>
            <p className="text-sm font-medium text-zinc-300">
              Nenhum lead ainda
            </p>
            <p className="mt-1 text-xs text-zinc-500">
              Crie seu primeiro lead para começar a gerenciar seu pipeline de vendas.
            </p>
          </div>
          <Button
            size="sm"
            className="bg-indigo-600 text-white hover:bg-indigo-500"
            disabled
          >
            <Plus className="mr-1.5 h-4 w-4" />
            Criar primeiro lead
          </Button>
        </div>
      </div>
    </div>
  );
}
