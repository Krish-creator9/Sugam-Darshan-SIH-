import DashboardStats from '../DashboardStats'

export default function DashboardStatsExample() {
  return (
    <div className="p-6 space-y-6">
      <h2 className="text-2xl font-bold">Dashboard Statistics</h2>
      <DashboardStats
        liveDevoteeCount={247}
        totalBookingsToday={1432}
        averageWaitTime={12}
        capacityUtilization={78}
        alerts={[
          { id: "1", message: "Zone A capacity at 92%", severity: "high" },
          { id: "2", message: "Queue processing slower than usual", severity: "medium" }
        ]}
      />
    </div>
  )
}