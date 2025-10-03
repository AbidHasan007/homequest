import React, { createContext, useContext, useEffect, useState, ReactNode, useCallback, useRef } from 'react';
import { io, Socket } from 'socket.io-client';
import { useGetAuthUserQuery, api } from '@/state/api';
import { fetchAuthSession } from 'aws-amplify/auth';
import { useDispatch } from 'react-redux';

interface SocketContextType {
  socket: Socket | null;
  isConnected: boolean;
  notifications: Notification[];
  addNotification: (notification: Notification) => void;
  removeNotification: (id: string) => void;
  clearNotifications: () => void;
}

interface Notification {
  id: string;
  type: string;
  message: string;
  data?: any;
  timestamp: string;
  read?: boolean;
}

interface SocketProviderProps {
  children: ReactNode;
}

const SocketContext = createContext<SocketContextType | undefined>(undefined);

export const SocketProvider: React.FC<SocketProviderProps> = ({ children }) => {
  const [socket, setSocket] = useState<Socket | null>(null);
  const [isConnected, setIsConnected] = useState(false);
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const { data: authUser } = useGetAuthUserQuery();
  const dispatch = useDispatch();
  const socketRef = useRef<Socket | null>(null);

  const addNotification = useCallback((notification: Notification) => {
    setNotifications(prev => [notification, ...prev].slice(0, 50)); // Keep last 50 notifications
  }, []);

  const removeNotification = useCallback((id: string) => {
    setNotifications(prev => prev.filter(notif => notif.id !== id));
  }, []);

  const clearNotifications = useCallback(() => {
    setNotifications([]);
  }, []);

  const connectSocket = useCallback(async () => {
    try {
      // Get the authentication token
      const session = await fetchAuthSession();
      const idToken = session.tokens?.idToken?.toString();

      if (!idToken) {
        console.error('No authentication token available');
        return;
      }

      const serverUrl = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:3002';
      console.log('Attempting to connect to socket server:', serverUrl);
      
      socketRef.current?.disconnect();

      const newSocket = io(serverUrl, {
        auth: {
          token: idToken,
        },
        transports: ['websocket', 'polling'],
        timeout: 10000,
        forceNew: true,
        reconnection: true,
        reconnectionAttempts: 5,
        reconnectionDelay: 1000,
      });

      // Connection event handlers
      newSocket.on('connect', () => {
        console.log('✅ Socket connected to server');
        setIsConnected(true);
      });

      newSocket.on('disconnect', (reason) => {
        console.log('❌ Socket disconnected from server. Reason:', reason);
        setIsConnected(false);
      });

      newSocket.on('connect_error', (error) => {
        console.error('Socket connection error:', error);
        console.error('Make sure the server is running on:', serverUrl);
        setIsConnected(false);
      });

      newSocket.on('reconnect', (attemptNumber) => {
        console.log('Socket reconnected after', attemptNumber, 'attempts');
        setIsConnected(true);
      });

      newSocket.on('reconnect_error', (error) => {
        console.error('Socket reconnection failed:', error);
      });

      newSocket.on('reconnect_failed', () => {
        console.error('Socket reconnection failed permanently. Please check if server is running.');
        setIsConnected(false);
      });

      // Tour event listeners - only for cache invalidation, notifications handled by notification:new
      newSocket.on('tour:scheduled', (data) => {
        console.log('Tour scheduled:', data);
        // Invalidate applications cache to refresh the UI
        dispatch(api.util.invalidateTags(['Applications']));
      });

      newSocket.on('tour:accepted', (data) => {
        console.log('Tour accepted:', data);
        // Notification handled by notification:new event
      });

      newSocket.on('tour:rescheduled', (data) => {
        console.log('Tour rescheduled:', data);
        // Notification handled by notification:new event
      });

      newSocket.on('tour:completed', (data) => {
        console.log('Tour completed:', data);
        // Invalidate applications cache to refresh the UI
        dispatch(api.util.invalidateTags(['Applications']));
      });

      newSocket.on('tour:cancelled', (data) => {
        console.log('Tour cancelled:', data);
        // Invalidate applications cache to refresh the UI
        dispatch(api.util.invalidateTags(['Applications']));
      });

      newSocket.on('tour:updated', (data) => {
        console.log('Tour updated:', data);
        // Invalidate applications cache to refresh the UI
        dispatch(api.util.invalidateTags(['Applications']));
      });

      // Application event listeners
      newSocket.on('application:status_updated', (data) => {
        console.log('Application status updated:', data);
        // Invalidate applications cache to refresh the UI
        dispatch(api.util.invalidateTags(['Applications']));
      });

      // Termination request event listeners
      newSocket.on('termination:requested', (data) => {
        console.log('Termination request created:', data);
        // Invalidate leases and properties cache to refresh the UI
        dispatch(api.util.invalidateTags(['Leases', 'Properties']));
      });

      newSocket.on('termination:responded', (data) => {
        console.log('Termination request responded:', data);
        // Invalidate leases and properties cache to refresh the UI
        dispatch(api.util.invalidateTags(['Leases', 'Properties']));
      });

      // General notification listener
      newSocket.on('notification:new', (notification) => {
        console.log('New notification received:', notification);
        addNotification({
          id: `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
          type: notification.type,
          message: notification.message || 'New notification',
          data: notification.data,
          timestamp: notification.timestamp || new Date().toISOString(),
        });
      });

      // Chat event listeners (for future implementation)
      newSocket.on('chat:new_message', (data) => {
        console.log('New chat message:', data);
        addNotification({
          id: `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
          type: 'chat:new_message',
          message: 'New message received',
          data,
          timestamp: new Date().toISOString(),
        });
      });

      socketRef.current = newSocket;
      setSocket(newSocket);

    } catch (error) {
      console.error('Error connecting to socket:', error);
      console.error('Please ensure:');
      console.error('1. The server is running on port 3001');
      console.error('2. The server has Socket.io configured');
      console.error('3. CORS is properly configured on the server');
      socketRef.current?.disconnect();
      socketRef.current = null;
      setSocket(null);
      setIsConnected(false);
    }
  }, [addNotification, dispatch]);

  useEffect(() => {
    if (!authUser?.cognitoInfo?.userId) {
      return () => {
        socketRef.current?.disconnect();
        socketRef.current = null;
        setSocket(null);
        setIsConnected(false);
      };
    }

    connectSocket();

    return () => {
      socketRef.current?.disconnect();
      socketRef.current = null;
      setSocket(null);
      setIsConnected(false);
    };
  }, [authUser?.cognitoInfo?.userId, connectSocket]);
  
  // Cleanup on unmount
  useEffect(() => {
    return () => {
      socketRef.current?.disconnect();
      socketRef.current = null;
    };
  }, []);

  // Socket utility methods
  const joinApplicationRoom = (applicationId: string) => {
    if (socketRef.current) {
      socketRef.current.emit('chat:join_room', { applicationId });
    }
  };

  const sendChatMessage = (applicationId: string, message: string) => {
    if (socketRef.current) {
      socketRef.current.emit('chat:message', { applicationId, message });
    }
  };

  // Extend the context value with utility methods
  const contextValue: SocketContextType & {
    joinApplicationRoom: (applicationId: string) => void;
    sendChatMessage: (applicationId: string, message: string) => void;
  } = {
    socket,
    isConnected,
    notifications,
    addNotification,
    removeNotification,
    clearNotifications,
    joinApplicationRoom,
    sendChatMessage,
  };

  return (
    <SocketContext.Provider value={contextValue}>
      {children}
    </SocketContext.Provider>
  );
};

export const useSocket = () => {
  const context = useContext(SocketContext);
  if (context === undefined) {
    throw new Error('useSocket must be used within a SocketProvider');
  }
  return context;
};

// Custom hooks for specific socket operations
export const useTourEvents = () => {
  const { socket } = useSocket();

  const scheduleTour = (applicationId: string, scheduledDate: string, landlordNotes?: string) => {
    if (socket) {
      socket.emit('tour:schedule', { applicationId, scheduledDate, landlordNotes });
    }
  };

  const acceptTour = (applicationId: string, tourId: string, tenantNotes?: string) => {
    if (socket) {
      socket.emit('tour:accept', { applicationId, tourId, tenantNotes });
    }
  };

  const rescheduleTour = (applicationId: string, tourId: string, newScheduledDate: string, notes?: string) => {
    if (socket) {
      socket.emit('tour:reschedule', { applicationId, tourId, newScheduledDate, notes });
    }
  };

  const completeTour = (applicationId: string, tourId: string, feedback?: string, rating?: number) => {
    if (socket) {
      socket.emit('tour:complete', { applicationId, tourId, feedback, rating });
    }
  };

  const cancelTour = (applicationId: string, tourId: string, reason?: string) => {
    if (socket) {
      socket.emit('tour:cancel', { applicationId, tourId, reason });
    }
  };

  return {
    scheduleTour,
    acceptTour,
    rescheduleTour,
    completeTour,
    cancelTour,
  };
};

export default SocketContext;