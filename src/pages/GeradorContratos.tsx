import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ArrowLeft, FileText, Download } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const GeradorContratos = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [tipoContrato, setTipoContrato] = useState("");
  const [nomeCliente, setNomeCliente] = useState("");
  const [cpfCnpj, setCpfCnpj] = useState("");
  const [valorServico, setValorServico] = useState("");
  const [descricaoServico, setDescricaoServico] = useState("");
  const [contratoGerado, setContratoGerado] = useState("");

  const contratoTemplates: Record<string, (dados: any) => string> = {
    "venda-site": (dados) => `
CONTRATO DE PRESTAÇÃO DE SERVIÇOS - DESENVOLVIMENTO DE WEBSITE

CONTRATANTE: ${dados.nomeCliente}
CPF/CNPJ: ${dados.cpfCnpj}

CONTRATADA: ZanluNet - Soluções Digitais

1. OBJETO DO CONTRATO
O presente contrato tem como objeto a criação e desenvolvimento de website conforme especificações acordadas.

2. DESCRIÇÃO DOS SERVIÇOS
${dados.descricaoServico}

3. VALOR E FORMA DE PAGAMENTO
Valor total: R$ ${dados.valorServico}
Forma de pagamento: 50% na assinatura do contrato e 50% na entrega.

4. PRAZO DE ENTREGA
O prazo de entrega será de até 30 dias corridos após a aprovação do projeto.

5. DIREITOS AUTORAIS
Após o pagamento integral, todos os direitos sobre o website serão transferidos ao CONTRATANTE.

6. GARANTIA E SUPORTE
A CONTRATADA oferece 30 dias de garantia e suporte técnico após a entrega.

7. RESPONSABILIDADES DO CONTRATANTE
- Fornecer todo conteúdo (textos, imagens, logos) dentro do prazo acordado
- Realizar aprovações e feedbacks em até 5 dias úteis
- Efetuar os pagamentos nas datas acordadas

8. RESPONSABILIDADES DA CONTRATADA
- Desenvolver o website conforme especificações acordadas
- Entregar o projeto no prazo estipulado
- Prestar suporte técnico durante o período de garantia

9. FORO
Fica eleito o foro da comarca de [CIDADE] para dirimir quaisquer questões oriundas deste contrato.

Data: ${new Date().toLocaleDateString('pt-BR')}

_______________________________
CONTRATANTE

_______________________________
CONTRATADA
    `,
    "prestacao-servico": (dados) => `
CONTRATO DE PRESTAÇÃO DE SERVIÇOS DIGITAIS

CONTRATANTE: ${dados.nomeCliente}
CPF/CNPJ: ${dados.cpfCnpj}

CONTRATADA: ZanluNet - Soluções Digitais

1. OBJETO
Prestação de serviços digitais conforme descrito abaixo.

2. SERVIÇOS
${dados.descricaoServico}

3. VALOR
Valor mensal: R$ ${dados.valorServico}
Primeiro pagamento na assinatura do contrato e demais todo dia 05 de cada mês.

4. VIGÊNCIA
Este contrato tem vigência de 12 meses a partir da data de assinatura, renovável automaticamente.

5. RESCISÃO
Qualquer das partes pode rescindir mediante aviso prévio de 30 dias.

6. MULTA RESCISÓRIA
Em caso de rescisão antecipada sem justa causa pelo CONTRATANTE, será cobrada multa de 20% sobre o valor restante.

7. FORO
Comarca de [CIDADE].

Data: ${new Date().toLocaleDateString('pt-BR')}

_______________________________
CONTRATANTE

_______________________________
CONTRATADA
    `,
    "proposta-comercial": (dados) => `
PROPOSTA COMERCIAL

DE: ZanluNet - Soluções Digitais
PARA: ${dados.nomeCliente}
CPF/CNPJ: ${dados.cpfCnpj}
DATA: ${new Date().toLocaleDateString('pt-BR')}

APRESENTAÇÃO
A ZanluNet é uma empresa especializada em soluções digitais, com foco em desenvolvimento de sites, sistemas e aplicações web.

OBJETIVO DO PROJETO
${dados.descricaoServico}

ESCOPO DO PROJETO
${dados.descricaoServico}

INVESTIMENTO
Valor Total: R$ ${dados.valorServico}

Forma de Pagamento:
- 40% na aprovação da proposta
- 30% na entrega do layout
- 30% na entrega final

PRAZO DE ENTREGA
30 dias corridos após aprovação do projeto e recebimento do primeiro pagamento.

O QUE ESTÁ INCLUSO:
✅ Design responsivo (mobile, tablet, desktop)
✅ Otimização de SEO básica
✅ Integração com redes sociais
✅ Formulário de contato
✅ 30 dias de garantia e suporte
✅ Treinamento de uso

O QUE NÃO ESTÁ INCLUSO:
❌ Hospedagem e domínio (indicamos fornecedores)
❌ Produção de conteúdo (textos e imagens)
❌ Marketing digital

VALIDADE DA PROPOSTA
Esta proposta tem validade de 15 dias.

Estamos à disposição para esclarecimentos!

Atenciosamente,
ZanluNet - Soluções Digitais
    `,
    "termo-manutencao": (dados) => `
TERMO DE MANUTENÇÃO E SUPORTE

CONTRATANTE: ${dados.nomeCliente}
CPF/CNPJ: ${dados.cpfCnpj}

CONTRATADA: ZanluNet - Soluções Digitais

1. OBJETO
Manutenção e suporte técnico conforme especificado.

2. SERVIÇOS INCLUSOS
${dados.descricaoServico}

Serviços mensais inclusos:
- Atualização de conteúdo (até 5h/mês)
- Backup semanal
- Monitoramento de segurança
- Suporte técnico via WhatsApp
- Relatório mensal de desempenho

3. VALOR
Valor mensal: R$ ${dados.valorServico}
Pagamento todo dia 05 de cada mês.

4. VIGÊNCIA
Contrato mensal, renovável automaticamente.

5. SLA - TEMPO DE RESPOSTA
- Suporte: até 24h úteis
- Correção de bugs críticos: até 48h úteis
- Atualizações de conteúdo: até 5 dias úteis

6. RESCISÃO
Cancelamento com 30 dias de antecedência, sem multa.

Data: ${new Date().toLocaleDateString('pt-BR')}

_______________________________
CONTRATANTE

_______________________________
CONTRATADA
    `,
  };

  const gerarContrato = () => {
    if (!tipoContrato || !nomeCliente || !cpfCnpj || !valorServico) {
      toast({
        title: "Campos obrigatórios",
        description: "Preencha todos os campos para gerar o contrato",
        variant: "destructive",
      });
      return;
    }

    const template = contratoTemplates[tipoContrato];
    if (template) {
      const contrato = template({
        nomeCliente,
        cpfCnpj,
        valorServico,
        descricaoServico,
      });
      setContratoGerado(contrato);
      toast({
        title: "Contrato gerado!",
        description: "Seu contrato foi gerado com sucesso",
      });
    }
  };

  const downloadContrato = () => {
    const blob = new Blob([contratoGerado], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `contrato-${nomeCliente.replace(/\s/g, "-").toLowerCase()}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    toast({
      title: "Download iniciado",
      description: "Seu contrato está sendo baixado",
    });
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

        <div className="max-w-4xl mx-auto space-y-6">
          <Card className="bg-card/60 backdrop-blur-sm border-primary/20">
            <CardHeader>
              <div className="flex items-center gap-3 mb-2">
                <div className="w-12 h-12 rounded-lg bg-gradient-primary flex items-center justify-center">
                  <FileText className="w-6 h-6 text-background" />
                </div>
                <div>
                  <CardTitle className="text-2xl">Gerador de Contratos</CardTitle>
                  <CardDescription>Gere contratos profissionais automaticamente</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Tipo de Contrato</Label>
                  <Select onValueChange={setTipoContrato}>
                    <SelectTrigger>
                      <SelectValue placeholder="Escolha o tipo" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="venda-site">Venda de Website</SelectItem>
                      <SelectItem value="prestacao-servico">Prestação de Serviço</SelectItem>
                      <SelectItem value="proposta-comercial">Proposta Comercial</SelectItem>
                      <SelectItem value="termo-manutencao">Termo de Manutenção</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="nomeCliente">Nome do Cliente</Label>
                  <Input
                    id="nomeCliente"
                    placeholder="Nome completo ou razão social"
                    value={nomeCliente}
                    onChange={(e) => setNomeCliente(e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="cpfCnpj">CPF/CNPJ</Label>
                  <Input
                    id="cpfCnpj"
                    placeholder="000.000.000-00"
                    value={cpfCnpj}
                    onChange={(e) => setCpfCnpj(e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="valorServico">Valor do Serviço</Label>
                  <Input
                    id="valorServico"
                    placeholder="5000,00"
                    value={valorServico}
                    onChange={(e) => setValorServico(e.target.value)}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="descricaoServico">Descrição dos Serviços</Label>
                <textarea
                  id="descricaoServico"
                  className="w-full min-h-[100px] rounded-md border border-input bg-background px-3 py-2 text-sm"
                  placeholder="Descreva os serviços que serão prestados..."
                  value={descricaoServico}
                  onChange={(e) => setDescricaoServico(e.target.value)}
                />
              </div>

              <Button
                onClick={gerarContrato}
                className="w-full"
                size="lg"
              >
                <FileText className="w-5 h-5 mr-2" />
                Gerar Contrato
              </Button>
            </CardContent>
          </Card>

          {contratoGerado && (
            <Card className="bg-card/60 backdrop-blur-sm border-primary/20">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>Contrato Gerado</CardTitle>
                  <Button onClick={downloadContrato} size="sm">
                    <Download className="w-4 h-4 mr-2" />
                    Baixar
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <pre className="bg-muted p-6 rounded-lg text-sm whitespace-pre-wrap font-mono">
                  {contratoGerado}
                </pre>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
};

export default GeradorContratos;
