import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Plus, Calendar, Clock, Users, Trash2 } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

interface TimeSlot {
  id: string;
  date: string;
  time: string;
  capacity: number;
  currentBookings: number;
  status: "active" | "full" | "inactive";
}

interface SlotManagerProps {
  slots: TimeSlot[];
  onCreateSlot?: (slotData: { date: string; time: string; capacity: number }) => void;
  onDeleteSlot?: (slotId: string) => void;
}

export default function SlotManager({ slots, onCreateSlot, onDeleteSlot }: SlotManagerProps) {
  const [newSlot, setNewSlot] = useState({
    date: "",
    time: "",
    capacity: 50,
  });

  const [isCreating, setIsCreating] = useState(false);

  const handleCreateSlot = () => {
    if (!newSlot.date || !newSlot.time || !newSlot.capacity) {
      console.log("Please fill all required fields");
      return;
    }

    console.log("Creating new slot:", newSlot);
    onCreateSlot?.(newSlot);
    setNewSlot({ date: "", time: "", capacity: 50 });
    setIsCreating(false);
  };

  const getStatusBadge = (slot: TimeSlot) => {
    if (slot.currentBookings >= slot.capacity) {
      return <Badge variant="destructive" data-testid={`badge-status-${slot.id}`}>Full</Badge>;
    }
    if (slot.status === "active") {
      return <Badge variant="default" data-testid={`badge-status-${slot.id}`}>Active</Badge>;
    }
    return <Badge variant="secondary" data-testid={`badge-status-${slot.id}`}>Inactive</Badge>;
  };

  const getUtilization = (slot: TimeSlot) => {
    return Math.round((slot.currentBookings / slot.capacity) * 100);
  };

  return (
    <div className="space-y-6">
      <Card data-testid="card-create-slot">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Plus className="h-5 w-5" />
            Create New Time Slot
          </CardTitle>
        </CardHeader>
        <CardContent>
          {!isCreating ? (
            <Button 
              onClick={() => setIsCreating(true)} 
              data-testid="button-start-create"
              className="w-full"
            >
              Add New Slot
            </Button>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label htmlFor="date">Date</Label>
                <Input
                  id="date"
                  type="date"
                  value={newSlot.date}
                  onChange={(e) => setNewSlot(prev => ({ ...prev, date: e.target.value }))}
                  data-testid="input-date"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="time">Time</Label>
                <Input
                  id="time"
                  type="time"
                  value={newSlot.time}
                  onChange={(e) => setNewSlot(prev => ({ ...prev, time: e.target.value }))}
                  data-testid="input-time"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="capacity">Capacity</Label>
                <Input
                  id="capacity"
                  type="number"
                  min="1"
                  value={newSlot.capacity}
                  onChange={(e) => setNewSlot(prev => ({ ...prev, capacity: parseInt(e.target.value) || 0 }))}
                  data-testid="input-capacity"
                />
              </div>
              <div className="col-span-full flex gap-2">
                <Button onClick={handleCreateSlot} data-testid="button-create-slot">
                  Create Slot
                </Button>
                <Button 
                  variant="outline" 
                  onClick={() => {
                    setIsCreating(false);
                    setNewSlot({ date: "", time: "", capacity: 50 });
                  }}
                  data-testid="button-cancel-create"
                >
                  Cancel
                </Button>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      <Card data-testid="card-slots-table">
        <CardHeader>
          <CardTitle>Current Time Slots</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="flex items-center gap-1">
                    <Calendar className="h-4 w-4" />
                    Date
                  </TableHead>
                  <TableHead className="flex items-center gap-1">
                    <Clock className="h-4 w-4" />
                    Time
                  </TableHead>
                  <TableHead className="flex items-center gap-1">
                    <Users className="h-4 w-4" />
                    Capacity
                  </TableHead>
                  <TableHead>Bookings</TableHead>
                  <TableHead>Utilization</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {slots.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={7} className="text-center text-muted-foreground py-8">
                      No time slots created yet. Create your first slot above.
                    </TableCell>
                  </TableRow>
                ) : (
                  slots.map((slot) => (
                    <TableRow key={slot.id} data-testid={`row-slot-${slot.id}`}>
                      <TableCell data-testid={`text-date-${slot.id}`}>{slot.date}</TableCell>
                      <TableCell data-testid={`text-time-${slot.id}`}>{slot.time}</TableCell>
                      <TableCell data-testid={`text-capacity-${slot.id}`}>{slot.capacity}</TableCell>
                      <TableCell data-testid={`text-bookings-${slot.id}`}>
                        {slot.currentBookings}/{slot.capacity}
                      </TableCell>
                      <TableCell data-testid={`text-utilization-${slot.id}`}>
                        <div className="flex items-center gap-2">
                          <div className="w-16 bg-gray-200 rounded-full h-2">
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
                          <span className="text-sm">{getUtilization(slot)}%</span>
                        </div>
                      </TableCell>
                      <TableCell>{getStatusBadge(slot)}</TableCell>
                      <TableCell>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => {
                            console.log(`Deleting slot ${slot.id}`);
                            onDeleteSlot?.(slot.id);
                          }}
                          data-testid={`button-delete-${slot.id}`}
                          className="text-destructive hover:text-destructive"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}