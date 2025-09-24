import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DollarSign, TrendingUp, TrendingDown, User } from "lucide-react";

const donationData = {
  total: 125430,
  change: 2010,
  donors: 432,
  average: 290.35,
};

export default function DonationAnalytics() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Donation Analytics</h1>
        <p className="text-muted-foreground">
          Track and analyze donations received.
        </p>
      </div>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">
              Total Donations
            </CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              ₹{donationData.total.toLocaleString("en-IN")}
            </div>
            <p className="text-xs text-muted-foreground flex items-center">
              {donationData.change > 0 ? (
                <TrendingUp className="h-4 w-4 mr-1 text-green-500" />
              ) : (
                <TrendingDown className="h-4 w-4 mr-1 text-red-500" />
              )}
              ₹{donationData.change.toLocaleString("en-IN")} from yesterday
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Total Donors</CardTitle>
            <User className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{donationData.donors}</div>
            <p className="text-xs text-muted-foreground">
              Unique contributors today
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">
              Average Donation
            </CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              ₹{donationData.average.toFixed(2)}
            </div>
            <p className="text-xs text-muted-foreground">
              Per donor transaction
            </p>
          </CardContent>
        </Card>
      </div>
      {/* Add more detailed charts and tables here in the future */}
    </div>
  );
}
