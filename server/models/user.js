import mongoose from "mongoose";

//========================= USER SCHEMA ==============================
const UserSchema = new mongoose.Schema(
  {
    userName: {
      type: String,
      required: true,
      unique: true
    },
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      validate: {
        validator: (val) => /^([\w-\.]+@([\w-]+\.)+[\w-]+)?$/.test(val),
        message: "Please enter a valid email",
      },
      unique: true,
    },
    password: {
      type: String,
      required: [true, "Password is required"],
      select: false,
      minlength: [8, "Password must be 8 characters or longer"],
    },
    userPhoto: {
      type: String,
    },
    location: {
      type: String,
      required: [true, "Please provide your location"],
    },
    notifications: [
      { type: mongoose.Schema.Types.ObjectId, ref: "Notification", default: [] },
    ],
    friends: [
      { type: mongoose.Schema.Types.ObjectId, ref: "User", default: [] },
    ],
    occupation: String,
  },
  { timestamps: true }
);

const User = mongoose.model("User", UserSchema);

export default User;
