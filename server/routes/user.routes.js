import express from "express";
import { register, login, getOneUser } from "../controllers/user.controller.js";
import { authenticate } from "../config/jwt.config.js";

const router = express.Router();

router.get('/get/:_id', getOneUser);
router.post('/register', register);
router.post('/login', login);



export default router;
