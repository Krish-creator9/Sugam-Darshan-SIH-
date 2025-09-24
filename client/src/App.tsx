import { useState } from "react";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import AppSelector from "@/pages/AppSelector";
import AdminApp from "@/pages/AdminApp";
import DevoteeApp from "@/pages/DevoteeApp";
import { Button } from "./components/ui/button";

function App() {
  const [selectedApp, setSelectedApp] = useState<"admin" | "devotee" | null>(
    null
  );

  const handleBackToHome = () => {
    setSelectedApp(null);
  };

  const renderApp = () => {
    switch (selectedApp) {
      case "admin":
        return <AdminApp onBack={handleBackToHome} />;
      case "devotee":
        return <DevoteeApp onBack={handleBackToHome} />;
      default:
        return <AppSelector onSelectApp={setSelectedApp} />;
    }
  };

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        {renderApp()}
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
