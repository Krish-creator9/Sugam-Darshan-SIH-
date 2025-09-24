import SOSButton from '../SOSButton'

export default function SOSButtonExample() {
  return (
    <div className="p-6 space-y-6 max-w-md mx-auto">
      <h2 className="text-2xl font-bold">Emergency SOS Button</h2>
      <SOSButton
        onSOSTriggered={(alert) => console.log('SOS Alert triggered:', alert)}
      />
    </div>
  )
}