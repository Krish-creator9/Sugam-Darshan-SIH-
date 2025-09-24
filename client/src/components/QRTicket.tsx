import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { QrCode, Calendar, Clock, MapPin, User, Phone, Download, Share } from "lucide-react";
import { useState } from "react";

interface TicketData {
  bookingId: string;
  devoteeName: string;
  phoneNumber: string;
  templeName: string;
  date: string;
  time: string;
  qrCodeData: string;
  status: "active" | "used" | "cancelled";
  tokenNumber?: number;
}

interface QRTicketProps {
  ticket: TicketData;
  onDownload?: () => void;
  onShare?: () => void;
}

export default function QRTicket({ ticket, onDownload, onShare }: QRTicketProps) {
  const [qrSize] = useState(200);

  const getStatusBadge = () => {
    switch (ticket.status) {
      case "active":
        return <Badge variant="default" data-testid="badge-status">Active</Badge>;
      case "used":
        return <Badge variant="secondary" data-testid="badge-status">Used</Badge>;
      case "cancelled":
        return <Badge variant="destructive" data-testid="badge-status">Cancelled</Badge>;
    }
  };

  // Generate a simple QR-like pattern for demo purposes
  const generateQRPattern = () => {
    const size = 12; // 12x12 grid
    const pattern = [];
    
    // Create a deterministic pattern based on booking ID
    for (let i = 0; i < size; i++) {
      const row = [];
      for (let j = 0; j < size; j++) {
        const hash = (ticket.bookingId.charCodeAt((i + j) % ticket.bookingId.length) + i + j) % 2;
        row.push(hash === 1);
      }
      pattern.push(row);
    }
    
    return pattern;
  };

  const qrPattern = generateQRPattern();

  return (
    <div className="max-w-md mx-auto">
      <Card data-testid="card-qr-ticket" className="overflow-hidden">
        <CardHeader className="text-center bg-gradient-to-r from-primary/10 to-primary/5 border-b">
          <div className="flex justify-center mb-2">
            <QrCode className="h-8 w-8 text-primary" />
          </div>
          <CardTitle className="text-xl" data-testid="text-temple-name">{ticket.templeName}</CardTitle>
          <p className="text-sm text-muted-foreground">E-Token Confirmation</p>
          <div className="flex justify-center mt-2">
            {getStatusBadge()}
          </div>
        </CardHeader>
        
        <CardContent className="p-6">
          <div className="space-y-6">
            {/* QR Code Display */}
            <div className="flex justify-center">
              <div 
                className="border-2 border-gray-300 p-4 bg-white rounded-lg"
                style={{ width: qrSize + 32, height: qrSize + 32 }}
                data-testid="qr-code-display"
              >
                <div className="grid grid-cols-12 gap-0 w-full h-full">
                  {qrPattern.map((row, i) => 
                    row.map((cell, j) => (
                      <div
                        key={`${i}-${j}`}
                        className={cell ? "bg-black" : "bg-white"}
                        style={{ aspectRatio: '1' }}
                      />
                    ))
                  )}
                </div>
              </div>
            </div>

            {/* Booking Details */}
            <div className="space-y-4">
              <div className="grid grid-cols-1 gap-3">
                <div className="flex items-center gap-3">
                  <User className="h-4 w-4 text-muted-foreground" />
                  <div>
                    <p className="text-sm text-muted-foreground">Devotee Name</p>
                    <p className="font-medium" data-testid="text-devotee-name">{ticket.devoteeName}</p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <Phone className="h-4 w-4 text-muted-foreground" />
                  <div>
                    <p className="text-sm text-muted-foreground">Phone Number</p>
                    <p className="font-medium" data-testid="text-phone-number">{ticket.phoneNumber}</p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                  <div>
                    <p className="text-sm text-muted-foreground">Date</p>
                    <p className="font-medium" data-testid="text-date">{ticket.date}</p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <Clock className="h-4 w-4 text-muted-foreground" />
                  <div>
                    <p className="text-sm text-muted-foreground">Time Slot</p>
                    <p className="font-medium" data-testid="text-time">{ticket.time}</p>
                  </div>
                </div>

                {ticket.tokenNumber && (
                  <div className="flex items-center gap-3">
                    <QrCode className="h-4 w-4 text-muted-foreground" />
                    <div>
                      <p className="text-sm text-muted-foreground">Token Number</p>
                      <p className="font-medium text-primary" data-testid="text-token-number">
                        #{ticket.tokenNumber}
                      </p>
                    </div>
                  </div>
                )}
              </div>

              <div className="border-t pt-4">
                <div className="flex items-center gap-3">
                  <MapPin className="h-4 w-4 text-muted-foreground" />
                  <div>
                    <p className="text-sm text-muted-foreground">Booking ID</p>
                    <p className="font-mono text-xs" data-testid="text-booking-id">{ticket.bookingId}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-2">
              <Button
                variant="outline"
                onClick={() => {
                  console.log("Downloading ticket");
                  onDownload?.();
                }}
                data-testid="button-download"
                className="flex-1 flex items-center gap-2"
              >
                <Download className="h-4 w-4" />
                Download
              </Button>
              
              <Button
                variant="outline"
                onClick={() => {
                  console.log("Sharing ticket");
                  onShare?.();
                }}
                data-testid="button-share"
                className="flex-1 flex items-center gap-2"
              >
                <Share className="h-4 w-4" />
                Share
              </Button>
            </div>

            {/* Important Notes */}
            <div className="bg-muted/50 rounded-lg p-3">
              <h4 className="font-medium text-sm mb-2">Important Notes:</h4>
              <ul className="text-xs text-muted-foreground space-y-1">
                <li>• Present this QR code at the temple entrance</li>
                <li>• Arrive 15 minutes before your scheduled time</li>
                <li>• This ticket is non-transferable</li>
                {ticket.status === "active" && (
                  <li className="text-primary font-medium">• Your E-Token is ready to use</li>
                )}
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}