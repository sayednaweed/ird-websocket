import {
  notifyUniqueUsers,
  notifyUsers,
} from "@/v1/controller/notification-controller";
import { Router } from "express";

const router: Router = Router();

router.post("/", notifyUsers);
router.post("/unique", notifyUniqueUsers);
export default router;
