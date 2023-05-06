import express from "express";
import { verifyToken } from "../config/verify.middleware.js";
import { getUserNotifications,readOneNotification,readAllNotifications } from "../controllers/notification.controller.js";

const router = express.Router();

router.get("/user/:_id", verifyToken, getUserNotifications);

export default router;