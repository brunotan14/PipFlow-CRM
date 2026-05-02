import { GitBranch } from "lucide-react";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-950 p-4">
      <div className="w-full max-w-sm">
        <div className="mb-8 flex flex-col items-center gap-2">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-indigo-600">
            <GitBranch className="h-5 w-5 text-white" />
          </div>
          <span className="text-xl font-semibold text-zinc-50">
            PipeFlow CRM
          </span>
          <p className="text-sm text-zinc-500">
            Gestão de vendas simplificada
          </p>
        </div>
        {children}
      </div>
    </div>
  );
}
