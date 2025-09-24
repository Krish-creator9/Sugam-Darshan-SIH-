import AppSidebar from '../AppSidebar'
import { SidebarProvider } from "@/components/ui/sidebar";

export default function AppSidebarExample() {
  const style = {
    "--sidebar-width": "16rem",
    "--sidebar-width-icon": "3rem",
  };

  return (
    <div className="h-screen">
      <SidebarProvider style={style as React.CSSProperties}>
        <div className="flex h-screen w-full">
          <AppSidebar />
          <div className="flex-1 p-6">
            <h2 className="text-2xl font-bold">App Sidebar</h2>
            <p className="text-muted-foreground mt-2">
              Navigation sidebar for the Smart Temple admin dashboard.
              Click the navigation items to see the active state.
            </p>
          </div>
        </div>
      </SidebarProvider>
    </div>
  )
}