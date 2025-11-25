import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { 
  Rocket, 
  Sparkles, 
  Target, 
  Users, 
  Zap, 
  ArrowRight,
  Check,
  Menu,
  X
} from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";

const Landing = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Header/Navbar */}
      <header className="fixed top-0 w-full z-50 backdrop-blur-md bg-background/80 border-b border-border">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 rounded-lg bg-gradient-primary flex items-center justify-center">
                <Zap className="w-6 h-6 text-background" />
              </div>
              <span className="text-2xl font-bold bg-gradient-primary bg-clip-text text-transparent">
                ZanluNet
              </span>
            </div>

            <nav className="hidden md:flex items-center gap-6">
              <a href="#features" className="text-muted-foreground hover:text-primary transition-colors">
                Recursos
              </a>
              <a href="#pricing" className="text-muted-foreground hover:text-primary transition-colors">
                Preços
              </a>
              <a href="#faq" className="text-muted-foreground hover:text-primary transition-colors">
                FAQ
              </a>
              <Link to="/auth">
                <Button variant="ghost" className="text-foreground">
                  Entrar
                </Button>
              </Link>
              <Link to="/auth">
                <Button className="bg-gradient-primary text-background hover:opacity-90 shadow-neon">
                  Começar Grátis
                </Button>
              </Link>
            </nav>

            <button
              className="md:hidden text-foreground"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X /> : <Menu />}
            </button>
          </div>

          {/* Mobile Menu */}
          {mobileMenuOpen && (
            <div className="md:hidden mt-4 pb-4 space-y-4 animate-slide-in-up">
              <a href="#features" className="block text-muted-foreground hover:text-primary">
                Recursos
              </a>
              <a href="#pricing" className="block text-muted-foreground hover:text-primary">
                Preços
              </a>
              <a href="#faq" className="block text-muted-foreground hover:text-primary">
                FAQ
              </a>
              <Link to="/auth">
                <Button variant="ghost" className="w-full justify-start">
                  Entrar
                </Button>
              </Link>
              <Link to="/auth">
                <Button className="w-full bg-gradient-primary text-background">
                  Começar Grátis
                </Button>
              </Link>
            </div>
          )}
        </div>
      </header>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4">
        <div className="container mx-auto text-center max-w-5xl">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-card border border-primary/30 mb-6 animate-float">
            <Sparkles className="w-4 h-4 text-primary" />
            <span className="text-sm text-muted-foreground">Crie SaaS e Sites em Minutos</span>
          </div>

          <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
            Transforme Suas Ideias em{" "}
            <span className="bg-gradient-primary bg-clip-text text-transparent animate-glow-pulse">
              Realidade Digital
            </span>
          </h1>

          <p className="text-xl text-muted-foreground mb-8 max-w-3xl mx-auto">
            Plataforma completa para criar sites, SaaS e páginas profissionais. 
            Gerador de prompts, contratos, prospecção de clientes e muito mais.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Link to="/auth">
              <Button size="lg" className="bg-gradient-primary text-background hover:opacity-90 shadow-neon text-lg px-8">
                Começar Agora <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </Link>
            <Button size="lg" variant="outline" className="border-primary text-primary hover:bg-primary/10 text-lg px-8">
              Ver Demonstração
            </Button>
          </div>

          <div className="relative">
            <div className="absolute inset-0 bg-gradient-glow blur-3xl opacity-30" />
            <Card className="relative bg-card/60 backdrop-blur-sm border-primary/20 shadow-card p-2">
              <div className="aspect-video rounded-lg bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center">
                <Rocket className="w-24 h-24 text-primary animate-float" />
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 px-4 bg-card/30">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              Tudo Que Você Precisa em{" "}
              <span className="bg-gradient-primary bg-clip-text text-transparent">
                Um Só Lugar
              </span>
            </h2>
            <p className="text-xl text-muted-foreground">
              Ferramentas poderosas para impulsionar seu negócio digital
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                icon: Sparkles,
                title: "Gerador de Sites/SaaS",
                description: "Crie projetos completos respondendo um questionário inteligente",
              },
              {
                icon: Target,
                title: "Gerador de Prompts",
                description: "Prompts otimizados prontos para usar na Lovable",
              },
              {
                icon: Users,
                title: "Prospecção de Clientes",
                description: "Encontre +60 clientes potenciais na sua cidade automaticamente",
              },
              {
                icon: Zap,
                title: "Mensagens Prontas",
                description: "Copy otimizado para WhatsApp e Instagram",
              },
              {
                icon: Rocket,
                title: "Gerador de Contratos",
                description: "Contratos e propostas profissionais em segundos",
              },
              {
                icon: Sparkles,
                title: "Academia de Conteúdo",
                description: "Treinamentos e materiais exclusivos para crescer",
              },
            ].map((feature, index) => (
              <Card
                key={index}
                className="p-6 bg-card/60 backdrop-blur-sm border-primary/20 hover:border-primary/50 transition-all hover:shadow-card group"
              >
                <div className="w-12 h-12 rounded-lg bg-gradient-primary flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <feature.icon className="w-6 h-6 text-background" />
                </div>
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              Por Que Escolher a{" "}
              <span className="bg-gradient-primary bg-clip-text text-transparent">
                ZanluNet?
              </span>
            </h2>
          </div>

          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              {[
                "Economize horas de trabalho manual",
                "Gere receita com sistema de afiliados",
                "Ferramentas profissionais acessíveis",
                "Suporte e treinamento inclusos",
              ].map((benefit, index) => (
                <div key={index} className="flex items-start gap-4">
                  <div className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0 mt-1">
                    <Check className="w-4 h-4 text-primary" />
                  </div>
                  <p className="text-lg">{benefit}</p>
                </div>
              ))}
            </div>

            <Card className="bg-gradient-to-br from-primary/10 to-secondary/10 border-primary/30 p-8">
              <div className="space-y-4">
                <div className="text-5xl font-bold text-primary">10x</div>
                <p className="text-xl">Mais Rápido</p>
                <p className="text-muted-foreground">
                  Crie projetos em minutos que levariam horas ou dias manualmente
                </p>
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-20 px-4 bg-card/30">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              Planos Para Todos os{" "}
              <span className="bg-gradient-primary bg-clip-text text-transparent">
                Tamanhos
              </span>
            </h2>
            <p className="text-xl text-muted-foreground">
              Escolha o plano ideal para seu negócio
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <Card className="p-8 bg-card/60 backdrop-blur-sm border-primary/20">
              <h3 className="text-2xl font-bold mb-2">Mensal</h3>
              <div className="mb-6">
                <span className="text-5xl font-bold text-primary">R$ 97</span>
                <span className="text-muted-foreground">/mês</span>
              </div>
              <ul className="space-y-3 mb-8">
                {[
                  "Acesso a todas as ferramentas",
                  "Gerador ilimitado",
                  "Suporte prioritário",
                  "Academia de conteúdo",
                ].map((item, index) => (
                  <li key={index} className="flex items-center gap-2">
                    <Check className="w-5 h-5 text-primary" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              <Link to="/auth">
                <Button className="w-full bg-primary text-background hover:bg-primary/90">
                  Começar Agora
                </Button>
              </Link>
            </Card>

            <Card className="p-8 bg-gradient-to-br from-primary/20 to-secondary/20 backdrop-blur-sm border-primary/50 shadow-neon relative overflow-hidden">
              <div className="absolute top-4 right-4 px-3 py-1 rounded-full bg-accent text-accent-foreground text-sm font-bold">
                POPULAR
              </div>
              <h3 className="text-2xl font-bold mb-2">Vitalício</h3>
              <div className="mb-6">
                <span className="text-5xl font-bold text-primary">R$ 397</span>
                <span className="text-muted-foreground">/único</span>
              </div>
              <ul className="space-y-3 mb-8">
                {[
                  "Acesso vitalício completo",
                  "Todas as atualizações futuras",
                  "Suporte premium",
                  "Sistema de afiliados 50%",
                  "Bônus exclusivos",
                ].map((item, index) => (
                  <li key={index} className="flex items-center gap-2">
                    <Check className="w-5 h-5 text-primary" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              <Link to="/auth">
                <Button className="w-full bg-gradient-primary text-background hover:opacity-90 shadow-neon">
                  Garantir Vitalício
                </Button>
              </Link>
            </Card>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section id="faq" className="py-20 px-4">
        <div className="container mx-auto max-w-3xl">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              Perguntas{" "}
              <span className="bg-gradient-primary bg-clip-text text-transparent">
                Frequentes
              </span>
            </h2>
          </div>

          <div className="space-y-4">
            {[
              {
                q: "Como funciona o gerador de sites?",
                a: "Você responde um questionário inteligente sobre seu projeto e a plataforma gera automaticamente prompts e estruturas completas.",
              },
              {
                q: "Preciso de conhecimento técnico?",
                a: "Não! A ZanluNet foi criada para ser simples e intuitiva. Qualquer pessoa pode criar projetos profissionais.",
              },
              {
                q: "Como funciona o sistema de afiliados?",
                a: "Você recebe 50% de comissão em cada venda realizada através do seu link único de afiliado.",
              },
              {
                q: "Posso cancelar a qualquer momento?",
                a: "Sim, no plano mensal você pode cancelar quando quiser. O plano vitalício não requer renovação.",
              },
            ].map((faq, index) => (
              <Card key={index} className="p-6 bg-card/60 backdrop-blur-sm border-primary/20">
                <h3 className="text-lg font-semibold mb-2">{faq.q}</h3>
                <p className="text-muted-foreground">{faq.a}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 bg-gradient-to-br from-primary/20 to-secondary/20">
        <div className="container mx-auto max-w-4xl text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Pronto Para Transformar Seu Negócio?
          </h2>
          <p className="text-xl text-muted-foreground mb-8">
            Junte-se a centenas de empreendedores que já estão criando projetos incríveis
          </p>
          <Link to="/auth">
            <Button size="lg" className="bg-gradient-primary text-background hover:opacity-90 shadow-neon text-lg px-12">
              Começar Gratuitamente <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-4 border-t border-border">
        <div className="container mx-auto max-w-6xl">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 rounded-lg bg-gradient-primary flex items-center justify-center">
                  <Zap className="w-5 h-5 text-background" />
                </div>
                <span className="text-xl font-bold">ZanluNet</span>
              </div>
              <p className="text-sm text-muted-foreground">
                Transformando ideias em realidade digital
              </p>
            </div>

            <div>
              <h4 className="font-semibold mb-3">Produto</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><a href="#features" className="hover:text-primary transition-colors">Recursos</a></li>
                <li><a href="#pricing" className="hover:text-primary transition-colors">Preços</a></li>
                <li><Link to="/auth" className="hover:text-primary transition-colors">Dashboard</Link></li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-3">Suporte</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><a href="#faq" className="hover:text-primary transition-colors">FAQ</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Documentação</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Contato</a></li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-3">Legal</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><a href="#" className="hover:text-primary transition-colors">Termos de Uso</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Privacidade</a></li>
              </ul>
            </div>
          </div>

          <div className="pt-8 border-t border-border text-center text-sm text-muted-foreground">
            <p>© 2025 ZanluNet. Todos os direitos reservados.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Landing;
