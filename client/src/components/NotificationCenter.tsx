import React, { useState } from "react";
import { useSocket } from "@/contexts/SocketContext";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Bell, X, Calendar, CheckCircle, XCircle } from "lucide-react";

const NotificationCenter: React.FC = () => {
  const { notifications, removeNotification, clearNotifications, isConnected } = useSocket();
  const [isOpen, setIsOpen] = useState(false);

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case "tour:scheduled":
      case "tour:rescheduled":
        return <Calendar className="w-4 h-4 text-blue-500" />;
      case "tour:completed":
      case "application:status_updated":
        return <CheckCircle className="w-4 h-4 text-green-500" />;
      case "tour:cancelled":
        return <XCircle className="w-4 h-4 text-red-500" />;
      default:
        return <Bell className="w-4 h-4 text-gray-500" />;
    }
  };

  const formatTime = (timestamp: string) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffInMinutes = Math.floor((now.getTime() - date.getTime()) / (1000 * 60));

    if (diffInMinutes < 1) return "Just now";
    if (diffInMinutes < 60) return `${diffInMinutes}m ago`;
    if (diffInMinutes < 1440) return `${Math.floor(diffInMinutes / 60)}h ago`;
    return date.toLocaleDateString();
  };

  // Filter notifications to show only recent ones (past 24 hours)
  const recentNotifications = notifications.filter(notification => {
    const notificationDate = new Date(notification.timestamp);
    const now = new Date();
    const diffInHours = (now.getTime() - notificationDate.getTime()) / (1000 * 60 * 60);
    return diffInHours <= 24; // Only show notifications from past 24 hours
  });

  return (
    <div className="relative">
      <Button 
        variant="ghost" 
        className="relative p-2"
        onClick={() => setIsOpen(!isOpen)}
      >
        <Bell className="w-5 h-5" />
        {recentNotifications.length > 0 && (
          <Badge className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center text-xs bg-red-500 text-white rounded-full">
            {recentNotifications.length > 99 ? "99+" : recentNotifications.length}
          </Badge>
        )}
        {!isConnected && (
          <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-red-400 rounded-full"></div>
        )}
      </Button>

      {isOpen && (
        <div className="absolute right-0 top-full mt-2 w-80 bg-white border rounded-lg shadow-lg z-50">
          <div className="flex items-center justify-between p-4 border-b">
            <h3 className="font-semibold">Notifications</h3>
            <div className="flex items-center gap-2">
              <div className={`w-2 h-2 rounded-full ${isConnected ? 'bg-green-400' : 'bg-red-400'}`}></div>
              <span className="text-xs text-gray-500">
                {isConnected ? 'Connected' : 'Disconnected'}
              </span>
              <Button
                onClick={() => setIsOpen(false)}
                variant="ghost"
                size="sm"
                className="p-1 h-auto"
              >
                <X className="w-4 h-4" />
              </Button>
            </div>
          </div>

          <div className="max-h-96 overflow-y-auto">
            {recentNotifications.length === 0 ? (
              <div className="p-8 text-center text-gray-500">
                <Bell className="w-8 h-8 mx-auto mb-2 opacity-50" />
                <p className="text-sm">No recent notifications</p>
                <p className="text-xs text-gray-400 mt-1">Showing notifications from past 24 hours</p>
              </div>
            ) : (
              <div className="divide-y">
                {recentNotifications.slice(0, 10).map((notification, index) => (
                  <div
                    key={`${notification.id}-${index}`}
                    className="p-4 hover:bg-gray-50 transition-colors"
                  >
                    <div className="flex items-start gap-3">
                      <div className="flex-shrink-0 mt-0.5">
                        {getNotificationIcon(notification.type)}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-gray-900 mb-1">
                          {notification.message}
                        </p>
                        {/* Show sender info if available */}
                        {notification.data?.senderName && (
                          <p className="text-xs text-blue-600 mb-1">
                            From: {notification.data.senderName}
                            {notification.data?.senderRole && ` (${notification.data.senderRole})`}
                          </p>
                        )}
                        <p className="text-xs text-gray-500">
                          {formatTime(notification.timestamp)}
                        </p>
                        {notification.data?.propertyName && (
                          <p className="text-xs text-gray-400 mt-1">
                            Property: {notification.data.propertyName}
                          </p>
                        )}
                      </div>
                      <Button
                        onClick={() => removeNotification(notification.id)}
                        variant="ghost"
                        size="sm"
                        className="p-1 h-auto"
                      >
                        <X className="w-3 h-3" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {recentNotifications.length > 0 && (
            <div className="p-2 border-t">
              <Button
                onClick={() => {
                  clearNotifications();
                  setIsOpen(false);
                }}
                variant="ghost"
                size="sm"
                className="w-full text-xs"
              >
                Clear All Notifications
              </Button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default NotificationCenter;