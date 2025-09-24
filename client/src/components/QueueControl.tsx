import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { 
  SkipForward, 
  Pause, 
  Play, 
  Users, 
  Clock,
  MessageSquare,
  RefreshCw
} from "lucide-react";

interface QueueStatus {
  currentToken: number;
  displayMessage: string;
  isActive: boolean;
  lastUpdated: string;
}

interface QueueControlProps {
  queueStatus: QueueStatus;
  queueLength: number;
  averageProcessingTime: number;
  onCallNext?: () => void;
  onPauseResume?: (isActive: boolean) => void;
  onUpdateMessage?: (message: string) => void;
  onReset?: () => void;
}

export default function QueueControl({
  queueStatus,
  queueLength,
  averageProcessingTime,
  onCallNext,
  onPauseResume,
  onUpdateMessage,
  onReset
}: QueueControlProps) {
  const [newMessage, setNewMessage] = useState(queueStatus.displayMessage);
  const [isUpdating, setIsUpdating] = useState(false);

  const handleCallNext = () => {
    console.log("Calling next token");
    onCallNext?.();
  };

  const handlePauseResume = () => {
    const newStatus = !queueStatus.isActive;
    console.log(`Queue ${newStatus ? 'resumed' : 'paused'}`);
    onPauseResume?.(newStatus);
  };

  const handleUpdateMessage = () => {
    if (!newMessage.trim()) return;
    
    console.log("Updating display message:", newMessage);
    setIsUpdating(true);
    onUpdateMessage?.(newMessage);
    
    // Simulate API call delay
    setTimeout(() => {
      setIsUpdating(false);
    }, 500);
  };

  const handleReset = () => {
    console.log("Resetting queue");
    onReset?.();
  };

  const estimatedWaitTime = queueLength * averageProcessingTime;

  return (
    <div className="space-y-6">
      {/* Current Status */}
      <Card data-testid="card-queue-status">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Users className="h-5 w-5" />
            Current Queue Status
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="text-3xl font-bold text-primary" data-testid="text-current-token">
                #{queueStatus.currentToken}
              </div>
              <p className="text-sm text-muted-foreground">Current Token</p>
              <Badge 
                variant={queueStatus.isActive ? "default" : "secondary"} 
                className="mt-2"
                data-testid="badge-queue-status"
              >
                {queueStatus.isActive ? "Active" : "Paused"}
              </Badge>
            </div>
            
            <div className="text-center">
              <div className="text-3xl font-bold" data-testid="text-queue-length">
                {queueLength}
              </div>
              <p className="text-sm text-muted-foreground">People in Queue</p>
              <div className="flex items-center justify-center gap-1 mt-2 text-xs text-muted-foreground">
                <Clock className="h-3 w-3" />
                <span data-testid="text-estimated-wait">~{estimatedWaitTime}min wait</span>
              </div>
            </div>
            
            <div className="text-center">
              <div className="text-3xl font-bold" data-testid="text-avg-time">
                {averageProcessingTime}m
              </div>
              <p className="text-sm text-muted-foreground">Avg Processing Time</p>
              <p className="text-xs text-muted-foreground mt-2">
                Last updated: {queueStatus.lastUpdated}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Queue Controls */}
      <Card data-testid="card-queue-controls">
        <CardHeader>
          <CardTitle>Queue Management</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-4">
            <Button
              onClick={handleCallNext}
              disabled={!queueStatus.isActive}
              data-testid="button-call-next"
              className="flex items-center gap-2"
            >
              <SkipForward className="h-4 w-4" />
              Call Next Token
            </Button>
            
            <Button
              variant="outline"
              onClick={handlePauseResume}
              data-testid="button-pause-resume"
              className="flex items-center gap-2"
            >
              {queueStatus.isActive ? (
                <>
                  <Pause className="h-4 w-4" />
                  Pause Queue
                </>
              ) : (
                <>
                  <Play className="h-4 w-4" />
                  Resume Queue
                </>
              )}
            </Button>
            
            <Button
              variant="outline"
              onClick={handleReset}
              data-testid="button-reset"
              className="flex items-center gap-2 text-destructive hover:text-destructive"
            >
              <RefreshCw className="h-4 w-4" />
              Reset Queue
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Display Message Control */}
      <Card data-testid="card-message-control">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <MessageSquare className="h-5 w-5" />
            Display Message
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <Label htmlFor="message">Current Display Message</Label>
              <div className="mt-1 p-3 bg-muted rounded-md" data-testid="text-current-message">
                {queueStatus.displayMessage}
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="newMessage">New Message</Label>
              <Input
                id="newMessage"
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                placeholder="Enter new display message"
                data-testid="input-new-message"
              />
            </div>
            
            <Button
              onClick={handleUpdateMessage}
              disabled={isUpdating || newMessage.trim() === queueStatus.displayMessage}
              data-testid="button-update-message"
              className="flex items-center gap-2"
            >
              {isUpdating ? (
                <RefreshCw className="h-4 w-4 animate-spin" />
              ) : (
                <MessageSquare className="h-4 w-4" />
              )}
              Update Message
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}