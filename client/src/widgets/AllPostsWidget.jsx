import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import PostWidget from "./PostWidget";
import axios from "axios";

const AllPostsWidget = ({ userId }) => {
  const [posts, setPosts] = useState([]);
  const token = useSelector((state) => state.token);

  useEffect(() => {
    const header = { Authorization: `Bearer ${token}` };
    axios
      .get(`http://localhost:8080/api/posts`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        console.log(res);
        setPosts(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <>
      {posts.map(
        ({ _id, title, likes, viewCount, comments, photo, userId }) => (
          <PostWidget
            key={_id}
            postId={_id}
            postUserId={userId._id}
            title={title}
            photo={photo}
            comments={comments}
            viewCount={viewCount}
            likes={likes}
            postUserPicture={userId.userPhoto}
            postUserFullName={userId.firstName + " " + userId.lastName}
            postUserLocation={userId.location}
          />
        )
      )}
    </>
  );
};

export default AllPostsWidget;
