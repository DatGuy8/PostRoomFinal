import { useEffect,useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import PostWidget from "./PostWidget";
import axios from 'axios';

const AllPostsWidget = ({ userId }) => {
  const [posts, setPosts] = useState([])
  useEffect(()=>{
    axios.get(`http://localhost:8080/api/posts`)
    .then((res)=>{
      console.log(res);
      setPosts(res.data)
    })
    .catch((err)=>{
      console.log(err);
    })
  },[])
  return (
    <>
    {posts.map(
      ({
        _id,
        title,
        likes,
        viewCount,
        comments,
        photo,
        userId 
      })=>(
        <PostWidget
          key={_id}
          postId={_id}
          postUserId={userId}
          title={title}
          photo={photo}
          comments={comments}
          viewCount={viewCount}
          likes={likes}
        />
      )
    )}
    </>
  )
}

export default AllPostsWidget