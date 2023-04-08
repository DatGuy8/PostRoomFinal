import { TextField, Box, Button, useMediaQuery, useTheme } from "@mui/material";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setLogin } from "state/user";
import axios from "axios";

const LoginForm = () => {
  const [form, setForm] = useState({
    email: "",
    password: "",
  });
  const isNonMobileScreens = useMediaQuery("(min-width: 600px)");
  const { palette } = useTheme();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const onSubmitHandler = (event) => {
    event.preventDefault();
    axios
      .post("http://localhost:8080/api/users/login", form)
      .then((res) => {
        console.log(res.data.returnUser);
        dispatch(
          setLogin({
            user: res.data.returnUser,
            token: res.data.token,
          })
        );
        navigate("/home");
      })
      .catch((err) => {
        console.log("Error happened here", err);
      });
  };

  const onChangeHandler = (event) => {
    setForm({
      ...form,
      [event.target.name]: event.target.value,
    });
  };

  return (
    <form onSubmit={onSubmitHandler}>
      <Box
        display="grid"
        gap="30px"
        gridTemplateColumns="repeat(4, minmax(0, 1fr))"
        sx={{
          "& > div": { gridColumn: isNonMobileScreens ? undefined : "span 4" },
        }}
      >
        <TextField
          label="Email"
          onChange={onChangeHandler}
          name="email"
          sx={{ gridColumn: "span 4" }}
        />
        <TextField
          label="Password"
          type="password"
          onChange={onChangeHandler}
          name="password"
          sx={{ gridColumn: "span 4" }}
        />
      </Box>
      <Box>
        <Button
          fullWidth
          type="submit"
          sx={{
            margin: "2rem 0",
            padding: "1rem",
            backgroundColor: palette.primary.main,
            color: palette.background.alt,
          }}
        >
          Login
        </Button>
      </Box>
    </form>
  );
};

export default LoginForm;
