import { useState } from "react";
import {
  Box,
  Button,
  TextField,
  useMediaQuery,
  Typography,
  useTheme,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setLogin } from "state/user";
import FlexBox from "components/FlexBox";
import axios from "axios";

const RegisterForm = () => {
  const [form, setForm] = useState({
    userName: "",
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    location: "",
  });
  const { palette } = useTheme();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isNonMobileScreens = useMediaQuery("(min-width: 600px)");
  // const isLogin = pageType === "login";
  // const isRegister = pageType === "register";

  const onChangeHandler = (event) => {
    setForm({
      ...form,
      [event.target.name]: event.target.value,
    });
  };

  const onSubmitHandler = event => {
    event.preventDefault();
    console.log(form);
    axios
      .post('http://localhost:8080/api/users/register', form)
      .then((res)=>{
        console.log(res);
        dispatch(setLogin({
          user: res.data.saveUser._id,
          token: res.data.userToken
        }))
        navigate('/home');
      })
      .catch((err)=>{
        console.log("Error is this", err);
      })
  }


  return (
    <form onSubmit={onSubmitHandler}>
      <Box
        display="grid"
        gap="30px"
        gridTemplateColumns="repeat(4, minmax(0,1fr))"
        sx={{
          "& > div": { gridColumn: isNonMobileScreens ? undefined : "span 4" },
        }}
      >
        <TextField
          label="User Name"
          onChange={onChangeHandler}
          name="userName"
          sx={{ gridColumn: "span 4" }}
        />
        <TextField
          label="First Name"
          onChange={onChangeHandler}
          name="firstName"
          sx={{ gridColumn: "span 2" }}
        />
        <TextField
          label="Last Name"
          onChange={onChangeHandler}
          name="lastName"
          sx={{ gridColumn: "span 2" }}
        />
        <TextField
          label="Location"
          onChange={onChangeHandler}
          name="location"
          sx={{ gridColumn: "span 4" }}
        />
        <TextField
          label="Email"
          onChange={onChangeHandler}
          name="email"
          sx={{ gridColumn: "span 4" }}
        />
        <TextField
          label="Password"
          onChange={onChangeHandler}
          name="password"
          type="password"
          sx={{ gridColumn: "span 4" }}
        />
        <TextField
          label="Confirm Password"
          onChange={onChangeHandler}
          type="password"
          name="confirmPassword"
          sx={{ gridColumn: "span 4" }}
        />
      </Box>
      <Button
        fullWidth
        type="submit"
        sx={{
          margin:'2rem 0',
          backgroundColor: palette.primary.main,
          color: palette.background.alt,
          padding: '1rem'
        }}

      >Register</Button>
    </form>
  );
};

export default RegisterForm;
