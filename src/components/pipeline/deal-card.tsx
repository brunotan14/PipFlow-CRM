"use client";

import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { GripVertical, CalendarDays, MoreHorizontal, Pencil, Trash2 } from "lucide-react";

import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";
import {
  type Deal,
  STAGE_CONFIG,
  getDealLead,
  getDueDateStatus,
  formatDueDate,
  formatCurrency,
} from "@/lib/mock/deals";

interface DealCardProps {
  deal: Deal;
  onEdit: (deal: Deal) => void;
  onDelete: (dealId: string) => void;
  isDragging?: boolean;
}

export function DealCard({ deal, onEdit, onDelete, isDragging = false }: DealCardProps) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging: isSortableDragging,
  } = useSortable({ id: deal.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  const stageConf = STAGE_CONFIG[deal.stage];
  const lead = getDealLead(deal.lead_id);
  const dueDateStatus = getDueDateStatus(deal.due_date);

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={cn(
        "group relative rounded-md border border-zinc-800 bg-zinc-900 p-3 transition-all duration-200",
        "border-l-2",
        stageConf.borderColor,
        isSortableDragging || isDragging
          ? "opacity-40 shadow-none"
          : "hover:-translate-y-0.5 hover:border-zinc-700 hover:bg-zinc-800/80",
      )}
    >
      {/* Drag handle + Actions row */}
      <div className="mb-2 flex items-center justify-between gap-2">
        <button
          {...attributes}
          {...listeners}
          className="cursor-grab touch-none text-zinc-700 opacity-0 transition-opacity group-hover:opacity-100 active:cursor-grabbing"
          tabIndex={-1}
        >
          <GripVertical className="h-3.5 w-3.5" />
        </button>

        <DropdownMenu>
          <DropdownMenuTrigger className="flex h-5 w-5 items-center justify-center rounded text-zinc-700 opacity-0 transition-opacity group-hover:opacity-100 hover:bg-zinc-700 hover:text-zinc-300 focus:outline-none focus:opacity-100">
            <MoreHorizontal className="h-3.5 w-3.5" />
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-40 border-zinc-700 bg-zinc-800">
            <DropdownMenuItem
              onClick={() => onEdit(deal)}
              className="cursor-pointer gap-2 text-zinc-300 focus:bg-zinc-700 focus:text-zinc-50"
            >
              <Pencil className="h-3.5 w-3.5" />
              Editar
            </DropdownMenuItem>
            <DropdownMenuSeparator className="bg-zinc-700" />
            <DropdownMenuItem
              onClick={() => onDelete(deal.id)}
              className="cursor-pointer gap-2 text-red-400 focus:bg-zinc-700 focus:text-red-300"
            >
              <Trash2 className="h-3.5 w-3.5" />
              Excluir
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      {/* Title */}
      <p className="mb-2 line-clamp-2 text-sm font-medium leading-snug text-zinc-100">
        {deal.title}
      </p>

      {/* Value */}
      <p className={cn("mb-2 text-base font-semibold tabular-nums", stageConf.color)}>
        {formatCurrency(deal.value)}
      </p>

      {/* Lead chip */}
      {lead && (
        <div className="mb-2 truncate">
          <span className="rounded-sm bg-zinc-800 px-1.5 py-0.5 text-[10px] font-medium text-zinc-400">
            {lead.name}
            {lead.company && ` · ${lead.company}`}
          </span>
        </div>
      )}

      {/* Footer: due date + owner */}
      <div className="flex items-center justify-between gap-2">
        {deal.due_date ? (
          <div
            className={cn(
              "flex items-center gap-1 rounded-sm border px-1.5 py-0.5 text-[10px] font-medium",
              dueDateStatus === "overdue" && "border-red-900 bg-red-950 text-red-400",
              dueDateStatus === "soon" && "border-amber-900 bg-amber-950 text-amber-400",
              dueDateStatus === "ok" && "border-zinc-800 bg-zinc-800/50 text-zinc-500",
            )}
          >
            <CalendarDays className="h-2.5 w-2.5" />
            {formatDueDate(deal.due_date)}
          </div>
        ) : (
          <div />
        )}

        <Avatar className="h-5 w-5 shrink-0">
          <AvatarFallback className="bg-indigo-800 text-[9px] font-semibold text-indigo-200">
            {deal.owner.initials}
          </AvatarFallback>
        </Avatar>
      </div>
    </div>
  );
}

export function DealCardOverlay({ deal }: { deal: Deal }) {
  const stageConf = STAGE_CONFIG[deal.stage];
  const lead = getDealLead(deal.lead_id);

  return (
    <div
      className={cn(
        "w-56 rotate-1 rounded-md border border-zinc-700 bg-zinc-800 p-3 shadow-2xl",
        "border-l-2",
        stageConf.borderColor,
      )}
    >
      <p className="mb-1.5 line-clamp-2 text-sm font-medium leading-snug text-zinc-100">
        {deal.title}
      </p>
      <p className={cn("mb-1.5 text-base font-semibold tabular-nums", stageConf.color)}>
        {formatCurrency(deal.value)}
      </p>
      {lead && (
        <span className="rounded-sm bg-zinc-700 px-1.5 py-0.5 text-[10px] font-medium text-zinc-400">
          {lead.name}
        </span>
      )}
    </div>
  );
}
