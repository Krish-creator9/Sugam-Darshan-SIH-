import { useState, useRef, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Camera, 
  CameraOff, 
  CheckCircle, 
  XCircle, 
  User,
  Calendar,
  Clock,
  Phone,
  AlertCircle
} from "lucide-react";

interface ScannedTicket {
  bookingId: string;
  devoteeName: string;
  phoneNumber: string;
  templeName: string;
  date: string;
  time: string;
  status: "active" | "used" | "cancelled";
  tokenNumber?: number;
  scanTime: string;
}

interface QRScannerProps {
  onTicketScanned?: (ticket: ScannedTicket) => void;
}

export default function QRScanner({ onTicketScanned }: QRScannerProps) {
  const [isScanning, setIsScanning] = useState(false);
  const [scannedTickets, setScannedTickets] = useState<ScannedTicket[]>([]);
  const [currentTicket, setCurrentTicket] = useState<ScannedTicket | null>(null);
  const [error, setError] = useState<string>("");
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const scanIntervalRef = useRef<NodeJS.Timeout>();

  const mockTicketData: Record<string, Omit<ScannedTicket, 'scanTime'>> = {
    "TMP-2025-001432-VERIFIED": {
      bookingId: "TMP-2025-001432",
      devoteeName: "Rajesh Kumar",
      phoneNumber: "+91 98765 43210",
      templeName: "Shri Ram Mandir",
      date: "January 20, 2025",
      time: "08:00 AM",
      status: "active",
      tokenNumber: 247
    },
    "TMP-2025-001433-VERIFIED": {
      bookingId: "TMP-2025-001433",
      devoteeName: "Priya Sharma",
      phoneNumber: "+91 98765 43211",
      templeName: "Shri Ram Mandir",
      date: "January 20, 2025",
      time: "10:00 AM",
      status: "active",
      tokenNumber: 248
    }
  };

  const startCamera = async () => {
    try {
      setError("");
      const stream = await navigator.mediaDevices.getUserMedia({ 
        video: { facingMode: "environment" } 
      });
      
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        videoRef.current.play();
        setIsScanning(true);
        startQRDetection();
      }
    } catch (err) {
      setError("Unable to access camera. Please check permissions.");
      console.error("Camera access error:", err);
    }
  };

  const stopCamera = () => {
    if (videoRef.current?.srcObject) {
      const stream = videoRef.current.srcObject as MediaStream;
      stream.getTracks().forEach(track => track.stop());
      videoRef.current.srcObject = null;
    }
    
    if (scanIntervalRef.current) {
      clearInterval(scanIntervalRef.current);
    }
    
    setIsScanning(false);
  };

  const startQRDetection = () => {
    // Simulate QR code detection every 2 seconds for demo
    scanIntervalRef.current = setInterval(() => {
      // In a real implementation, this would analyze the video feed
      // For demo purposes, we'll simulate finding a QR code occasionally
      if (Math.random() > 0.7) {
        const qrCodes = Object.keys(mockTicketData);
        const randomQR = qrCodes[Math.floor(Math.random() * qrCodes.length)];
        simulateQRDetection(randomQR);
      }
    }, 2000);
  };

  const simulateQRDetection = (qrData: string) => {
    const ticketData = mockTicketData[qrData];
    if (ticketData) {
      const scannedTicket: ScannedTicket = {
        ...ticketData,
        scanTime: new Date().toLocaleTimeString()
      };
      
      setCurrentTicket(scannedTicket);
      setScannedTickets(prev => [scannedTicket, ...prev]);
      onTicketScanned?.(scannedTicket);
      
      console.log("QR Code scanned:", qrData);
      
      // Auto-clear current ticket after 5 seconds
      setTimeout(() => {
        setCurrentTicket(null);
      }, 5000);
    }
  };

  const markAsCheckedIn = (ticket: ScannedTicket) => {
    console.log("Checking in devotee:", ticket.devoteeName);
    setScannedTickets(prev => 
      prev.map(t => 
        t.bookingId === ticket.bookingId 
          ? { ...t, status: "used" as const }
          : t
      )
    );
    setCurrentTicket(null);
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "active":
        return <Badge variant="default" data-testid="badge-active">Valid</Badge>;
      case "used":
        return <Badge variant="secondary" data-testid="badge-used">Used</Badge>;
      case "cancelled":
        return <Badge variant="destructive" data-testid="badge-cancelled">Cancelled</Badge>;
      default:
        return <Badge variant="secondary">Unknown</Badge>;
    }
  };

  useEffect(() => {
    return () => {
      stopCamera();
    };
  }, []);

  return (
    <div className="space-y-6">
      {/* Scanner Control */}
      <Card data-testid="card-scanner-control">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Camera className="h-5 w-5" />
            QR Code Scanner
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex gap-2">
              {!isScanning ? (
                <Button 
                  onClick={startCamera}
                  data-testid="button-start-camera"
                  className="flex items-center gap-2"
                >
                  <Camera className="h-4 w-4" />
                  Start Camera
                </Button>
              ) : (
                <Button 
                  variant="outline"
                  onClick={stopCamera}
                  data-testid="button-stop-camera"
                  className="flex items-center gap-2"
                >
                  <CameraOff className="h-4 w-4" />
                  Stop Camera
                </Button>
              )}
            </div>

            {error && (
              <div className="flex items-center gap-2 text-destructive text-sm">
                <AlertCircle className="h-4 w-4" />
                <span data-testid="text-error">{error}</span>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Camera Feed */}
      {isScanning && (
        <Card data-testid="card-camera-feed">
          <CardHeader>
            <CardTitle>Camera Feed</CardTitle>
            <p className="text-sm text-muted-foreground">
              Point the camera at a devotee's QR code to scan their ticket
            </p>
          </CardHeader>
          <CardContent>
            <div className="relative bg-black rounded-lg overflow-hidden">
              <video
                ref={videoRef}
                className="w-full h-64 object-cover"
                data-testid="video-camera-feed"
              />
              <canvas
                ref={canvasRef}
                className="hidden"
              />
              
              {/* Scanning overlay */}
              <div className="absolute inset-0 border-2 border-primary border-dashed rounded-lg flex items-center justify-center">
                <div className="text-white bg-black/50 px-3 py-1 rounded">
                  Scanning for QR codes...
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Current Scanned Ticket */}
      {currentTicket && (
        <Card data-testid="card-current-ticket" className="border-primary">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-primary">
              <CheckCircle className="h-5 w-5" />
              Ticket Scanned!
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex items-center gap-3">
                  <User className="h-4 w-4 text-muted-foreground" />
                  <div>
                    <p className="text-sm text-muted-foreground">Devotee Name</p>
                    <p className="font-medium" data-testid="text-current-devotee">{currentTicket.devoteeName}</p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <Phone className="h-4 w-4 text-muted-foreground" />
                  <div>
                    <p className="text-sm text-muted-foreground">Phone</p>
                    <p className="font-medium" data-testid="text-current-phone">{currentTicket.phoneNumber}</p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                  <div>
                    <p className="text-sm text-muted-foreground">Date</p>
                    <p className="font-medium" data-testid="text-current-date">{currentTicket.date}</p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <Clock className="h-4 w-4 text-muted-foreground" />
                  <div>
                    <p className="text-sm text-muted-foreground">Time Slot</p>
                    <p className="font-medium" data-testid="text-current-time">{currentTicket.time}</p>
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="text-sm">Status:</span>
                  {getStatusBadge(currentTicket.status)}
                </div>
                <div className="text-sm text-muted-foreground">
                  Token #{currentTicket.tokenNumber}
                </div>
              </div>

              {currentTicket.status === "active" && (
                <Button 
                  onClick={() => markAsCheckedIn(currentTicket)}
                  className="w-full"
                  data-testid="button-check-in"
                >
                  <CheckCircle className="h-4 w-4 mr-2" />
                  Check In Devotee
                </Button>
              )}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Scanned Tickets History */}
      <Card data-testid="card-scan-history">
        <CardHeader>
          <CardTitle>Today's Check-ins ({scannedTickets.length})</CardTitle>
        </CardHeader>
        <CardContent>
          {scannedTickets.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground">
              <Camera className="h-12 w-12 mx-auto mb-4 opacity-50" />
              <p>No tickets scanned yet</p>
              <p className="text-sm">Start scanning QR codes to see check-ins here</p>
            </div>
          ) : (
            <div className="space-y-3">
              {scannedTickets.map((ticket, index) => (
                <div 
                  key={`${ticket.bookingId}-${index}`}
                  className="flex items-center justify-between p-3 bg-muted/50 rounded-lg"
                  data-testid={`history-item-${index}`}
                >
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-primary/10 rounded">
                      <User className="h-4 w-4 text-primary" />
                    </div>
                    <div>
                      <p className="font-medium" data-testid={`history-name-${index}`}>{ticket.devoteeName}</p>
                      <p className="text-sm text-muted-foreground">
                        {ticket.time} • Scanned at {ticket.scanTime}
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    {getStatusBadge(ticket.status)}
                    {ticket.status === "used" ? (
                      <CheckCircle className="h-4 w-4 text-green-600" />
                    ) : (
                      <XCircle className="h-4 w-4 text-muted-foreground" />
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}