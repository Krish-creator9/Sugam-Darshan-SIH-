import { Switch, Route } from "wouter";
import DevoteeSidebar from "@/components/DevoteeSidebar";
import { Button } from "@/components/ui/button";
import ThemeToggle from "@/components/ThemeToggle";
import { LanguageSwitcher } from "@/components/LanguageSwitcher";
import DevoteeHome from "@/pages/DevoteeHome";
import BookingSlots from "@/components/BookingSlots";
import QRTicket from "@/components/QRTicket";
import NotFound from "@/pages/not-found";
import { Home, Calendar, Ticket, User, UtensilsCrossed, ParkingCircle, Video, Sparkles, HandCoins, Users } from "lucide-react";
import { Link, useLocation } from "wouter";
import { useState } from "react";
import LoginPage from "./LoginPage";
import { TempleSelector } from "@/components/TempleSelector";
import TempleSchedule from "./TempleSchedule";
import DonationPage from "./Donation";
import VolunteeringPage from "./Volunteering";
import PrasadBhandaraPage from "./PrasadBhandara";
import ParkingPage from "./Parking";
import LiveDarshanPage from "./LiveDarshan";
import VirtualPujaPage from "./VirtualPuja";
import AiChatBot from "@/components/AiChatBot";

// Mock data - todo: remove mock functionality
const mockSlots = [
	{
		id: "1",
		date: "2025-01-20",
		time: "06:00",
		capacity: 100,
		currentBookings: 95,
		isAvailable: true,
	},
	{
		id: "2",
		date: "2025-01-20",
		time: "08:00",
		capacity: 120,
		currentBookings: 120,
		isAvailable: false,
	},
	{
		id: "3",
		date: "2025-01-20",
		time: "10:00",
		capacity: 80,
		currentBookings: 45,
		isAvailable: true,
	},
];

const mockTicket = {
	bookingId: "TMP-2025-001432",
	devoteeName: "Rajesh Kumar",
	phoneNumber: "+91 98765 43210",
	templeName: "Shree Somnath Temple",
	date: "January 20, 2025",
	time: "08:00 AM",
	qrCodeData: "TMP-2025-001432-VERIFIED",
	status: "active" as const,
	tokenNumber: 247,
};

function DevoteeRouter() {
	const [selectedDate, setSelectedDate] = useState("2025-01-20");

	return (
		<Switch>
			<Route path="/" component={DevoteeHome} />
			<Route path="/book">
				<div className="space-y-6" data-testid="page-book">
					<div>
						<h1 className="text-3xl font-bold tracking-tight">Book E-Token</h1>
						<p className="text-muted-foreground">
							Choose your preferred time slot for temple visit
						</p>
					</div>
					<BookingSlots
						slots={mockSlots}
						selectedDate={selectedDate}
						onDateChange={setSelectedDate}
						onBookSlot={(slotId, bookingData) =>
							console.log("Book slot:", slotId, bookingData)
						}
					/>
				</div>
			</Route>
			<Route path="/tickets">
				<div className="space-y-6" data-testid="page-tickets">
					<div>
						<h1 className="text-3xl font-bold tracking-tight">My E-Tokens</h1>
						<p className="text-muted-foreground">
							View your booked temple visit tickets
						</p>
					</div>
					<QRTicket
						ticket={mockTicket}
						onDownload={() => console.log("Download ticket")}
						onShare={() => console.log("Share ticket")}
					/>
				</div>
			</Route>
			<Route path="/profile">
				<div className="space-y-6" data-testid="page-profile">
					<div>
						<h1 className="text-3xl font-bold tracking-tight">Profile</h1>
						<p className="text-muted-foreground">
							Manage your account and preferences
						</p>
					</div>
					<div className="text-center py-12">
						<h3 className="text-lg font-semibold mb-2">
							Profile Management
						</h3>
						<p className="text-muted-foreground">
							Coming soon - Update your personal information and notification
							preferences.
						</p>
					</div>
				</div>
			</Route>
			<Route path="/schedule" component={TempleSchedule} />
			<Route path="/donation" component={DonationPage} />
			<Route path="/volunteering" component={VolunteeringPage} />
			<Route path="/prasad-bhandara" component={PrasadBhandaraPage} />
			<Route path="/parking" component={ParkingPage} />
			<Route path="/live-darshan" component={LiveDarshanPage} />
			<Route path="/virtual-puja" component={VirtualPujaPage} />
			<Route component={NotFound} />
		</Switch>
	);
}

export default function DevoteeApp({ onBack }: { onBack: () => void }) {
	const [isAuthenticated, setIsAuthenticated] = useState(false);
	const [error, setError] = useState<string | null>(null);
	const [selectedTemple, setSelectedTemple] = useState("Golden Temple");

	const handleLogin = (username: string, password: string) => {
		if (username === "devotee" && password === "12345") {
			setIsAuthenticated(true);
			setError(null);
		} else {
			setError("Invalid username or password");
		}
	};

	if (!isAuthenticated) {
		return <LoginPage onLogin={handleLogin} error={error} userType="Devotee" />;
	}

	return (
		<div className="grid min-h-screen w-full md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr]">
			<div className="hidden border-r bg-muted/40 md:block">
				<DevoteeSidebar />
			</div>
			<div className="flex flex-col">
				{/* Header */}
				<header className="sticky top-0 z-50 flex h-14 items-center gap-4 border-b bg-background px-4 sm:static sm:h-auto sm:border-0 sm:bg-transparent sm:px-6">
					<div className="flex h-14 items-center justify-between px-4 w-full">
						<TempleSelector
							selectedTemple={selectedTemple}
							onTempleChange={setSelectedTemple}
						/>
						<div className="flex items-center gap-2">
							<ThemeToggle />
							<LanguageSwitcher />
							<Button onClick={onBack}>Back to Home</Button>
						</div>
					</div>
				</header>

				{/* Main Content */}
				<main className="p-4 sm:px-6 sm:py-0" data-testid="devotee-app-main">
					<DevoteeRouter />
				</main>
				<AiChatBot />
			</div>
		</div>
	);
}