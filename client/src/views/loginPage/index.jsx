import { Typography, Box, useTheme, useMediaQuery } from "@mui/material";
import RegisterForm from "./RegisterForm";
import { useState } from "react";
import LoginForm from "./LoginForm";
import axios from "axios";

const LoginPage = () => {
  const theme = useTheme();
  const isNonMobileScreens = useMediaQuery("(min-width:1000px)");
  const [pageType, setPageType] = useState("login");
  const isLogin = pageType === "login";

  return (
    <Box>
      <Box
        width="100%"
        backgroundColor={theme.palette.background.alt}
        padding="1rem 6%"
        textAlign="center"
      >
        <Typography fontWeight="bold" fontSize="32px" color="primary">
          PostRoom
        </Typography>
      </Box>
      <Box
        width={isNonMobileScreens ? "50%" : "93%"}
        padding="2rem"
        margin="2rem auto"
        borderRadius="1.5rem"
        backgroundColor={theme.palette.background.alt}
      >
        <Typography fontWeight={500} variant="h5" sx={{ mb: "1.5rem" }}>
          Welcome to PostRoom, the place to post what's on you mind
        </Typography>
        {isLogin ? <LoginForm /> : <RegisterForm />}
        <Typography
          onClick={() => {
            setPageType(isLogin ? "register" : "login");
          }}
          sx={{
            textDecoration: "underline",
            color: theme.palette.primary.main,
            "&:hover": {
              cursor: "pointer",
              color: theme.palette.primary.light,
            },
          }}
        >
          {isLogin
            ? "Don't have an account? Sign Up Here"
            : "Already have an account? Login Here"}
        </Typography>
      </Box>
    </Box>
  );
};

export default LoginPage;
