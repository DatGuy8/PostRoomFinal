import express from "express";
import { addComment, addReply } from "../controllers/comment.controller.js";
import { verifyToken } from "../config/verify.middleware.js";

const router = express.Router();

router.post('/:userId/comments/:postId',verifyToken, addComment)


export default router;
