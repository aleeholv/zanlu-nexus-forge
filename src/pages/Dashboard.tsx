import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { User } from "@supabase/supabase-js";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  Sparkles,
  FileText,
  Users,
  MessageSquare,
  BookOpen,
  Settings,
  LogOut,
  Zap,
  DollarSign,
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const Dashboard = () => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const { toast } = useToast();

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
      setLoading(false);
    };

    checkUser();

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      if (!session) {
        navigate("/auth");
      } else {
        setUser(session.user);
      }
    });

    return () => subscription.unsubscribe();
  }, [navigate]);

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    toast({
      title: "Logout realizado",
      description: "Até logo!",
    });
    navigate("/");
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  const tools = [
    {
      icon: Sparkles,
      title: "Criar Meu SaaS",
      description: "Gere projetos completos com questionário inteligente",
      color: "from-primary/20 to-secondary/20",
      comingSoon: true,
    },
    {
      icon: FileText,
      title: "Gerador de Prompts",
      description: "Prompts otimizados para Lovable",
      color: "from-secondary/20 to-accent/20",
      comingSoon: true,
    },
    {
      icon: FileText,
      title: "Gerador de Contratos",
      description: "Contratos e propostas profissionais",
      color: "from-accent/20 to-primary/20",
      comingSoon: true,
    },
    {
      icon: Users,
      title: "Prospecção de Clientes",
      description: "Encontre clientes na sua cidade",
      color: "from-primary/20 to-accent/20",
      comingSoon: true,
    },
    {
      icon: MessageSquare,
      title: "Mensagens Prontas",
      description: "Copy otimizado para vendas",
      color: "from-secondary/20 to-primary/20",
      comingSoon: true,
    },
    {
      icon: BookOpen,
      title: "Academia",
      description: "Treinamentos e conteúdo exclusivo",
      color: "from-accent/20 to-secondary/20",
      comingSoon: true,
    },
    {
      icon: DollarSign,
      title: "Afiliados",
      description: "Sistema de comissões 50%",
      color: "from-primary/20 to-secondary/20",
      comingSoon: true,
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card/30 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-gradient-primary flex items-center justify-center">
                <Zap className="w-5 h-5 text-background" />
              </div>
              <span className="text-xl font-bold bg-gradient-primary bg-clip-text text-transparent">
                ZanluNet
              </span>
            </div>

            <div className="flex items-center gap-4">
              <span className="text-sm text-muted-foreground hidden sm:block">
                {user?.email}
              </span>
              <Button variant="ghost" size="icon">
                <Settings className="w-5 h-5" />
              </Button>
              <Button variant="ghost" size="icon" onClick={handleSignOut}>
                <LogOut className="w-5 h-5" />
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">
            Bem-vindo ao{" "}
            <span className="bg-gradient-primary bg-clip-text text-transparent">
              Dashboard
            </span>
          </h1>
          <p className="text-muted-foreground">
            Escolha uma ferramenta para começar a criar
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {tools.map((tool, index) => (
            <Card
              key={index}
              className={`p-6 bg-gradient-to-br ${tool.color} border-primary/20 hover:border-primary/50 transition-all cursor-pointer group relative overflow-hidden`}
            >
              {tool.comingSoon && (
                <div className="absolute top-4 right-4 px-3 py-1 rounded-full bg-accent/20 text-accent text-xs font-bold">
                  EM BREVE
                </div>
              )}
              <div className="w-12 h-12 rounded-lg bg-card flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <tool.icon className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">{tool.title}</h3>
              <p className="text-sm text-muted-foreground">{tool.description}</p>
            </Card>
          ))}
        </div>

        {/* Quick Stats */}
        <div className="mt-12 grid md:grid-cols-3 gap-6">
          <Card className="p-6 bg-card/60 backdrop-blur-sm border-primary/20">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground mb-1">Projetos Criados</p>
                <p className="text-3xl font-bold text-primary">0</p>
              </div>
              <Sparkles className="w-8 h-8 text-primary/50" />
            </div>
          </Card>

          <Card className="p-6 bg-card/60 backdrop-blur-sm border-primary/20">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground mb-1">Clientes Prospectados</p>
                <p className="text-3xl font-bold text-secondary">0</p>
              </div>
              <Users className="w-8 h-8 text-secondary/50" />
            </div>
          </Card>

          <Card className="p-6 bg-card/60 backdrop-blur-sm border-primary/20">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground mb-1">Comissão Total</p>
                <p className="text-3xl font-bold text-accent">R$ 0</p>
              </div>
              <DollarSign className="w-8 h-8 text-accent/50" />
            </div>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
