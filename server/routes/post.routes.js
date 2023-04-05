import express from "express";
import {
  createPost,
  getAllPosts,
  getOnePost,
  likePost,
  searchPosts,
} from "../controllers/post.controller.js";


const router = express.Router();

export default router;