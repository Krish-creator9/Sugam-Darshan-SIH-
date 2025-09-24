import { BarChart3, Calendar, Users, Settings, Bell, Home, QrCode, AlertTriangle, UtensilsCrossed, ParkingCircle, Video, Sparkles, HandCoins } from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { useLocation, Link } from "wouter";
import { useTranslation } from "react-i18next";

const navigationItems = [
  {
    title: "Dashboard",
    url: "/",
    icon: Home,
  },
  {
    title: "Live Crowd Monitor",
    url: "/monitor",
    icon: BarChart3,
  },
  {
    title: "Slot Management",
    url: "/slots",
    icon: Calendar,
  },
  {
    title: "Queue Control",
    url: "/queue",
    icon: Users,
  },
  {
    title: "QR Scanner",
    url: "/scanner",
    icon: QrCode,
  },
  {
    title: "Emergency Alerts",
    url: "/emergency",
    icon: AlertTriangle,
  },
  {
    title: "Bookings",
    url: "/bookings",
    icon: Bell,
  },
  {
    title: "Temple Schedule",
    url: "/schedule",
    icon: Calendar,
  },
  {
    title: "Donation",
    url: "/donation",
    icon: HandCoins,
  },
  {
    title: "Volunteering",
    url: "/volunteering",
    icon: Users,
  },
  {
    title: "Prasad/Bhandara",
    url: "/prasad-bhandara",
    icon: UtensilsCrossed,
  },
  {
    title: "Parking",
    url: "/parking",
    icon: ParkingCircle,
  },
  {
    title: "Live Darshan",
    url: "/live-darshan",
    icon: Video,
  },
  {
    title: "Virtual Puja",
    url: "/virtual-puja",
    icon: Sparkles,
  },
  {
    title: "Settings",
    url: "/settings",
    icon: Settings,
  },
];

export default function AppSidebar() {
  const [location] = useLocation();
  const { t } = useTranslation();

  return (
    <Sidebar data-testid="app-sidebar">
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>{t("Smart Temple Admin")}</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {navigationItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton
                    asChild
                    isActive={location === item.url}
                    data-testid={`nav-${item.title.toLowerCase().replace(' ', '-')}`}
                  >
                    <Link href={item.url}>
                      <item.icon className="h-4 w-4" />
                      <span>{t(item.title)}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}