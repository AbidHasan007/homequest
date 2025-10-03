import { Server } from "socket.io";
import { Server as HTTPServer } from "http";
import jwt from "jsonwebtoken";

interface SocketUser {
  userId: string;
  userRole: string;
  socketId: string;
}

class SocketServer {
  private io: Server;
  private connectedUsers: Map<string, SocketUser> = new Map();

  constructor(server: HTTPServer) {
    this.io = new Server(server, {
      cors: {
        origin: [
          "http://localhost:3000",
          "http://localhost:3001",
          "http://127.0.0.1:3000",
          "http://127.0.0.1:3001",
          process.env.CLIENT_URL || "http://localhost:3000"
        ],
        methods: ["GET", "POST"],
        credentials: true,
        allowedHeaders: ["Content-Type", "Authorization"]
      },
    });

    this.setupMiddleware();
    this.setupEventHandlers();
  }

  private setupMiddleware() {
    // Authentication middleware
    this.io.use((socket, next) => {
      try {
        const token = socket.handshake.auth.token;
        if (!token) {
          return next(new Error("Authentication error"));
        }

        // In a real app, you'd verify the JWT token here
        // For now, we'll extract user info from the token payload
        const decoded = jwt.decode(token) as any;
        if (!decoded) {
          return next(new Error("Invalid token"));
        }

        socket.data.user = {
          userId: decoded.sub || decoded.cognitoId,
          userRole: decoded.role || "tenant", // Default role
        };

        next();
      } catch (error) {
        next(new Error("Authentication error"));
      }
    });
  }

  private setupEventHandlers() {
    this.io.on("connection", (socket) => {
      const user = socket.data.user;
      console.log(`User ${user.userId} connected with role ${user.userRole}`);

      // Store connected user
      this.connectedUsers.set(user.userId, {
        userId: user.userId,
        userRole: user.userRole,
        socketId: socket.id,
      });

      // Join user to their personal room for notifications
      socket.join(`user:${user.userId}`);

      // Tour event handlers
      socket.on("tour:schedule", (data) => this.handleScheduleTour(socket, data));
      socket.on("tour:accept", (data) => this.handleAcceptTour(socket, data));
      socket.on("tour:reschedule", (data) => this.handleRescheduleTour(socket, data));
      socket.on("tour:complete", (data) => this.handleCompleteTour(socket, data));
      socket.on("tour:cancel", (data) => this.handleCancelTour(socket, data));

      // Application event handlers
      socket.on("application:status_update", (data) => this.handleApplicationStatusUpdate(socket, data));

      // Chat event handlers
      socket.on("chat:join_room", (data) => this.handleJoinChatRoom(socket, data));
      socket.on("chat:message", (data) => this.handleChatMessage(socket, data));

      // Termination request handlers
      socket.on("termination:request", (data) => this.handleTerminationRequest(socket, data));
      socket.on("termination:respond", (data) => this.handleTerminationResponse(socket, data));

      // Notification handlers
      socket.on("notification:read", (data) => this.handleMarkNotificationRead(socket, data));

      // Disconnect handler
      socket.on("disconnect", () => {
        console.log(`User ${user.userId} disconnected`);
        this.connectedUsers.delete(user.userId);
      });
    });
  }

  // Tour event handlers
  private handleScheduleTour(socket: any, data: any) {
    const { applicationId, scheduledDate, landlordNotes } = data;
    console.log("Tour scheduled:", data);

    // Emit to tenant and landlord
    this.emitToApplicationParties(applicationId, "tour:scheduled", {
      applicationId,
      scheduledDate,
      landlordNotes,
      status: "SCHEDULED",
    });
  }

  private handleAcceptTour(socket: any, data: any) {
    const { tourId, tenantNotes } = data;
    console.log("Tour accepted:", data);

    this.emitToApplicationParties(data.applicationId, "tour:accepted", {
      tourId,
      tenantNotes,
      acceptedBy: socket.data.user.userId,
    });
  }

  private handleRescheduleTour(socket: any, data: any) {
    const { tourId, newScheduledDate, notes } = data;
    console.log("Tour rescheduled:", data);

    this.emitToApplicationParties(data.applicationId, "tour:rescheduled", {
      tourId,
      newScheduledDate,
      notes,
      rescheduledBy: socket.data.user.userId,
    });
  }

  private handleCompleteTour(socket: any, data: any) {
    const { tourId, feedback, rating } = data;
    console.log("Tour completed:", data);

    this.emitToApplicationParties(data.applicationId, "tour:completed", {
      tourId,
      feedback,
      rating,
      completedBy: socket.data.user.userId,
    });
  }

  private handleCancelTour(socket: any, data: any) {
    const { tourId, reason } = data;
    console.log("Tour cancelled:", data);

    this.emitToApplicationParties(data.applicationId, "tour:cancelled", {
      tourId,
      reason,
      cancelledBy: socket.data.user.userId,
    });
  }

  // Termination request handlers
  private handleTerminationRequest(socket: any, data: any) {
    const { leaseId, reason, requestedEndDate } = data;
    console.log("Termination request created:", data);

    this.emitToLeaseParties(leaseId, "termination:requested", {
      leaseId,
      reason,
      requestedEndDate,
      requestedBy: socket.data.user.userId,
      status: "PENDING",
    });
  }

  private handleTerminationResponse(socket: any, data: any) {
    const { terminationRequestId, status, response } = data;
    console.log("Termination response:", data);

    this.emitToLeaseParties(data.leaseId, "termination:responded", {
      terminationRequestId,
      status,
      response,
      respondedBy: socket.data.user.userId,
    });
  }

  private handleApplicationStatusUpdate(socket: any, data: any) {
    const { applicationId, newStatus } = data;
    console.log("Application status updated:", data);

    this.emitToApplicationParties(applicationId, "application:status_updated", {
      applicationId,
      newStatus,
      updatedBy: socket.data.user.userId,
    });
  }

  // Chat handlers
  private handleJoinChatRoom(socket: any, data: any) {
    const { applicationId } = data;
    const roomName = `application:${applicationId}`;
    socket.join(roomName);
    console.log(`User ${socket.data.user.userId} joined chat room ${roomName}`);
  }

  private handleChatMessage(socket: any, data: any) {
    const { applicationId, message } = data;
    const roomName = `application:${applicationId}`;

    this.io.to(roomName).emit("chat:new_message", {
      applicationId,
      message,
      sender: {
        userId: socket.data.user.userId,
        userRole: socket.data.user.userRole,
      },
      timestamp: new Date().toISOString(),
    });
  }

  private handleMarkNotificationRead(socket: any, data: any) {
    const { notificationId } = data;
    // Implementation for marking notifications as read
    socket.emit("notification:marked_read", { notificationId });
  }

  // Utility methods
  private async emitToApplicationParties(applicationId: string, event: string, data: any) {
    try {
      // Import prisma to fetch application details
      const { PrismaClient } = await import('@prisma/client');
      const prisma = new PrismaClient();
      
      // Fetch application details to get tenant and landlord IDs
      const application = await prisma.application.findUnique({
        where: { id: parseInt(applicationId) },
        include: {
          property: {
            include: {
              landlord: true
            }
          },
          tenant: true
        }
      });

      if (application) {
        const tenantId = application.tenantCognitoId;
        const landlordId = application.property.landlord.cognitoId;

        // Generate appropriate message based on event type
        const getMessage = (eventType: string, eventData: any) => {
          switch (eventType) {
            case 'tour:scheduled':
              return `Tour scheduled for ${new Date(eventData.scheduledDate).toLocaleString()}`;
            case 'tour:updated':
              if (eventData.status === 'CANCELLED') {
                return `Tour has been cancelled${eventData.reason ? ': ' + eventData.reason : ''}`;
              } else if (eventData.status === 'COMPLETED') {
                return 'Tour has been completed';
              } else {
                return 'Tour has been updated';
              }
            case 'tour:completed':
              return 'Tour has been completed';
            case 'tour:cancelled':
              return `Tour has been cancelled${eventData.reason ? ': ' + eventData.reason : ''}`;
            case 'application:status_updated':
              return `Application status changed to ${eventData.newStatus}`;
            default:
              return 'New notification';
          }
        };

        const message = getMessage(event, data);

        console.log(`Emitting ${event} to tenant ${tenantId} and landlord ${landlordId}`);
        console.log('Notification data:', { message, data: data.senderName ? 'Has sender info' : 'No sender info' });

        const notificationData = {
          type: event,
          message,
          data,
          timestamp: new Date().toISOString(),
        };

        // Check connected users for debugging
        const tenantConnected = this.connectedUsers.has(tenantId);
        const landlordConnected = this.connectedUsers.has(landlordId);
        console.log(`Connected users - Tenant ${tenantId}: ${tenantConnected}, Landlord ${landlordId}: ${landlordConnected}`);

        // Emit direct event for cache invalidation
        this.io.to(`user:${tenantId}`).emit(event, data);
        this.io.to(`user:${landlordId}`).emit(event, data);

        // Emit notification only to personal rooms (avoid duplicates)
        console.log(`Sending notification to tenant room: user:${tenantId}`);
        this.io.to(`user:${tenantId}`).emit("notification:new", notificationData);
        
        console.log(`Sending notification to landlord room: user:${landlordId}`);
        this.io.to(`user:${landlordId}`).emit("notification:new", notificationData);
      } else {
        // Fallback if application not found - still emit to application room
        const defaultMessage = `New ${event.replace(':', ' ')} notification`;
        this.io.to(`application:${applicationId}`).emit(event, data);
        this.io.to(`application:${applicationId}`).emit("notification:new", {
          type: event,
          message: defaultMessage,
          data,
          timestamp: new Date().toISOString(),
        });
      }
      
    } catch (error) {
      console.error("Error emitting to application parties:", error);
    }
  }

  private async emitToLeaseParties(leaseId: string, event: string, data: any) {
    try {
      // Import prisma to fetch lease details
      const { PrismaClient } = await import('@prisma/client');
      const prisma = new PrismaClient();
      
      // Fetch lease details to get tenant and landlord IDs
      const lease = await prisma.lease.findUnique({
        where: { id: parseInt(leaseId) },
        include: {
          tenant: true,
          property: {
            include: {
              landlord: true
            }
          }
        }
      });

      if (lease) {
        const tenantId = lease.tenant.cognitoId;
        const landlordId = lease.property.landlord.cognitoId;

        // Generate appropriate message based on event type
        const getMessage = (eventType: string, eventData: any) => {
          switch (eventType) {
            case 'termination:requested':
              return `New lease termination request for ${eventData.requestedEndDate ? new Date(eventData.requestedEndDate).toLocaleDateString() : 'immediate termination'}`;
            case 'termination:responded':
              return `Lease termination request ${eventData.status.toLowerCase()}`;
            default:
              return 'New lease notification';
          }
        };

        const message = getMessage(event, data);

        console.log(`Emitting ${event} to tenant ${tenantId} and landlord ${landlordId}`);

        // Emit to tenant's personal room
        this.io.to(`user:${tenantId}`).emit(event, data);
        this.io.to(`user:${tenantId}`).emit("notification:new", {
          type: event,
          message,
          data,
          timestamp: new Date().toISOString(),
        });

        // Emit to landlord's personal room
        this.io.to(`user:${landlordId}`).emit(event, data);
        this.io.to(`user:${landlordId}`).emit("notification:new", {
          type: event,
          message,
          data,
          timestamp: new Date().toISOString(),
        });
        
        // Also emit to the lease room for backward compatibility
        this.io.to(`lease:${leaseId}`).emit(event, data);
        this.io.to(`lease:${leaseId}`).emit("notification:new", {
          type: event,
          message,
          data,
          timestamp: new Date().toISOString(),
        });
      }
      
    } catch (error) {
      console.error("Error emitting to lease parties:", error);
    }
  }

  // Public methods to emit events from controllers
  public emitTourScheduled(applicationId: string, tourData: any) {
    this.emitToApplicationParties(applicationId, "tour:scheduled", tourData);
  }

  public emitTourUpdated(applicationId: string, tourData: any) {
    this.emitToApplicationParties(applicationId, "tour:updated", tourData);
  }

  public emitApplicationStatusChanged(applicationId: string, statusData: any) {
    this.emitToApplicationParties(applicationId, "application:status_updated", statusData);
  }

  public emitNotification(userId: string, notification: any) {
    this.io.to(`user:${userId}`).emit("notification:new", notification);
  }

  public emitTerminationRequested(leaseId: string, terminationData: any) {
    this.emitToLeaseParties(leaseId, "termination:requested", terminationData);
  }

  public emitTerminationResponse(leaseId: string, responseData: any) {
    this.emitToLeaseParties(leaseId, "termination:responded", responseData);
  }

  // Get connected users
  public getConnectedUsers(): Map<string, SocketUser> {
    return this.connectedUsers;
  }

  // Get Socket.io instance
  public getIO(): Server {
    return this.io;
  }
}

export default SocketServer;