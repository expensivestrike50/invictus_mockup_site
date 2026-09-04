import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import { ProtectedRoute } from "@/components/ProtectedRoute";
import Index from "./pages/Index";
import InvoiceGenerator from "./pages/InvoiceGenerator";
import Dashboard from "./pages/Dashboard";
import Clients from "./pages/Clients";
import About from "./pages/About";
import Pricing from "./pages/Pricing";
import Contact from "./pages/Contact";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import ResetPassword from "./pages/ResetPassword";
import AuthCallback from "./pages/AuthCallback";
import Licenses from "./pages/Licenses";
import NotFound from "./pages/NotFound";
import ScrollToTop from "./components/ScrollToTop";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <AuthProvider>
          <ScrollToTop />
          <Routes>
            <Route path="/" element={<Index />} />
            
            {/* Protected Routes */}
            <Route path="/dashboard" element={
              <ProtectedRoute><Dashboard /></ProtectedRoute>
            } />
            <Route path="/clubs" element={
              <ProtectedRoute><Clients /></ProtectedRoute>
            } />
            <Route path="/clients" element={
              <ProtectedRoute><Clients /></ProtectedRoute>
            } />
            <Route path="/reports" element={
              <ProtectedRoute><InvoiceGenerator /></ProtectedRoute>
            } />
            <Route path="/reports/:id" element={
              <ProtectedRoute><InvoiceGenerator /></ProtectedRoute>
            } />
            <Route path="/invoice" element={
              <ProtectedRoute><InvoiceGenerator /></ProtectedRoute>
            } />
            <Route path="/invoice/:id" element={
              <ProtectedRoute><InvoiceGenerator /></ProtectedRoute>
            } />
            
            {/* Public Routes */}
            <Route path="/about" element={<About />} />
            <Route path="/pricing" element={<Pricing />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/licenses" element={<Licenses />} />
            <Route path="/signin" element={<SignIn />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/reset-password" element={<ResetPassword />} />
            {/* Where OAuth and email-confirmation links land. SocialAuthButtons
                hardcodes this path — without the route, SSO 404s. */}
            <Route path="/auth/callback" element={<AuthCallback />} />

            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </AuthProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
