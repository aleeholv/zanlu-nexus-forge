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
      default: "Crie uma landing page moderna e conversiva com seções: hero com CTA, benefícios, depoimentos, preços e footer. Use animações suaves e design responsivo.",
    },
    "dashboard": {
      default: "Crie um dashboard administrativo completo com sidebar, gráficos interativos, tabelas de dados, sistema de notificações e perfil de usuário.",
    },
    "ecommerce": {
      default: "Crie uma loja online completa com catálogo de produtos, carrinho de compras, checkout, painel administrativo e integração com pagamento.",
    },
    "saas": {
      default: "Crie uma aplicação SaaS completa com autenticação, dashboard do usuário, sistema de planos/assinaturas, área de configurações e documentação.",
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
