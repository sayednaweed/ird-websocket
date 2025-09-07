import { Request, Response } from "express";
import { getIO } from "../config/socket";
import { ALLOWED_PERMISSION_SOCKET } from "../utils/constants";
import { generateAuthChannel } from "../utils/utils";

export const notifyUsers = async (
  req: Request,
  res: Response
): Promise<void> => {
  const io = getIO();
  const { message, notifier_id, action_url, created_at, permissionName } =
    req.body;
  if (!ALLOWED_PERMISSION_SOCKET.includes(permissionName)) {
    res.status(400).json({ error: "Invalid permissionName" });
    return;
  }
  io.to(permissionName).emit("notification", {
    message: message,
    created_at: created_at,
    notifier_id: notifier_id,
    action_url: action_url,
  });
};
export const notifyUniqueUsers = async (
  req: Request,
  res: Response
): Promise<void> => {
  const io = getIO();
  const {
    message,
    notifier_id,
    action_url,
    created_at,
    user_id,
    permissionName,
  } = req.body;
  io.to(generateAuthChannel(permissionName, user_id)).emit("notification", {
    message: message,
    created_at: created_at,
    notifier_id: notifier_id,
    action_url: action_url,
  });
};
