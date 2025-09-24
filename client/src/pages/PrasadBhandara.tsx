import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { UtensilsCrossed } from "lucide-react";

export default function PrasadBhandaraPage() {
  const [timings, setTimings] = useState<{
    morning: string;
    evening: string;
    bhandaraDay: string;
    bhandaraTime: string;
  } | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
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
        if (mounted) setTimings(data);
      } catch (err: any) {
        setError(err?.message || "Failed to load timings");
      } finally {
        if (mounted) setIsLoading(false);
      }
    })();
    return () => {
      mounted = false;
    };
  }, []);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Prasad & Bhandara</h1>
        <p className="text-muted-foreground">Information about daily food offerings at the temple.</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <UtensilsCrossed className="h-5 w-5" />
            Prasad Timings
          </CardTitle>
        </CardHeader>
        <CardContent>
          {isLoading && <p className="text-sm text-muted-foreground">Loading...</p>}
          {error && <p className="text-sm text-destructive">{error}</p>}
          {!isLoading && timings && (
            <>
              <ul className="list-disc list-inside space-y-2">
                <li>
                  <strong>Morning Prasad:</strong> {timings.morning}
                </li>
                <li>
                  <strong>Evening Prasad:</strong> {timings.evening}
                </li>
              </ul>
              <p className="mt-4 text-sm text-muted-foreground">
                Prasad is available for all devotees visiting during the specified hours.
              </p>
            </>
          )}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <UtensilsCrossed className="h-5 w-5" />
            Bhandara (Community Feast)
          </CardTitle>
        </CardHeader>
        <CardContent>
          {isLoading && <p className="text-sm text-muted-foreground">Loading...</p>}
          {error && <p className="text-sm text-destructive">{error}</p>}
          {!isLoading && timings && (
            <>
              <p>A free community feast (Bhandara) is organized every Sunday. All are welcome.</p>
              <ul className="list-disc list-inside space-y-2 mt-4">
                <li>
                  <strong>Day:</strong> {timings.bhandaraDay}
                </li>
                <li>
                  <strong>Time:</strong> {timings.bhandaraTime}
                </li>
                <li>
                  <strong>Location:</strong> Temple Dining Hall
                </li>
              </ul>
            </>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
