
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { HashRouter , Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Teachers from "./pages/Teachers";
import NotFound from "./pages/NotFound";
import Apply from "./pages/Apply";
import ScrollToTop from "./components/ScrollToTop";
import BlogTitles from "./pages/BlogTitles";
import BlogPost from "./pages/BlogPost";
import Hirek from "./pages/Hirek";
import HirekPost from "./pages/HirekPost";
import Beszamolok from "./pages/Beszamolok";
import BeszamolokPost from "./pages/BeszamolokPost";
import Shirts from "./pages/Shirts";
import ShirtDetail from "./pages/ShirtDetail";
import Layout from "./components/Layout";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <HashRouter>
        <ScrollToTop />
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Index />} />
            <Route path="csapatunk" element={<Teachers />} />
            <Route path="blog" element={<BlogTitles />} />
            <Route path="blog/:id" element={<BlogPost />} />
            <Route path="aktualis" element={<Hirek />} />
            <Route path="aktualis/:id" element={<HirekPost />} />
            <Route path="jelentkezes" element={<Apply />} />
            {/* <Route path="beszamolok" element={<Beszamolok />} /> */}
            {/* <Route path="beszamolok/:id" element={<BeszamolokPost />} /> */}
            <Route path="felszereles" element={<Shirts />} />
            <Route path="felszereles/:id" element={<ShirtDetail />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </HashRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
