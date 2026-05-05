import { type LucideIcon } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface MetricCardProps {
  title: string;
  value: string;
  subtitle: string;
  icon: LucideIcon;
  iconColor: string;
  iconBg: string;
  badge?: { label: string; positive?: boolean };
}

export function MetricCard({
  title,
  value,
  subtitle,
  icon: Icon,
  iconColor,
  iconBg,
  badge,
}: MetricCardProps) {
  return (
    <Card className="border-zinc-800 bg-zinc-900">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-sm font-medium text-zinc-400">{title}</CardTitle>
        <div className={cn("rounded-md p-1.5", iconBg)}>
          <Icon className={cn("h-4 w-4", iconColor)} />
        </div>
      </CardHeader>
      <CardContent>
        <p className="text-2xl font-bold text-zinc-50">{value}</p>
        <div className="mt-1 flex items-center gap-2">
          <p className="text-xs text-zinc-500">{subtitle}</p>
          {badge && (
            <span
              className={cn(
                "rounded-full px-1.5 py-0.5 text-[10px] font-medium",
                badge.positive
                  ? "bg-emerald-950 text-emerald-400"
                  : "bg-zinc-800 text-zinc-400"
              )}
            >
              {badge.label}
            </span>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
