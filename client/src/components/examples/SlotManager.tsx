import SlotManager from '../SlotManager'

export default function SlotManagerExample() {
  const mockSlots = [
    {
      id: "1",
      date: "2025-01-20",
      time: "06:00",
      capacity: 100,
      currentBookings: 95,
      status: "active" as const
    },
    {
      id: "2", 
      date: "2025-01-20",
      time: "08:00",
      capacity: 120,
      currentBookings: 87,
      status: "active" as const
    },
    {
      id: "3",
      date: "2025-01-20", 
      time: "10:00",
      capacity: 80,
      currentBookings: 45,
      status: "active" as const
    }
  ];

  return (
    <div className="p-6 space-y-6">
      <h2 className="text-2xl font-bold">Slot Manager</h2>
      <SlotManager
        slots={mockSlots}
        onCreateSlot={(slotData) => console.log('Create slot:', slotData)}
        onDeleteSlot={(slotId) => console.log('Delete slot:', slotId)}
      />
    </div>
  )
}