import QRTicket from '../QRTicket'

export default function QRTicketExample() {
  const mockTicket = {
    bookingId: "TMP-2025-001432",
    devoteeName: "Rajesh Kumar",
    phoneNumber: "+91 98765 43210",
    templeName: "Shri Ram Mandir",
    date: "January 20, 2025",
    time: "08:00 AM",
    qrCodeData: "TMP-2025-001432-VERIFIED",
    status: "active" as const,
    tokenNumber: 247
  };

  return (
    <div className="p-6 space-y-6">
      <h2 className="text-2xl font-bold text-center">E-Token QR Code</h2>
      <QRTicket
        ticket={mockTicket}
        onDownload={() => console.log('Download ticket')}
        onShare={() => console.log('Share ticket')}
      />
    </div>
  )
}