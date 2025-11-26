import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ArrowLeft, FileText, Copy, Check } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const GeradorPrompts = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [copied, setCopied] = useState(false);
  const [tipoProjeto, setTipoProjeto] = useState("");
  const [estiloVisual, setEstiloVisual] = useState("");
  const [nicho, setNicho] = useState("");
  const [generatedPrompt, setGeneratedPrompt] = useState("");

  const promptTemplates: Record<string, Record<string, string>> = {
    "landing-page": {
      default: "Crie uma landing page moderna e conversiva com:\n- Hero section impactante com título chamativo, subtítulo explicativo e CTA principal\n- Seção de benefícios com ícones e descrições\n- Seção de como funciona (3-4 passos)\n- Depoimentos de clientes com fotos e avaliações\n- Tabela de preços com 3 planos\n- FAQ com perguntas frequentes\n- Footer completo com links e redes sociais\n\nUse animações suaves ao scroll, gradientes modernos e design responsivo.",
    },
    "dashboard": {
      default: "Crie um dashboard administrativo completo com:\n- Sidebar responsiva com menu de navegação\n- Header com busca, notificações e perfil do usuário\n- Cards de métricas principais (KPIs)\n- Gráficos interativos (linha, barra, pizza) usando recharts\n- Tabela de dados com paginação, filtros e ordenação\n- Modal para ações rápidas\n- Sistema de notificações toast\n- Tema dark/light\n\nUse design moderno, cores suaves e componentes reutilizáveis.",
    },
    "ecommerce": {
      default: "Crie uma loja online completa com:\n- Página inicial com produtos em destaque e categorias\n- Página de listagem com filtros (preço, categoria, ordenação)\n- Página de detalhes do produto com galeria de imagens\n- Carrinho de compras com cálculo de subtotal e frete\n- Checkout multi-step (dados, endereço, pagamento)\n- Painel do vendedor com gestão de produtos e pedidos\n- Sistema de avaliações e comentários\n- Integração com API de pagamento\n\nUse imagens de alta qualidade e UX otimizada para conversão.",
    },
    "saas": {
      default: "Crie uma aplicação SaaS completa com:\n- Landing page de vendas com planos e preços\n- Sistema de autenticação (login/cadastro/recuperar senha)\n- Onboarding guiado para novos usuários\n- Dashboard principal com estatísticas e ações rápidas\n- Área de configurações (perfil, conta, notificações, integrações)\n- Sistema de planos e upgrade/downgrade\n- Documentação interativa ou central de ajuda\n- Área de suporte/tickets\n- Billing e histórico de pagamentos\n\nUse design profissional, fluxos bem definidos e componentes escaláveis.",
    },
    "blog": {
      default: "Crie um blog completo com:\n- Homepage com posts em destaque e grid de artigos\n- Página de artigo com formatação rica e table of contents\n- Sistema de categorias e tags\n- Busca de artigos\n- Sidebar com posts relacionados e populares\n- Área administrativa para criar/editar posts\n- Sistema de comentários\n- Newsletter signup\n\nUse tipografia otimizada para leitura e SEO.",
    },
    "portfolio": {
      default: "Crie um portfólio profissional com:\n- Hero section com apresentação e foto\n- Seção sobre mim com skills e experiências\n- Grid de projetos com filtro por categoria\n- Página de detalhes de cada projeto com imagens e descrição\n- Seção de depoimentos de clientes\n- Formulário de contato funcional\n- Links para redes sociais\n\nUse animações elegantes e design minimalista profissional.",
    },
  };

  const generatePrompt = () => {
    if (!tipoProjeto || !estiloVisual || !nicho) {
      toast({
        title: "Campos obrigatórios",
        description: "Preencha todos os campos para gerar o prompt",
        variant: "destructive",
      });
      return;
    }

    const basePrompt = promptTemplates[tipoProjeto]?.default || "";
    const prompt = `${basePrompt}

ESTILO VISUAL: ${estiloVisual}
NICHO: ${nicho}

Inclua:
- Design responsivo e moderno
- Animações e transições suaves
- Paleta de cores adequada ao nicho
- Componentes reutilizáveis
- Boas práticas de UX/UI`;

    setGeneratedPrompt(prompt);
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(generatedPrompt);
    setCopied(true);
    toast({
      title: "Copiado!",
      description: "Prompt copiado para a área de transferência",
    });
    setTimeout(() => setCopied(false), 2000);
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

        <div className="max-w-3xl mx-auto space-y-6">
          <Card className="bg-card/60 backdrop-blur-sm border-primary/20">
            <CardHeader>
              <div className="flex items-center gap-3 mb-2">
                <div className="w-12 h-12 rounded-lg bg-gradient-primary flex items-center justify-center">
                  <FileText className="w-6 h-6 text-background" />
                </div>
                <div>
                  <CardTitle className="text-2xl">Gerador de Prompts</CardTitle>
                  <CardDescription>Prompts otimizados para criar projetos na Lovable</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <label className="text-sm font-medium">Tipo de Projeto</label>
                <Select onValueChange={setTipoProjeto}>
                  <SelectTrigger>
                    <SelectValue placeholder="Escolha o tipo" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="landing-page">Landing Page</SelectItem>
                    <SelectItem value="dashboard">Dashboard/Painel</SelectItem>
                    <SelectItem value="ecommerce">E-commerce</SelectItem>
                    <SelectItem value="saas">SaaS Completo</SelectItem>
                    <SelectItem value="blog">Blog/Notícias</SelectItem>
                    <SelectItem value="portfolio">Portfólio Profissional</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Estilo Visual</label>
                <Select onValueChange={setEstiloVisual}>
                  <SelectTrigger>
                    <SelectValue placeholder="Escolha o estilo" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Dark Futurista com Neon">Dark Futurista</SelectItem>
                    <SelectItem value="Minimalista Clean">Minimalista</SelectItem>
                    <SelectItem value="Glassmorphism Moderno">Glassmorphism</SelectItem>
                    <SelectItem value="Colorido e Vibrante">Colorido e Vibrante</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Nicho</label>
                <Select onValueChange={setNicho}>
                  <SelectTrigger>
                    <SelectValue placeholder="Escolha o nicho" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Tecnologia/Software">Tecnologia/Software</SelectItem>
                    <SelectItem value="Saúde/Fitness">Saúde/Fitness</SelectItem>
                    <SelectItem value="Educação/Cursos">Educação/Cursos</SelectItem>
                    <SelectItem value="Marketing/Agência">Marketing/Agência</SelectItem>
                    <SelectItem value="Finanças/Contabilidade">Finanças/Contabilidade</SelectItem>
                    <SelectItem value="E-commerce/Vendas">E-commerce/Vendas</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <Button
                onClick={generatePrompt}
                className="w-full"
                size="lg"
              >
                <FileText className="w-5 h-5 mr-2" />
                Gerar Prompt
              </Button>
            </CardContent>
          </Card>

          {generatedPrompt && (
            <Card className="bg-card/60 backdrop-blur-sm border-primary/20">
              <CardHeader>
                <CardTitle>Prompt Gerado</CardTitle>
                <CardDescription>Copie e use na Lovable</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="relative">
                  <pre className="bg-muted p-4 rounded-lg overflow-x-auto text-sm whitespace-pre-wrap">
                    {generatedPrompt}
                  </pre>
                  <Button
                    onClick={copyToClipboard}
                    className="absolute top-2 right-2"
                    size="sm"
                  >
                    {copied ? (
                      <>
                        <Check className="w-4 h-4 mr-2" />
                        Copiado
                      </>
                    ) : (
                      <>
                        <Copy className="w-4 h-4 mr-2" />
                        Copiar
                      </>
                    )}
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
};

export default GeradorPrompts;
