"use client";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from "recharts";
import { type FunnelDataItem } from "@/lib/mock/dashboard";
import { formatCurrency } from "@/lib/mock/deals";

interface TooltipPayload {
  payload: FunnelDataItem;
}

interface CustomTooltipProps {
  active?: boolean;
  payload?: TooltipPayload[];
}

function CustomTooltip({ active, payload }: CustomTooltipProps) {
  if (!active || !payload?.length) return null;
  const item = payload[0]!.payload;
  return (
    <div className="rounded-md border border-zinc-700 bg-zinc-800 px-3 py-2 text-xs shadow-lg">
      <p className="mb-1 font-medium text-zinc-100">{item.label}</p>
      <p className="text-zinc-400">
        {item.count} negócio{item.count !== 1 ? "s" : ""}
      </p>
      <p className="text-zinc-300">{formatCurrency(item.value)}</p>
    </div>
  );
}

interface FunnelChartProps {
  data: FunnelDataItem[];
}

export function FunnelChart({ data }: FunnelChartProps) {
  return (
    <ResponsiveContainer width="100%" height={220}>
      <BarChart
        layout="vertical"
        data={data}
        margin={{ top: 4, right: 16, bottom: 4, left: 8 }}
      >
        <XAxis
          type="number"
          tick={{ fill: "#71717a", fontSize: 11 }}
          tickLine={false}
          axisLine={false}
          allowDecimals={false}
        />
        <YAxis
          type="category"
          dataKey="label"
          width={128}
          tick={{ fill: "#a1a1aa", fontSize: 11 }}
          tickLine={false}
          axisLine={false}
        />
        <Tooltip
          content={<CustomTooltip />}
          cursor={{ fill: "rgba(255,255,255,0.04)" }}
        />
        <Bar dataKey="count" radius={[0, 4, 4, 0]} maxBarSize={24}>
          {data.map((entry, index) => (
            <Cell key={index} fill={entry.fill} fillOpacity={0.85} />
          ))}
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  );
}
