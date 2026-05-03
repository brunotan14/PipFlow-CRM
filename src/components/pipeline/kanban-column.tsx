"use client";

import { useDroppable } from "@dnd-kit/core";
import { SortableContext, verticalListSortingStrategy } from "@dnd-kit/sortable";
import { Plus, Briefcase } from "lucide-react";

import { DealCard } from "@/components/pipeline/deal-card";
import { cn } from "@/lib/utils";
import {
  type Deal,
  STAGE_CONFIG,
  formatCurrency,
} from "@/lib/mock/deals";
import { type DealStage } from "@/types/database";

interface KanbanColumnProps {
  stage: DealStage;
  deals: Deal[];
  isOver?: boolean;
  onAddDeal: (stage: DealStage) => void;
  onEditDeal: (deal: Deal) => void;
  onDeleteDeal: (dealId: string) => void;
}

export function KanbanColumn({
  stage,
  deals,
  onAddDeal,
  onEditDeal,
  onDeleteDeal,
}: KanbanColumnProps) {
  const { setNodeRef, isOver } = useDroppable({ id: stage });
  const stageConf = STAGE_CONFIG[stage];
  const totalValue = deals.reduce((sum, d) => sum + (d.value ?? 0), 0);

  return (
    <div className="flex w-56 shrink-0 flex-col rounded-lg border border-zinc-800 bg-zinc-900/60">
      {/* Column header */}
      <div className="border-b border-zinc-800 px-3 py-2.5">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className={cn("text-xs font-semibold", stageConf.color)}>
              {stageConf.label}
            </span>
            <span className="rounded-full bg-zinc-800 px-1.5 py-0.5 text-[10px] font-medium text-zinc-500">
              {deals.length}
            </span>
          </div>
          <button
            onClick={() => onAddDeal(stage)}
            className="flex h-5 w-5 items-center justify-center rounded text-zinc-600 transition-colors hover:bg-zinc-800 hover:text-zinc-300"
          >
            <Plus className="h-3.5 w-3.5" />
          </button>
        </div>
        <p className={cn("mt-0.5 text-xs font-medium tabular-nums", stageConf.color, "opacity-70")}>
          {formatCurrency(totalValue)}
        </p>
      </div>

      {/* Drop zone */}
      <div
        ref={setNodeRef}
        className={cn(
          "flex min-h-[120px] flex-1 flex-col gap-2 p-2 transition-colors duration-150",
          isOver && "rounded-b-lg bg-zinc-800/40",
        )}
      >
        <SortableContext
          items={deals.map((d) => d.id)}
          strategy={verticalListSortingStrategy}
        >
          {deals.map((deal) => (
            <DealCard
              key={deal.id}
              deal={deal}
              onEdit={onEditDeal}
              onDelete={onDeleteDeal}
            />
          ))}
        </SortableContext>

        {deals.length === 0 && (
          <button
            onClick={() => onAddDeal(stage)}
            className={cn(
              "flex flex-col items-center justify-center gap-1.5 rounded-md border border-dashed py-8 text-center transition-colors",
              isOver
                ? "border-zinc-600 bg-zinc-800/60"
                : "border-zinc-800 hover:border-zinc-700 hover:bg-zinc-800/30",
            )}
          >
            <Briefcase className="h-4 w-4 text-zinc-700" />
            <span className="text-[11px] text-zinc-700">Solte aqui</span>
          </button>
        )}
      </div>
    </div>
  );
}
