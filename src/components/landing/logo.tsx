import Link from "next/link";
import { TrendingUp } from "lucide-react";

interface LogoProps {
  size?: "sm" | "lg";
}

export function Logo({ size = "lg" }: LogoProps) {
  if (size === "sm") {
    return (
      <Link href="/" className="group flex items-center gap-2">
        <div className="flex h-7 w-7 items-center justify-center rounded-md bg-indigo-600/80 transition-colors group-hover:bg-indigo-600">
          <TrendingUp className="h-3.5 w-3.5 text-white" />
        </div>
        <span className="text-sm font-bold text-zinc-400 transition-colors group-hover:text-zinc-300">
          Pipe<span className="text-indigo-400">Flow</span>
        </span>
      </Link>
    );
  }

  return (
    <Link href="/" className="group flex items-center gap-2">
      <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-indigo-600 shadow-lg shadow-indigo-500/30 transition-shadow group-hover:shadow-indigo-500/50">
        <TrendingUp className="h-4 w-4 text-white" />
      </div>
      <span className="text-lg font-bold tracking-tight text-zinc-50">
        Pipe<span className="text-indigo-400">Flow</span>
      </span>
    </Link>
  );
}
