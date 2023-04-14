import express from "express";
import { register, login, getOneUser, patchFriend, getFriends } from "../controllers/user.controller.js";
import { authenticate } from "../config/jwt.config.js";



const router = express.Router();

router.get('/friends/:userId', getFriends)
router.get('/get/:_id', getOneUser);
router.post('/register', register);
router.post('/login', login);
router.patch('/:userId/:friendId', patchFriend)


export default router;
