"use client";

import { useState, useMemo, useCallback } from "react";
import {
  DndContext,
  DragOverlay,
  PointerSensor,
  useSensor,
  useSensors,
  type DragStartEvent,
  type DragEndEvent,
  type DragOverEvent,
} from "@dnd-kit/core";
import { arrayMove } from "@dnd-kit/sortable";
import { Plus, TrendingUp } from "lucide-react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { KanbanColumn } from "@/components/pipeline/kanban-column";
import { DealCardOverlay } from "@/components/pipeline/deal-card";
import { DealForm, type DealSubmitValues } from "@/components/pipeline/deal-form";
import {
  type Deal,
  MOCK_DEALS,
  STAGES_ORDER,
  STAGE_CONFIG,
  formatCurrency,
} from "@/lib/mock/deals";
import { MOCK_LEADS, MOCK_OWNERS } from "@/lib/mock/leads";
import { type DealStage } from "@/types/database";

function buildId() {
  return `d${Date.now()}`;
}

export default function PipelinePage() {
  const [deals, setDeals] = useState<Deal[]>(MOCK_DEALS);
  const [activeDeal, setActiveDeal] = useState<Deal | null>(null);
  const [formOpen, setFormOpen] = useState(false);
  const [editingDeal, setEditingDeal] = useState<Deal | null>(null);
  const [defaultStage, setDefaultStage] = useState<DealStage>("new_lead");

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 5 } })
  );

  const dealsByStage = useMemo(() => {
    const map = {} as Record<DealStage, Deal[]>;
    for (const s of STAGES_ORDER) map[s] = [];
    for (const d of deals) map[d.stage].push(d);
    return map;
  }, [deals]);

  const totalPipelineValue = useMemo(
    () => deals.filter((d) => d.stage !== "closed_lost").reduce((s, d) => s + (d.value ?? 0), 0),
    [deals]
  );

  function handleDragStart(event: DragStartEvent) {
    const found = deals.find((d) => d.id === event.active.id);
    setActiveDeal(found ?? null);
  }

  function handleDragOver(event: DragOverEvent) {
    const { active, over } = event;
    if (!over) return;

    const activeId = active.id as string;
    const overId = over.id as string;

    const activeDealItem = deals.find((d) => d.id === activeId);
    if (!activeDealItem) return;

    // over a column droppable or another card
    const overStage = STAGES_ORDER.includes(overId as DealStage)
      ? (overId as DealStage)
      : deals.find((d) => d.id === overId)?.stage;

    if (!overStage || activeDealItem.stage === overStage) return;

    setDeals((prev) =>
      prev.map((d) => (d.id === activeId ? { ...d, stage: overStage } : d))
    );
  }

  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event;
    setActiveDeal(null);

    if (!over) return;

    const activeId = active.id as string;
    const overId = over.id as string;

    if (activeId === overId) return;

    setDeals((prev) => {
      const activeDealItem = prev.find((d) => d.id === activeId);
      const overDealItem = prev.find((d) => d.id === overId);

      if (!activeDealItem) return prev;

      // reorder within same stage
      if (overDealItem && activeDealItem.stage === overDealItem.stage) {
        const stageDeals = prev.filter((d) => d.stage === activeDealItem.stage);
        const oldIndex = stageDeals.findIndex((d) => d.id === activeId);
        const newIndex = stageDeals.findIndex((d) => d.id === overId);
        const reordered = arrayMove(stageDeals, oldIndex, newIndex);
        const others = prev.filter((d) => d.stage !== activeDealItem.stage);
        return [...others, ...reordered];
      }

      return prev;
    });
  }

  const handleOpenNewDeal = useCallback((stage: DealStage = "new_lead") => {
    setEditingDeal(null);
    setDefaultStage(stage);
    setFormOpen(true);
  }, []);

  const handleEditDeal = useCallback((deal: Deal) => {
    setEditingDeal(deal);
    setDefaultStage(deal.stage);
    setFormOpen(true);
  }, []);

  const handleDeleteDeal = useCallback((dealId: string) => {
    setDeals((prev) => prev.filter((d) => d.id !== dealId));
    toast.success("Negócio excluído");
  }, []);

  function handleFormSubmit(values: DealSubmitValues, isEdit: boolean) {
    const owner = MOCK_OWNERS.find((o) => o.id === values.owner_id) ?? MOCK_OWNERS[0]!;
    const lead = values.lead_id ? MOCK_LEADS.find((l) => l.id === values.lead_id) ?? null : null;

    if (isEdit && editingDeal) {
      setDeals((prev) =>
        prev.map((d) =>
          d.id === editingDeal.id
            ? {
                ...d,
                title: values.title,
                value: values.value,
                stage: values.stage,
                lead_id: values.lead_id || null,
                owner,
                due_date: values.due_date || null,
                updated_at: new Date().toISOString(),
              }
            : d
        )
      );
      toast.success("Negócio atualizado");
    } else {
      const newDeal: Deal = {
        id: buildId(),
        title: values.title,
        value: values.value,
        stage: values.stage,
        lead_id: lead?.id ?? null,
        owner,
        due_date: values.due_date || null,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      };
      setDeals((prev) => [...prev, newDeal]);
      toast.success("Negócio criado");
    }
  }

  return (
    <div className="flex h-full flex-col gap-4">
      {/* Toolbar */}
      <div className="flex items-center justify-between gap-4">
        {/* Pipeline summary */}
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5">
            <TrendingUp className="h-4 w-4 text-indigo-400" />
            <span className="text-sm font-semibold text-zinc-100">
              {formatCurrency(totalPipelineValue)}
            </span>
            <span className="text-xs text-zinc-500">no pipeline</span>
          </div>
          <div className="hidden h-3 w-px bg-zinc-800 sm:block" />
          <div className="hidden items-center gap-2 sm:flex">
            {STAGES_ORDER.filter((s) => s !== "closed_lost").map((s) => {
              const count = dealsByStage[s].length;
              if (count === 0) return null;
              return (
                <span
                  key={s}
                  className={`text-xs font-medium ${STAGE_CONFIG[s].color}`}
                >
                  {count} {count === 1 ? "negócio" : "negócios"} em {STAGE_CONFIG[s].label.toLowerCase()}
                </span>
              );
            })}
          </div>
        </div>

        <Button
          size="sm"
          onClick={() => handleOpenNewDeal("new_lead")}
          className="bg-indigo-600 text-white hover:bg-indigo-500"
        >
          <Plus className="mr-1.5 h-4 w-4" />
          Novo Negócio
        </Button>
      </div>

      {/* Kanban board */}
      <DndContext
        sensors={sensors}
        onDragStart={handleDragStart}
        onDragOver={handleDragOver}
        onDragEnd={handleDragEnd}
      >
        <div className="flex flex-1 gap-3 overflow-x-auto pb-4">
          {STAGES_ORDER.map((stage) => (
            <KanbanColumn
              key={stage}
              stage={stage}
              deals={dealsByStage[stage]}
              onAddDeal={handleOpenNewDeal}
              onEditDeal={handleEditDeal}
              onDeleteDeal={handleDeleteDeal}
            />
          ))}
        </div>

        <DragOverlay>
          {activeDeal ? <DealCardOverlay deal={activeDeal} /> : null}
        </DragOverlay>
      </DndContext>

      {/* Deal Form */}
      <DealForm
        open={formOpen}
        onOpenChange={setFormOpen}
        deal={editingDeal}
        defaultStage={defaultStage}
        onSubmit={handleFormSubmit}
      />
    </div>
  );
}
