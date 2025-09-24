import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Car, Map, DollarSign } from "lucide-react";

export default function ParkingPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Mandir Parking</h1>
        <p className="text-muted-foreground">
          Parking slots, pricing, and location details.
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Car className="h-5 w-5" />
            Parking Timings & Slots
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p>
            Parking is available 24/7. We have dedicated slots for two-wheelers and four-wheelers.
          </p>
          <ul className="list-disc list-inside space-y-2 mt-4">
            <li>
              <strong>Two-Wheeler Slots:</strong> 200
            </li>
            <li>
              <strong>Four-Wheeler Slots:</strong> 100
            </li>
          </ul>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <DollarSign className="h-5 w-5" />
            Parking Pricing
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="list-disc list-inside space-y-2">
            <li>
              <strong>Two-Wheelers:</strong> ₹20 for first 3 hours, ₹10 for each additional hour.
            </li>
            <li>
              <strong>Four-Wheelers:</strong> ₹50 for first 3 hours, ₹20 for each additional hour.
            </li>
          </ul>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Map className="h-5 w-5" />
            Parking Location
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p>
            The parking area is located at the rear entrance of the temple complex. Follow the signs for "Mandir Parking".
          </p>
          <div className="mt-4">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3691.824833169714!2d70.79968781542057!3d22.28462698533195!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3959c98c4b315555%3A0x42f2a64cf34a2e19!2sSwaminarayan%20Mandir%2C%20Rajkot!5e0!3m2!1sen!2sin!4v1678886455835!5m2!1sen!2sin"
              width="100%"
              height="450"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
