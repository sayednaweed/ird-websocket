import express, { Application, Request, Response } from "express";
import dotenv from "dotenv";
import expressWinston from "express-winston";
// Routes
import notificationRoutes from "./v1/routes/notification";
import cors from "cors";
import { createServer } from "http";
import { registerSocketServer } from "./v1/config/socket";
import { logger } from "./v1/config/logger";

//For env File
dotenv.config();

const app: Application = express();
const port = process.env.PORT || 8000;
app.use(express.json());
// app.use(bodyParser.urlencoded({ extended: true }));
app.use(
  cors({
    origin: [
      process.env.REACT_FRONTEND_URL ?? "http://localhost:5173", // Vite frontend
      process.env.LARAVEL_BACKEND_URL ?? "http://127.0.0.1:8000", // Laravel backend
    ],
    credentials: true,
  })
);
// Add express-winston middleware to log all HTTP requests
app.use(
  expressWinston.logger({
    winstonInstance: logger,
    meta: true, // optional: control whether you want to log the meta data about the request (default to true)
    msg: "HTTP {{req.method}} {{req.url}}",
    expressFormat: true, // Use the default Express/morgan request formatting
    colorize: false, // Do not colorize the output
  })
);
//
// Define storage for uploaded files

//
app.use("/api/v1/notification", notificationRoutes);

// Create an HTTP server for Express and Socket.IO to share
const server = createServer(app);
registerSocketServer(server);
server.listen(port, async () => {
  console.log(`Server is Fire at http://localhost:${port}`);
});

// Callback for when the server is closed
server.on("close", () => {
  console.log("Server has been closed");
});
