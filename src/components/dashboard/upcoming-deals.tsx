import { CalendarDays } from "lucide-react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";
import {
  STAGE_CONFIG,
  getDueDateStatus,
  formatDueDate,
  formatCurrency,
} from "@/lib/mock/deals";
import { type UpcomingDeal } from "@/lib/mock/dashboard";

const DUE_DATE_CLASSES = {
  overdue: "border-red-900 bg-red-950 text-red-400",
  soon: "border-amber-900 bg-amber-950 text-amber-400",
  ok: "border-zinc-800 bg-zinc-800/50 text-zinc-500",
  none: "",
} as const;

interface UpcomingDealsProps {
  deals: UpcomingDeal[];
}

export function UpcomingDeals({ deals }: UpcomingDealsProps) {
  if (deals.length === 0) {
    return (
      <p className="text-sm text-zinc-500">Nenhum negócio com prazo próximo.</p>
    );
  }

  return (
    <ul className="space-y-3">
      {deals.map((deal) => {
        const status = getDueDateStatus(deal.due_date);
        const stageConf = STAGE_CONFIG[deal.stage];
        return (
          <li key={deal.id} className="flex items-center gap-3">
            <div className={cn("h-2 w-2 shrink-0 rounded-full", stageConf.bgColor)} />

            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-medium text-zinc-100">{deal.title}</p>
              <div className="mt-0.5 flex items-center gap-1.5">
                <span className={cn("text-[10px] font-medium", stageConf.color)}>
                  {stageConf.label}
                </span>
                {status !== "none" && (
                  <>
                    <span className="text-zinc-700">·</span>
                    <span
                      className={cn(
                        "flex items-center gap-0.5 rounded-sm border px-1 py-0.5 text-[10px] font-medium",
                        DUE_DATE_CLASSES[status]
                      )}
                    >
                      <CalendarDays className="h-2.5 w-2.5" />
                      {formatDueDate(deal.due_date)}
                    </span>
                  </>
                )}
              </div>
            </div>

            <span className="shrink-0 text-xs font-semibold tabular-nums text-zinc-300">
              {formatCurrency(deal.value)}
            </span>

            <Avatar className="h-5 w-5 shrink-0">
              <AvatarFallback className="bg-indigo-800 text-[9px] font-semibold text-indigo-200">
                {deal.owner.initials}
              </AvatarFallback>
            </Avatar>
          </li>
        );
      })}
    </ul>
  );
}
