import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "PipeFlow CRM",
  description: "Gestão de clientes e vendas para pequenas e médias empresas",
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
      </body>
    </html>
  );
}
