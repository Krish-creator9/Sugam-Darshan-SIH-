import BookingSlots from '../BookingSlots'
import { useState } from 'react'

export default function BookingSlotsExample() {
  const [selectedDate, setSelectedDate] = useState("2025-01-20");
  
  const mockSlots = [
    {
      id: "1",
      date: "2025-01-20",
      time: "06:00",
      capacity: 100,
      currentBookings: 95,
      isAvailable: true
    },
    {
      id: "2", 
      date: "2025-01-20",
      time: "08:00",
      capacity: 120,
      currentBookings: 120,
      isAvailable: false
    },
    {
      id: "3",
      date: "2025-01-20", 
      time: "10:00",
      capacity: 80,
      currentBookings: 45,
      isAvailable: true
    }
  ];

  return (
    <div className="p-6 space-y-6">
      <h2 className="text-2xl font-bold">E-Token Booking</h2>
      <BookingSlots
        slots={mockSlots}
        selectedDate={selectedDate}
        onDateChange={setSelectedDate}
        onBookSlot={(slotId, bookingData) => console.log('Book slot:', slotId, bookingData)}
      />
    </div>
  )
}