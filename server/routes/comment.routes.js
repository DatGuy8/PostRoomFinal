import express from "express";
import { addComment, addReply } from "../controllers/comment.controller.js";

const router = express.Router();

router.post('/:userId/comments/:postId', addComment)


export default router;
