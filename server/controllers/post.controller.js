//========== IMPORTS THE MODEL FILE ==============
import Post from '../models/post.js';
import * as dotenv from "dotenv";
import { v2 as cloudinary } from "cloudinary";
import mongoose from 'mongoose';
import User from '../models/user.js';

dotenv.config();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const options = {
  use_filename: true,
  unique_filename: false,
  overwrite: true,
};

//========= CREATE A POST ===========
export const createPost = async (req, res) => {
  try {
    const { title, userId, photo } = req.body;
    console.log(req.body);
    // const post = await Post.create(req.body);
    const photoUrl = await cloudinary.uploader.upload(photo.path,options);
    console.log(photoUrl);
    const newPost = await Post.create({
      title,
      userId,
      photo: photoUrl.url
    })
    
    res.status(201).json('OKAY', newPost);

  } catch (err) {
    res.status(409).json({ message: err.message });
  }
};

//========= GET ALL POSTS ==========
export const getAllPosts = async (req, res) => {
  try {
    
  } catch (err) {
    
  }
};

//========= GET ONE POST ===========
export const getOnePost = async (req, res) => {
  try {
    
  } catch (err) {
    
  }
};

//======== LIKE A POST ===========
export const likePost = async (req, res) => {
  try {
    
  } catch (err) {
    
  }
};

//======== SEARCH FOR POSTS ==========
export const searchPosts = async (req, res) => {
  try {
    
  } catch (err) {
    
  }
};

