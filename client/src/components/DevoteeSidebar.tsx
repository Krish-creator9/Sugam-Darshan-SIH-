import {
  Home,
  Calendar,
  Ticket,
  User,
  UtensilsCrossed,
  ParkingCircle,
  Video,
  Sparkles,
  HandCoins,
  Users,
  Settings,
} from "lucide-react";
import { useTranslation } from "react-i18next";
import { Link, useLocation } from "wouter";
import { cn } from "@/lib/utils";
import { Button } from "./ui/button";

export default function DevoteeSidebar() {
  const { t } = useTranslation();
  const [location] = useLocation();

  const navItems = [
    { path: "/", label: "Home", icon: Home },
    { path: "/book", label: "Book E-Token", icon: Calendar },
    { path: "/tickets", label: "My Tickets", icon: Ticket },
    { path: "/schedule", label: "Schedule", icon: Calendar },
    { path: "/donation", label: "Donation", icon: HandCoins },
    { path: "/volunteering", label: "Volunteering", icon: Users },
    { path: "/prasad-bhandara", label: "Prasad/Bhandara", icon: UtensilsCrossed },
    { path: "/parking", label: "Parking", icon: ParkingCircle },
    { path: "/live-darshan", label: "Live Darshan", icon: Video },
    { path: "/virtual-puja", label: "Virtual Puja", icon: Sparkles },
    { path: "/profile", label: "Profile", icon: User },
  ];

  return (
    <div className="flex flex-col h-full">
      <div className="p-4">
        <h2
          className="text-2xl font-bold tracking-tight"
          data-testid="sidebar-title"
        >
          {t("Devotee Menu")}
        </h2>
      </div>
      <nav className="flex-1 px-4 space-y-2">
        {navItems.map((item) => (
          <Link key={item.path} href={item.path}>
            <a
              className={cn(
                "flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary",
                location === item.path && "bg-muted text-primary"
              )}
              data-testid={`nav-${item.label.toLowerCase().replace(" ", "-")}`}
            >
              <item.icon className="h-4 w-4" />
              {item.label}
            </a>
          </Link>
        ))}
      </nav>
      <div className="mt-auto p-4">
        <Button variant="secondary" className="w-full">
          <Settings className="h-4 w-4 mr-2" />
          {t("Settings")}
        </Button>
      </div>
    </div>
  );
}
