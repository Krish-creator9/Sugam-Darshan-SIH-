
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";

const mockBookings = [
  {
    id: "1",
    name: "Rajesh Kumar",
    date: "2025-01-20",
    time: "08:00",
    status: "active",
  },
  {
    id: "2",
    name: "Priya Sharma",
    date: "2025-01-20",
    time: "08:00",
    status: "active",
  },
  {
    id: "3",
    name: "Amit Singh",
    date: "2025-01-20",
    time: "10:00",
    status: "cancelled",
  },
  {
    id: "4",
    name: "Sunita Devi",
    date: "2025-01-21",
    time: "09:00",
    status: "active",
  },
];

export function BookingsList() {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Name</TableHead>
          <TableHead>Date</TableHead>
          <TableHead>Time</TableHead>
          <TableHead>Status</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {mockBookings.map((booking) => (
          <TableRow key={booking.id}>
            <TableCell>{booking.name}</TableCell>
            <TableCell>{booking.date}</TableCell>
            <TableCell>{booking.time}</TableCell>
            <TableCell>
              <Badge
                variant={booking.status === "active" ? "default" : "destructive"}
              >
                {booking.status}
              </Badge>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
