import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Clock } from "lucide-react";

const schedule = [
  { time: "04:30 AM", event: "Mangala Aarti" },
  { time: "07:00 AM", event: "Shringar Aarti" },
  { time: "08:00 AM - 11:00 AM", event: "Darshan" },
  { time: "12:00 PM", event: "Rajbhog Aarti" },
  { time: "01:00 PM - 04:00 PM", event: "Temple Closed" },
  { time: "04:00 PM - 06:00 PM", event: "Darshan" },
  { time: "07:00 PM", event: "Sandhya Aarti" },
  { time: "08:30 PM", event: "Shayan Aarti" },
  { time: "09:00 PM", event: "Temple Closed" },
];

export default function TempleSchedule() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Temple Schedule</h1>
        <p className="text-muted-foreground">
          Daily schedule of aartis and darshan timings.
        </p>
      </div>
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Clock className="h-5 w-5" />
            Today's Schedule
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Time</TableHead>
                <TableHead>Event</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {schedule.map((item) => (
                <TableRow key={item.time}>
                  <TableCell className="font-medium">{item.time}</TableCell>
                  <TableCell>{item.event}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
