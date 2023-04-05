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
      email,
      password,
      userPhoto,
      location,
    } = req.body;

    //==== checks if email already registered =====
    const user = await User.findOne({ email });
    if (user) {
      return res.status(409).json("Email already registered");
    }
    // ====== If the model pre user register works then dont need this ===========
    // const salt = await bcrypt.genSalt();
    // const passwordHash =  await bcrypt.hash(password, salt);
    //   const newUser = new User({
    //     firstName,
    //     lastName,
    //     email,
    //     password: passwordHash,
    //     picturePath,
    //     friends,
    //     location,
    //     
    // });
    // const saveUser = await newUser.save();
    // res.status(201).json(saveUser);
  } catch (err) {}
};
