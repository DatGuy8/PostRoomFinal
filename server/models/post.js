import mongoose from 'mongoose';


//================= CREATES A POST SCHEMA WITH THE NESTED COMMENT SCEHMA =============================
const PostSchema = new mongoose.Schema({
  title: {
      type: String,
      required: [true, "title is required"]
  },
  likes: {
    type: Map,
    of: Boolean
  },
  comments: [{type: mongoose.Schema.Types.ObjectId, ref:"Comment"}],
  userId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User"
  },
  photo: String,
  viewCount: {
    type: Number,
    default: 0
  },
}, { timestamps: true });


const Post = mongoose.model("Post", PostSchema);

export default Post;