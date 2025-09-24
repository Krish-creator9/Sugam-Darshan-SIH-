import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Shield, 
  User, 
  BarChart3, 
  Calendar,
  Users,
  Ticket,
  Bell,
  Settings
} from "lucide-react";
import ThemeToggle from "@/components/ThemeToggle";
import templeImage from "@assets/generated_images/Temple_courtyard_background_424111a7.png";

interface AppSelectorProps {
  onSelectApp: (appType: "admin" | "devotee") => void;
}

export default function AppSelector({ onSelectApp }: AppSelectorProps) {
  const [selectedApp, setSelectedApp] = useState<"admin" | "devotee" | null>(null);

  const handleSelectApp = (appType: "admin" | "devotee") => {
    setSelectedApp(appType);
    console.log(`Selected ${appType} app`);
    
    // Simulate selection animation
    setTimeout(() => {
      onSelectApp(appType);
    }, 500);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b">
        <div className="flex items-center justify-between p-4">
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-bold">सुगम दर्शन</h1>
            <Badge variant="secondary">Prototype</Badge>
          </div>
          <ThemeToggle />
        </div>
      </header>

      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div
          className="h-64 bg-cover bg-center"
          style={{ backgroundImage: `url(${templeImage})` }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-black/30" />
          <div className="relative h-full flex items-center justify-center text-center text-white p-6">
            <div className="max-w-2xl">
              <h1 className="text-4xl font-bold mb-4" data-testid="text-hero-title">
                सुगम दर्शन Crowd Management
              </h1>
              <p className="text-xl opacity-90 mb-4">
                AI-powered crowd monitoring and E-Token booking system
              </p>
              <p className="text-sm opacity-75">
                Sugam Darshan Prototype
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* App Selection */}
      <div className="container mx-auto px-4 py-12">
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold mb-2">Choose Your Interface</h2>
          <p className="text-muted-foreground">
            Select the appropriate interface for your role
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {/* Admin App */}
          <Card 
            className={`hover-elevate cursor-pointer transition-all ${
              selectedApp === "admin" ? "ring-2 ring-primary" : ""
            }`}
            onClick={() => handleSelectApp("admin")}
            data-testid="card-admin-app"
          >
            <CardHeader className="text-center pb-6">
              <div className="mx-auto p-4 bg-primary/10 rounded-full w-16 h-16 flex items-center justify-center mb-4">
                <Shield className="h-8 w-8 text-primary" />
              </div>
              <CardTitle className="text-xl">Admin Dashboard</CardTitle>
              <p className="text-muted-foreground">
                For temple administrators and management
              </p>
            </CardHeader>
            <CardContent className="pt-0">
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-2">
                  <div className="flex items-center gap-2 text-sm">
                    <BarChart3 className="h-4 w-4 text-muted-foreground" />
                    <span>Live Analytics</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <Calendar className="h-4 w-4 text-muted-foreground" />
                    <span>Slot Management</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <Users className="h-4 w-4 text-muted-foreground" />
                    <span>Queue Control</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <Settings className="h-4 w-4 text-muted-foreground" />
                    <span>System Settings</span>
                  </div>
                </div>
                
                <Button 
                  className="w-full" 
                  disabled={selectedApp === "admin"}
                  data-testid="button-select-admin"
                >
                  {selectedApp === "admin" ? "Loading..." : "Access Admin Dashboard"}
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Devotee App */}
          <Card 
            className={`hover-elevate cursor-pointer transition-all ${
              selectedApp === "devotee" ? "ring-2 ring-primary" : ""
            }`}
            onClick={() => handleSelectApp("devotee")}
            data-testid="card-devotee-app"
          >
            <CardHeader className="text-center pb-6">
              <div className="mx-auto p-4 bg-primary/10 rounded-full w-16 h-16 flex items-center justify-center mb-4">
                <User className="h-8 w-8 text-primary" />
              </div>
              <CardTitle className="text-xl">Devotee App</CardTitle>
              <p className="text-muted-foreground">
                For temple visitors and devotees
              </p>
            </CardHeader>
            <CardContent className="pt-0">
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-2">
                  <div className="flex items-center gap-2 text-sm">
                    <Ticket className="h-4 w-4 text-muted-foreground" />
                    <span>E-Token Booking</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <Users className="h-4 w-4 text-muted-foreground" />
                    <span>Queue Status</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <Bell className="h-4 w-4 text-muted-foreground" />
                    <span>Notifications</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <Calendar className="h-4 w-4 text-muted-foreground" />
                    <span>My Bookings</span>
                  </div>
                </div>
                
                <Button 
                  className="w-full"
                  disabled={selectedApp === "devotee"}
                  data-testid="button-select-devotee"
                >
                  {selectedApp === "devotee" ? "Loading..." : "Open Devotee App"}
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Features Overview */}
        <div className="mt-16">
          <div className="text-center mb-8">
            <h3 className="text-xl font-bold mb-2">System Features</h3>
            <p className="text-muted-foreground">
              Comprehensive smart temple management solution
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="mx-auto p-3 bg-chart-1/10 rounded-full w-12 h-12 flex items-center justify-center mb-3">
                <BarChart3 className="h-6 w-6 text-chart-1" />
              </div>
              <h4 className="font-semibold mb-1">AI Crowd Analysis</h4>
              <p className="text-sm text-muted-foreground">
                Real-time density monitoring with zone-based analytics
              </p>
            </div>
            
            <div className="text-center">
              <div className="mx-auto p-3 bg-chart-2/10 rounded-full w-12 h-12 flex items-center justify-center mb-3">
                <Ticket className="h-6 w-6 text-chart-2" />
              </div>
              <h4 className="font-semibold mb-1">E-Token System</h4>
              <p className="text-sm text-muted-foreground">
                Digital booking with QR codes and capacity management
              </p>
            </div>
            
            <div className="text-center">
              <div className="mx-auto p-3 bg-chart-3/10 rounded-full w-12 h-12 flex items-center justify-center mb-3">
                <Users className="h-6 w-6 text-chart-3" />
              </div>
              <h4 className="font-semibold mb-1">Queue Management</h4>
              <p className="text-sm text-muted-foreground">
                Live queue tracking with automated token calling
              </p>
            </div>
            
            <div className="text-center">
              <div className="mx-auto p-3 bg-chart-4/10 rounded-full w-12 h-12 flex items-center justify-center mb-3">
                <Bell className="h-6 w-6 text-chart-4" />
              </div>
              <h4 className="font-semibold mb-1">Smart Notifications</h4>
              <p className="text-sm text-muted-foreground">
                Real-time updates and personalized alerts
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}