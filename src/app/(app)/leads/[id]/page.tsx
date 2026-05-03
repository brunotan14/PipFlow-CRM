"use client";

import { useState } from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ArrowLeft,
  Mail,
  Phone,
  Building2,
  Briefcase,
  Calendar,
  Pencil,
  Phone as PhoneIcon,
  MailIcon,
  CalendarIcon,
  FileText,
  Plus,
  Clock,
} from "lucide-react";

import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { LeadStatusBadge } from "@/components/leads/lead-status-badge";
import { LeadForm } from "@/components/leads/lead-form";
import {
  MOCK_LEADS,
  getLeadActivities,
  formatRelativeDate,
  formatFullDate,
  ACTIVITY_CONFIG,
  type Lead,
} from "@/lib/mock/leads";
import { type ActivityType } from "@/types/database";
import { cn } from "@/lib/utils";

const ACTIVITY_ICONS: Record<ActivityType, React.ElementType> = {
  call: PhoneIcon,
  email: MailIcon,
  meeting: CalendarIcon,
  note: FileText,
};

const ACTIVITY_ICON_STYLES: Record<ActivityType, string> = {
  call: "bg-emerald-950 text-emerald-400",
  email: "bg-indigo-950 text-indigo-400",
  meeting: "bg-amber-950 text-amber-400",
  note: "bg-zinc-800 text-zinc-400",
};

export default function LeadDetailPage({
  params,
}: {
  params: { id: string };
}) {
  const [lead, setLead] = useState<Lead | undefined>(
    MOCK_LEADS.find((l) => l.id === params.id)
  );
  const [formOpen, setFormOpen] = useState(false);

  if (!lead) notFound();

  const activities = getLeadActivities(lead.id);

  function handleUpdate(
    values: Omit<Lead, "id" | "owner" | "created_at" | "updated_at">,
  ) {
    setLead((prev) =>
      prev ? { ...prev, ...values, updated_at: new Date().toISOString() } : prev
    );
  }

  return (
    <div className="mx-auto max-w-4xl space-y-6">
      {/* Back */}
      <Link
        href="/leads"
        className="inline-flex items-center gap-1.5 text-sm text-zinc-500 transition-colors hover:text-zinc-300"
      >
        <ArrowLeft className="h-4 w-4" />
        Voltar para Leads
      </Link>

      {/* Profile card */}
      <div className="rounded-lg border border-zinc-800 bg-zinc-900">
        <div className="flex flex-col gap-4 p-6 sm:flex-row sm:items-start sm:justify-between">
          <div className="flex items-center gap-4">
            <Avatar className="h-14 w-14 shrink-0">
              <AvatarFallback className="bg-indigo-800 text-lg font-bold text-indigo-100">
                {lead.name
                  .split(" ")
                  .slice(0, 2)
                  .map((n) => n[0])
                  .join("")}
              </AvatarFallback>
            </Avatar>
            <div>
              <h1 className="text-xl font-semibold text-zinc-50">{lead.name}</h1>
              {(lead.position || lead.company) && (
                <p className="mt-0.5 text-sm text-zinc-400">
                  {[lead.position, lead.company].filter(Boolean).join(" · ")}
                </p>
              )}
              <div className="mt-2">
                <LeadStatusBadge status={lead.status} />
              </div>
            </div>
          </div>
          <Button
            size="sm"
            variant="outline"
            onClick={() => setFormOpen(true)}
            className="shrink-0 border-zinc-700 bg-zinc-800 text-zinc-300 hover:bg-zinc-700 hover:text-zinc-50"
          >
            <Pencil className="mr-1.5 h-3.5 w-3.5" />
            Editar
          </Button>
        </div>

        <Separator className="bg-zinc-800" />

        {/* Info grid */}
        <div className="grid grid-cols-1 gap-4 p-6 sm:grid-cols-2 lg:grid-cols-4">
          <InfoItem
            icon={Mail}
            label="E-mail"
            value={lead.email}
            href={lead.email ? `mailto:${lead.email}` : undefined}
          />
          <InfoItem
            icon={Phone}
            label="Telefone"
            value={lead.phone}
            href={lead.phone ? `tel:${lead.phone}` : undefined}
          />
          <InfoItem icon={Building2} label="Empresa" value={lead.company} />
          <InfoItem icon={Briefcase} label="Cargo" value={lead.position} />
        </div>

        <Separator className="bg-zinc-800" />

        {/* Meta */}
        <div className="flex flex-wrap gap-6 px-6 py-4">
          <div className="flex items-center gap-2">
            <Avatar className="h-5 w-5">
              <AvatarFallback className="bg-indigo-800 text-[9px] font-bold text-indigo-100">
                {lead.owner.initials}
              </AvatarFallback>
            </Avatar>
            <span className="text-xs text-zinc-400">
              Responsável:{" "}
              <span className="text-zinc-200">{lead.owner.name}</span>
            </span>
          </div>
          <div className="flex items-center gap-1.5 text-xs text-zinc-400">
            <Calendar className="h-3.5 w-3.5" />
            Criado em{" "}
            <span className="text-zinc-200">{formatFullDate(lead.created_at)}</span>
          </div>
        </div>
      </div>

      {/* Activities */}
      <div className="rounded-lg border border-zinc-800 bg-zinc-900">
        <div className="flex items-center justify-between px-6 py-4">
          <h2 className="text-sm font-semibold text-zinc-200">
            Atividades
            {activities.length > 0 && (
              <span className="ml-2 text-xs font-normal text-zinc-500">
                ({activities.length})
              </span>
            )}
          </h2>
          <Button
            size="sm"
            variant="outline"
            className="border-zinc-700 bg-zinc-800 text-zinc-400 hover:bg-zinc-700 hover:text-zinc-200"
            disabled
          >
            <Plus className="mr-1.5 h-3.5 w-3.5" />
            Registrar
          </Button>
        </div>

        <Separator className="bg-zinc-800" />

        {activities.length === 0 ? (
          <div className="flex flex-col items-center justify-center gap-3 py-12 text-center">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-zinc-800">
              <Clock className="h-4 w-4 text-zinc-500" />
            </div>
            <div>
              <p className="text-sm font-medium text-zinc-300">
                Nenhuma atividade registrada
              </p>
              <p className="mt-1 text-xs text-zinc-500">
                Registre ligações, e-mails, reuniões e notas sobre este lead.
              </p>
            </div>
          </div>
        ) : (
          <ol className="relative px-6 py-4">
            {activities.map((activity, index) => {
              const Icon = ACTIVITY_ICONS[activity.type];
              const iconStyle = ACTIVITY_ICON_STYLES[activity.type];
              const isLast = index === activities.length - 1;

              return (
                <li key={activity.id} className="relative flex gap-4 pb-6 last:pb-0">
                  {/* Timeline line */}
                  {!isLast && (
                    <div className="absolute left-4 top-8 bottom-0 w-px bg-zinc-800" />
                  )}

                  {/* Icon */}
                  <div
                    className={cn(
                      "relative z-10 flex h-8 w-8 shrink-0 items-center justify-center rounded-full",
                      iconStyle
                    )}
                  >
                    <Icon className="h-3.5 w-3.5" />
                  </div>

                  {/* Content */}
                  <div className="flex-1 min-w-0 pt-0.5">
                    <div className="flex items-baseline justify-between gap-2">
                      <span className="text-xs font-semibold uppercase tracking-wide text-zinc-400">
                        {ACTIVITY_CONFIG[activity.type].label}
                      </span>
                      <span
                        className="shrink-0 text-xs text-zinc-600"
                        title={formatFullDate(activity.created_at)}
                      >
                        {formatRelativeDate(activity.created_at)}
                      </span>
                    </div>
                    <p className="mt-1 text-sm leading-relaxed text-zinc-300">
                      {activity.description}
                    </p>
                    <p className="mt-1.5 text-xs text-zinc-500">
                      por {activity.author.name}
                    </p>
                  </div>
                </li>
              );
            })}
          </ol>
        )}
      </div>

      <LeadForm
        open={formOpen}
        onOpenChange={setFormOpen}
        lead={lead}
        onSubmit={(values) => handleUpdate(values as Omit<Lead, "id" | "owner" | "created_at" | "updated_at">)}
      />
    </div>
  );
}

function InfoItem({
  icon: Icon,
  label,
  value,
  href,
}: {
  icon: React.ElementType;
  label: string;
  value: string | null | undefined;
  href?: string;
}) {
  return (
    <div className="flex items-start gap-2.5">
      <div className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-md bg-zinc-800">
        <Icon className="h-3.5 w-3.5 text-zinc-500" />
      </div>
      <div className="min-w-0">
        <p className="text-xs text-zinc-500">{label}</p>
        {value ? (
          href ? (
            <a
              href={href}
              className="mt-0.5 block truncate text-sm text-zinc-200 hover:text-indigo-400 transition-colors"
            >
              {value}
            </a>
          ) : (
            <p className="mt-0.5 truncate text-sm text-zinc-200">{value}</p>
          )
        ) : (
          <p className="mt-0.5 text-sm text-zinc-600">—</p>
        )}
      </div>
    </div>
  );
}
