import PostWidget from "widgets/PostWidget";
import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Box, useMediaQuery } from "@mui/material";
import { useSelector } from "react-redux";

const PostPage = () => {
  const { _id } = useParams();
  const posts = useSelector((state) => state.posts);
  const [post, setPost] = useState(null);
  const isNonMobileScreens = useMediaQuery("(min-width:1000px)");

  useEffect(() => {
    axios
      .get(`http://localhost:8080/api/posts/get/${_id}`)
      .then((res) => {
        console.log(res.data);
        setPost(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [posts]);

  if (!post) return null;

  return (
    
      <Box width={isNonMobileScreens ? "50%" : "100%"} margin="0 auto" padding="0 6%" mt='100px'>
        <PostWidget
          title={post.title}
          postId={_id}
          postUserId={post.userId._id}
          photo={post.photo}
          comments={post.comments}
          likes={post.likes}
          createdAt={post.createdAt}
          postUserPicture={post.userId.userPhoto}
          postUserFullName={post.userId.firstName + " " + post.userId.lastName}
          postUserLocation={post.userId.location}
          userName={post.userId.userName}
        />
      </Box>
    
  );
};

export default PostPage;
