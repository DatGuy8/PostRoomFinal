import express from "express";
import {
  register,
  login,
  getOneUser,
  patchFriend,
  getFriends,
  changeUserPhoto,
} from "../controllers/user.controller.js";
import { authenticate } from "../config/jwt.config.js";

import { verifyToken } from "../config/verify.middleware.js";
import multer from "multer";
import { v4 as uuidv4 } from "uuid";
import path from "path";

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "images");
  },
  filename: function (req, file, cb) {
    cb(null, uuidv4() + "-" + Date.now() + path.extname(file.originalname));
  },
});
const upload = multer({ storage });

const router = express.Router();

router.get("/friends/:userId",verifyToken, getFriends);
router.get("/get/:_id",verifyToken, getOneUser);
router.post("/register", register);
router.post("/login", login);
router.patch("/changephoto/:_id",verifyToken, upload.single("photo"), changeUserPhoto);
router.patch("/:friendId/friends",verifyToken, patchFriend);

export default router;
