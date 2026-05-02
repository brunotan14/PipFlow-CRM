"use client";

import { Search, SlidersHorizontal, Plus, X } from "lucide-react";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuCheckboxItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { type LeadStatus } from "@/types/database";
import { STATUS_CONFIG } from "@/lib/mock/leads";
import { cn } from "@/lib/utils";

const ALL_STATUSES = Object.keys(STATUS_CONFIG) as LeadStatus[];

interface LeadsToolbarProps {
  search: string;
  onSearchChange: (v: string) => void;
  selectedStatuses: LeadStatus[];
  onStatusChange: (statuses: LeadStatus[]) => void;
  onNewLead: () => void;
  totalFiltered: number;
  total: number;
}

export function LeadsToolbar({
  search,
  onSearchChange,
  selectedStatuses,
  onStatusChange,
  onNewLead,
  totalFiltered,
  total,
}: LeadsToolbarProps) {
  const hasFilters = search.length > 0 || selectedStatuses.length > 0;

  function toggleStatus(status: LeadStatus) {
    if (selectedStatuses.includes(status)) {
      onStatusChange(selectedStatuses.filter((s) => s !== status));
    } else {
      onStatusChange([...selectedStatuses, status]);
    }
  }

  function clearFilters() {
    onSearchChange("");
    onStatusChange([]);
  }

  return (
    <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
      <div className="flex flex-1 items-center gap-2">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-zinc-500" />
          <Input
            placeholder="Buscar por nome ou empresa..."
            value={search}
            onChange={(e) => onSearchChange(e.target.value)}
            className="border-zinc-700 bg-zinc-800 pl-9 text-zinc-200 placeholder:text-zinc-600 focus-visible:ring-indigo-500"
          />
          {search && (
            <button
              onClick={() => onSearchChange("")}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-500 hover:text-zinc-300"
            >
              <X className="h-3.5 w-3.5" />
            </button>
          )}
        </div>

        <DropdownMenu>
          <DropdownMenuTrigger
            className={cn(
              "inline-flex h-8 items-center gap-1.5 rounded-md border px-3 text-sm font-medium transition-colors focus:outline-none",
              "border-zinc-700 bg-zinc-800 text-zinc-400 hover:bg-zinc-700 hover:text-zinc-200",
              selectedStatuses.length > 0 &&
                "border-indigo-700 bg-indigo-950 text-indigo-300"
            )}
          >
            <SlidersHorizontal className="h-3.5 w-3.5" />
            Filtros
            {selectedStatuses.length > 0 && (
              <span className="ml-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-indigo-600 text-[10px] font-bold text-white">
                {selectedStatuses.length}
              </span>
            )}
          </DropdownMenuTrigger>
          <DropdownMenuContent
            align="start"
            className="w-48 border-zinc-700 bg-zinc-800"
          >
            <DropdownMenuLabel className="text-xs text-zinc-500">
              Status do Lead
            </DropdownMenuLabel>
            <DropdownMenuSeparator className="bg-zinc-700" />
            {ALL_STATUSES.map((status) => (
              <DropdownMenuCheckboxItem
                key={status}
                checked={selectedStatuses.includes(status)}
                onCheckedChange={() => toggleStatus(status)}
                className="text-zinc-300 focus:bg-zinc-700 focus:text-zinc-50"
              >
                {STATUS_CONFIG[status].label}
              </DropdownMenuCheckboxItem>
            ))}
            {selectedStatuses.length > 0 && (
              <>
                <DropdownMenuSeparator className="bg-zinc-700" />
                <button
                  onClick={() => onStatusChange([])}
                  className="w-full px-2 py-1.5 text-left text-xs text-zinc-500 hover:text-zinc-300"
                >
                  Limpar filtros
                </button>
              </>
            )}
          </DropdownMenuContent>
        </DropdownMenu>

        {hasFilters && (
          <div className="flex items-center gap-2">
            <span className="text-xs text-zinc-500">
              {totalFiltered} de {total}
            </span>
            <button
              onClick={clearFilters}
              className="text-xs text-zinc-500 underline-offset-2 hover:text-zinc-300 hover:underline"
            >
              Limpar
            </button>
          </div>
        )}
      </div>

      <Button
        size="sm"
        onClick={onNewLead}
        className="bg-indigo-600 text-white hover:bg-indigo-500"
      >
        <Plus className="mr-1.5 h-4 w-4" />
        Novo Lead
      </Button>
    </div>
  );
}
