//========== IMPORTS THE MODEL FILE ==============
import User from "../models/user.js";
import Notification from "../models/notification.js";
import Post from "../models/post.js";
// ========= ADDS TOKEN FOR USERS ==============
import jwt from "jsonwebtoken";
// =========== BCRYPT TO HASH PASSWORDS ==========
import bcrypt from "bcrypt";


// ========= REGISTER USER ==========
export const register = async (req, res) => {
  try {
    const {
      userName,
      firstName,
      lastName,
      location,
      occupation,
      email,
      password,
    } = req.body;

    //==== checks if email already registered =====
    const alreadyUser = await User.findOne({ email });
    if (alreadyUser) {
      return res.status(409).json("Email already registered");
    }

    const salt = await bcrypt.genSalt();
    const passwordHash = await bcrypt.hash(password, salt);

    const newUser = new User({
      userName,
      firstName,
      lastName,
      email,
      occupation,
      password: passwordHash,
      location,
      userPhoto: process.env.DEFAULT_USER_PHOTO,
    });
    const user = await newUser.save();
    const token = jwt.sign(
      {
        _id: user._id,
      },
      process.env.SECRET_KEY
    );

    res.status(201).json({ token, user });
  } catch (err) {
    res.status(400).json({ message: "That didn't quite work", err });
  }
};

// ========= LOGIN USER ============
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    // --------------FIND USER-----------
    const user = await User.findOne({ email: email })
      .select("+password")
      .populate("friends");
    // --------------IF NO USER--------------
    if (!user) return res.status(400).json({ message: "User does not exist" });
    // -------------CHECK PASSWORD-----------
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ msg: "Invalid credentails" });
    // -------------ADD JWT TOKEN-----------
    const token = jwt.sign(
      {
        _id: user._id,
      },
      process.env.SECRET_KEY
    );
    res.status(200).json({ token, user });
  } catch (err) {
    res.status(400).json({ message: "Login failed", err });
  }
};

// ========= GET ONE USER ==========
export const getOneUser = async (req, res) => {
  try {
    const { _id } = req.params;
    const user = await User.findOne({ _id: _id });
    res.status(200).json(user);
  } catch (err) {
    res.status(400).json({ message: "Get One User failed", err });
  }
};

// ================== GET USER FRIENDS =======================
export const getFriends = async (req, res) => {
  try {
    const { userId } = req.params;
    const user = await User.findById(userId).populate("friends");

    res.status(200).json(user.friends);
  } catch (err) {
    res.status(400).json({ message: "Get Friends failed", err });
  }
};

//================= ADD/REMOVE FRIEND =======================
export const patchFriend = async (req, res) => {
  try {
    const { friendId } = req.params;
    const { userId } = req.body;
    const user = await User.findById(userId);
    const friend = await User.findById(friendId);

    if (user.friends.includes(friendId)) {
      user.friends.pull(friendId);
      friend.friends.pull(userId);
    } else {
      user.friends.push(friendId);
      friend.friends.push(userId);
      const notify = new Notification({
        user: friendId,
        sender: userId,
        type: "friend",
      });
      await notify.save();
      friend.notifications.push(notify);
    }

    await user.save();
    await friend.save();
    await user.populate("friends");

    res
      .status(200)
      .json({ friends: user.friends, notification: friend.notifications });
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

//===================== CHANGE USERPHOTO ==============
export const changeUserPhoto = async (req, res) => {
  try {
    const { _id,userPage } = req.params;
    const photo = req.file.filename;

    const user = await User.findByIdAndUpdate(
      _id,
      { userPhoto: photo },
      { new: true }
    );
    
    // So we need to find the posts so when a user changes photos those posts will update the user photo as well
    let posts = [];
    
    if(userPage === "false"){
      console.log("in if");
      posts = await Post.find()
      .sort("-createdAt")
      .populate("userId")
      .populate({
        path: "comments",
        populate: {
          path: "userId",
          model: "User",
        },
      });
    } else {
      console.log("in else");
      posts = await Post.find({ userId: _id })
      .populate("userId")
      .populate({
        path: "comments",
        populate: {
          path: "userId",
          model: "User",
        },
      });
    }

    

    res.status(200).json({user: user, posts: posts});
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

