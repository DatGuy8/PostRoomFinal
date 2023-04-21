//========== IMPORTS THE MODEL FILE ==============
import Post from "../models/post.js";
import User from "../models/user.js";

//========= CREATE A POST ===========
export const createPost = async (req, res) => {
  try {
    const { title, userId } = req.body;
    const photo = req.file?.filename;

    const user = await User.findById(userId);
    // const post = await Post.create(req.body);
    // const photoUrl = await cloudinary.uploader.upload(photo);
    // console.log(photoUrl);
    const newPost = await Post.create({
      likes: new Map(),
      title,
      userId,
      photo,
    });

    user.allPosts.push(newPost._id);
    user.save();
    // console.log(await user.populate('allPosts'));

    // gets all post to update client side with new post
    const allPosts = await Post.find()
      .sort("-createdAt")
      .populate("comments")
      .populate("userId");
    res.status(201).json(allPosts);
  } catch (err) {
    res.status(409).json({ message: err.message });
  }
};

//========= GET ALL POSTS ==========
export const getAllPosts = async (req, res) => {
  try {
    const posts = await Post.find()
      .sort("-createdAt")
      .populate("userId")
      .populate({
        path: "comments",
        populate: {
          path: "userId",
          model: "User",
        },
      });
    res.status(200).json(posts);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

//========= GET ONE POST ===========
export const getOnePost = async (req, res) => {
  try {
  } catch (err) {}
};

//============= GET ALL POSTS FROM ONE USER ==================
export const getAllUserPosts = async (req, res) => {
  try {
    const { _id } = req.params;
    const posts = await Post.find({ userId: _id })
      .populate("userId")
      .populate({
        path: "comments",
        populate: {
          path: "userId",
          model: "User",
        },
      });
    // console.log(posts);

    res.status(200).json(posts);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

//======== LIKE A POST ===========
export const likePost = async (req, res) => {
  try {
    const { _id } = req.params;
    const { userId } = req.body;
    const post = await Post.findById(_id);
    const isLiked = post.likes.get(userId);

    if (isLiked) {
      post.likes.delete(userId);
    } else {
      post.likes.set(userId, true);
    }

    const updatedPost = await Post.findByIdAndUpdate(
      _id,
      { likes: post.likes },
      { new: true }
    )
      .populate("userId")
      .populate("comments");

    res.status(200).json(updatedPost);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

//======== SEARCH FOR POSTS ==========
export const searchPosts = async (req, res) => {
  try {
  } catch (err) {}
};
