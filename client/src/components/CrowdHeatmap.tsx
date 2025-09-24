import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useState } from "react";
import templeMapImage from "@assets/generated_images/Temple_heatmap_visualization_672778d9.png";

interface ZoneDensity {
  zone: string;
  density: number;
  label: string;
  position: { x: number; y: number };
}

interface CrowdHeatmapProps {
  zoneDensities: Record<string, number>;
  onZoneClick?: (zone: string) => void;
}

export default function CrowdHeatmap({ zoneDensities, onZoneClick }: CrowdHeatmapProps) {
  const [hoveredZone, setHoveredZone] = useState<string | null>(null);

  const zones: ZoneDensity[] = [
    { zone: "zoneA", density: zoneDensities.zoneA || 0, label: "Main Hall", position: { x: 30, y: 40 } },
    { zone: "zoneB", density: zoneDensities.zoneB || 0, label: "Prayer Area", position: { x: 60, y: 30 } },
    { zone: "zoneC", density: zoneDensities.zoneC || 0, label: "Entrance", position: { x: 20, y: 70 } },
    { zone: "zoneD", density: zoneDensities.zoneD || 0, label: "Courtyard", position: { x: 70, y: 60 } },
  ];

  const getDensityColor = (density: number) => {
    if (density >= 0.8) return "bg-red-500/70";
    if (density >= 0.5) return "bg-yellow-500/70";
    if (density >= 0.2) return "bg-green-500/70";
    return "bg-blue-500/70";
  };

  const getDensityBadge = (density: number) => {
    if (density >= 0.8) return { variant: "destructive" as const, label: "High" };
    if (density >= 0.5) return { variant: "secondary" as const, label: "Medium" };
    if (density >= 0.2) return { variant: "default" as const, label: "Low" };
    return { variant: "default" as const, label: "Empty" };
  };

  return (
    <Card data-testid="card-heatmap" className="w-full">
      <CardHeader>
        <CardTitle className="text-lg font-semibold">Temple Crowd Density</CardTitle>
        <div className="flex gap-2 text-xs">
          <div className="flex items-center gap-1">
            <div className="w-3 h-3 bg-blue-500 rounded" />
            <span>Empty</span>
          </div>
          <div className="flex items-center gap-1">
            <div className="w-3 h-3 bg-green-500 rounded" />
            <span>Low</span>
          </div>
          <div className="flex items-center gap-1">
            <div className="w-3 h-3 bg-yellow-500 rounded" />
            <span>Medium</span>
          </div>
          <div className="flex items-center gap-1">
            <div className="w-3 h-3 bg-red-500 rounded" />
            <span>High</span>
          </div>
        </div>
      </CardHeader>
      <CardContent className="p-4">
        <div className="relative w-full aspect-[4/3] bg-gray-100 rounded-lg overflow-hidden">
          <img
            src={templeMapImage}
            alt="Temple Layout"
            className="w-full h-full object-cover"
          />
          
          {/* Zone overlays */}
          {zones.map((zone) => (
            <div
              key={zone.zone}
              className={`absolute w-16 h-16 rounded-full border-2 border-white ${getDensityColor(zone.density)} hover-elevate cursor-pointer transition-all duration-200`}
              style={{
                left: `${zone.position.x}%`,
                top: `${zone.position.y}%`,
                transform: 'translate(-50%, -50%)',
                zIndex: hoveredZone === zone.zone ? 10 : 1,
                scale: hoveredZone === zone.zone ? '1.1' : '1',
              }}
              data-testid={`zone-${zone.zone}`}
              onMouseEnter={() => setHoveredZone(zone.zone)}
              onMouseLeave={() => setHoveredZone(null)}
              onClick={() => {
                console.log(`Zone ${zone.zone} clicked`);
                onZoneClick?.(zone.zone);
              }}
            >
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-white text-xs font-bold">
                  {Math.round(zone.density * 100)}%
                </div>
              </div>
              
              {hoveredZone === zone.zone && (
                <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-black text-white px-2 py-1 rounded text-xs whitespace-nowrap">
                  {zone.label}: {Math.round(zone.density * 100)}%
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Zone details */}
        <div className="grid grid-cols-2 gap-4 mt-4">
          {zones.map((zone) => {
            const badgeInfo = getDensityBadge(zone.density);
            return (
              <div key={zone.zone} className="flex items-center justify-between p-2 bg-muted rounded">
                <span className="text-sm font-medium" data-testid={`text-zone-${zone.zone}-label`}>{zone.label}</span>
                <Badge variant={badgeInfo.variant} data-testid={`badge-zone-${zone.zone}`}>
                  {badgeInfo.label} ({Math.round(zone.density * 100)}%)
                </Badge>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}