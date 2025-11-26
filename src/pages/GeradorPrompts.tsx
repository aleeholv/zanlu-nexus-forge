import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { ArrowLeft, FileText, Copy, Check } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const GeradorPrompts = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [copied, setCopied] = useState(false);
  const [generatedPrompt, setGeneratedPrompt] = useState("");
  
  const [formData, setFormData] = useState({
    nomeProjeto: "",
    tipoProjeto: "",
    estiloVisual: "",
    paletaCores: "",
    nicho: "",
    publicoAlvo: "",
    objetivo: "",
    funcionalidades: "",
    recursos: [] as string[]
  });

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

  const recursosExtras = [
    { id: "auth", label: "Sistema de Autenticação (Login/Cadastro)" },
    { id: "dashboard", label: "Dashboard Administrativo" },
    { id: "analytics", label: "Analytics e Métricas" },
    { id: "notifications", label: "Sistema de Notificações" },
    { id: "search", label: "Busca Avançada com Filtros" },
    { id: "payments", label: "Integração com Pagamentos" },
    { id: "api", label: "Integração com APIs Externas" },
    { id: "email", label: "Sistema de E-mails Automatizados" }
  ];

  const toggleRecurso = (id: string) => {
    setFormData(prev => ({
      ...prev,
      recursos: prev.recursos.includes(id) 
        ? prev.recursos.filter(r => r !== id)
        : [...prev.recursos, id]
    }));
  };

  const generatePrompt = () => {
    const { nomeProjeto, tipoProjeto, estiloVisual, paletaCores, nicho, publicoAlvo, objetivo, funcionalidades, recursos } = formData;
    
    if (!tipoProjeto || !estiloVisual || !nicho) {
      toast({
        title: "Campos obrigatórios",
        description: "Preencha pelo menos Tipo de Projeto, Estilo Visual e Nicho",
        variant: "destructive",
      });
      return;
    }

    const basePrompt = promptTemplates[tipoProjeto]?.default || "";
    
    let prompt = nomeProjeto 
      ? `Crie o projeto "${nomeProjeto}"\n\n${basePrompt}`
      : basePrompt;

    prompt += `\n\n📋 ESPECIFICAÇÕES DO PROJETO:

ESTILO VISUAL: ${estiloVisual}
${paletaCores ? `PALETA DE CORES: ${paletaCores}` : ''}
NICHO: ${nicho}
${publicoAlvo ? `PÚBLICO-ALVO: ${publicoAlvo}` : ''}
${objetivo ? `OBJETIVO PRINCIPAL: ${objetivo}` : ''}`;

    if (funcionalidades) {
      prompt += `\n\n✨ FUNCIONALIDADES ESPECÍFICAS:\n${funcionalidades}`;
    }

    if (recursos.length > 0) {
      const recursosTexto = recursos.map(id => 
        recursosExtras.find(r => r.id === id)?.label
      ).filter(Boolean).join('\n- ');
      prompt += `\n\n🔧 RECURSOS EXTRAS NECESSÁRIOS:\n- ${recursosTexto}`;
    }

    prompt += `\n\n💡 REQUISITOS GERAIS:
- Design 100% responsivo (mobile, tablet, desktop)
- Animações suaves e microinterações
- Performance otimizada
- Acessibilidade (WCAG)
- SEO otimizado
- Código limpo e componentizado
- Tema dark/light mode`;

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
                <Label htmlFor="nomeProjeto">Nome do Projeto (Opcional)</Label>
                <Input
                  id="nomeProjeto"
                  placeholder="Ex: Sistema de Agendamento MedClinic"
                  value={formData.nomeProjeto}
                  onChange={(e) => setFormData({ ...formData, nomeProjeto: e.target.value })}
                />
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="tipoProjeto">Tipo de Projeto *</Label>
                  <Select onValueChange={(value) => setFormData({ ...formData, tipoProjeto: value })}>
                    <SelectTrigger id="tipoProjeto">
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
                  <Label htmlFor="estiloVisual">Estilo Visual *</Label>
                  <Select onValueChange={(value) => setFormData({ ...formData, estiloVisual: value })}>
                    <SelectTrigger id="estiloVisual">
                      <SelectValue placeholder="Escolha o estilo" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Dark Futurista com Neon">Dark Futurista</SelectItem>
                      <SelectItem value="Minimalista Clean">Minimalista</SelectItem>
                      <SelectItem value="Glassmorphism Moderno">Glassmorphism</SelectItem>
                      <SelectItem value="Colorido e Vibrante">Colorido e Vibrante</SelectItem>
                      <SelectItem value="Elegante e Corporativo">Elegante e Corporativo</SelectItem>
                      <SelectItem value="Moderno e Gradiente">Moderno e Gradiente</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="paletaCores">Paleta de Cores Preferida</Label>
                  <Input
                    id="paletaCores"
                    placeholder="Ex: Azul e laranja, tons de verde, roxo vibrante"
                    value={formData.paletaCores}
                    onChange={(e) => setFormData({ ...formData, paletaCores: e.target.value })}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="nicho">Nicho *</Label>
                  <Select onValueChange={(value) => setFormData({ ...formData, nicho: value })}>
                    <SelectTrigger id="nicho">
                      <SelectValue placeholder="Escolha o nicho" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Tecnologia/Software">Tecnologia/Software</SelectItem>
                      <SelectItem value="Saúde/Fitness">Saúde/Fitness</SelectItem>
                      <SelectItem value="Educação/Cursos">Educação/Cursos</SelectItem>
                      <SelectItem value="Marketing/Agência">Marketing/Agência</SelectItem>
                      <SelectItem value="Finanças/Contabilidade">Finanças/Contabilidade</SelectItem>
                      <SelectItem value="E-commerce/Vendas">E-commerce/Vendas</SelectItem>
                      <SelectItem value="Restaurante/Food">Restaurante/Food</SelectItem>
                      <SelectItem value="Imobiliário">Imobiliário</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="publicoAlvo">Público-Alvo</Label>
                <Input
                  id="publicoAlvo"
                  placeholder="Ex: Empresários de 30-50 anos, estudantes universitários, profissionais de TI"
                  value={formData.publicoAlvo}
                  onChange={(e) => setFormData({ ...formData, publicoAlvo: e.target.value })}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="objetivo">Objetivo Principal do Projeto</Label>
                <Textarea
                  id="objetivo"
                  placeholder="Ex: Aumentar conversões de leads em 40%, facilitar o agendamento de consultas, vender cursos online"
                  value={formData.objetivo}
                  onChange={(e) => setFormData({ ...formData, objetivo: e.target.value })}
                  rows={2}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="funcionalidades">Funcionalidades Específicas</Label>
                <Textarea
                  id="funcionalidades"
                  placeholder="Descreva funcionalidades específicas que você precisa. Ex: Sistema de chat em tempo real, integração com WhatsApp, área de membros com níveis de acesso"
                  value={formData.funcionalidades}
                  onChange={(e) => setFormData({ ...formData, funcionalidades: e.target.value })}
                  rows={3}
                />
              </div>

              <div className="space-y-3">
                <Label>Recursos Extras</Label>
                <div className="grid md:grid-cols-2 gap-3">
                  {recursosExtras.map((recurso) => (
                    <div key={recurso.id} className="flex items-center space-x-2">
                      <Checkbox
                        id={recurso.id}
                        checked={formData.recursos.includes(recurso.id)}
                        onCheckedChange={() => toggleRecurso(recurso.id)}
                      />
                      <label
                        htmlFor={recurso.id}
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer"
                      >
                        {recurso.label}
                      </label>
                    </div>
                  ))}
                </div>
              </div>

              <Button
                onClick={generatePrompt}
                className="w-full"
                size="lg"
              >
                <FileText className="w-5 h-5 mr-2" />
                Gerar Prompt Personalizado
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
