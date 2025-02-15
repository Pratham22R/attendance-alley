
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Bell } from "lucide-react";
import { useNotifications } from "@/contexts/NotificationContext";
import { format } from "date-fns";

export function NotificationDropdown() {
  const { notifications, unreadCount, markAsRead, clearNotification } = useNotifications();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="icon" className="relative">
          <Bell className="w-4 h-4" />
          {unreadCount > 0 && (
            <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs w-4 h-4 rounded-full flex items-center justify-center">
              {unreadCount}
            </span>
          )}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-80">
        {notifications.length === 0 ? (
          <div className="p-4 text-center text-sm text-neutral-500">
            No notifications
          </div>
        ) : (
          notifications.map(notification => (
            <DropdownMenuItem
              key={notification.id}
              className="p-4 flex flex-col items-start gap-1 cursor-default"
              onMouseEnter={() => !notification.read && markAsRead(notification.id)}
            >
              <div className="flex items-center justify-between w-full">
                <span className="font-medium">{notification.title}</span>
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    clearNotification(notification.id);
                  }}
                  className="text-xs text-neutral-400 hover:text-neutral-600"
                >
                  Clear
                </button>
              </div>
              <p className="text-sm text-neutral-600">{notification.message}</p>
              <span className="text-xs text-neutral-400">
                {format(notification.timestamp, 'MMM d, h:mm a')}
              </span>
            </DropdownMenuItem>
          ))
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
