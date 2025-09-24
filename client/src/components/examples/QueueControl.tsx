import QueueControl from '../QueueControl'

export default function QueueControlExample() {
  return (
    <div className="p-6 space-y-6">
      <h2 className="text-2xl font-bold">Queue Control System</h2>
      <QueueControl
        queueStatus={{
          currentToken: 247,
          displayMessage: "Welcome to Smart Temple. Please maintain social distancing.",
          isActive: true,
          lastUpdated: "2 mins ago"
        }}
        queueLength={34}
        averageProcessingTime={3}
        onCallNext={() => console.log('Call next token')}
        onPauseResume={(isActive) => console.log('Queue status changed:', isActive)}
        onUpdateMessage={(message) => console.log('Update message:', message)}
        onReset={() => console.log('Reset queue')}
      />
    </div>
  )
}