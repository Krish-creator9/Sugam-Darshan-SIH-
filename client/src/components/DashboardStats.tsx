import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, Clock, AlertCircle, TrendingUp } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface DashboardStatsProps {
  liveDevoteeCount: number;
  totalBookingsToday: number;
  averageWaitTime: number;
  capacityUtilization: number;
  alerts: Array<{ id: string; message: string; severity: "low" | "medium" | "high" }>;
}

export default function DashboardStats({
  liveDevoteeCount,
  totalBookingsToday,
  averageWaitTime,
  capacityUtilization,
  alerts
}: DashboardStatsProps) {
  const getCapacityColor = (utilization: number) => {
    if (utilization >= 90) return "destructive";
    if (utilization >= 70) return "secondary";
    return "default";
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case "high": return "destructive";
      case "medium": return "secondary";
      default: return "default";
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      <Card data-testid="card-live-devotees" className="hover-elevate">
        <CardHeader className="flex flex-row items-center justify-between gap-2 space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Live Devotees</CardTitle>
          <Users className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-primary" data-testid="text-devotee-count">{liveDevoteeCount}</div>
          <p className="text-xs text-muted-foreground mt-1">Currently inside temple</p>
        </CardContent>
      </Card>

      <Card data-testid="card-bookings-today" className="hover-elevate">
        <CardHeader className="flex flex-row items-center justify-between gap-2 space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Today's Bookings</CardTitle>
          <Clock className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold" data-testid="text-bookings-count">{totalBookingsToday}</div>
          <p className="text-xs text-muted-foreground mt-1">E-Tokens issued</p>
        </CardContent>
      </Card>

      <Card data-testid="card-wait-time" className="hover-elevate">
        <CardHeader className="flex flex-row items-center justify-between gap-2 space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Avg Wait Time</CardTitle>
          <TrendingUp className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold" data-testid="text-wait-time">{averageWaitTime}m</div>
          <p className="text-xs text-muted-foreground mt-1">Average queue time</p>
        </CardContent>
      </Card>

      <Card data-testid="card-capacity" className="hover-elevate">
        <CardHeader className="flex flex-row items-center justify-between gap-2 space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Capacity</CardTitle>
          <AlertCircle className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-2">
            <div className="text-2xl font-bold" data-testid="text-capacity-percent">{capacityUtilization}%</div>
            <Badge variant={getCapacityColor(capacityUtilization)}>
              {capacityUtilization >= 90 ? "High" : capacityUtilization >= 70 ? "Medium" : "Normal"}
            </Badge>
          </div>
          <p className="text-xs text-muted-foreground mt-1">Current utilization</p>
        </CardContent>
      </Card>

      {alerts.length > 0 && (
        <Card className="lg:col-span-4" data-testid="card-alerts">
          <CardHeader>
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <AlertCircle className="h-4 w-4" />
              Active Alerts ({alerts.length})
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2">
              {alerts.map((alert) => (
                <Badge
                  key={alert.id}
                  variant={getSeverityColor(alert.severity)}
                  data-testid={`badge-alert-${alert.id}`}
                >
                  {alert.message}
                </Badge>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}