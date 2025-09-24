import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Sparkles } from "lucide-react";
import { useEffect, useState } from "react";

export default function VirtualPujaPage() {
  const [pujaType, setPujaType] = useState("rudrabhishek");
  const [name, setName] = useState("");
  const [pandits, setPandits] = useState<string[]>([]);
  const [preferred, setPreferred] = useState<string | null>(null);
  const [status, setStatus] = useState<string | null>(null);

  useEffect(() => {
    (async () => {
      try {
        const res = await fetch('/api/virtual-puja/pandits');
        const text = await res.text();
        const contentType = res.headers.get('content-type') || '';
        if (!res.ok) throw new Error(text || 'Failed to load pandits');
        if (!contentType.includes('application/json')) throw new Error('Server returned non-JSON');
        const list = JSON.parse(text);
        setPandits(list);
      } catch (err: any) {
        console.error(err?.message || err);
      }
    })();
  }, []);

  const handleBook = async () => {
    setStatus(null);
    try {
      const res = await fetch('/api/virtual-puja', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ pujaType, devoteeName: name, preferredPandit: preferred }),
      });
      const text = await res.text();
      const contentType = res.headers.get('content-type') || '';
      if (!res.ok) throw new Error(text || 'Failed to book puja');
      if (!contentType.includes('application/json')) throw new Error('Server returned non-JSON');
      const created = JSON.parse(text);
      setStatus('Booking created. Booking ID: ' + created.id);
    } catch (err: any) {
      setStatus('Error: ' + (err?.message || 'Failed to book'));
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Virtual Puja & Donation</h1>
        <p className="text-muted-foreground">Participate in pujas from anywhere in the world.</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Sparkles className="h-5 w-5" />
            Book a Virtual Puja
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p>A priest will perform the puja on your behalf, and you can watch it live.</p>
          <RadioGroup value={pujaType} onChange={(e) => setPujaType((e.target as HTMLInputElement).value)} className="space-y-2">
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="rudrabhishek" id="p-rudrabhishek" />
              <Label htmlFor="p-rudrabhishek">Rudrabhishek Puja - ₹1100</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="satyanarayan" id="p-satyanarayan" />
              <Label htmlFor="p-satyanarayan">Satyanarayan Puja - ₹2100</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="griha-shanti" id="p-griha-shanti" />
              <Label htmlFor="p-griha-shanti">Griha Shanti Puja - ₹5100</Label>
            </div>
          </RadioGroup>
          <div className="space-y-2">
            <Label htmlFor="puja-name">Your Name</Label>
            <Input id="puja-name" value={name} onChange={(e) => setName(e.target.value)} placeholder="Enter your name for the puja" />
          </div>

          <div className="space-y-2">
            <Label htmlFor="preferred">Preferred Pandit (optional)</Label>
            <select id="preferred" className="w-full border rounded p-2" value={preferred || ''} onChange={(e) => setPreferred(e.target.value || null)}>
              <option value="">No preference</option>
              {pandits.map((p) => (
                <option key={p} value={p}>{p}</option>
              ))}
            </select>
          </div>

          <Button className="w-full" onClick={handleBook}>Book Puja and Proceed to Pay</Button>
          {status && <p className="text-sm">{status}</p>}
        </CardContent>
      </Card>
    </div>
  );
}
