import mongoose from "mongoose";
import bcrypt from "bcrypt";

//========================= USER SCHEMA ==============================
const UserSchema = new mongoose.Schema(
  {
    userName: {
      type: String,
      required: [true, "User Name is required"],
      minlength: [3, "User Name must be longer than 3 characters"],
    },
    firstName: {
      type: String,
      required: [true, "First name is required"],
    },
    lastName: {
      type: String,
      required: [true, "Last name is required"],
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      validate: {
        validator: (val) => /^([\w-\.]+@([\w-]+\.)+[\w-]+)?$/.test(val),
        message: "Please enter a valid email",
      },
    },
    password: {
      type: String,
      required: [true, "Password is required"],
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
