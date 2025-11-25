import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ArrowLeft, Sparkles, Copy, Check } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const CriarSaas = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [copied, setCopied] = useState(false);
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    nomeSite: "",
    corPrincipal: "",
    estilo: "",
    funcionalidades: "",
    imagensDesejadas: "",
    publicoAlvo: "",
    objetivo: "",
  });
  const [generatedPrompt, setGeneratedPrompt] = useState("");

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const generatePrompt = () => {
    const prompt = `Crie um projeto completo para: ${formData.nomeSite}

ESTILO VISUAL:
- Cor principal: ${formData.corPrincipal}
- Estilo: ${formData.estilo}

FUNCIONALIDADES:
${formData.funcionalidades}

IMAGENS/RECURSOS:
${formData.imagensDesejadas}

PÚBLICO-ALVO:
${formData.publicoAlvo}

OBJETIVO:
${formData.objetivo}

Por favor, crie uma aplicação moderna, responsiva e completa seguindo estas especificações.`;

    setGeneratedPrompt(prompt);
    setStep(2);
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

        {step === 1 ? (
          <Card className="max-w-3xl mx-auto bg-card/60 backdrop-blur-sm border-primary/20">
            <CardHeader>
              <div className="flex items-center gap-3 mb-2">
                <div className="w-12 h-12 rounded-lg bg-gradient-primary flex items-center justify-center">
                  <Sparkles className="w-6 h-6 text-background" />
                </div>
                <div>
                  <CardTitle className="text-2xl">Criar Meu SaaS</CardTitle>
                  <CardDescription>Responda as perguntas para gerar seu projeto</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="nomeSite">Nome do Site/SaaS</Label>
                <Input
                  id="nomeSite"
                  placeholder="Ex: MeuApp Incrível"
                  value={formData.nomeSite}
                  onChange={(e) => handleInputChange("nomeSite", e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="corPrincipal">Cor Principal</Label>
                <Select onValueChange={(value) => handleInputChange("corPrincipal", value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Escolha uma cor" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Azul/Ciano (moderno)">Azul/Ciano (moderno)</SelectItem>
                    <SelectItem value="Roxo/Magenta (criativo)">Roxo/Magenta (criativo)</SelectItem>
                    <SelectItem value="Verde/Neon (tech)">Verde/Neon (tech)</SelectItem>
                    <SelectItem value="Laranja/Dourado (energia)">Laranja/Dourado (energia)</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="estilo">Estilo Visual</Label>
                <Select onValueChange={(value) => handleInputChange("estilo", value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Escolha um estilo" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Dark Futurista (estilo cyberpunk)">Dark Futurista</SelectItem>
                    <SelectItem value="Minimalista Claro">Minimalista Claro</SelectItem>
                    <SelectItem value="Glassmorphism Moderno">Glassmorphism</SelectItem>
                    <SelectItem value="Gradientes Vibrantes">Gradientes Vibrantes</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="funcionalidades">Funcionalidades Principais</Label>
                <Textarea
                  id="funcionalidades"
                  placeholder="Ex: Dashboard, sistema de login, cadastro de produtos, área de membros..."
                  rows={4}
                  value={formData.funcionalidades}
                  onChange={(e) => handleInputChange("funcionalidades", e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="imagensDesejadas">Imagens/Recursos Visuais</Label>
                <Textarea
                  id="imagensDesejadas"
                  placeholder="Descreva as imagens ou elementos visuais que deseja incluir..."
                  rows={3}
                  value={formData.imagensDesejadas}
                  onChange={(e) => handleInputChange("imagensDesejadas", e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="publicoAlvo">Público-Alvo</Label>
                <Input
                  id="publicoAlvo"
                  placeholder="Ex: Empreendedores, empresas pequenas, desenvolvedores..."
                  value={formData.publicoAlvo}
                  onChange={(e) => handleInputChange("publicoAlvo", e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="objetivo">Objetivo do Projeto</Label>
                <Textarea
                  id="objetivo"
                  placeholder="Ex: Facilitar a gestão de clientes, automatizar processos, vender serviços online..."
                  rows={3}
                  value={formData.objetivo}
                  onChange={(e) => handleInputChange("objetivo", e.target.value)}
                />
              </div>

              <Button
                onClick={generatePrompt}
                className="w-full"
                size="lg"
                disabled={!formData.nomeSite || !formData.objetivo}
              >
                <Sparkles className="w-5 h-5 mr-2" />
                Gerar Prompt Completo
              </Button>
            </CardContent>
          </Card>
        ) : (
          <Card className="max-w-3xl mx-auto bg-card/60 backdrop-blur-sm border-primary/20">
            <CardHeader>
              <CardTitle className="text-2xl">Seu Prompt Está Pronto!</CardTitle>
              <CardDescription>Copie e cole na Lovable para criar seu projeto</CardDescription>
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

              <div className="flex gap-3">
                <Button
                  onClick={() => setStep(1)}
                  variant="outline"
                  className="flex-1"
                >
                  Gerar Novo Prompt
                </Button>
                <Button
                  onClick={() => navigate("/dashboard")}
                  className="flex-1"
                >
                  Voltar ao Dashboard
                </Button>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default CriarSaas;
