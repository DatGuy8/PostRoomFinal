import { Box, useMediaQuery } from "@mui/material";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";

import NavBar from "views/navBar";
import FriendsListWidget from "widgets/FriendsListWidget";
import PostWidget from "widgets/PostWidget";
import AddPostWidget from "widgets/AddPostWidget";
import UserWidget from "widgets/UserWidget";
import axios from "axios";
import AllPostsWidget from "widgets/AllPostsWidget";


const ProfilePage = () => {
  const [user, setUser] = useState(null);
  const { _id } = useParams();
  const currentUser = useSelector((state) => state.user);
  const token = useSelector((state) => state.token);
  const isNonMobileScreens = useMediaQuery("(min-width:1000px)");
  

  

  useEffect(() => {
    axios
      .get(`http://localhost:8080/api/users/get/${_id}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        setUser(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [_id]);

  if (!user) return null;
  const isUser = _id === currentUser._id;
  

  return (
    <Box>
      <NavBar />

      <Box
        width="100%"
        padding="2rem 6%"
        display={isNonMobileScreens ? "flex" : "block"}
        gap="2rem"
        justifyContent="center"
      >

        <Box flexBasis={isNonMobileScreens ? "26%" : undefined}>
          <UserWidget userId={user._id} userPhoto={user.userPhoto} />
          <Box m="2rem 0" />
          <FriendsListWidget friendId={_id} isProfilePage={true}/>
        </Box>

        <Box
          flexBasis={isNonMobileScreens ? "42%" : undefined}
          mt={isNonMobileScreens ? undefined : "2rem"}
        >
          {isUser ? <AddPostWidget userPhoto={user.userPhoto} /> : null}
          <Box m="2rem 0" />
          <AllPostsWidget userId={user._id} isProfile="true" _id={_id} />
        </Box>

      </Box>
      
    </Box>
  );
};

export default ProfilePage;
