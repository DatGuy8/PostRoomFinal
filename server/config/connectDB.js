import mongoose from "mongoose";

const connectDB = (url) => {
  mongoose.set("strictQuery", true);

  mongoose
    .connect(url)
    .then(() => console.log("MongoDB Connected!"))
    .catch((error) =>
      console.log("Something went wrong, Couldn't connect to DB", error)
    );
};

export default connectDB;
