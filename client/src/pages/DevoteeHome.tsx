import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Calendar,
  Clock, 
  Users, 
  Bell,
  MapPin,
  BookOpen,
  Ticket
} from "lucide-react";
import { Link } from "wouter";
import SOSButton from "@/components/SOSButton";
import WheelchairRequestButton from "@/components/WheelchairRequestButton";
import templeImage from "@assets/generated_images/Temple_courtyard_background_424111a7.png";

// Mock data - todo: remove mock functionality
const mockQueueStatus = {
  currentToken: 247,
  displayMessage: "Welcome to सुगम दर्शन. Please maintain social distancing.",
  estimatedWaitTime: "12-15 minutes",
  queueLength: 34
};

const mockNotifications = [
  {
    id: "1",
    title: "Booking Reminder",
    message: "Your booking for tomorrow at 8:00 AM is confirmed",
    time: "2 hours ago",
    type: "info" as const
  },
  {
    id: "2", 
    title: "Temple Update",
    message: "Evening aarti timing changed to 7:30 PM",
    time: "1 day ago",
    type: "warning" as const
  }
];

const mockRecentBooking = {
  id: "TMP-2025-001432",
  templeName: "सुगम दर्शन",
  date: "Tomorrow",
  time: "08:00 AM",
  status: "active" as const
};

export default function DevoteeHome() {
  return (
    <div className="space-y-6" data-testid="page-devotee-home">
      {/* Hero Section */}
      <div className="relative overflow-hidden rounded-lg">
        <div
          className="h-48 bg-cover bg-center"
          style={{ backgroundImage: `url(${templeImage})` }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-black/30" />
          <div className="relative h-full flex items-center justify-center text-center text-white p-6">
            <div>
              <h1 className="text-3xl font-bold mb-2" data-testid="text-welcome">
                Welcome to सुगम दर्शन
              </h1>
              <p className="text-lg opacity-90">
                Your spiritual journey, simplified with technology
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Link href="/book" data-testid="link-book-token">
          <Card className="hover-elevate cursor-pointer transition-all">
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-primary/10 rounded-lg">
                  <Ticket className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold">Book E-Token</h3>
                  <p className="text-sm text-muted-foreground">
                    Reserve your visit slot
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </Link>

        <Link href="/tickets" data-testid="link-my-tickets">
          <Card className="hover-elevate cursor-pointer transition-all">
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-primary/10 rounded-lg">
                  <BookOpen className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold">My Tickets</h3>
                  <p className="text-sm text-muted-foreground">
                    View your bookings
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </Link>
      </div>

      {/* Live Queue Status */}
      <Card data-testid="card-queue-status">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Users className="h-5 w-5" />
            Live Queue Status
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-primary" data-testid="text-current-token">
                #{mockQueueStatus.currentToken}
              </div>
              <p className="text-sm text-muted-foreground">Current Token</p>
            </div>
            
            <div className="text-center">
              <div className="text-2xl font-bold" data-testid="text-queue-length">
                {mockQueueStatus.queueLength}
              </div>
              <p className="text-sm text-muted-foreground">People Ahead</p>
            </div>
            
            <div className="text-center">
              <div className="text-lg font-semibold" data-testid="text-wait-time">
                {mockQueueStatus.estimatedWaitTime}
              </div>
              <p className="text-sm text-muted-foreground">Estimated Wait</p>
            </div>
          </div>

          <div className="mt-4 p-3 bg-muted rounded-lg">
            <p className="text-sm text-center" data-testid="text-display-message">
              📢 {mockQueueStatus.displayMessage}
            </p>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Booking */}
        {mockRecentBooking && (
          <Card data-testid="card-recent-booking">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calendar className="h-5 w-5" />
                Your Next Visit
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="font-medium" data-testid="text-temple-name">
                    {mockRecentBooking.templeName}
                  </span>
                  <Badge variant="default" data-testid="badge-booking-status">
                    {mockRecentBooking.status === 'active' ? 'Confirmed' : mockRecentBooking.status}
                  </Badge>
                </div>
                
                <div className="flex items-center gap-4 text-sm text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <Calendar className="h-4 w-4" />
                    <span data-testid="text-booking-date">{mockRecentBooking.date}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock className="h-4 w-4" />
                    <span data-testid="text-booking-time">{mockRecentBooking.time}</span>
                  </div>
                </div>

                <Link href="/tickets" data-testid="link-view-ticket">
                  <Button variant="outline" className="w-full">
                    View E-Token
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Notifications */}
        <Card data-testid="card-notifications">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Bell className="h-5 w-5" />
              Recent Updates ({mockNotifications.length})
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {mockNotifications.map((notification) => (
                <div 
                  key={notification.id}
                  className="flex gap-3 p-3 bg-muted/50 rounded-lg"
                  data-testid={`notification-${notification.id}`}
                >
                  <div className="flex-shrink-0 mt-0.5">
                    <Bell className="h-4 w-4 text-muted-foreground" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="font-medium text-sm" data-testid={`notification-title-${notification.id}`}>
                      {notification.title}
                    </h4>
                    <p className="text-sm text-muted-foreground" data-testid={`notification-message-${notification.id}`}>
                      {notification.message}
                    </p>
                    <p className="text-xs text-muted-foreground mt-1" data-testid={`notification-time-${notification.id}`}>
                      {notification.time}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <Button variant="outline" className="w-full mt-4" data-testid="button-view-all">
              View All Updates
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Accessibility & Emergency */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <WheelchairRequestButton />
        <SOSButton />
      </div>
    </div>
  );
}