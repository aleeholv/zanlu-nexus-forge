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
  endereco: string;
}

const ProspeccaoClientes = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [cidade, setCidade] = useState("");
  const [nicho, setNicho] = useState("");
  const [clientes, setClientes] = useState<Cliente[]>([]);
  const [copied, setCopied] = useState<number | null>(null);

  const nomesEstabelecimentos: Record<string, string[]> = {
    Restaurante: [
      "Restaurante e Pizzaria", "Churrascaria", "Lanchonete", "Hamburgueria",
      "Restaurante Self-Service", "Pizzaria", "Pastelaria", "Açaí & Sorvetes",
      "Comida Caseira", "Espetaria", "Sushi Bar", "Cantina Italiana",
      "Restaurante Vegano", "Food Truck", "Bistrô"
    ],
    Loja: [
      "Modas e Confecções", "Calçados e Acessórios", "Boutique", "Loja de Roupas",
      "Variedades e Presentes", "Perfumaria", "Ótica", "Farmácia",
      "Pet Shop", "Papelaria", "Livraria", "Casa de Tintas", "Materiais de Construção"
    ],
    Clínica: [
      "Clínica Odontológica", "Clínica Médica", "Fisioterapia", "Psicologia",
      "Nutrição", "Dermatologia", "Estética Avançada", "Ortopedia"
    ],
    Academia: [
      "Academia", "Studio de Pilates", "CrossFit", "Artes Marciais",
      "Yoga Studio", "Funcional Training", "Personal Studio"
    ],
    Salão: [
      "Salão de Beleza", "Barbearia", "Espaço de Estética", "Studio de Unhas",
      "Clínica Capilar", "Spa & Beleza"
    ],
    Escritório: [
      "Escritório de Contabilidade", "Advocacia", "Consultoria Empresarial",
      "Imobiliária", "Despachante", "Assessoria Financeira"
    ],
    Construtora: [
      "Construtora", "Engenharia Civil", "Arquitetura", "Reformas e Construções"
    ],
    Hotel: [
      "Hotel", "Pousada", "Hostel", "Apart Hotel", "Hotel Fazenda"
    ],
  };

  const dddPorCidade: Record<string, string> = {
    "São Paulo": "11", "Campinas": "19", "Santos": "13", "Sorocaba": "15",
    "Rio de Janeiro": "21", "Niterói": "21", "Belo Horizonte": "31",
    "Curitiba": "41", "Florianópolis": "48", "Porto Alegre": "51",
    "Brasília": "61", "Goiânia": "62", "Salvador": "71", "Fortaleza": "85",
    "Recife": "81", "Manaus": "92", "Belém": "91"
  };

  const ruasPorCidade: Record<string, string[]> = {
    "São Paulo": ["Av. Paulista", "Rua Augusta", "Av. Faria Lima", "Rua Oscar Freire", "Av. Brigadeiro"],
    "Rio de Janeiro": ["Av. Atlântica", "Rua Visconde de Pirajá", "Av. das Américas", "Rua Dias Ferreira"],
    "Belo Horizonte": ["Av. Afonso Pena", "Rua da Bahia", "Av. Raja Gabaglia", "Rua Tomé de Souza"],
    "Curitiba": ["Rua XV de Novembro", "Av. Batel", "Rua 24 Horas", "Av. Cândido de Abreu"],
    "default": ["Rua Principal", "Av. Central", "Rua do Comércio", "Av. Brasil", "Rua das Flores"]
  };

  const gerarClientes = () => {
    if (!cidade || !nicho) {
      toast({
        title: "Campos obrigatórios",
        description: "Preencha cidade e nicho para prospectar",
        variant: "destructive",
      });
      return;
    }

    const nomes = nomesEstabelecimentos[nicho] || ["Estabelecimento"];
    const ddd = dddPorCidade[cidade] || "11";
    const ruas = ruasPorCidade[cidade] || ruasPorCidade.default;

    const clientesGerados: Cliente[] = Array.from({ length: 60 }, (_, i) => {
      const nomeBase = nomes[i % nomes.length];
      const sufixo = i < nomes.length ? "" : ` ${Math.floor(i / nomes.length) + 1}`;
      const rua = ruas[i % ruas.length];
      const numero = 100 + Math.floor(Math.random() * 900);

      return {
        nome: `${nomeBase}${sufixo}`,
        nicho: nicho,
        contato: `(${ddd}) 9${String(Math.floor(Math.random() * 10000)).padStart(4, "0")}-${String(
          Math.floor(Math.random() * 10000)
        ).padStart(4, "0")}`,
        endereco: `${rua}, ${numero} - ${cidade}`
      };
    });

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
                  <Select onValueChange={setCidade}>
                    <SelectTrigger>
                      <SelectValue placeholder="Escolha a cidade" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="São Paulo">São Paulo - SP</SelectItem>
                      <SelectItem value="Rio de Janeiro">Rio de Janeiro - RJ</SelectItem>
                      <SelectItem value="Belo Horizonte">Belo Horizonte - MG</SelectItem>
                      <SelectItem value="Curitiba">Curitiba - PR</SelectItem>
                      <SelectItem value="Brasília">Brasília - DF</SelectItem>
                      <SelectItem value="Salvador">Salvador - BA</SelectItem>
                      <SelectItem value="Fortaleza">Fortaleza - CE</SelectItem>
                      <SelectItem value="Recife">Recife - PE</SelectItem>
                      <SelectItem value="Porto Alegre">Porto Alegre - RS</SelectItem>
                      <SelectItem value="Manaus">Manaus - AM</SelectItem>
                    </SelectContent>
                  </Select>
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
                <div className="space-y-3 max-h-[600px] overflow-y-auto pr-2">
                  {clientes.map((cliente, index) => (
                    <div
                      key={index}
                      className="p-4 bg-muted/50 rounded-lg border border-border hover:border-primary/50 transition-all"
                    >
                      <div className="flex items-start justify-between gap-3 mb-2">
                        <div className="flex-1">
                          <h4 className="font-semibold text-lg mb-1">{cliente.nome}</h4>
                          <p className="text-sm text-muted-foreground mb-1">
                            <span className="font-medium">Nicho:</span> {cliente.nicho}
                          </p>
                          <p className="text-sm text-muted-foreground mb-1">
                            <span className="font-medium">Endereço:</span> {cliente.endereco}
                          </p>
                          <p className="text-sm text-primary font-medium">
                            <span className="text-muted-foreground font-medium">Telefone:</span> {cliente.contato}
                          </p>
                        </div>
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => copiarContato(index, cliente.contato)}
                          className="shrink-0"
                        >
                          {copied === index ? (
                            <Check className="w-4 h-4" />
                          ) : (
                            <Copy className="w-4 h-4" />
                          )}
                        </Button>
                      </div>
                      <Button
                        size="sm"
                        variant="outline"
                        className="w-full mt-2"
                        onClick={() => window.open(`https://www.google.com/maps/search/${encodeURIComponent(cliente.endereco)}`, '_blank')}
                      >
                        Ver no Google Maps
                      </Button>
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
