import QRScanner from '../QRScanner'

export default function QRScannerExample() {
  return (
    <div className="p-6 space-y-6">
      <h2 className="text-2xl font-bold">QR Code Scanner</h2>
      <QRScanner
        onTicketScanned={(ticket) => console.log('Ticket scanned:', ticket)}
      />
    </div>
  )
}