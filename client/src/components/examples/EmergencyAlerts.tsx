import EmergencyAlerts from '../EmergencyAlerts'

export default function EmergencyAlertsExample() {
  return (
    <div className="p-6 space-y-6">
      <h2 className="text-2xl font-bold">Emergency Alert System</h2>
      <EmergencyAlerts
        onRespondToAlert={(alertId) => console.log('Responding to alert:', alertId)}
        onResolveAlert={(alertId) => console.log('Resolving alert:', alertId)}
        onViewLocation={(location) => console.log('Viewing location:', location)}
      />
    </div>
  )
}