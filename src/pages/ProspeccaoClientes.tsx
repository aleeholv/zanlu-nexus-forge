import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ArrowLeft, Users, Search, Copy, Check } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface Cliente {
  nome: string;
  nicho: string;
  contato: string;
}

const ProspeccaoClientes = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [cidade, setCidade] = useState("");
  const [nicho, setNicho] = useState("");
  const [clientes, setClientes] = useState<Cliente[]>([]);
  const [copied, setCopied] = useState<number | null>(null);

  const gerarClientes = () => {
    if (!cidade || !nicho) {
      toast({
        title: "Campos obrigatórios",
        description: "Preencha cidade e nicho para prospectar",
        variant: "destructive",
      });
      return;
    }

    // Gera lista fictícia de clientes para demonstração
    const clientesGerados: Cliente[] = Array.from({ length: 60 }, (_, i) => ({
      nome: `${nicho} ${cidade} ${i + 1}`,
      nicho: nicho,
      contato: `(11) 9${String(Math.floor(Math.random() * 10000)).padStart(4, "0")}-${String(
        Math.floor(Math.random() * 10000)
      ).padStart(4, "0")}`,
    }));

    setClientes(clientesGerados);
    toast({
      title: "Clientes encontrados!",
      description: `${clientesGerados.length} potenciais clientes em ${cidade}`,
    });
  };

  const copiarContato = (index: number, contato: string) => {
    navigator.clipboard.writeText(contato);
    setCopied(index);
    toast({
      title: "Copiado!",
      description: "Contato copiado para área de transferência",
    });
    setTimeout(() => setCopied(null), 2000);
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <Button
          variant="ghost"
          onClick={() => navigate("/dashboard")}
          className="mb-6"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Voltar
        </Button>

        <div className="max-w-6xl mx-auto space-y-6">
          <Card className="bg-card/60 backdrop-blur-sm border-primary/20">
            <CardHeader>
              <div className="flex items-center gap-3 mb-2">
                <div className="w-12 h-12 rounded-lg bg-gradient-primary flex items-center justify-center">
                  <Users className="w-6 h-6 text-background" />
                </div>
                <div>
                  <CardTitle className="text-2xl">Prospecção de Clientes</CardTitle>
                  <CardDescription>Encontre clientes em potencial na sua cidade</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="cidade">Cidade</Label>
                  <Input
                    id="cidade"
                    placeholder="Ex: São Paulo"
                    value={cidade}
                    onChange={(e) => setCidade(e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <Label>Nicho / Setor</Label>
                  <Select onValueChange={setNicho}>
                    <SelectTrigger>
                      <SelectValue placeholder="Escolha o nicho" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Restaurante">Restaurantes</SelectItem>
                      <SelectItem value="Loja">Lojas/Comércio</SelectItem>
                      <SelectItem value="Clínica">Clínicas/Saúde</SelectItem>
                      <SelectItem value="Academia">Academias</SelectItem>
                      <SelectItem value="Salão">Salões de Beleza</SelectItem>
                      <SelectItem value="Escritório">Escritórios</SelectItem>
                      <SelectItem value="Construtora">Construtoras</SelectItem>
                      <SelectItem value="Hotel">Hotéis/Pousadas</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <Button
                onClick={gerarClientes}
                className="w-full"
                size="lg"
              >
                <Search className="w-5 h-5 mr-2" />
                Buscar Clientes
              </Button>
            </CardContent>
          </Card>

          {clientes.length > 0 && (
            <Card className="bg-card/60 backdrop-blur-sm border-primary/20">
              <CardHeader>
                <CardTitle>Clientes Encontrados ({clientes.length})</CardTitle>
                <CardDescription>Lista de potenciais clientes em {cidade}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-3 max-h-[600px] overflow-y-auto">
                  {clientes.map((cliente, index) => (
                    <div
                      key={index}
                      className="p-4 bg-muted/50 rounded-lg border border-border hover:border-primary/50 transition-all"
                    >
                      <h4 className="font-semibold mb-1">{cliente.nome}</h4>
                      <p className="text-sm text-muted-foreground mb-2">{cliente.nicho}</p>
                      <div className="flex items-center gap-2">
                        <span className="text-sm flex-1">{cliente.contato}</span>
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => copiarContato(index, cliente.contato)}
                        >
                          {copied === index ? (
                            <Check className="w-4 h-4" />
                          ) : (
                            <Copy className="w-4 h-4" />
                          )}
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProspeccaoClientes;
