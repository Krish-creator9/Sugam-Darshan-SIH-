import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Car, Users } from "lucide-react";
import { useEffect, useState } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function ParkingManagement() {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [status, setStatus] = useState<{
    totalSpaces: number;
    occupiedSpaces: number;
    availableSpaces: number;
    pricing: { twoWheeler: number; fourWheeler: number };
  } | null>(null);

  const [editing, setEditing] = useState(false);
  const [twoWheeler, setTwoWheeler] = useState<string>("");
  const [fourWheeler, setFourWheeler] = useState<string>("");

  const load = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const res = await fetch('/api/parking');
      const text = await res.text();
      const contentType = res.headers.get('content-type') || '';
      if (!res.ok) throw new Error(text || 'Failed to load parking status');
      if (!contentType.includes('application/json')) throw new Error('Server returned non-JSON');
      const data = JSON.parse(text);
      setStatus(data);
      setTwoWheeler(String(data.pricing.twoWheeler));
      setFourWheeler(String(data.pricing.fourWheeler));
    } catch (err: any) {
      setError(err?.message || 'Failed to load parking status');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => { load(); }, []);

  const savePricing = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const payload = {
        twoWheeler: Number(twoWheeler),
        fourWheeler: Number(fourWheeler),
      };
      const res = await fetch('/api/parking/pricing', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      const text = await res.text();
      const contentType = res.headers.get('content-type') || '';
      if (!res.ok) throw new Error(text || 'Failed to save pricing');
      if (!contentType.includes('application/json')) throw new Error('Server returned non-JSON');
      const updated = JSON.parse(text);
      // update local state
      setStatus((s) => s ? { ...s, pricing: updated.pricing } : s);
      setEditing(false);
    } catch (err: any) {
      setError(err?.message || 'Failed to save pricing');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Parking Management</h1>
        <p className="text-muted-foreground">Monitor the status of the temple parking lot.</p>
      </div>

      {isLoading && <p className="text-sm text-muted-foreground">Loading...</p>}
      {error && <p className="text-sm text-destructive">{error}</p>}

      {status && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Total Spaces</CardTitle>
              <Car className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{status.totalSpaces}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Occupied Spaces</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-destructive">{status.occupiedSpaces}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Available Spaces</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-primary">{status.availableSpaces}</div>
            </CardContent>
          </Card>
        </div>
      )}

      <Card>
        <CardHeader className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2">Parking Pricing</CardTitle>
          {!editing ? (
            <Button size="sm" onClick={() => setEditing(true)}>Edit Pricing</Button>
          ) : (
            <div className="space-x-2">
              <Button size="sm" onClick={savePricing}>Save</Button>
              <Button size="sm" variant="outline" onClick={() => setEditing(false)}>Cancel</Button>
            </div>
          )}
        </CardHeader>
        <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="twoWheeler">Two-wheeler (₹)</Label>
            <Input id="twoWheeler" value={twoWheeler} onChange={(e) => setTwoWheeler(e.target.value)} disabled={!editing} />
          </div>
          <div className="space-y-2">
            <Label htmlFor="fourWheeler">Four-wheeler (₹)</Label>
            <Input id="fourWheeler" value={fourWheeler} onChange={(e) => setFourWheeler(e.target.value)} disabled={!editing} />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
