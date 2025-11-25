import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, BookOpen, Play, FileText, Video } from "lucide-react";

const Academia = () => {
  const navigate = useNavigate();

  const cursos = [
    {
      titulo: "Como Vender Sites em 2024",
      descricao: "Aprenda as melhores técnicas de prospecção e fechamento",
      duracao: "2h 30min",
      modulos: 8,
      icon: Play,
    },
    {
      titulo: "Criando Projetos na Lovable",
      descricao: "Domine a ferramenta e crie projetos incríveis",
      duracao: "3h 15min",
      modulos: 12,
      icon: Video,
    },
    {
      titulo: "Copywriting para Desenvolvedores",
      descricao: "Escreva textos que convertem e vendem mais",
      duracao: "1h 45min",
      modulos: 6,
      icon: FileText,
    },
  ];

  const materiais = [
    "📚 E-book: Guia Completo de Prospecção Digital",
    "🎨 Templates Prontos de Propostas Comerciais",
    "💼 Planilha de Gestão de Clientes",
    "🎯 Checklist de Entrega de Projetos",
    "📊 Dashboard de Métricas de Vendas",
  ];

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

        <div className="max-w-6xl mx-auto space-y-8">
          <Card className="bg-card/60 backdrop-blur-sm border-primary/20">
            <CardHeader>
              <div className="flex items-center gap-3 mb-2">
                <div className="w-12 h-12 rounded-lg bg-gradient-primary flex items-center justify-center">
                  <BookOpen className="w-6 h-6 text-background" />
                </div>
                <div>
                  <CardTitle className="text-2xl">Academia ZanluNet</CardTitle>
                  <CardDescription>Treinamentos e conteúdos exclusivos</CardDescription>
                </div>
              </div>
            </CardHeader>
          </Card>

          <div>
            <h2 className="text-2xl font-bold mb-4">Cursos Disponíveis</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {cursos.map((curso, index) => (
                <Card
                  key={index}
                  className="bg-card/60 backdrop-blur-sm border-primary/20 hover:border-primary/50 transition-all cursor-pointer group"
                >
                  <CardHeader>
                    <div className="w-12 h-12 rounded-lg bg-gradient-primary flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                      <curso.icon className="w-6 h-6 text-background" />
                    </div>
                    <CardTitle className="text-lg">{curso.titulo}</CardTitle>
                    <CardDescription>{curso.descricao}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center justify-between text-sm text-muted-foreground mb-4">
                      <span>⏱️ {curso.duracao}</span>
                      <span>📚 {curso.modulos} módulos</span>
                    </div>
                    <Button className="w-full" size="sm">
                      <Play className="w-4 h-4 mr-2" />
                      Assistir Curso
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          <Card className="bg-card/60 backdrop-blur-sm border-primary/20">
            <CardHeader>
              <CardTitle className="text-xl">Material de Apoio</CardTitle>
              <CardDescription>Downloads e recursos extras</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {materiais.map((material, index) => (
                  <div
                    key={index}
                    className="p-4 bg-muted/50 rounded-lg border border-border hover:border-primary/50 transition-all flex items-center justify-between group cursor-pointer"
                  >
                    <span>{material}</span>
                    <Button size="sm" variant="ghost" className="opacity-0 group-hover:opacity-100 transition-opacity">
                      Baixar
                    </Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-primary/20 to-secondary/20 border-primary/30">
            <CardContent className="pt-6">
              <div className="text-center space-y-4">
                <h3 className="text-2xl font-bold">🎓 Comunidade Exclusiva</h3>
                <p className="text-muted-foreground max-w-2xl mx-auto">
                  Junte-se à nossa comunidade de desenvolvedores e empreendedores digitais. Troque experiências, tire dúvidas e faça networking!
                </p>
                <Button size="lg" className="mt-4">
                  Acessar Comunidade
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Academia;
