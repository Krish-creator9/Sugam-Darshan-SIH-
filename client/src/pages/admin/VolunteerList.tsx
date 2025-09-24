import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Users } from "lucide-react";

const mockVolunteers = [
  {
    id: "1",
    name: "Aarav Sharma",
    email: "aarav.sharma@example.com",
    phone: "+91 98765 43210",
    interests: "Crowd management, Prasad distribution",
    availability: "Weekends",
  },
  {
    id: "2",
    name: "Diya Patel",
    email: "diya.patel@example.com",
    phone: "+91 91234 56789",
    interests: "Event support, Cleaning services",
    availability: "Evenings",
  },
  {
    id: "3",
    name: "Rohan Gupta",
    email: "rohan.gupta@example.com",
    phone: "+91 99887 76655",
    interests: "Prasad distribution",
    availability: "Any day",
  },
];

export default function VolunteerList() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Volunteer Applications</h1>
        <p className="text-muted-foreground">
          List of devotees interested in volunteering.
        </p>
      </div>
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Users className="h-5 w-5" />
            Registered Volunteers
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Contact</TableHead>
                <TableHead>Interests</TableHead>
                <TableHead>Availability</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {mockVolunteers.map((volunteer) => (
                <TableRow key={volunteer.id}>
                  <TableCell className="font-medium">{volunteer.name}</TableCell>
                  <TableCell>
                    <div>{volunteer.email}</div>
                    <div>{volunteer.phone}</div>
                  </TableCell>
                  <TableCell>{volunteer.interests}</TableCell>
                  <TableCell>{volunteer.availability}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
