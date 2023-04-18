import { useSelector } from "react-redux";
import { Box, Typography, useMediaQuery } from "@mui/material";
import NavBar from "views/navBar";
import UserWidget from "widgets/UserWidget";
import AddPostWidget from "widgets/AddPostWidget";
import AllPostsWidget from "widgets/AllPostsWidget";
import FriendsListWidget from "widgets/FriendsListWidget";
import AdSpaceWidget from "widgets/AdSpaceWidget";

const HomePage = () => {
  const user = useSelector((state) => state.user);
  const token = useSelector((state) => state.token);
  const isNonMobileScreens = useMediaQuery("(min-width:1000px)");

  return (
    <Box>
      <NavBar />
      <Box
        width="100%"
        padding="2rem 6%"
        display={isNonMobileScreens ? "flex" : "block"}
        justifyContent="space-between"
        gap="0.5rem"
      >
        <Box flexBasis={isNonMobileScreens ? "26%" : undefined}>
          <UserWidget userId={user._id} userPhoto={user.userPhoto}/>
        </Box>
        <Box
          flexBasis={isNonMobileScreens ? "42%" : undefined}
          mt={isNonMobileScreens ? undefined : "2rem"}
        >
          <AddPostWidget userPhoto={user.userPhoto}/>
          <AllPostsWidget userId={user._id}/>
        </Box>
        {/* FRIENDS LIST APPEARS ON DESKTOP ONLY */}
        {isNonMobileScreens && (
          <Box flexBasis="26%">
            <AdSpaceWidget/>
            <Box m='2rem 0'> <FriendsListWidget/></Box>
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default HomePage;
