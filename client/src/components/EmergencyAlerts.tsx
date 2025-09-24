import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  AlertTriangle, 
  MapPin, 
  Clock, 
  User,
  Phone,
  CheckCircle,
  Eye,
  Navigation
} from "lucide-react";

interface LocationData {
  latitude: number;
  longitude: number;
  accuracy: number;
  timestamp: number;
}

interface SOSAlert {
  id: string;
  userId: string;
  userName: string;
  location: LocationData | null;
  timestamp: string;
  status: "active" | "responded" | "resolved";
  message?: string;
  responseTime?: string;
}

interface EmergencyAlertsProps {
  alerts?: SOSAlert[];
  onRespondToAlert?: (alertId: string) => void;
  onResolveAlert?: (alertId: string) => void;
  onViewLocation?: (location: LocationData) => void;
}

export default function EmergencyAlerts({ 
  alerts = [], 
  onRespondToAlert,
  onResolveAlert,
  onViewLocation 
}: EmergencyAlertsProps) {
  const [mockAlerts, setMockAlerts] = useState<SOSAlert[]>([
    {
      id: "SOS-1734567890123",
      userId: "devotee-123",
      userName: "Rajesh Kumar",
      location: {
        latitude: 26.7961,
        longitude: 82.1961,
        accuracy: 5,
        timestamp: Date.now() - 300000
      },
      timestamp: new Date(Date.now() - 300000).toISOString(),
      status: "active",
      message: "Emergency alert triggered from temple premises"
    },
    {
      id: "SOS-1734567890124",
      userId: "devotee-124",
      userName: "Priya Sharma",
      location: {
        latitude: 26.7965,
        longitude: 82.1965,
        accuracy: 8,
        timestamp: Date.now() - 900000
      },
      timestamp: new Date(Date.now() - 900000).toISOString(),
      status: "responded",
      message: "Emergency alert triggered from temple premises",
      responseTime: "2 minutes ago"
    }
  ]);

  const allAlerts = [...alerts, ...mockAlerts];
  const activeAlerts = allAlerts.filter(alert => alert.status === "active");
  const respondedAlerts = allAlerts.filter(alert => alert.status === "responded");
  const resolvedAlerts = allAlerts.filter(alert => alert.status === "resolved");

  const handleRespond = (alertId: string) => {
    console.log("Responding to alert:", alertId);
    setMockAlerts(prev => 
      prev.map(alert => 
        alert.id === alertId 
          ? { ...alert, status: "responded" as const, responseTime: "Just now" }
          : alert
      )
    );
    onRespondToAlert?.(alertId);
  };

  const handleResolve = (alertId: string) => {
    console.log("Resolving alert:", alertId);
    setMockAlerts(prev => 
      prev.map(alert => 
        alert.id === alertId 
          ? { ...alert, status: "resolved" as const }
          : alert
      )
    );
    onResolveAlert?.(alertId);
  };

  const handleViewLocation = (location: LocationData) => {
    console.log("Viewing location:", location);
    onViewLocation?.(location);
    // In a real app, this would open a map or navigation app
    window.open(`https://maps.google.com/?q=${location.latitude},${location.longitude}`, '_blank');
  };

  const formatTimeAgo = (timestamp: string) => {
    const now = new Date();
    const alertTime = new Date(timestamp);
    const diffMs = now.getTime() - alertTime.getTime();
    const diffMins = Math.floor(diffMs / 60000);
    
    if (diffMins < 1) return "Just now";
    if (diffMins < 60) return `${diffMins} min ago`;
    const diffHours = Math.floor(diffMins / 60);
    if (diffHours < 24) return `${diffHours} hour${diffHours > 1 ? 's' : ''} ago`;
    const diffDays = Math.floor(diffHours / 24);
    return `${diffDays} day${diffDays > 1 ? 's' : ''} ago`;
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "active":
        return <Badge variant="destructive" className="animate-pulse" data-testid="badge-active">ACTIVE</Badge>;
      case "responded":
        return <Badge variant="secondary" data-testid="badge-responded">RESPONDED</Badge>;
      case "resolved":
        return <Badge variant="default" data-testid="badge-resolved">RESOLVED</Badge>;
      default:
        return <Badge variant="secondary">UNKNOWN</Badge>;
    }
  };

  return (
    <div className="space-y-6">
      {/* Emergency Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card data-testid="card-active-alerts">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <AlertTriangle className="h-4 w-4 text-red-500" />
              Active Alerts
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600" data-testid="text-active-count">
              {activeAlerts.length}
            </div>
            <p className="text-xs text-muted-foreground">Requiring immediate attention</p>
          </CardContent>
        </Card>

        <Card data-testid="card-responded-alerts">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <Eye className="h-4 w-4 text-yellow-500" />
              Responded
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-yellow-600" data-testid="text-responded-count">
              {respondedAlerts.length}
            </div>
            <p className="text-xs text-muted-foreground">Security en route</p>
          </CardContent>
        </Card>

        <Card data-testid="card-resolved-alerts">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <CheckCircle className="h-4 w-4 text-green-500" />
              Resolved Today
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600" data-testid="text-resolved-count">
              {resolvedAlerts.length}
            </div>
            <p className="text-xs text-muted-foreground">Successfully handled</p>
          </CardContent>
        </Card>
      </div>

      {/* Active Alerts */}
      {activeAlerts.length > 0 && (
        <Card data-testid="card-active-emergency-alerts" className="border-red-500">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-red-600">
              <AlertTriangle className="h-5 w-5" />
              Emergency Alerts - IMMEDIATE ACTION REQUIRED
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {activeAlerts.map((alert) => (
                <div 
                  key={alert.id}
                  className="p-4 border border-red-200 bg-red-50 dark:bg-red-950 rounded-lg"
                  data-testid={`alert-${alert.id}`}
                >
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center gap-2">
                      {getStatusBadge(alert.status)}
                      <span className="text-sm text-muted-foreground" data-testid={`alert-time-${alert.id}`}>
                        {formatTimeAgo(alert.timestamp)}
                      </span>
                    </div>
                    <Button
                      variant="destructive"
                      size="sm"
                      onClick={() => handleRespond(alert.id)}
                      data-testid={`button-respond-${alert.id}`}
                    >
                      Respond Now
                    </Button>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <User className="h-4 w-4 text-muted-foreground" />
                        <span className="font-medium" data-testid={`alert-user-${alert.id}`}>
                          {alert.userName}
                        </span>
                      </div>
                      
                      <div className="flex items-center gap-2">
                        <Clock className="h-4 w-4 text-muted-foreground" />
                        <span className="text-sm text-muted-foreground">
                          Alert ID: {alert.id}
                        </span>
                      </div>
                      
                      {alert.message && (
                        <p className="text-sm text-muted-foreground" data-testid={`alert-message-${alert.id}`}>
                          {alert.message}
                        </p>
                      )}
                    </div>

                    <div className="space-y-2">
                      {alert.location ? (
                        <div className="space-y-2">
                          <div className="flex items-center gap-2">
                            <MapPin className="h-4 w-4 text-green-600" />
                            <span className="text-sm font-medium text-green-600">Location Available</span>
                          </div>
                          
                          <div className="text-xs text-muted-foreground">
                            <div>Lat: {alert.location.latitude.toFixed(6)}</div>
                            <div>Lng: {alert.location.longitude.toFixed(6)}</div>
                            <div>Accuracy: ±{alert.location.accuracy}m</div>
                          </div>
                          
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleViewLocation(alert.location!)}
                            className="w-full"
                            data-testid={`button-location-${alert.id}`}
                          >
                            <Navigation className="h-4 w-4 mr-2" />
                            Open in Maps
                          </Button>
                        </div>
                      ) : (
                        <div className="flex items-center gap-2 text-amber-600">
                          <MapPin className="h-4 w-4" />
                          <span className="text-sm">Location unavailable</span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Recent Alerts */}
      {(respondedAlerts.length > 0 || resolvedAlerts.length > 0) && (
        <Card data-testid="card-recent-alerts">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Clock className="h-5 w-5" />
              Recent Emergency Activity
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {[...respondedAlerts, ...resolvedAlerts]
                .sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime())
                .slice(0, 5)
                .map((alert) => (
                  <div 
                    key={alert.id}
                    className="flex items-center justify-between p-3 bg-muted/50 rounded-lg"
                    data-testid={`recent-alert-${alert.id}`}
                  >
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-primary/10 rounded">
                        <User className="h-4 w-4 text-primary" />
                      </div>
                      <div>
                        <p className="font-medium" data-testid={`recent-user-${alert.id}`}>
                          {alert.userName}
                        </p>
                        <p className="text-sm text-muted-foreground">
                          {formatTimeAgo(alert.timestamp)}
                          {alert.responseTime && ` • Responded in ${alert.responseTime}`}
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-2">
                      {getStatusBadge(alert.status)}
                      {alert.status === "responded" && (
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleResolve(alert.id)}
                          data-testid={`button-resolve-${alert.id}`}
                        >
                          Mark Resolved
                        </Button>
                      )}
                    </div>
                  </div>
                ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* No Alerts */}
      {allAlerts.length === 0 && (
        <Card data-testid="card-no-alerts">
          <CardContent className="text-center py-12">
            <CheckCircle className="h-12 w-12 mx-auto text-green-500 mb-4" />
            <h3 className="text-lg font-semibold mb-2">All Clear</h3>
            <p className="text-muted-foreground">
              No emergency alerts at this time. Temple security systems are monitoring.
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}