import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { 
  AlertTriangle, 
  Phone, 
  MapPin, 
  Clock,
  CheckCircle,
  Shield
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
}

interface SOSButtonProps {
  onSOSTriggered?: (alert: SOSAlert) => void;
}

export default function SOSButton({ onSOSTriggered }: SOSButtonProps) {
  const [isPressed, setIsPressed] = useState(false);
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const [countdown, setCountdown] = useState(0);
  const [location, setLocation] = useState<LocationData | null>(null);
  const [isGettingLocation, setIsGettingLocation] = useState(false);
  const [alertSent, setAlertSent] = useState(false);

  const getCurrentLocation = (): Promise<LocationData> => {
    return new Promise((resolve, reject) => {
      if (!navigator.geolocation) {
        reject(new Error("Geolocation is not supported"));
        return;
      }

      navigator.geolocation.getCurrentPosition(
        (position) => {
          resolve({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
            accuracy: position.coords.accuracy,
            timestamp: position.timestamp
          });
        },
        (error) => {
          reject(error);
        },
        {
          enableHighAccuracy: true,
          timeout: 10000,
          maximumAge: 60000
        }
      );
    });
  };

  const handleSOSPress = () => {
    setIsPressed(true);
    setIsConfirmOpen(true);
    setCountdown(5);
  };

  const handleConfirmSOS = async () => {
    setIsGettingLocation(true);
    
    try {
      const locationData = await getCurrentLocation();
      setLocation(locationData);
      
      const alert: SOSAlert = {
        id: `SOS-${Date.now()}`,
        userId: "devotee-123", // In real app, get from auth
        userName: "Current User", // In real app, get from auth
        location: locationData,
        timestamp: new Date().toISOString(),
        status: "active",
        message: "Emergency alert triggered from temple premises"
      };

      console.log("SOS Alert triggered:", alert);
      onSOSTriggered?.(alert);
      setAlertSent(true);
      
    } catch (error) {
      console.error("Error getting location:", error);
      // Send alert without location
      const alert: SOSAlert = {
        id: `SOS-${Date.now()}`,
        userId: "devotee-123",
        userName: "Current User",
        location: null,
        timestamp: new Date().toISOString(),
        status: "active",
        message: "Emergency alert triggered from temple premises (location unavailable)"
      };
      
      onSOSTriggered?.(alert);
      setAlertSent(true);
    } finally {
      setIsGettingLocation(false);
    }
  };

  const handleCancel = () => {
    setIsPressed(false);
    setIsConfirmOpen(false);
    setCountdown(0);
    setAlertSent(false);
  };

  // Countdown timer effect
  useEffect(() => {
    if (countdown > 0 && isConfirmOpen) {
      const timer = setTimeout(() => {
        setCountdown(countdown - 1);
      }, 1000);
      return () => clearTimeout(timer);
    } else if (countdown === 0 && isConfirmOpen && !alertSent) {
      // Auto-trigger SOS after countdown
      handleConfirmSOS();
    }
  }, [countdown, isConfirmOpen, alertSent]);

  if (alertSent) {
    return (
      <Card className="border-green-500 bg-green-50 dark:bg-green-950" data-testid="card-sos-sent">
        <CardContent className="p-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-green-500 text-white rounded-full">
              <CheckCircle className="h-5 w-5" />
            </div>
            <div className="flex-1">
              <h4 className="font-semibold text-green-800 dark:text-green-200">
                Emergency Alert Sent
              </h4>
              <p className="text-sm text-green-600 dark:text-green-300">
                Help is on the way. Temple security has been notified.
              </p>
            </div>
          </div>
          
          {location && (
            <div className="mt-3 p-2 bg-green-100 dark:bg-green-900 rounded text-xs">
              <div className="flex items-center gap-1 text-green-700 dark:text-green-300">
                <MapPin className="h-3 w-3" />
                <span>Location shared: {location.latitude.toFixed(6)}, {location.longitude.toFixed(6)}</span>
              </div>
            </div>
          )}
          
          <Button 
            variant="outline" 
            size="sm" 
            onClick={handleCancel}
            className="mt-3 w-full"
            data-testid="button-sos-dismiss"
          >
            Dismiss
          </Button>
        </CardContent>
      </Card>
    );
  }

  return (
    <>
      <Card className="border-red-500" data-testid="card-sos-button">
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center gap-2 text-red-600 dark:text-red-400">
            <Shield className="h-5 w-5" />
            Emergency Services
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <p className="text-sm text-muted-foreground">
              In case of emergency, press the SOS button below. Temple security and emergency services will be notified immediately.
            </p>
            
            <Button
              variant="destructive"
              size="lg"
              className="w-full h-16 text-lg font-bold"
              onClick={handleSOSPress}
              disabled={isPressed}
              data-testid="button-sos-trigger"
            >
              <AlertTriangle className="h-6 w-6 mr-2" />
              {isPressed ? "SOS ACTIVATING..." : "SOS EMERGENCY"}
            </Button>
            
            <div className="grid grid-cols-2 gap-2 text-xs">
              <div className="flex items-center gap-1 text-muted-foreground">
                <Phone className="h-3 w-3" />
                <span>Calls Security</span>
              </div>
              <div className="flex items-center gap-1 text-muted-foreground">
                <MapPin className="h-3 w-3" />
                <span>Shares Location</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Dialog open={isConfirmOpen} onOpenChange={setIsConfirmOpen}>
        <DialogContent className="border-red-500" data-testid="dialog-sos-confirm">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2 text-red-600">
              <AlertTriangle className="h-5 w-5" />
              Emergency Alert
            </DialogTitle>
          </DialogHeader>
          
          <div className="space-y-4">
            {countdown > 0 ? (
              <>
                <div className="text-center">
                  <div className="text-4xl font-bold text-red-600 mb-2" data-testid="text-countdown">
                    {countdown}
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Emergency alert will be sent automatically
                  </p>
                </div>
                
                <div className="flex gap-2">
                  <Button 
                    variant="destructive" 
                    onClick={handleConfirmSOS}
                    className="flex-1"
                    data-testid="button-sos-confirm"
                  >
                    Send Alert Now
                  </Button>
                  <Button 
                    variant="outline" 
                    onClick={handleCancel}
                    className="flex-1"
                    data-testid="button-sos-cancel"
                  >
                    Cancel
                  </Button>
                </div>
              </>
            ) : isGettingLocation ? (
              <div className="text-center py-6">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-red-600 mx-auto mb-4"></div>
                <p className="text-sm text-muted-foreground">
                  Getting your location and sending alert...
                </p>
              </div>
            ) : null}
            
            <div className="bg-muted p-3 rounded-lg text-xs">
              <h4 className="font-semibold mb-2">What happens when you press SOS:</h4>
              <ul className="space-y-1 text-muted-foreground">
                <li>• Temple security is immediately notified</li>
                <li>• Your current location is shared</li>
                <li>• Emergency response team is dispatched</li>
                <li>• Temple administrators receive instant alert</li>
              </ul>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}