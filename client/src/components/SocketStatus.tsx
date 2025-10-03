import React from 'react';
import { useSocket } from '@/contexts/SocketContext';
import { Badge } from '@/components/ui/badge';

const SocketStatus: React.FC = () => {
  const { isConnected } = useSocket();

  if (process.env.NODE_ENV === 'production') {
    return null; // Don't show in production
  }

  return (
    <div className="fixed bottom-4 left-4 z-50">
      <Badge variant={isConnected ? "default" : "destructive"} className="text-xs">
        Socket: {isConnected ? "Connected" : "Disconnected"}
      </Badge>
    </div>
  );
};

export default SocketStatus;