import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import { Navigation } from "@/components/Navigation";
import { LoginPage } from "@/pages/LoginPage";
import { ConsumerDashboard } from "@/pages/ConsumerDashboard";
import { BusinessDashboard } from "@/pages/BusinessDashboard";
import { BusinessMarketplace } from "@/pages/BusinessMarketplace";
import { ConsumerUpload } from "@/pages/ConsumerUpload";
import { ConsumerListings } from "@/pages/ConsumerListings";
import { ConsumerImpact } from "@/pages/ConsumerImpact";
import { BusinessWishlist } from "@/pages/BusinessWishlist";
import { BusinessImpact } from "@/pages/BusinessImpact";
import { ChatPage } from "@/pages/ChatPage";
import NotFound from "./pages/NotFound";
import { useState } from "react";
import { mockComponents } from "@/data/mockData";

const queryClient = new QueryClient();

const App = () => {
  // Lifted state for consumer components
  const [userComponents, setUserComponents] = useState(mockComponents);

  // Function to add a new component dynamically
  const handleAddComponent = (newComponent: any) => {
    setUserComponents(prev => [newComponent, ...prev]);
  };

  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Navigation />
            <Routes>
              <Route path="/" element={<Navigate to="/login" />} />
              <Route path="/login" element={<LoginPage />} />

              {/* Consumer Routes */}
              <Route
                path="/consumer/dashboard"
                element={<ConsumerDashboard components={userComponents} />}
              />
              <Route
                path="/consumer/upload"
                element={<ConsumerUpload onAddComponent={handleAddComponent} />}
              />
              <Route
                path="/consumer/listings"
                element={<ConsumerListings components={userComponents} />}
              />
              <Route path="/consumer/impact" element={<ConsumerImpact />} />

              {/* Business Routes */}
              <Route path="/business/dashboard" element={<BusinessDashboard />} />
              <Route path="/business/marketplace" element={<BusinessMarketplace />} />
              <Route path="/business/wishlist" element={<BusinessWishlist />} />
              <Route path="/business/impact" element={<BusinessImpact />} />

              {/* Shared Routes */}
              <Route path="/chat" element={<ChatPage />} />

              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </TooltipProvider>
      </AuthProvider>
    </QueryClientProvider>
  );
};

export default App;
