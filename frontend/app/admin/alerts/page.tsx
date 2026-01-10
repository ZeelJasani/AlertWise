import { Bell } from "lucide-react";

export default function AlertsPage() {
    return (
        <div className="flex flex-col items-center justify-center min-h-[60vh] text-center space-y-6">
            <div className="h-24 w-24 rounded-full bg-zinc-900 flex items-center justify-center border border-zinc-800">
                <Bell className="h-10 w-10 text-zinc-500" />
            </div>
            <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tight">Alerts Management</h1>
                <p className="text-muted-foreground text-lg max-w-md mx-auto">
                    This feature is coming soon. You will be able to broadcast real-time emergency alerts to all users.
                </p>
            </div>
            <div className="inline-flex items-center rounded-full border border-primary/20 bg-primary/10 px-3 py-1 text-sm font-medium text-primary">
                Coming Soon
            </div>
        </div>
    );
}
