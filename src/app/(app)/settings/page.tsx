import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";

export default function SettingsPage() {
  return (
    <div className="max-w-2xl space-y-6">
      <Tabs defaultValue="workspace">
        <TabsList className="border border-zinc-800 bg-zinc-900">
          <TabsTrigger
            value="workspace"
            className="text-zinc-400 data-active:bg-zinc-800 data-active:text-zinc-50"
          >
            Workspace
          </TabsTrigger>
          <TabsTrigger
            value="members"
            className="text-zinc-400 data-active:bg-zinc-800 data-active:text-zinc-50"
          >
            Membros
          </TabsTrigger>
          <TabsTrigger
            value="plan"
            className="text-zinc-400 data-active:bg-zinc-800 data-active:text-zinc-50"
          >
            Plano
          </TabsTrigger>
        </TabsList>

        {/* Workspace tab */}
        <TabsContent value="workspace" className="mt-4">
          <Card className="border-zinc-800 bg-zinc-900">
            <CardHeader>
              <CardTitle className="text-base text-zinc-100">
                Informações do Workspace
              </CardTitle>
              <CardDescription className="text-zinc-500">
                Gerencie as configurações gerais do seu workspace.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label className="text-zinc-300">Nome do workspace</Label>
                <Input
                  defaultValue="Minha Empresa"
                  className="border-zinc-700 bg-zinc-800 text-zinc-200 focus-visible:ring-indigo-500"
                  disabled
                />
              </div>
              <Button
                size="sm"
                className="bg-indigo-600 text-white hover:bg-indigo-500"
                disabled
              >
                Salvar alterações
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Members tab */}
        <TabsContent value="members" className="mt-4">
          <Card className="border-zinc-800 bg-zinc-900">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-base text-zinc-100">
                    Membros
                  </CardTitle>
                  <CardDescription className="text-zinc-500">
                    Gerencie quem tem acesso ao workspace.
                  </CardDescription>
                </div>
                <Button
                  size="sm"
                  className="bg-indigo-600 text-white hover:bg-indigo-500"
                  disabled
                >
                  Convidar
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <Separator className="mb-4 bg-zinc-800" />
              {/* Placeholder member row */}
              <div className="flex items-center gap-3">
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-indigo-700 text-xs font-semibold text-white">
                  BN
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-zinc-200">Bruno Nathan</p>
                  <p className="text-xs text-zinc-500">nathanbruno898@gmail.com</p>
                </div>
                <Badge className="bg-indigo-950 text-indigo-400 border-0 text-xs">
                  Admin
                </Badge>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Plan tab */}
        <TabsContent value="plan" className="mt-4">
          <Card className="border-zinc-800 bg-zinc-900">
            <CardHeader>
              <CardTitle className="text-base text-zinc-100">
                Plano atual
              </CardTitle>
              <CardDescription className="text-zinc-500">
                Gerencie sua assinatura e limites de uso.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between rounded-lg border border-indigo-800 bg-indigo-950/50 px-4 py-3">
                <div>
                  <p className="text-sm font-semibold text-indigo-300">
                    Plano Pro
                  </p>
                  <p className="text-xs text-indigo-500">R$ 49,00 / mês</p>
                </div>
                <Badge className="bg-indigo-600 text-white border-0">Ativo</Badge>
              </div>

              <div className="space-y-3">
                <UsageRow label="Leads" used={0} total={-1} />
                <UsageRow label="Colaboradores" used={1} total={-1} />
              </div>

              <Separator className="bg-zinc-800" />

              <Button
                variant="outline"
                size="sm"
                className="border-zinc-700 text-zinc-300 hover:bg-zinc-800"
                disabled
              >
                Gerenciar assinatura
              </Button>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}

function UsageRow({
  label,
  used,
  total,
}: {
  label: string;
  used: number;
  total: number;
}) {
  const isUnlimited = total === -1;
  return (
    <div className="flex items-center justify-between">
      <span className="text-sm text-zinc-400">{label}</span>
      <span className="text-sm font-medium text-zinc-200">
        {used} / {isUnlimited ? "∞" : total}
      </span>
    </div>
  );
}
