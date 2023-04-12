import { Box, Button, TextField, useMediaQuery, useTheme } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setLogin } from "state/user";
import axios from "axios";
import * as Yup from "yup";
import { Formik } from "formik";

const RegisterForm = () => {
  const validationSchema = Yup.object().shape({
    userName: Yup.string()
      .required("Please enter a user name")
      .min(3, "User name must be longer than 3 characters")
      .max(20, "Must be shorter than 20"),
    firstName: Yup.string()
      .required("Please enter a first name")
      .min(3, "First name must be longer than 3 characters")
      .max(30, "Must be shorter than 30"),
    lastName: Yup.string()
      .required("Please enter a last name")
      .min(2, "Last name must be longer than 2 characters")
      .max(30, "Must be shorter than 30"),
    email: Yup.string()
      .email("Please enter a valid email")
      .required("Email is required"),
    password: Yup.string()
      .required("Password is required")
      .min(8, "Password must be longer than 8 characters")
      .max(30, "Must be shorter than 30"),
    confirmPassword: Yup.string().oneOf(
      [Yup.ref("password"), null],
      "Passwords must match"
    ),
    location: Yup.string()
      .required("Please enter location")
      .min(2, "Must be at least 2 characters"),
    occupation: Yup.string()
  });

  const { palette } = useTheme();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isNonMobileScreens = useMediaQuery("(min-width: 600px)");
  // const isLogin = pageType === "login";
  // const isRegister = pageType === "register";

  const onSubmitHandler = (values) => {
    axios.post("http://localhost:8080/api/users/register", values)
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
        // console.log("Error is this", err);
        console.log(err);
      });
  };

  return (
    <Formik
      onSubmit={onSubmitHandler}
      initialValues={{
        userName: "",
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        confirmPassword: "",
        location: "",
        occupation: "",
      }}
      validationSchema={validationSchema}
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
              gridTemplateColumns="repeat(4, minmax(0,1fr))"
              sx={{
                "& > div": {
                  gridColumn: isNonMobileScreens ? undefined : "span 4",
                },
              }}
            >
              <TextField
                label="User Name"
                onChange={handleChange}
                name="userName"
                value={values.userName}
                sx={{ gridColumn: "span 4" }}
                error={Boolean(touched.userName) && Boolean(errors.userName)}
                helperText={touched.userName && errors.userName}
                onBlur={handleBlur}
              />
              <TextField
                label="First Name"
                onChange={handleChange}
                name="firstName"
                value={values.firstName}
                sx={{ gridColumn: "span 2" }}
                error={Boolean(touched.firstName) && Boolean(errors.firstName)}
                helperText={touched.firstName && errors.firstName}
                onBlur={handleBlur}
              />
              <TextField
                label="Last Name"
                onChange={handleChange}
                name="lastName"
                sx={{ gridColumn: "span 2" }}
                value={values.lastName}
                error={Boolean(touched.lastName) && Boolean(errors.lastName)}
                helperText={touched.lastName && errors.lastName}
                onBlur={handleBlur}
              />
              <TextField
                  label="Occupation"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.occupation}
                  name="occupation"
                  error={Boolean(touched.occupation) && Boolean(errors.occupation)}
                  helperText={touched.occupation && errors.occupation}
                  sx={{ gridColumn: "span 4" }}
                />
              <TextField
                label="Location"
                onChange={handleChange}
                name="location"
                sx={{ gridColumn: "span 4" }}
                value={values.location}
                error={Boolean(touched.location) && Boolean(errors.location)}
                helperText={touched.location && errors.location}
                onBlur={handleBlur}
              />
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
              <TextField
                label="Confirm Password"
                value={values.confirmPassword}
                onBlur={handleBlur}
                onChange={handleChange}
                type="password"
                name="confirmPassword"
                sx={{ gridColumn: "span 4" }}
                error={
                  Boolean(touched.confirmPassword) &&
                  Boolean(errors.confirmPassword)
                }
                helperText={touched.confirmPassword && errors.confirmPassword}
              />
            </Box>
            <Button
              fullWidth
              type="submit"
              sx={{
                margin: "2rem 0",
                backgroundColor: palette.primary.main,
                color: palette.background.alt,
                padding: "1rem",
              }}
            >
              Register
            </Button>
          </form>
        );
      }}
    </Formik>
  );
};

export default RegisterForm;
