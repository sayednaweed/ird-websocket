import { Server } from "socket.io";
import jwt from "jsonwebtoken";
import redisService from "../../services/redis.service";
import {
  ALLOWED_PERMISSION_SOCKET,
  ORGANIZATION_GROUPS,
  RoleEnum,
} from "../utils/constants";
import { generateAuthChannel } from "@/v1/utils/utils";

let io: Server | null = null;

export const registerSocketServer = (server: any) => {
  io = new Server(server, {
    cors: {
      origin: process.env.REACT_FRONTEND_URL ?? "http://localhost:5173", // ✅ exact origin, NOT '*'
      methods: ["GET", "POST"],
      credentials: true,
    },
  });

  io.use((socket, next) => {
    try {
      // 1. Parse cookies from the handshake headers
      try {
        const token = socket.handshake.auth.token;
        const decoded: any = jwt.verify(
          token,
          process.env.SUBSCRIBER_NAME_JWT_SECRET_TOKEN_KEY!,
          {
            ignoreExpiration: true,
          }
        );
        socket.data.user = decoded;

        next();
      } catch (e: any) {
        console.log(e);
      }
    } catch (err) {
      next(new Error("Authentication error"));
    }
  });

  io.on("connection", async (socket) => {
    const id = socket.data.user.tokenable_id;
    const role_id = socket.data.user.role_id;
    if (role_id == RoleEnum.organization) {
      socket.join(generateAuthChannel(ORGANIZATION_GROUPS.organizations, id));
      socket.join(generateAuthChannel(ORGANIZATION_GROUPS.projects, id));
    } else if (role_id == RoleEnum.donor) {
    } else {
      const permissions = await redisService.getFormattedPermissions(id);
      const filtered = permissions.filter((item) =>
        ALLOWED_PERMISSION_SOCKET.includes(item)
      );
      // Subscription
      // 2. Specific groups
      filtered.forEach((item) => socket.join(item));
      console.log("Joined notification");
    }

    socket.on("disconnect", () => {
      console.log(`User disconnected: ${id}`);
    });
  });
};

// Getter for the io instance so you can emit outside this file
export const getIO = (): Server => {
  if (!io) {
    throw new Error("Socket.io not initialized!");
  }
  return io;
};
