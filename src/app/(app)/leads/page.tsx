"use client";

import { useState, useMemo } from "react";
import { toast } from "sonner";

import { LeadsToolbar } from "@/components/leads/leads-toolbar";
import { LeadTable } from "@/components/leads/lead-table";
import { LeadForm } from "@/components/leads/lead-form";
import { type Lead, MOCK_LEADS } from "@/lib/mock/leads";
import { type LeadStatus } from "@/types/database";

export default function LeadsPage() {
  const [leads, setLeads] = useState<Lead[]>(MOCK_LEADS);
  const [search, setSearch] = useState("");
  const [selectedStatuses, setSelectedStatuses] = useState<LeadStatus[]>([]);
  const [formOpen, setFormOpen] = useState(false);
  const [editingLead, setEditingLead] = useState<Lead | null>(null);

  const filtered = useMemo(() => {
    let result = leads;

    if (search.trim()) {
      const q = search.toLowerCase();
      result = result.filter(
        (l) =>
          l.name.toLowerCase().includes(q) ||
          l.company?.toLowerCase().includes(q)
      );
    }

    if (selectedStatuses.length > 0) {
      result = result.filter((l) => selectedStatuses.includes(l.status));
    }

    return result;
  }, [leads, search, selectedStatuses]);

  function openNewLead() {
    setEditingLead(null);
    setFormOpen(true);
  }

  function openEditLead(lead: Lead) {
    setEditingLead(lead);
    setFormOpen(true);
  }

  function handleFormSubmit(
    raw: { name: string; email?: string; phone?: string; company?: string; position?: string; status: Lead["status"] },
    isEdit: boolean
  ) {
    const values = {
      name: raw.name,
      email: raw.email ?? null,
      phone: raw.phone ?? null,
      company: raw.company ?? null,
      position: raw.position ?? null,
      status: raw.status,
    };

    if (isEdit && editingLead) {
      setLeads((prev) =>
        prev.map((l) =>
          l.id === editingLead.id
            ? { ...l, ...values, updated_at: new Date().toISOString() }
            : l
        )
      );
      toast.success("Lead atualizado com sucesso.");
    } else {
      const newLead: Lead = {
        id: `l${Date.now()}`,
        ...values,
        owner: { id: "u1", name: "Bruno Nathan", initials: "BN" },
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      };
      setLeads((prev) => [newLead, ...prev]);
      toast.success("Lead criado com sucesso.");
    }
  }

  function handleDelete(leadId: string) {
    setLeads((prev) => prev.filter((l) => l.id !== leadId));
    toast.success("Lead excluído.");
  }

  return (
    <div className="space-y-4">
      <LeadsToolbar
        search={search}
        onSearchChange={setSearch}
        selectedStatuses={selectedStatuses}
        onStatusChange={setSelectedStatuses}
        onNewLead={openNewLead}
        totalFiltered={filtered.length}
        total={leads.length}
      />

      <LeadTable
        leads={filtered}
        onEdit={openEditLead}
        onDelete={handleDelete}
        onNewLead={openNewLead}
        isFiltering={search.trim().length > 0 || selectedStatuses.length > 0}
      />

      <LeadForm
        open={formOpen}
        onOpenChange={(open) => {
          setFormOpen(open);
          if (!open) setEditingLead(null);
        }}
        lead={editingLead}
        onSubmit={handleFormSubmit}
      />
    </div>
  );
}
