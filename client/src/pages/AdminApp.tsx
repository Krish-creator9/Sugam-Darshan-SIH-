import { Switch, Route } from "wouter";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import AppSidebar from "@/components/AppSidebar";
import ThemeToggle from "@/components/ThemeToggle";
import { LanguageSwitcher } from "@/components/LanguageSwitcher";
import Dashboard from "@/pages/Dashboard";
import SlotManager from "@/components/SlotManager";
import QueueControl from "@/components/QueueControl";
import CrowdHeatmap from "@/components/CrowdHeatmap";
import QRScanner from "@/components/QRScanner";
import EmergencyAlerts from "@/components/EmergencyAlerts";
import NotFound from "@/pages/not-found";
import LoginPage from "./LoginPage";
import { useState } from "react";
import { BookingsList } from "@/components/BookingsList";
import { Button } from "@/components/ui/button";
import TempleSchedule from "./TempleSchedule";
import EditableTempleSchedule from "./admin/EditableTempleSchedule";
import DonationAnalytics from "./admin/DonationAnalytics";
import VolunteeringPage from "./Volunteering";
import PrasadBhandaraPage from "./PrasadBhandara";
import ParkingPage from "./Parking";
import LiveDarshanPage from "./LiveDarshan";
import VirtualPujaPage from "./VirtualPuja";
import VolunteerList from "./admin/VolunteerList";
import EditablePrasadBhandara from "./admin/EditablePrasadBhandara";
import ParkingManagement from "./admin/ParkingManagement";
import VirtualPujaAssignments from "./admin/VirtualPujaAssignments";

// Mock data - todo: remove mock functionality
const mockSlots = [
	{
		id: "1",
		date: "2025-01-20",
		time: "06:00",
		capacity: 100,
		currentBookings: 95,
		status: "active" as const,
	},
	{
		id: "2",
		date: "2025-01-20",
		time: "08:00",
		capacity: 120,
		currentBookings: 120,
		status: "full" as const,
	},
	{
		id: "3",
		date: "2025-01-20",
		time: "10:00",
		capacity: 80,
		currentBookings: 45,
		status: "active" as const,
	},
];

const mockQueueStatus = {
	currentToken: 247,
	displayMessage: "Welcome to Smart Temple. Please maintain social distancing.",
	isActive: true,
	lastUpdated: "2 mins ago",
};

const mockZoneDensities = {
	zoneA: 0.92,
	zoneB: 0.67,
	zoneC: 0.31,
	zoneD: 0.15,
};

function AdminRouter() {
	return (
		<Switch>
			<Route path="/" component={Dashboard} />
			<Route path="/monitor">
				<div className="space-y-6" data-testid="page-monitor">
					<div>
						<h1 className="text-3xl font-bold tracking-tight">
							Live Crowd Monitor
						</h1>
						<p className="text-muted-foreground">
							Real-time crowd density monitoring across temple zones
						</p>
					</div>
					<CrowdHeatmap
						zoneDensities={mockZoneDensities}
						onZoneClick={(zone) =>
							console.log(`Monitor page: Zone ${zone} clicked`)
						}
					/>
				</div>
			</Route>
			<Route path="/slots">
				<div className="space-y-6" data-testid="page-slots">
					<div>
						<h1 className="text-3xl font-bold tracking-tight">
							Slot Management
						</h1>
						<p className="text-muted-foreground">
							Create and manage temple visit time slots
						</p>
					</div>
					<SlotManager
						slots={mockSlots}
						onCreateSlot={(slotData) =>
							console.log("Create slot:", slotData)
						}
						onDeleteSlot={(slotId) =>
							console.log("Delete slot:", slotId)
						}
					/>
				</div>
			</Route>
			<Route path="/queue">
				<div className="space-y-6" data-testid="page-queue">
					<div>
						<h1 className="text-3xl font-bold tracking-tight">Queue Control</h1>
						<p className="text-muted-foreground">
							Manage temple queue and call tokens
						</p>
					</div>
					<QueueControl
						queueStatus={mockQueueStatus}
						queueLength={34}
						averageProcessingTime={3}
						onCallNext={() => console.log("Call next token")}
						onPauseResume={(isActive) =>
							console.log("Queue status changed:", isActive)
						}
						onUpdateMessage={(message) =>
							console.log("Update message:", message)
						}
						onReset={() => console.log("Reset queue")}
					/>
				</div>
			</Route>
			<Route path="/scanner">
				<div className="space-y-6" data-testid="page-scanner">
					<div>
						<h1 className="text-3xl font-bold tracking-tight">QR Scanner</h1>
						<p className="text-muted-foreground">
							Scan devotee QR tickets to check them in
						</p>
					</div>
					<QRScanner
						onTicketScanned={(ticket) =>
							console.log("Ticket scanned:", ticket)
						}
					/>
				</div>
			</Route>
			<Route path="/emergency">
				<div className="space-y-6" data-testid="page-emergency">
					<div>
						<h1 className="text-3xl font-bold tracking-tight">
							Emergency Alerts
						</h1>
						<p className="text-muted-foreground">
							Monitor and respond to emergency situations in the temple
						</p>
					</div>
					<EmergencyAlerts
						onRespondToAlert={(alertId) =>
							console.log("Responding to alert:", alertId)
						}
						onResolveAlert={(alertId) =>
							console.log("Resolving alert:", alertId)
						}
						onViewLocation={(location) =>
							console.log("Viewing location:", location)
						}
					/>
				</div>
			</Route>
			<Route path="/bookings">
				<div className="space-y-6" data-testid="page-bookings">
					<div>
						<h1 className="text-3xl font-bold tracking-tight">Bookings</h1>
						<p className="text-muted-foreground">
							View and manage all temple bookings
						</p>
					</div>
					<BookingsList />
				</div>
			</Route>
			<Route path="/schedule" component={EditableTempleSchedule} />
			<Route path="/donation" component={DonationAnalytics} />
			<Route path="/volunteering" component={VolunteerList} />
			<Route path="/prasad-bhandara" component={EditablePrasadBhandara} />
			<Route path="/parking" component={ParkingManagement} />
			<Route path="/live-darshan" component={LiveDarshanPage} />
			<Route path="/virtual-puja" component={VirtualPujaAssignments} />
			<Route path="/settings">
				<div className="space-y-6" data-testid="page-settings">
					<div>
						<h1 className="text-3xl font-bold tracking-tight">Settings</h1>
						<p className="text-muted-foreground">
							Configure temple management settings
						</p>
					</div>
					<div className="text-center py-12">
						<h3 className="text-lg font-semibold mb-2">
							System Settings
						</h3>
						<p className="text-muted-foreground">
							Coming soon - Configure capacity limits, operating hours, and
							notifications.
						</p>
					</div>
				</div>
			</Route>
			<Route component={NotFound} />
		</Switch>
	);
}

export default function AdminApp({ onBack }: { onBack: () => void }) {
	const style = {
		"--sidebar-width": "16rem",
		"--sidebar-width-icon": "3rem",
	};

	const [isAuthenticated, setIsAuthenticated] = useState(false);
	const [error, setError] = useState<string | null>(null);

	const handleLogin = (username: string, password: string) => {
		if (username === "admin" && password === "12345") {
			setIsAuthenticated(true);
			setError(null);
		} else {
			setError("Invalid username or password");
		}
	};

	if (!isAuthenticated) {
		return <LoginPage onLogin={handleLogin} error={error} userType="Admin" />;
	}

	return (
		<SidebarProvider style={style as React.CSSProperties}>
			<div className="flex h-screen w-full">
				<AppSidebar />
				<div className="flex flex-col flex-1">
					<header className="flex items-center justify-between p-4 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
						<SidebarTrigger data-testid="button-sidebar-toggle" />
						<div className="flex items-center gap-2">
							<ThemeToggle />
							<LanguageSwitcher />
							<Button onClick={onBack}>Back to Home</Button>
						</div>
					</header>
					<main className="flex-1 overflow-auto p-6">
						<AdminRouter />
					</main>
				</div>
			</div>
		</SidebarProvider>
	);
}