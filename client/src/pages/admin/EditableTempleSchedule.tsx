import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Clock, Edit, Trash, PlusCircle, Save, X } from "lucide-react";

const initialSchedule = [
  { id: "1", time: "04:30 AM", event: "Mangala Aarti" },
  { id: "2", time: "07:00 AM", event: "Shringar Aarti" },
  { id: "3", time: "08:00 AM - 11:00 AM", event: "Darshan" },
  { id: "4", time: "12:00 PM", event: "Rajbhog Aarti" },
  { id: "5", time: "01:00 PM - 04:00 PM", event: "Temple Closed" },
  { id: "6", time: "04:00 PM - 06:00 PM", event: "Darshan" },
  { id: "7", time: "07:00 PM", event: "Sandhya Aarti" },
  { id: "8", time: "08:30 PM", event: "Shayan Aarti" },
  { id: "9", time: "09:00 PM", event: "Temple Closed" },
];

export default function EditableTempleSchedule() {
  const [schedule, setSchedule] = useState(initialSchedule);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editedItem, setEditedItem] = useState<{ time: string; event: string } | null>(null);

  const handleEdit = (item: { id: string; time: string; event: string }) => {
    setEditingId(item.id);
    setEditedItem({ time: item.time, event: item.event });
  };

  const handleCancel = () => {
    setEditingId(null);
    setEditedItem(null);
  };

  const handleSave = (id: string) => {
    if (!editedItem) return;
    setSchedule(schedule.map((item) => (item.id === id ? { ...item, ...editedItem } : item)));
    handleCancel();
  };

  const handleDelete = (id: string) => {
    setSchedule(schedule.filter((item) => item.id !== id));
  };

  const handleAddItem = () => {
    const newItem = {
      id: (schedule.length + 1).toString(),
      time: "New Time",
      event: "New Event",
    };
    setSchedule([...schedule, newItem]);
    handleEdit(newItem);
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Manage Temple Schedule</h1>
        <p className="text-muted-foreground">
          Add, edit, or remove schedule items for the devotee app.
        </p>
      </div>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <Clock className="h-5 w-5" />
            Schedule Editor
          </CardTitle>
          <Button size="sm" onClick={handleAddItem} className="flex items-center gap-2">
            <PlusCircle className="h-4 w-4" />
            Add Item
          </Button>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-1/3">Time</TableHead>
                <TableHead>Event</TableHead>
                <TableHead className="text-right w-40">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {schedule.map((item) => (
                <TableRow key={item.id}>
                  {editingId === item.id && editedItem ? (
                    <>
                      <TableCell>
                        <Input
                          value={editedItem.time}
                          onChange={(e) => setEditedItem({ ...editedItem, time: e.target.value })}
                        />
                      </TableCell>
                      <TableCell>
                        <Input
                          value={editedItem.event}
                          onChange={(e) => setEditedItem({ ...editedItem, event: e.target.value })}
                        />
                      </TableCell>
                      <TableCell className="text-right space-x-2">
                        <Button size="icon" variant="outline" onClick={() => handleSave(item.id)}>
                          <Save className="h-4 w-4" />
                        </Button>
                        <Button size="icon" variant="outline" onClick={handleCancel}>
                          <X className="h-4 w-4" />
                        </Button>
                      </TableCell>
                    </>
                  ) : (
                    <>
                      <TableCell className="font-medium">{item.time}</TableCell>
                      <TableCell>{item.event}</TableCell>
                      <TableCell className="text-right space-x-2">
                        <Button size="icon" variant="outline" onClick={() => handleEdit(item)}>
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button size="icon" variant="destructive" onClick={() => handleDelete(item.id)}>
                          <Trash className="h-4 w-4" />
                        </Button>
                      </TableCell>
                    </>
                  )}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
