//========== IMPORTS THE MODEL FILE ==============
import User from "../models/user.js";
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
      confirmPassword,
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
    // find user
    const user = await User.findOne({ email: email }).select("+password");

    // if no user
    if (!user) return res.status(400).json({ message: "User does not exist" });

    // check password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ msg: "Invalid credentails" });

    // add jwt token
    const token = jwt.sign(
      {
        _id: user._id,
      },
      process.env.SECRET_KEY
    );
    console.log(token);
    res.status(200).json({ token, user });
  } catch (err) {
    res.status(400).json({ message: "Login failed", err });
  }
};

// ========= GET ONE USER ==========
export const getOneUser = async (req, res) => {
  try {
    const { _id } = req.params;
    console.log(_id);
    const user = await User.findOne({ _id: _id });

    res.status(200).json(user);
  } catch (error) {
    res.status(400).json({ message: "Get One User failed", err });
  }
};
