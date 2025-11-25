import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { ArrowLeft, DollarSign, Copy, Check, Users, TrendingUp } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const Afiliados = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [user, setUser] = useState<any>(null);
  const [copied, setCopied] = useState(false);
  const [linkAfiliado, setLinkAfiliado] = useState("");

  useEffect(() => {
    const checkUser = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      
      if (!user) {
        navigate("/auth");
        return;
      }

      setUser(user);
      // Gera link de afiliado baseado no ID do usuário
      setLinkAfiliado(`https://zanlunet.app/ref/${user.id.substring(0, 8)}`);
    };

    checkUser();
  }, [navigate]);

  const copiarLink = () => {
    navigator.clipboard.writeText(linkAfiliado);
    setCopied(true);
    toast({
      title: "Link copiado!",
      description: "Compartilhe com seus contatos",
    });
    setTimeout(() => setCopied(false), 2000);
  };

  // Dados simulados (em produção, viriam do banco de dados)
  const stats = {
    totalVendas: 0,
    comissaoTotal: 0,
    vendasMes: 0,
    proximoPagamento: 0,
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
                  <DollarSign className="w-6 h-6 text-background" />
                </div>
                <div>
                  <CardTitle className="text-2xl">Programa de Afiliados</CardTitle>
                  <CardDescription>Ganhe 50% de comissão em cada venda</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="bg-gradient-to-br from-primary/20 to-secondary/20 p-6 rounded-lg border border-primary/30">
                <h3 className="font-semibold mb-2">Seu Link de Afiliado</h3>
                <div className="flex gap-2">
                  <Input
                    value={linkAfiliado}
                    readOnly
                    className="bg-background"
                  />
                  <Button onClick={copiarLink}>
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
              </div>

              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
                <Card className="bg-muted/50 border-border">
                  <CardContent className="pt-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-muted-foreground mb-1">Total de Vendas</p>
                        <p className="text-2xl font-bold text-primary">{stats.totalVendas}</p>
                      </div>
                      <Users className="w-8 h-8 text-primary/50" />
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-muted/50 border-border">
                  <CardContent className="pt-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-muted-foreground mb-1">Comissão Total</p>
                        <p className="text-2xl font-bold text-secondary">R$ {stats.comissaoTotal}</p>
                      </div>
                      <DollarSign className="w-8 h-8 text-secondary/50" />
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-muted/50 border-border">
                  <CardContent className="pt-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-muted-foreground mb-1">Vendas este Mês</p>
                        <p className="text-2xl font-bold text-accent">{stats.vendasMes}</p>
                      </div>
                      <TrendingUp className="w-8 h-8 text-accent/50" />
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-muted/50 border-border">
                  <CardContent className="pt-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-muted-foreground mb-1">Próximo Pagamento</p>
                        <p className="text-2xl font-bold text-primary">R$ {stats.proximoPagamento}</p>
                      </div>
                      <DollarSign className="w-8 h-8 text-primary/50" />
                    </div>
                  </CardContent>
                </Card>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-card/60 backdrop-blur-sm border-primary/20">
            <CardHeader>
              <CardTitle>Como Funciona</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0">
                  <span className="text-primary font-bold">1</span>
                </div>
                <div>
                  <h4 className="font-semibold mb-1">Compartilhe seu link</h4>
                  <p className="text-sm text-muted-foreground">
                    Envie seu link exclusivo para amigos, clientes ou nas suas redes sociais
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-full bg-secondary/20 flex items-center justify-center flex-shrink-0">
                  <span className="text-secondary font-bold">2</span>
                </div>
                <div>
                  <h4 className="font-semibold mb-1">Pessoas assinam através do seu link</h4>
                  <p className="text-sm text-muted-foreground">
                    Cada pessoa que assinar usando seu link será contabilizada como sua indicação
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-full bg-accent/20 flex items-center justify-center flex-shrink-0">
                  <span className="text-accent font-bold">3</span>
                </div>
                <div>
                  <h4 className="font-semibold mb-1">Receba 50% de comissão</h4>
                  <p className="text-sm text-muted-foreground">
                    Ganhe 50% do valor da assinatura de cada cliente indicado, todo mês!
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-primary/20 to-secondary/20 border-primary/30">
            <CardContent className="pt-6">
              <div className="text-center space-y-4">
                <h3 className="text-2xl font-bold">💰 Ganhe Renda Recorrente</h3>
                <p className="text-muted-foreground max-w-2xl mx-auto">
                  Com nosso programa de afiliados, você pode criar uma renda passiva mensal. Quanto mais você indica, mais você ganha!
                </p>
                <div className="flex justify-center gap-4 mt-6">
                  <div className="text-center">
                    <p className="text-3xl font-bold text-primary">50%</p>
                    <p className="text-sm text-muted-foreground">Comissão</p>
                  </div>
                  <div className="text-center">
                    <p className="text-3xl font-bold text-secondary">♾️</p>
                    <p className="text-sm text-muted-foreground">Recorrente</p>
                  </div>
                  <div className="text-center">
                    <p className="text-3xl font-bold text-accent">Rápido</p>
                    <p className="text-sm text-muted-foreground">Pagamento</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Afiliados;
