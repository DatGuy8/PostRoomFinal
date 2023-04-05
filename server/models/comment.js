import mongoose from 'mongoose';

const CommentSchema = new mongoose.Schema({
  comment: {
      type: String,
      minlength: [2, "comment must be at least 2 characters"],
      maxlength: [255, 'Comment must be less than 255 characters'],
      required: true
  },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  postId: { type: mongoose.Schema.Types.ObjectId, ref: "Post" },
  replies: [{type:mongoose.Schema.Types.ObjectId, ref: "Comment"}]
}, { timestamps: true })

const Comment = mongoose.model("Comment", CommentSchema);

export default Comment;