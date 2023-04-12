import { TextField, Box, Button, useMediaQuery, useTheme } from "@mui/material";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setLogin } from "state/user";
import axios from "axios";
import * as Yup from "yup";
import { Formik } from "formik";

const LoginForm = () => {
  const validationSchema = Yup.object().shape({
    email: Yup.string()
      .email("Please enter a valid email")
      .required("Email is required"),
    password: Yup.string().required("Enter Password"),
  });
  const [form, setForm] = useState({
    email: "",
    password: "",
  });
  const isNonMobileScreens = useMediaQuery("(min-width: 600px)");
  const { palette } = useTheme();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const onSubmitHandler = (values) => {
    axios
      .post("http://localhost:8080/api/users/login", values)
      .then((res) => {
        console.log(res.data.user);
        dispatch(
          setLogin({
            user: res.data.user,
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
    <Formik
      initialValues={{
        email: "",
        password: "",
      }}
      validationSchema={validationSchema}
      onSubmit={onSubmitHandler}
    >
      {({
        values,
        errors,
        touched,
        handleSubmit,
        handleChange,
        handleBlur,
      }) => {
        return (
          <form onSubmit={handleSubmit}>
            <Box
              display="grid"
              gap="30px"
              gridTemplateColumns="repeat(4, minmax(0, 1fr))"
              sx={{
                "& > div": {
                  gridColumn: isNonMobileScreens ? undefined : "span 4",
                },
              }}
            >
              <TextField
                label="Email"
                onChange={handleChange}
                name="email"
                sx={{ gridColumn: "span 4" }}
                value={values.email}
                error={Boolean(touched.email) && Boolean(errors.email)}
                helperText={touched.email && errors.email}
                onBlur={handleBlur}
              />
              <TextField
                label="Password"
                onChange={handleChange}
                name="password"
                type="password"
                sx={{ gridColumn: "span 4" }}
                value={values.password}
                error={Boolean(touched.password) && Boolean(errors.password)}
                helperText={touched.password && errors.password}
                onBlur={handleBlur}
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
      }}
    </Formik>
  );
};

export default LoginForm;
