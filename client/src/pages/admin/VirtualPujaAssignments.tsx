import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Sparkles } from "lucide-react";
import { useEffect, useState } from "react";

export default function VirtualPujaAssignments() {
  const [bookings, setBookings] = useState<Array<{ id: string; pujaType: string; devoteeName: string; pandit?: string; status: string }>>([]);
  const [pandits, setPandits] = useState<string[]>([]);

  const load = async () => {
    try {
      const r1 = await fetch('/api/virtual-puja');
      const t1 = await r1.text();
      const ct1 = r1.headers.get('content-type') || '';
      if (!r1.ok) throw new Error(t1 || 'Failed to load bookings');
      if (!ct1.includes('application/json')) throw new Error('Server returned non-JSON for bookings');
      const list = JSON.parse(t1);

      const r2 = await fetch('/api/virtual-puja/pandits');
      const t2 = await r2.text();
      const ct2 = r2.headers.get('content-type') || '';
      if (!r2.ok) throw new Error(t2 || 'Failed to load pandits');
      if (!ct2.includes('application/json')) throw new Error('Server returned non-JSON for pandits');
      const pList = JSON.parse(t2);

      setBookings(list);
      setPandits(pList);
    } catch (err:any) {
      console.error(err?.message || err);
    }
  };

  useEffect(() => { load(); }, []);

  const assign = async (id: string, pandit: string) => {
    try {
      const res = await fetch(`/api/virtual-puja/${id}/assign`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ pandit }),
      });
      const text = await res.text();
      const ct = res.headers.get('content-type') || '';
      if (!res.ok) throw new Error(text || 'Failed to assign pandit');
      if (!ct.includes('application/json')) throw new Error('Server returned non-JSON');
      await load();
    } catch (err:any) {
      console.error(err?.message || err);
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Virtual Puja Assignments</h1>
        <p className="text-muted-foreground">Assign pandits to virtual puja bookings.</p>
      </div>
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Sparkles className="h-5 w-5" />
            Puja Bookings
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Puja Type</TableHead>
                <TableHead>Devotee Name</TableHead>
                <TableHead>Assigned Pandit</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {bookings.map((puja: { id: string; pujaType: string; devoteeName: string; pandit?: string; status: string }) => (
                <TableRow key={puja.id}>
                  <TableCell>{puja.pujaType}</TableCell>
                  <TableCell>{puja.devoteeName}</TableCell>
                  <TableCell>
                    <Select defaultValue={puja.pandit || 'Not Assigned'} onValueChange={(v: string) => assign(puja.id, v)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Assign a pandit" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Not Assigned">Not Assigned</SelectItem>
                        {pandits.map((pandit) => (
                          <SelectItem key={pandit} value={pandit}>{pandit}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
