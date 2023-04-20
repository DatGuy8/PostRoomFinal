import Comment from "../models/comment.js";
import Post from "../models/post.js";

export const addComment = async (req, res) => {
  try {
    const { userId, postId } = req.params;
    const { comment } = req.body;

    const newComment = await Comment.create({
      comment,
      userId,
      postId,
    });

    const relatedPost = await Post.findById(postId)
      .populate("userId")
      .populate({
        path: "comments",
        populate: {
          path: "userId",
          model: "User",
        },
      });

    if (relatedPost) {
      relatedPost.comments.push(newComment);
    }

    const updatedPost = await relatedPost.save();

    res.status(200).json(updatedPost);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

export const addReply = async (req, res) => {
  try {
  } catch (err) {}
};
