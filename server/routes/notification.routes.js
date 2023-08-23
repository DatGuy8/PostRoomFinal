import express from "express";
import { verifyToken } from "../config/verify.middleware.js";
import { getUserNotifications,readOneNotification,readAllNotifications, deleteOneNotification } from "../controllers/notification.controller.js";

const router = express.Router();

router.get("/user/:_id", verifyToken, getUserNotifications);
router.patch("/delete/:notificationId", verifyToken, deleteOneNotification);


export default router;