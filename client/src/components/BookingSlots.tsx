import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Calendar, Clock, Users, Check, AlertCircle } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Checkbox } from "@/components/ui/checkbox";

interface TimeSlot {
  id: string;
  date: string;
  time: string;
  capacity: number;
  currentBookings: number;
  isAvailable: boolean;
}

interface BookingForm {
  devoteeName: string;
  phoneNumber: string;
  isSeniorCitizen: boolean;
  needsWheelchair: boolean;
}

interface BookingSlotsProps {
  slots: TimeSlot[];
  selectedDate?: string;
  onDateChange?: (date: string) => void;
  onBookSlot?: (slotId: string, bookingData: BookingForm) => void;
}

export default function BookingSlots({ 
  slots, 
  selectedDate,
  onDateChange,
  onBookSlot 
}: BookingSlotsProps) {
  const [selectedSlot, setSelectedSlot] = useState<TimeSlot | null>(null);
  const [bookingForm, setBookingForm] = useState<BookingForm>({
    devoteeName: "",
    phoneNumber: "",
    isSeniorCitizen: false,
    needsWheelchair: false,
  });
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleBookSlot = () => {
    if (!selectedSlot || !bookingForm.devoteeName || !bookingForm.phoneNumber) {
      console.log("Please fill all required fields");
      return;
    }

    console.log("Booking slot:", selectedSlot.id, bookingForm);
    onBookSlot?.(selectedSlot.id, bookingForm);
    
    // Reset form
    setBookingForm({ devoteeName: "", phoneNumber: "", isSeniorCitizen: false, needsWheelchair: false });
    setSelectedSlot(null);
    setIsDialogOpen(false);
  };

  const getAvailabilityBadge = (slot: TimeSlot) => {
    if (!slot.isAvailable) {
      return <Badge variant="destructive" data-testid={`badge-full-${slot.id}`}>Full</Badge>;
    }
    
    const utilization = (slot.currentBookings / slot.capacity) * 100;
    if (utilization >= 90) {
      return <Badge variant="secondary" data-testid={`badge-filling-${slot.id}`}>Filling Fast</Badge>;
    }
    
    return <Badge variant="default" data-testid={`badge-available-${slot.id}`}>Available</Badge>;
  };

  const getUtilization = (slot: TimeSlot) => {
    return Math.round((slot.currentBookings / slot.capacity) * 100);
  };

  const availableSlots = slots.filter(slot => slot.isAvailable);
  const fullyBookedSlots = slots.filter(slot => !slot.isAvailable);

  return (
    <div className="space-y-6">
      {/* Date Selection */}
      <Card data-testid="card-date-selection">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calendar className="h-5 w-5" />
            Select Date
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <Label htmlFor="bookingDate">Choose your visit date</Label>
            <Input
              id="bookingDate"
              type="date"
              value={selectedDate || ""}
              onChange={(e) => onDateChange?.(e.target.value)}
              data-testid="input-booking-date"
              min={new Date().toISOString().split('T')[0]}
            />
          </div>
        </CardContent>
      </Card>

      {/* Available Slots */}
      {availableSlots.length > 0 && (
        <Card data-testid="card-available-slots">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Clock className="h-5 w-5 text-green-600" />
              Available Time Slots ({availableSlots.length})
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {availableSlots.map((slot) => (
                <Card 
                  key={slot.id} 
                  className="hover-elevate cursor-pointer transition-all" 
                  data-testid={`card-slot-${slot.id}`}
                >
                  <CardContent className="p-4">
                    <div className="space-y-3">
                      <div className="flex justify-between items-center">
                        <span className="text-lg font-semibold" data-testid={`text-time-${slot.id}`}>
                          {slot.time}
                        </span>
                        {getAvailabilityBadge(slot)}
                      </div>
                      
                      <div className="space-y-2">
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <Users className="h-4 w-4" />
                          <span data-testid={`text-capacity-${slot.id}`}>
                            {slot.currentBookings}/{slot.capacity} booked
                          </span>
                        </div>
                        
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div
                            className={`h-2 rounded-full ${
                              getUtilization(slot) >= 90
                                ? "bg-red-500"
                                : getUtilization(slot) >= 70
                                ? "bg-yellow-500"
                                : "bg-green-500"
                            }`}
                            style={{ width: `${getUtilization(slot)}%` }}
                          />
                        </div>
                      </div>

                      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                        <DialogTrigger asChild>
                          <Button 
                            className="w-full" 
                            onClick={() => {
                              setSelectedSlot(slot);
                              setIsDialogOpen(true);
                            }}
                            data-testid={`button-book-${slot.id}`}
                          >
                            Book E-Token
                          </Button>
                        </DialogTrigger>
                        <DialogContent data-testid="dialog-booking-form">
                          <DialogHeader>
                            <DialogTitle>Book Your E-Token</DialogTitle>
                          </DialogHeader>
                          
                          {selectedSlot && (
                            <div className="space-y-4">
                              <div className="p-4 bg-muted rounded-lg">
                                <h4 className="font-semibold">Selected Slot</h4>
                                <p data-testid="text-selected-date">{selectedSlot.date} at {selectedSlot.time}</p>
                                <p className="text-sm text-muted-foreground">
                                  {selectedSlot.capacity - selectedSlot.currentBookings} spots remaining
                                </p>
                              </div>
                              
                              <div className="space-y-4">
                                <div className="space-y-2">
                                  <Label htmlFor="devoteeName">Devotee Name</Label>
                                  <Input
                                    id="devoteeName"
                                    placeholder="Enter your full name"
                                    value={bookingForm.devoteeName}
                                    onChange={(e) => setBookingForm(prev => ({ ...prev, devoteeName: e.target.value }))}
                                    data-testid="input-devotee-name"
                                  />
                                </div>
                                
                                <div className="space-y-2">
                                  <Label htmlFor="phoneNumber">Phone Number</Label>
                                  <Input
                                    id="phoneNumber"
                                    placeholder="Enter your phone number"
                                    value={bookingForm.phoneNumber}
                                    onChange={(e) => setBookingForm(prev => ({ ...prev, phoneNumber: e.target.value }))}
                                    data-testid="input-phone-number"
                                  />
                                </div>
                                
                                <div className="flex gap-2">
                                  <Button
                                    onClick={handleBookSlot}
                                    disabled={!bookingForm.devoteeName || !bookingForm.phoneNumber}
                                    data-testid="button-confirm-booking"
                                    className="flex items-center gap-2"
                                  >
                                    <Check className="h-4 w-4" />
                                    Confirm Booking
                                  </Button>
                                  <Button
                                    variant="outline"
                                    onClick={() => {
                                      setIsDialogOpen(false);
                                      setSelectedSlot(null);
                                      setBookingForm({ devoteeName: "", phoneNumber: "", isSeniorCitizen: false, needsWheelchair: false });
                                    }}
                                    data-testid="button-cancel-booking"
                                  >
                                    Cancel
                                  </Button>
                                </div>
                              </div>

                              {/* Additional Options */}
                              <div className="p-4 bg-muted rounded-lg">
                                <h4 className="font-semibold">Additional Options</h4>
                                <div className="flex gap-4">
                                  <div className="flex items-center gap-2">
                                    <Checkbox
                                      id="isSeniorCitizen"
                                      checked={bookingForm.isSeniorCitizen}
                                      onCheckedChange={(checked) => setBookingForm(prev => ({ ...prev, isSeniorCitizen: !!checked }))}
                                      data-testid="checkbox-senior-citizen"
                                    />
                                    <Label htmlFor="isSeniorCitizen" className="cursor-pointer">
                                      Senior Citizen Discount
                                    </Label>
                                  </div>
                                  
                                  <div className="flex items-center gap-2">
                                    <Checkbox
                                      id="needsWheelchair"
                                      checked={bookingForm.needsWheelchair}
                                      onCheckedChange={(checked) => setBookingForm(prev => ({ ...prev, needsWheelchair: !!checked }))}
                                      data-testid="checkbox-wheelchair"
                                    />
                                    <Label htmlFor="needsWheelchair" className="cursor-pointer">
                                      Wheelchair Access Needed
                                    </Label>
                                  </div>
                                </div>
                              </div>
                            </div>
                          )}
                        </DialogContent>
                      </Dialog>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Fully Booked Slots */}
      {fullyBookedSlots.length > 0 && (
        <Card data-testid="card-full-slots">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <AlertCircle className="h-5 w-5 text-red-600" />
              Fully Booked Slots ({fullyBookedSlots.length})
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {fullyBookedSlots.map((slot) => (
                <Card key={slot.id} className="opacity-60" data-testid={`card-full-slot-${slot.id}`}>
                  <CardContent className="p-4">
                    <div className="space-y-3">
                      <div className="flex justify-between items-center">
                        <span className="text-lg font-semibold" data-testid={`text-full-time-${slot.id}`}>
                          {slot.time}
                        </span>
                        <Badge variant="destructive">Full</Badge>
                      </div>
                      
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Users className="h-4 w-4" />
                        <span>{slot.capacity}/{slot.capacity} booked</span>
                      </div>
                      
                      <Button disabled className="w-full" data-testid={`button-full-${slot.id}`}>
                        Slot Full
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {slots.length === 0 && (
        <Card data-testid="card-no-slots">
          <CardContent className="text-center py-8">
            <AlertCircle className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
            <h3 className="text-lg font-semibold mb-2">No Slots Available</h3>
            <p className="text-muted-foreground">
              Please select a different date or check back later for new slots.
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}