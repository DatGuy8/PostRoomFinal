//========== IMPORTS THE MODEL FILE ==============
import User from "../models/user.js";
// ========= ADDS TOKEN FOR USERS ==============
import jwt from "jsonwebtoken";
// =========== BCRYPT TO HASH PASSWORDS ==========
import bcrypt from "bcrypt";

// ========= REGISTER USER ==========
export const register = async (req, res) => {
  try {
    const { email } = req.body;

    //==== checks if email already registered =====
    const user = await User.findOne({ email });
    if (user) {
      return res.status(409).json("Email already registered");
    }
    const newUser = User.create(req.body);
    const userToken = jwt.sign(
      {
        _id: user._id,
      },
      process.env.SECRET_KEY
    );
    res.status(201).cookie("token", userToken).json(newUser);

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
  } catch (err) {
    res.status(400).json({ message: "That didn't quite work", err });
  }
};

// ========= LOGIN USER ============
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    // find user
    const user = await User.findOne({ email: email });

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
    delete user.password;
    res
      .status(200)
      .cookie("token", token, { httpOnly: true })
      .json({ token, user });
  } catch (err) {
    res.status(400).json({message: "Login failed", err})
  }
};

// ========= GET ONE USER ==========
export const getOneUser = async (req, res) => {};
