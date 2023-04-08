import { useSelector } from "react-redux";
import { Box, Typography, useMediaQuery } from "@mui/material";
import NavBar from "views/navBar";

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
          userWidget here
        </Box>
        <Box
          flexBasis={isNonMobileScreens ? "42%" : undefined}
          mt={isNonMobileScreens ? undefined : "2rem"}
        >
          create post widget and posts widget
        </Box>
        {/* FRIENDS LIST APPEARS ON DESKTOP ONLY */}
        {isNonMobileScreens && (
          <Box flexBasis="26%">
            Ad space
            <Box m='2rem 0'> and Friends list</Box>
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default HomePage;
