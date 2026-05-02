"use client";

import { usePathname } from "next/navigation";
import { Menu } from "lucide-react";

import { Button } from "@/components/ui/button";

const PAGE_TITLES: Record<string, string> = {
  "/dashboard": "Dashboard",
  "/leads": "Leads",
  "/pipeline": "Pipeline",
  "/settings": "Configurações",
};

interface HeaderProps {
  onMenuClick: () => void;
  actions?: React.ReactNode;
}

export function Header({ onMenuClick, actions }: HeaderProps) {
  const pathname = usePathname();

  const title =
    Object.entries(PAGE_TITLES).find(
      ([path]) => pathname === path || pathname.startsWith(`${path}/`)
    )?.[1] ?? "PipeFlow CRM";

  return (
    <header className="flex h-14 shrink-0 items-center gap-3 border-b border-zinc-800 bg-zinc-950 px-4">
      <Button
        variant="ghost"
        size="icon"
        className="shrink-0 text-zinc-400 hover:bg-zinc-800 hover:text-zinc-50 md:hidden"
        onClick={onMenuClick}
        aria-label="Abrir menu"
      >
        <Menu className="h-5 w-5" />
      </Button>

      <h1 className="text-base font-semibold text-zinc-50">{title}</h1>

      {actions && (
        <div className="ml-auto flex items-center gap-2">{actions}</div>
      )}
    </header>
  );
}
