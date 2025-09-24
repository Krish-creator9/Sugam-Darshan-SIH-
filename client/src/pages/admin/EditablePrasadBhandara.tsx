import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { UtensilsCrossed, Edit, Save, X } from "lucide-react";

export default function EditablePrasadBhandara() {
  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [timings, setTimings] = useState({
    morning: "08:00 AM - 01:00 PM",
    evening: "05:00 PM - 09:00 PM",
    bhandaraDay: "Every Sunday",
    bhandaraTime: "12:00 PM - 03:00 PM",
  });

  // load timings from server
  useState(() => {
    let mounted = true;
    (async () => {
      try {
        const res = await fetch("/api/prasad-timings");
        const contentType = res.headers.get("content-type") || "";
        const text = await res.text();
        if (!res.ok) {
          console.error("GET /api/prasad-timings returned non-OK:", res.status, text);
          throw new Error("Failed to fetch timings");
        }
        if (!contentType.includes("application/json")) {
          console.error("GET /api/prasad-timings expected JSON but got:", text);
          throw new Error("Server returned non-JSON response");
        }
        const data = JSON.parse(text);
        if (mounted && data) setTimings(data);
      } catch (err: any) {
        setError(err?.message || "Failed to load timings");
      } finally {
        if (mounted) setIsLoading(false);
      }
    })();
    return () => {
      mounted = false;
    };
  });

  const handleSave = async () => {
    setIsEditing(false);
    setIsLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/prasad-timings", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(timings),
      });
      const contentType = res.headers.get("content-type") || "";
      const text = await res.text();
      if (!res.ok) {
        console.error("PUT /api/prasad-timings returned non-OK:", res.status, text);
        throw new Error("Failed to save timings");
      }
      if (!contentType.includes("application/json")) {
        console.error("PUT /api/prasad-timings expected JSON but got:", text);
        throw new Error("Server returned non-JSON response on save");
      }
      const updated = JSON.parse(text);
      setTimings(updated);
    } catch (err: any) {
      setError(err?.message || "Failed to save timings");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Manage Prasad & Bhandara</h1>
        <p className="text-muted-foreground">
          Set the timings for Prasad and Bhandara.
        </p>
      </div>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <UtensilsCrossed className="h-5 w-5" />
            Timings Editor
          </CardTitle>
          {isEditing ? (
            <div className="space-x-2">
              <Button size="sm" onClick={handleSave} className="flex items-center gap-2">
                <Save className="h-4 w-4" />
                Save
              </Button>
              <Button size="sm" variant="outline" onClick={() => setIsEditing(false)}>
                <X className="h-4 w-4" />
                Cancel
              </Button>
            </div>
          ) : (
            <Button size="sm" onClick={() => setIsEditing(true)} className="flex items-center gap-2">
              <Edit className="h-4 w-4" />
              Edit Timings
            </Button>
          )}
        </CardHeader>
        <CardContent className="space-y-4">
        {isLoading && <p className="text-sm text-muted-foreground">Loading...</p>}
        {error && <p className="text-sm text-destructive">{error}</p>}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="morning">Morning Prasad</Label>
              {isEditing ? (
                <Input
                  id="morning"
                  value={timings.morning}
                  onChange={(e) => setTimings({ ...timings, morning: e.target.value })}
                />
              ) : (
                <p className="text-lg font-semibold">{timings.morning}</p>
              )}
            </div>
            <div className="space-y-2">
              <Label htmlFor="evening">Evening Prasad</Label>
              {isEditing ? (
                <Input
                  id="evening"
                  value={timings.evening}
                  onChange={(e) => setTimings({ ...timings, evening: e.target.value })}
                />
              ) : (
                <p className="text-lg font-semibold">{timings.evening}</p>
              )}
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="bhandaraDay">Bhandara Day</Label>
              {isEditing ? (
                <Input
                  id="bhandaraDay"
                  value={timings.bhandaraDay}
                  onChange={(e) => setTimings({ ...timings, bhandaraDay: e.target.value })}
                />
              ) : (
                <p className="text-lg font-semibold">{timings.bhandaraDay}</p>
              )}
            </div>
            <div className="space-y-2">
              <Label htmlFor="bhandaraTime">Bhandara Time</Label>
              {isEditing ? (
                <Input
                  id="bhandaraTime"
                  value={timings.bhandaraTime}
                  onChange={(e) => setTimings({ ...timings, bhandaraTime: e.target.value })}
                />
              ) : (
                <p className="text-lg font-semibold">{timings.bhandaraTime}</p>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
