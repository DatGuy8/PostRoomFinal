import express from "express";
import {
  createPost,
  getAllPosts,
  getOnePost,
  likePost,
  searchPosts,
} from "../controllers/post.controller.js";

import User from "../models/user.js";
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

router.get('/', getAllPosts);
router.post("/create", upload.single("photo"), createPost);
router.patch('/:_id/like/:userId', likePost);

export default router;
