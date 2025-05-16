
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Teachers from "./pages/Teachers";
import NotFound from "./pages/NotFound";
import ScrollToTop from "./components/ScrollToTop";
import BlogTitles from "./pages/BlogTitles";
import BlogPost from "./pages/BlogPost";
import Hirek from "./pages/Hirek";
import HirekPost from "./pages/HirekPost";
import Layout from "./components/Layout";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <ScrollToTop />
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Index />} />
            <Route path="edzoink" element={<Teachers />} />
            <Route path="blog" element={<BlogTitles />} />
            <Route path="blog/:id" element={<BlogPost />} />
            <Route path="hirek" element={<Hirek />} />
            <Route path="hirek/:id" element={<HirekPost />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
