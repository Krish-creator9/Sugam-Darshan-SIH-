import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Handshake, Landmark } from "lucide-react";

export default function DonationPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Make a Donation</h1>
        <p className="text-muted-foreground">
          Your contribution helps in the upkeep and development of the temple.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Landmark className="h-5 w-5" />
              General Donation
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p>
              Support the temple's daily operations, maintenance, and community
              services.
            </p>
            <div className="space-y-2">
              <Label htmlFor="general-amount">Amount (INR)</Label>
              <Input id="general-amount" type="number" placeholder="Enter amount" />
            </div>
            <Button className="w-full">Donate Now</Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Handshake className="h-5 w-5" />
              Pandit House Donation
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p>
              Contribute towards the welfare and housing of the temple priests.
            </p>
            <div className="space-y-2">
              <Label htmlFor="pandit-amount">Amount (INR)</Label>
              <Input id="pandit-amount" type="number" placeholder="Enter amount" />
            </div>
            <Button className="w-full">Donate to Pandit House</Button>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Choose a Donation Cause</CardTitle>
        </CardHeader>
        <CardContent>
          <RadioGroup defaultValue="general" className="space-y-2">
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="general" id="r-general" />
              <Label htmlFor="r-general">General Temple Fund</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="food" id="r-food" />
              <Label htmlFor="r-food">Anna Daan (Food Donation)</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="education" id="r-education" />
              <Label htmlFor="r-education">Vidyā Daan (Education Support)</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="medical" id="r-medical" />
              <Label htmlFor="r-medical">Arogya Daan (Medical Aid)</Label>
            </div>
          </RadioGroup>
          <div className="mt-4">
            <Label htmlFor="cause-amount">Amount (INR)</Label>
            <div className="flex gap-2 mt-1">
              <Input id="cause-amount" type="number" placeholder="Enter amount for selected cause" />
              <Button>Donate to Cause</Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
