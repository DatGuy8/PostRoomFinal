import express from "express";
import {
  createPost,
  getAllPosts,
  getAllUserPosts,
  getOnePost,
  likePost,
  searchPosts,
} from "../controllers/post.controller.js";

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

router.get('/',verifyToken, getAllPosts);
router.post("/create",verifyToken, upload.single("photo"), createPost);
router.patch('/like/:_id',verifyToken, likePost);
router.get('/:_id/posts',verifyToken, getAllUserPosts);

export default router;
