import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Landing from "./pages/Landing";
import Auth from "./pages/Auth";
import Dashboard from "./pages/Dashboard";
import CriarSaas from "./pages/CriarSaas";
import GeradorPrompts from "./pages/GeradorPrompts";
import GeradorContratos from "./pages/GeradorContratos";
import ProspeccaoClientes from "./pages/ProspeccaoClientes";
import MensagensProntas from "./pages/MensagensProntas";
import Academia from "./pages/Academia";
import Afiliados from "./pages/Afiliados";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/auth" element={<Auth />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/criar-saas" element={<CriarSaas />} />
          <Route path="/gerador-prompts" element={<GeradorPrompts />} />
          <Route path="/gerador-contratos" element={<GeradorContratos />} />
          <Route path="/prospeccao-clientes" element={<ProspeccaoClientes />} />
          <Route path="/mensagens-prontas" element={<MensagensProntas />} />
          <Route path="/academia" element={<Academia />} />
          <Route path="/afiliados" element={<Afiliados />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
