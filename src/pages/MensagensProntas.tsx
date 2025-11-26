import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { ArrowLeft, MessageSquare, Copy, Check } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const MensagensProntas = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [mensagemGerada, setMensagemGerada] = useState("");
  const [copied, setCopied] = useState(false);
  
  const [formData, setFormData] = useState({
    seuNome: "",
    empresaAlvo: "",
    pessoaAlvo: "",
    problema: "",
    solucao: "",
    diferencial: "",
    objetivo: "",
    tom: ""
  });

  const gerarMensagem = () => {
    const { seuNome, empresaAlvo, pessoaAlvo, problema, solucao, diferencial, objetivo, tom } = formData;
    
    if (!seuNome || !empresaAlvo || !problema || !solucao || !diferencial || !objetivo || !tom) {
      toast({
        title: "Campos obrigatórios",
        description: "Preencha todos os campos para gerar a mensagem",
        variant: "destructive",
      });
      return;
    }

    let mensagem = "";
    const saudacao = pessoaAlvo ? `Olá, ${pessoaAlvo}!` : `Olá!`;
    
    if (tom === "formal") {
      mensagem = `${saudacao}

Meu nome é ${seuNome} e gostaria de apresentar uma solução que pode beneficiar a ${empresaAlvo}.

Percebi que ${problema}, e acredito que posso ajudar com isso.

Nossa solução: ${solucao}

Nosso diferencial: ${diferencial}

${objetivo}

Fico à disposição para agendar uma conversa e apresentar mais detalhes sobre como podemos contribuir para o crescimento da ${empresaAlvo}.

Atenciosamente,
${seuNome}`;
    } else if (tom === "casual") {
      mensagem = `${saudacao} 👋

Tudo bem? Sou o(a) ${seuNome}!

Estava dando uma olhada na ${empresaAlvo} e percebi que ${problema}.

Tenho uma solução que pode te ajudar: ${solucao}

O legal é que ${diferencial}! 

${objetivo}

Que tal trocarmos uma ideia sobre isso? Tenho certeza que posso agregar bastante para a ${empresaAlvo}! 😊

Abraço,
${seuNome}`;
    } else { // direta
      mensagem = `${saudacao}

${seuNome} aqui.

Identificamos que a ${empresaAlvo} ${problema}.

Solução: ${solucao}

Diferencial: ${diferencial}

${objetivo}

Vamos conversar?

${seuNome}`;
    }
    
    setMensagemGerada(mensagem);
  };

  const copiarMensagem = () => {
    navigator.clipboard.writeText(mensagemGerada);
    setCopied(true);
    toast({
      title: "Copiado!",
      description: "Mensagem copiada para área de transferência",
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
                  <MessageSquare className="w-6 h-6 text-background" />
                </div>
                <div>
                  <CardTitle className="text-2xl">Mensagens Prontas</CardTitle>
                  <CardDescription>Copies otimizadas para vendas</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="seuNome">Seu Nome</Label>
                  <Input
                    id="seuNome"
                    placeholder="Ex: João Silva"
                    value={formData.seuNome}
                    onChange={(e) => setFormData({ ...formData, seuNome: e.target.value })}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="empresaAlvo">Nome da Empresa Alvo</Label>
                  <Input
                    id="empresaAlvo"
                    placeholder="Ex: Restaurante Sabor do Mar"
                    value={formData.empresaAlvo}
                    onChange={(e) => setFormData({ ...formData, empresaAlvo: e.target.value })}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="pessoaAlvo">Nome da Pessoa Alvo (Opcional)</Label>
                  <Input
                    id="pessoaAlvo"
                    placeholder="Ex: Maria"
                    value={formData.pessoaAlvo}
                    onChange={(e) => setFormData({ ...formData, pessoaAlvo: e.target.value })}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="tom">Tom da Mensagem</Label>
                  <Select onValueChange={(value) => setFormData({ ...formData, tom: value })}>
                    <SelectTrigger>
                      <SelectValue placeholder="Escolha o tom" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="formal">Formal</SelectItem>
                      <SelectItem value="casual">Casual</SelectItem>
                      <SelectItem value="direta">Direta e Objetiva</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2 md:col-span-2">
                  <Label htmlFor="problema">Principal Problema que seu Produto Resolve</Label>
                  <Textarea
                    id="problema"
                    placeholder="Ex: não possui presença digital e está perdendo clientes para concorrentes"
                    value={formData.problema}
                    onChange={(e) => setFormData({ ...formData, problema: e.target.value })}
                    rows={2}
                  />
                </div>

                <div className="space-y-2 md:col-span-2">
                  <Label htmlFor="solucao">Sua Solução em uma Frase</Label>
                  <Textarea
                    id="solucao"
                    placeholder="Ex: criamos sites profissionais que aumentam vendas em até 300%"
                    value={formData.solucao}
                    onChange={(e) => setFormData({ ...formData, solucao: e.target.value })}
                    rows={2}
                  />
                </div>

                <div className="space-y-2 md:col-span-2">
                  <Label htmlFor="diferencial">Seu Principal Diferencial</Label>
                  <Textarea
                    id="diferencial"
                    placeholder="Ex: entregamos em 48h com suporte vitalício incluso"
                    value={formData.diferencial}
                    onChange={(e) => setFormData({ ...formData, diferencial: e.target.value })}
                    rows={2}
                  />
                </div>

                <div className="space-y-2 md:col-span-2">
                  <Label htmlFor="objetivo">Objetivo da Mensagem</Label>
                  <Textarea
                    id="objetivo"
                    placeholder="Ex: Gostaria de agendar uma conversa de 15 minutos para apresentar nossa solução"
                    value={formData.objetivo}
                    onChange={(e) => setFormData({ ...formData, objetivo: e.target.value })}
                    rows={2}
                  />
                </div>
              </div>

              <Button
                onClick={gerarMensagem}
                className="w-full"
                size="lg"
              >
                <MessageSquare className="w-5 h-5 mr-2" />
                Gerar Mensagem Personalizada
              </Button>
            </CardContent>
          </Card>

          {mensagemGerada && (
            <Card className="bg-card/60 backdrop-blur-sm border-primary/20">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>Mensagem Gerada</CardTitle>
                  <Button onClick={copiarMensagem} size="sm">
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
              </CardHeader>
              <CardContent>
                <div className="bg-muted p-6 rounded-lg whitespace-pre-wrap">
                  {mensagemGerada}
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
};

export default MensagensProntas;
