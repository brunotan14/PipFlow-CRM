import type { Metadata } from "next";
import "./globals.css";
import { Toaster } from "@/components/ui/sonner";

export const metadata: Metadata = {
  title: {
    default: "PipeFlow CRM — Pipeline de Vendas para Times Modernos",
    template: "%s | PipeFlow CRM",
  },
  description:
    "Pipeline Kanban visual, gestão de leads e métricas em tempo real. Feche mais negócios sem planilha. Grátis para começar.",
  keywords: ["CRM", "pipeline de vendas", "gestão de leads", "kanban", "vendas", "CRM brasileiro"],
  authors: [{ name: "PipeFlow" }],
  openGraph: {
    title: "PipeFlow CRM — Pipeline de Vendas para Times Modernos",
    description:
      "Pipeline Kanban visual, gestão de leads e métricas em tempo real. Feche mais negócios sem planilha.",
    type: "website",
    locale: "pt_BR",
    siteName: "PipeFlow CRM",
  },
  twitter: {
    card: "summary_large_image",
    title: "PipeFlow CRM",
    description: "Pipeline de vendas visual para times modernos.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" className="dark">
      <body className="antialiased bg-zinc-950 text-zinc-50 font-sans">
        {children}
        <Toaster richColors position="bottom-right" />
      </body>
    </html>
  );
}
