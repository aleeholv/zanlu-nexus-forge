import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ArrowLeft, MessageSquare, Copy, Check } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const MensagensProntas = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [tipoMensagem, setTipoMensagem] = useState("");
  const [nicho, setNicho] = useState("");
  const [mensagemGerada, setMensagemGerada] = useState("");
  const [copied, setCopied] = useState(false);

  const mensagemTemplates: Record<string, Record<string, Record<string, string>>> = {
    curta: {
      Restaurante: {
        default: "Olá! 👋 Notei que seu restaurante ainda não tem um site profissional. Que tal ter um cardápio digital moderno e atrair mais clientes? Posso te mostrar como! 🍽️",
      },
      Loja: {
        default: "Oi! 🛍️ Vi que sua loja tem potencial para vender muito mais online. Já pensou em ter uma loja virtual profissional? Posso te ajudar! 💻",
      },
      Clínica: {
        default: "Olá! 👨‍⚕️ Sua clínica merece uma presença digital à altura. Que tal um site profissional com agendamento online? Vamos conversar! 📅",
      },
      Academia: {
        default: "Oi! 💪 Sua academia pode atrair muito mais alunos com presença digital. Que tal um site com agendamento de aulas e planos online? Vamos conversar! 🏋️",
      },
      Salão: {
        default: "Olá! ✨ Seu salão merece estar online! Que tal um site com agendamento automático e galeria de trabalhos? Posso te ajudar! 💇",
      },
      Construtora: {
        default: "Olá! 🏗️ Sua construtora precisa de uma presença digital profissional. Portfólio de obras + formulário de orçamento? Vamos conversar! 📐",
      },
    },
    longa: {
      Restaurante: {
        default: `Olá! 👋

Espero que esteja tudo bem! Eu sou da ZanluNet e somos especializados em criar sites profissionais para restaurantes.

Notei que seu negócio tem muito potencial, mas ainda não tem uma presença digital forte. Hoje em dia, 80% dos clientes pesquisam online antes de escolher onde comer.

Podemos criar para você:
✅ Site profissional e moderno
✅ Cardápio digital interativo
✅ Sistema de pedidos online
✅ Integração com WhatsApp
✅ Fotos profissionais dos pratos

Tudo por um preço justo e com pagamento facilitado.

Que tal conversarmos? Tenho certeza que posso ajudar seu restaurante a crescer! 🍽️

Aguardo seu retorno!`,
      },
      Loja: {
        default: `Olá! 👋

Tudo bem? Sou da ZanluNet, especializada em criar lojas virtuais profissionais.

Reparei que sua loja tem produtos incríveis, mas ainda não está vendendo online. Você sabia que pode aumentar suas vendas em até 300% com uma loja virtual?

Oferecemos:
✅ Loja virtual completa
✅ Integração com pagamento
✅ Controle de estoque
✅ Painel administrativo
✅ Suporte técnico

Investimento acessível e resultados garantidos!

Posso te mostrar alguns cases de sucesso. Vamos conversar? 🛍️`,
      },
      Clínica: {
        default: `Olá! 👋

Sou da ZanluNet e trabalho com transformação digital para clínicas e consultórios.

Seus pacientes estão buscando você online, mas será que te encontram facilmente? Um site profissional pode:

✅ Aumentar o número de agendamentos
✅ Passar mais credibilidade
✅ Facilitar o contato dos pacientes
✅ Mostrar seus diferenciais
✅ Integrar com WhatsApp

Temos planos especiais para profissionais da saúde!

Que tal marcarmos uma conversa rápida? 👨‍⚕️`,
      },
      Academia: {
        default: `Olá! 👋

Sou da ZanluNet e ajudo academias a crescerem no digital!

Sua academia pode atrair muito mais alunos com uma presença online forte:

✅ Site profissional com seus diferenciais
✅ Agendamento de aulas online
✅ Galeria de fotos da estrutura
✅ Venda de planos online
✅ Integração com redes sociais

Academias com site profissional convertem 3x mais!

Vamos conversar sobre como podemos ajudar? 💪`,
      },
    },
    followup: {
      Restaurante: {
        default: "Oi! Vi que você visualizou minha mensagem. Conseguiu dar uma olhada na proposta? Se tiver alguma dúvida, é só chamar! Tenho cases incríveis para te mostrar 🍽️",
      },
      Loja: {
        default: "Oi! Tudo bem? Pensei em você e queria saber se gostaria de ver alguns exemplos de lojas virtuais que criamos. Tenho certeza que vai gostar! 🛍️",
      },
      Clínica: {
        default: "Olá! Conseguiu pensar na nossa conversa? Preparei uma proposta especial para sua clínica. Quando podemos conversar? 👨‍⚕️",
      },
    },
  };

  const gerarMensagem = () => {
    if (!tipoMensagem || !nicho) {
      toast({
        title: "Campos obrigatórios",
        description: "Escolha o tipo e nicho para gerar a mensagem",
        variant: "destructive",
      });
      return;
    }

    const mensagem = mensagemTemplates[tipoMensagem]?.[nicho]?.default || "Mensagem não encontrada";
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
                  <label className="text-sm font-medium">Tipo de Mensagem</label>
                  <Select onValueChange={setTipoMensagem}>
                    <SelectTrigger>
                      <SelectValue placeholder="Escolha o tipo" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="curta">Mensagem Curta (Primeira abordagem)</SelectItem>
                      <SelectItem value="longa">Mensagem Longa (Detalhada)</SelectItem>
                      <SelectItem value="followup">Follow-up (Segunda mensagem)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium">Nicho do Cliente</label>
                  <Select onValueChange={setNicho}>
                    <SelectTrigger>
                      <SelectValue placeholder="Escolha o nicho" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Restaurante">Restaurante</SelectItem>
                      <SelectItem value="Loja">Loja/Comércio</SelectItem>
                      <SelectItem value="Clínica">Clínica/Saúde</SelectItem>
                      <SelectItem value="Academia">Academia</SelectItem>
                      <SelectItem value="Salão">Salão de Beleza</SelectItem>
                      <SelectItem value="Construtora">Construtora</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <Button
                onClick={gerarMensagem}
                className="w-full"
                size="lg"
              >
                <MessageSquare className="w-5 h-5 mr-2" />
                Gerar Mensagem
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
