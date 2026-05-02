"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  MoreHorizontal,
  Pencil,
  Trash2,
  Eye,
  Users,
  Plus,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Skeleton } from "@/components/ui/skeleton";
import { LeadStatusBadge } from "@/components/leads/lead-status-badge";
import { type Lead } from "@/lib/mock/leads";

const PAGE_SIZE = 8;

interface LeadTableProps {
  leads: Lead[];
  onEdit: (lead: Lead) => void;
  onDelete: (leadId: string) => void;
  onNewLead: () => void;
  isLoading?: boolean;
  isFiltering?: boolean;
}

export function LeadTable({
  leads,
  onEdit,
  onDelete,
  onNewLead,
  isLoading,
  isFiltering = false,
}: LeadTableProps) {
  const [page, setPage] = useState(1);
  const [deleteTarget, setDeleteTarget] = useState<Lead | null>(null);

  const totalPages = Math.max(1, Math.ceil(leads.length / PAGE_SIZE));
  const safePage = Math.min(page, totalPages);
  const paginated = leads.slice((safePage - 1) * PAGE_SIZE, safePage * PAGE_SIZE);

  function confirmDelete() {
    if (deleteTarget) {
      onDelete(deleteTarget.id);
      setDeleteTarget(null);
    }
  }

  if (isLoading) return <LeadTableSkeleton />;

  return (
    <>
      <div className="overflow-hidden rounded-lg border border-zinc-800 bg-zinc-900">
        {/* Header */}
        <div className="grid grid-cols-[1fr_1fr_130px_110px_36px] gap-4 border-b border-zinc-800 px-4 py-3">
          {["Nome / Empresa", "Contato", "Status", "Responsável", ""].map((col) => (
            <span
              key={col}
              className="text-xs font-medium uppercase tracking-wide text-zinc-500"
            >
              {col}
            </span>
          ))}
        </div>

        {/* Rows */}
        {paginated.length === 0 ? (
          <EmptyState onNewLead={onNewLead} isFiltered={isFiltering} />
        ) : (
          <div className="divide-y divide-zinc-800">
            {paginated.map((lead) => (
              <LeadRow
                key={lead.id}
                lead={lead}
                onEdit={onEdit}
                onDeleteRequest={setDeleteTarget}
              />
            ))}
          </div>
        )}

        {/* Pagination */}
        {leads.length > PAGE_SIZE && (
          <div className="flex items-center justify-between border-t border-zinc-800 px-4 py-3">
            <span className="text-xs text-zinc-500">
              {(safePage - 1) * PAGE_SIZE + 1}–
              {Math.min(safePage * PAGE_SIZE, leads.length)} de {leads.length} leads
            </span>
            <div className="flex items-center gap-1">
              <Button
                variant="outline"
                size="icon"
                className="h-7 w-7 border-zinc-700 bg-zinc-800 text-zinc-400 hover:bg-zinc-700 disabled:opacity-30"
                disabled={safePage === 1}
                onClick={() => setPage((p) => p - 1)}
              >
                <ChevronLeft className="h-3.5 w-3.5" />
              </Button>
              <span className="min-w-[4rem] text-center text-xs text-zinc-400">
                {safePage} / {totalPages}
              </span>
              <Button
                variant="outline"
                size="icon"
                className="h-7 w-7 border-zinc-700 bg-zinc-800 text-zinc-400 hover:bg-zinc-700 disabled:opacity-30"
                disabled={safePage === totalPages}
                onClick={() => setPage((p) => p + 1)}
              >
                <ChevronRight className="h-3.5 w-3.5" />
              </Button>
            </div>
          </div>
        )}
      </div>

      {/* Delete confirmation dialog */}
      <Dialog open={!!deleteTarget} onOpenChange={() => setDeleteTarget(null)}>
        <DialogContent showCloseButton={false} className="border-zinc-800 bg-zinc-900 sm:max-w-sm">
          <DialogHeader>
            <DialogTitle className="text-zinc-50">Excluir lead</DialogTitle>
            <DialogDescription className="text-zinc-400">
              Tem certeza que deseja excluir{" "}
              <span className="font-medium text-zinc-200">
                {deleteTarget?.name}
              </span>
              ? Esta ação não pode ser desfeita.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="border-zinc-800 bg-transparent px-4 pb-4">
            <Button
              variant="outline"
              onClick={() => setDeleteTarget(null)}
              className="border-zinc-700 bg-transparent text-zinc-400 hover:bg-zinc-800"
            >
              Cancelar
            </Button>
            <Button
              onClick={confirmDelete}
              className="bg-red-600 text-white hover:bg-red-500"
            >
              Excluir
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}

function LeadRow({
  lead,
  onEdit,
  onDeleteRequest,
}: {
  lead: Lead;
  onEdit: (lead: Lead) => void;
  onDeleteRequest: (lead: Lead) => void;
}) {
  const router = useRouter();
  return (
    <div className="group grid grid-cols-[1fr_1fr_130px_110px_36px] items-center gap-4 px-4 py-3 transition-colors hover:bg-zinc-800/50">
      {/* Nome / Empresa */}
      <div className="min-w-0">
        <Link
          href={`/leads/${lead.id}`}
          className="block truncate text-sm font-medium text-zinc-100 hover:text-indigo-400 transition-colors"
        >
          {lead.name}
        </Link>
        {lead.company && (
          <span className="block truncate text-xs text-zinc-500">
            {lead.company}
            {lead.position && ` · ${lead.position}`}
          </span>
        )}
      </div>

      {/* Contato */}
      <div className="min-w-0">
        {lead.email && (
          <span className="block truncate text-xs text-zinc-400">{lead.email}</span>
        )}
        {lead.phone && (
          <span className="block truncate text-xs text-zinc-500">{lead.phone}</span>
        )}
        {!lead.email && !lead.phone && (
          <span className="text-xs text-zinc-600">—</span>
        )}
      </div>

      {/* Status */}
      <LeadStatusBadge status={lead.status} />

      {/* Responsável */}
      <div className="flex items-center gap-2">
        <Avatar className="h-6 w-6 shrink-0">
          <AvatarFallback className="bg-indigo-800 text-[10px] font-semibold text-indigo-200">
            {lead.owner.initials}
          </AvatarFallback>
        </Avatar>
        <span className="truncate text-xs text-zinc-400">{lead.owner.name.split(" ")[0]}</span>
      </div>

      {/* Actions */}
      <DropdownMenu>
        <DropdownMenuTrigger
          className="flex h-7 w-7 items-center justify-center rounded-md text-zinc-600 opacity-0 transition-opacity group-hover:opacity-100 hover:bg-zinc-700 hover:text-zinc-300 focus:opacity-100 focus:outline-none"
        >
          <MoreHorizontal className="h-4 w-4" />
        </DropdownMenuTrigger>
        <DropdownMenuContent
          align="end"
          className="w-44 border-zinc-700 bg-zinc-800"
        >
          <DropdownMenuItem
            onClick={() => router.push(`/leads/${lead.id}`)}
            className="cursor-pointer gap-2 text-zinc-300 focus:bg-zinc-700 focus:text-zinc-50"
          >
            <Eye className="h-4 w-4" />
            Ver detalhe
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() => onEdit(lead)}
            className="cursor-pointer gap-2 text-zinc-300 focus:bg-zinc-700 focus:text-zinc-50"
          >
            <Pencil className="h-4 w-4" />
            Editar
          </DropdownMenuItem>
          <DropdownMenuSeparator className="bg-zinc-700" />
          <DropdownMenuItem
            onClick={() => onDeleteRequest(lead)}
            className="cursor-pointer gap-2 text-red-400 focus:bg-zinc-700 focus:text-red-300"
          >
            <Trash2 className="h-4 w-4" />
            Excluir
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}

function EmptyState({
  onNewLead,
  isFiltered,
}: {
  onNewLead: () => void;
  isFiltered: boolean;
}) {
  return (
    <div className="flex flex-col items-center justify-center gap-3 py-16 text-center">
      <div className="flex h-12 w-12 items-center justify-center rounded-full bg-zinc-800">
        <Users className="h-5 w-5 text-zinc-500" />
      </div>
      <div>
        <p className="text-sm font-medium text-zinc-300">
          {isFiltered ? "Nenhum resultado encontrado" : "Nenhum lead ainda"}
        </p>
        <p className="mt-1 text-xs text-zinc-500">
          {isFiltered
            ? "Tente ajustar a busca ou os filtros aplicados."
            : "Crie seu primeiro lead para começar a gerenciar seu pipeline."}
        </p>
      </div>
      {!isFiltered && (
        <Button
          size="sm"
          onClick={onNewLead}
          className="bg-indigo-600 text-white hover:bg-indigo-500"
        >
          <Plus className="mr-1.5 h-4 w-4" />
          Criar primeiro lead
        </Button>
      )}
    </div>
  );
}

function LeadTableSkeleton() {
  return (
    <div className="overflow-hidden rounded-lg border border-zinc-800 bg-zinc-900">
      <div className="grid grid-cols-[1fr_1fr_130px_110px_36px] gap-4 border-b border-zinc-800 px-4 py-3">
        {[...Array(5)].map((_, i) => (
          <Skeleton key={i} className="h-3 w-16 bg-zinc-800" />
        ))}
      </div>
      <div className="divide-y divide-zinc-800">
        {[...Array(5)].map((_, i) => (
          <div
            key={i}
            className="grid grid-cols-[1fr_1fr_130px_110px_36px] items-center gap-4 px-4 py-3.5"
          >
            <div className="space-y-1.5">
              <Skeleton className="h-3.5 w-32 bg-zinc-800" />
              <Skeleton className="h-3 w-24 bg-zinc-800" />
            </div>
            <Skeleton className="h-3 w-36 bg-zinc-800" />
            <Skeleton className="h-5 w-20 rounded-full bg-zinc-800" />
            <div className="flex items-center gap-2">
              <Skeleton className="h-6 w-6 rounded-full bg-zinc-800" />
              <Skeleton className="h-3 w-14 bg-zinc-800" />
            </div>
            <Skeleton className="h-7 w-7 bg-zinc-800" />
          </div>
        ))}
      </div>
    </div>
  );
}
