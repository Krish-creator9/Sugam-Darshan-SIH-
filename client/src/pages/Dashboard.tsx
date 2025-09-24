import DashboardStats from "@/components/DashboardStats";
import CrowdHeatmap from "@/components/CrowdHeatmap";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { TempleSelector } from "@/components/TempleSelector";
import { useState } from "react";
import { DollarSign } from "lucide-react";

// Mock data - todo: remove mock functionality
const mockBookingsData = [
  { time: "06:00", bookings: 45 },
  { time: "07:00", bookings: 67 },
  { time: "08:00", bookings: 89 },
  { time: "09:00", bookings: 92 },
  { time: "10:00", bookings: 78 },
  { time: "11:00", bookings: 56 },
  { time: "12:00", bookings: 34 },
];

const mockAlerts = [
  { id: "1", message: "Zone A capacity at 92%", severity: "high" as const },
  { id: "2", message: "Queue processing slower than usual", severity: "medium" as const },
];

const mockZoneDensities = {
  zoneA: 0.92,
  zoneB: 0.67,
  zoneC: 0.31,
  zoneD: 0.15
};

export default function Dashboard() {
  const [selectedTemple, setSelectedTemple] = useState("Golden Temple");

  return (
    <div className="space-y-6" data-testid="page-dashboard">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
          <p className="text-muted-foreground">
            Monitor temple capacity, manage bookings, and track crowd flow in real-time.
          </p>
        </div>
        <TempleSelector
          selectedTemple={selectedTemple}
          onTempleChange={setSelectedTemple}
        />
      </div>

      {/* Stats Overview */}
      <DashboardStats
        liveDevoteeCount={247}
        totalBookingsToday={1432}
        averageWaitTime={12}
        capacityUtilization={78}
        alerts={mockAlerts}
      />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Crowd Heatmap */}
        <CrowdHeatmap 
          zoneDensities={mockZoneDensities}
          onZoneClick={(zone) => console.log(`Dashboard: Zone ${zone} clicked`)}
        />

        {/* Bookings Chart */}
        <Card data-testid="card-bookings-chart">
          <CardHeader>
            <CardTitle>Today's Bookings by Hour</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={mockBookingsData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="time" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="bookings" fill="hsl(var(--primary))" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}