import { useSelector } from "react-redux";
import { Box, useMediaQuery } from "@mui/material";
import UserWidget from "widgets/UserWidget";
import AddPostWidget from "widgets/AddPostWidget";
import AllPostsWidget from "widgets/AllPostsWidget";
import FriendsListWidget from "widgets/FriendsListWidget";
import AdSpaceWidget from "widgets/AdSpaceWidget";

const HomePage = () => {
  const user = useSelector((state) => state.user);
  const isNonMobileScreens = useMediaQuery("(min-width:1000px)");

  return (
    <Box>
      
      <Box
        width="100%"
        padding="2rem 6%"
        display={isNonMobileScreens ? "flex" : "block"}
        justifyContent="space-between"
        gap="0.5rem"
        mt="75px"
      >
        <Box flexBasis={isNonMobileScreens ? "26%" : undefined}>
          <UserWidget userId={user._id} userPhoto={user.userPhoto} />
        </Box>
        <Box
          flexBasis={isNonMobileScreens ? "42%" : undefined}
          mt={isNonMobileScreens ? undefined : "2rem"}
        >
          <AddPostWidget userPhoto={user.userPhoto} />
          <AllPostsWidget userId={user._id} />
        </Box>
        {/* FRIENDS LIST APPEARS ON DESKTOP ONLY */}
        {isNonMobileScreens && (
          <Box flexBasis="26%">
            <AdSpaceWidget />
            <Box m="2rem 0">
              <FriendsListWidget isHomePage={true} />
            </Box>
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default HomePage;
