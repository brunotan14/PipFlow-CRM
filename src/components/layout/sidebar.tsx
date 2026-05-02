"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Users,
  GitBranch,
  Settings,
  ChevronDown,
  Check,
  LogOut,
  User,
  Plus,
} from "lucide-react";

import { cn } from "@/lib/utils";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";

const NAV_ITEMS = [
  { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/leads", label: "Leads", icon: Users },
  { href: "/pipeline", label: "Pipeline", icon: GitBranch },
  { href: "/settings", label: "Configurações", icon: Settings },
] as const;

const MOCK_WORKSPACES = [
  { id: "1", name: "Minha Empresa", plan: "pro" as const },
  { id: "2", name: "Startup XYZ", plan: "free" as const },
];

const MOCK_USER = {
  name: "Bruno Nathan",
  email: "nathanbruno898@gmail.com",
  initials: "BN",
};

interface SidebarProps {
  onNavClick?: () => void;
}

export function Sidebar({ onNavClick }: SidebarProps) {
  const pathname = usePathname();
  const [activeWorkspace, setActiveWorkspace] = useState(MOCK_WORKSPACES[0]!);

  return (
    <div className="flex h-full flex-col bg-zinc-950">
      {/* Logo */}
      <div className="flex h-14 shrink-0 items-center gap-2.5 px-4">
        <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-md bg-indigo-600">
          <GitBranch className="h-4 w-4 text-white" />
        </div>
        <span className="text-sm font-semibold text-zinc-50">PipeFlow CRM</span>
      </div>

      <Separator className="bg-zinc-800" />

      {/* Workspace switcher */}
      <div className="p-2">
        <DropdownMenu>
          <DropdownMenuTrigger
            className="flex w-full cursor-pointer items-center justify-between gap-2 rounded-md px-2 py-2 text-sm font-medium text-zinc-300 transition-colors hover:bg-zinc-800 hover:text-zinc-50 focus:outline-none"
          >
            <div className="flex min-w-0 items-center gap-2">
              <div className="flex h-5 w-5 shrink-0 items-center justify-center rounded-sm bg-indigo-600 text-[10px] font-bold text-white">
                {activeWorkspace.name[0]}
              </div>
              <span className="truncate text-sm">{activeWorkspace.name}</span>
            </div>
            <ChevronDown className="h-3.5 w-3.5 shrink-0 text-zinc-500" />
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className="border-zinc-800 bg-zinc-900"
            align="start"
          >
            {MOCK_WORKSPACES.map((ws) => (
              <DropdownMenuItem
                key={ws.id}
                onClick={() => setActiveWorkspace(ws)}
                className="flex cursor-pointer items-center gap-2 text-zinc-300 focus:bg-zinc-800 focus:text-zinc-50"
              >
                <div className="flex h-5 w-5 shrink-0 items-center justify-center rounded-sm bg-indigo-600 text-[10px] font-bold text-white">
                  {ws.name[0]}
                </div>
                <span className="flex-1 truncate">{ws.name}</span>
                <Badge
                  className={cn(
                    "h-4 border-0 px-1 text-[10px] font-medium uppercase",
                    ws.plan === "pro"
                      ? "bg-indigo-950 text-indigo-400"
                      : "bg-zinc-800 text-zinc-500"
                  )}
                >
                  {ws.plan}
                </Badge>
                {ws.id === activeWorkspace.id && (
                  <Check className="h-3.5 w-3.5 text-indigo-400" />
                )}
              </DropdownMenuItem>
            ))}
            <DropdownMenuSeparator />
            <DropdownMenuItem className="cursor-pointer gap-2 text-zinc-400 focus:bg-zinc-800 focus:text-zinc-50">
              <Plus className="h-4 w-4" />
              Novo workspace
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      {/* Navigation */}
      <nav className="flex-1 py-2">
        <p className="mb-1 px-4 text-[10px] font-semibold uppercase tracking-wider text-zinc-600">
          Menu
        </p>
        {NAV_ITEMS.map(({ href, label, icon: Icon }) => {
          const isActive =
            pathname === href || pathname.startsWith(`${href}/`);
          return (
            <Link
              key={href}
              href={href}
              onClick={onNavClick}
              className={cn(
                "flex items-center gap-3 border-l-2 px-4 py-2.5 text-sm font-medium transition-colors",
                isActive
                  ? "border-indigo-500 bg-zinc-800 text-zinc-50"
                  : "border-transparent text-zinc-400 hover:bg-zinc-800/50 hover:text-zinc-200"
              )}
            >
              <Icon
                className={cn(
                  "h-4 w-4 shrink-0",
                  isActive ? "text-indigo-400" : "text-zinc-500"
                )}
              />
              {label}
            </Link>
          );
        })}
      </nav>

      <Separator className="bg-zinc-800" />

      {/* User section */}
      <div className="p-2">
        <DropdownMenu>
          <DropdownMenuTrigger
            className="flex w-full cursor-pointer items-center gap-3 rounded-md px-2 py-2 transition-colors hover:bg-zinc-800 focus:outline-none"
          >
            <Avatar className="h-7 w-7 shrink-0">
              <AvatarFallback className="bg-indigo-700 text-[11px] font-semibold text-white">
                {MOCK_USER.initials}
              </AvatarFallback>
            </Avatar>
            <div className="min-w-0 flex-1 text-left">
              <p className="truncate text-xs font-medium text-zinc-200">
                {MOCK_USER.name}
              </p>
              <p className="truncate text-[10px] text-zinc-500">
                {MOCK_USER.email}
              </p>
            </div>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className="border-zinc-800 bg-zinc-900"
            side="top"
            align="start"
          >
            <DropdownMenuItem className="cursor-pointer gap-2 text-zinc-300 focus:bg-zinc-800 focus:text-zinc-50">
              <User className="h-4 w-4" />
              Perfil
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="cursor-pointer gap-2 text-red-400 focus:bg-zinc-800 focus:text-red-300">
              <LogOut className="h-4 w-4" />
              Sair
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
}
