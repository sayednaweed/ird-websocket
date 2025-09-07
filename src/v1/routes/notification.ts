import { Router } from "express";
import {
  notifyUniqueUsers,
  notifyUsers,
} from "../controller/notification-controller";

const router: Router = Router();

router.post("/", notifyUsers);
router.post("/unique", notifyUniqueUsers);
export default router;
