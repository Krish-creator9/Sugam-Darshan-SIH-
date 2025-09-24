import CrowdHeatmap from '../CrowdHeatmap'

export default function CrowdHeatmapExample() {
  return (
    <div className="p-6 space-y-6">
      <h2 className="text-2xl font-bold">Crowd Density Heatmap</h2>
      <CrowdHeatmap
        zoneDensities={{
          zoneA: 0.92,
          zoneB: 0.67,
          zoneC: 0.31,
          zoneD: 0.15
        }}
        onZoneClick={(zone) => console.log(`Clicked on ${zone}`)}
      />
    </div>
  )
}