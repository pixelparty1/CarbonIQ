import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Landing from "./pages/Landing";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import Dashboard from "./pages/Dashboard";
import Marketplace from "./pages/Marketplace"; 
import Leaderboard from "./pages/Leaderboard";
import Reports from "./pages/Reports";
import HowItWorks from "./pages/HowItWorks";
import Features from "./pages/Features";
import ForCompanies from "./pages/ForCompanies";
import About from "./pages/About";
import Contact from "./pages/Contact";
import MarketplacePreview from "./pages/MarketplacePreview";
import NotFound from "./pages/NotFound";
import SDGPage from "./pages/SDG";
import UploadBill from "./pages/UploadBill";
import Offset from "./pages/Offset";
import OffsetPage from "./pages/OffsetPage";
import Badges from "./pages/Badges";
import Plans from "./pages/Plans";

const queryClient = new QueryClient();


import React, { Component, ReactNode } from "react";

class ErrorBoundary extends Component<{ children: ReactNode }, { error: any }> {
  constructor(props: any) {
    super(props);
    this.state = { error: null };
  }
  static getDerivedStateFromError(error: any) {
    return { error };
  }
  render() {
    if (this.state.error) {
      return (
        <div style={{ color: "red", padding: 32 }}>
          <h1>App Error</h1>
          <pre>{String(this.state.error)}</pre>
        </div>
      );
    }
    return this.props.children;
  }
}

const App = () => (
  <ErrorBoundary>
    <QueryClientProvider client={queryClient}>
      <div className="min-h-screen bg-background text-foreground">
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Landing />} />
              <Route path="/how-it-works" element={<HowItWorks />} />
              <Route path="/features" element={<Features />} />
              <Route path="/for-companies" element={<ForCompanies />} />
              <Route path="/about" element={<About />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/marketplace-preview" element={<MarketplacePreview />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/marketplace" element={<Marketplace />} />
              <Route path="/leaderboard" element={<Leaderboard />} />
              <Route path="/reports" element={<Reports />} />
              <Route path="/signin" element={<SignIn />} />
              <Route path="/signup" element={<SignUp />} />
              <Route path="/sdg" element={<SDGPage />} />
              <Route path="/upload-bill" element={<UploadBill />} />
              <Route path="/offset" element={<Offset />} />
              <Route path="/offset-page" element={<OffsetPage />} />
              <Route path="/badges" element={<Badges />} />
              <Route path="/plans" element={<Plans />} />
              {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </TooltipProvider>
      </div>
    </QueryClientProvider>
  </ErrorBoundary>
);

export default App;
