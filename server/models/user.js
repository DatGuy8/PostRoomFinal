import mongoose from "mongoose";
import bcrypt from "bcrypt";

//========================= USER SCHEMA ==============================
const UserSchema = new mongoose.Schema(
  {
    userName: {
      type: String,
      required: true
    },
    firstName: {
      type: String,
      required: true
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
      unique: true
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
    allPosts: [{ type: mongoose.Schema.Types.ObjectId, ref: "Post" }],
    friends: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
    occupation: String,
  },
  { timestamps: true }
);

// //=================== ADD AFTER USER SCHEMA IS DEFINED, MAKES A CONFIRM PASSWORD TO CHECK =============================
// UserSchema.virtual("confirmPassword")
//   .get(() => this._confirmPassword)
//   .set((value) => (this._confirmPassword = value));

// //===================== CHECK HAPPENS HERE ===========================================
// UserSchema.pre("validate", function (next) {
//   if (this.password !== this.confirmPassword) {
//     this.invalidate("confirmPassword", "Password must match confirm password");
//   }
//   next();
// });
// //========== SAVES PASSWORD ENCRYPTED WITH BCRYPT =============
// UserSchema.pre("save", function (next) {
//   bcrypt.hash(this.password, 10).then((hash) => {
//     this.password = hash;
//     next();
//   });
// });

const User = mongoose.model("User", UserSchema);

export default User;
