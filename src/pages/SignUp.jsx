import * as React from "react";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { withStyles } from "@mui/styles";
import { Link as LinkReact, useNavigate } from "react-router-dom";
import * as Yup from "yup";
import { useFormik } from "formik";
import { Alert, IconButton, InputAdornment, Stack } from "@mui/material";
import { createMuiTheme } from "@mui/material/styles";
import MuiThemeProvider from "@mui/material/styles/ThemeProvider";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import { useDispatch, useSelector } from "react-redux";
import { registerAction } from "../actions/authAction";

const t = createMuiTheme({
  palette: {
    action: {
      disabledBackground: "#777",
      disabled: "set color of text here",
    },
  },
});

const theme = createTheme();

const CssTextField = withStyles({
  root: {
    "& label.Mui-focused": {
      color: "#F97230",
    },
    "& .MuiInput-underline:after": {
      borderBottomColor: "#F97230",
    },
    "& .MuiFormHelperText-root": {
      fontSize: "1.3rem",
    },
    "& .MuiOutlinedInput-root": {
      "& fieldset": {
        borderColor: "#F97230",
      },
      "&:hover fieldset": {
        borderColor: "#F97230",
      },
      "&.Mui-focused fieldset": {
        borderColor: "#F97230",
      },
    },
  },
})(TextField);

export default function SignUp() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [showPassword, setShowPassword] = React.useState(false);
  const handleClickShowPassword = () => setShowPassword(!showPassword);
  const handleMouseDownPassword = () => setShowPassword(!showPassword);

  const { userInfo, loading, error } = useSelector((el) => el.userRegister);
  const { userInfo: userInfoLogin } = useSelector((el) => el.userLogin);

  React.useEffect(() => {
    if (userInfoLogin) {
      navigate("/");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userInfo, navigate]);

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
      name: Yup.string()
        .matches(/^[A-Za-z ]*$/, "Please enter valid name")
        .max(40)
        .required("Please enter your name"),
      email: Yup.string().email("Invalid email address").required("Required"),
      password: Yup.string()
        .required("No password provided.")
        .min(8, "Password is too short - should be 8 chars minimum.")
        .matches(/[a-zA-Z]/, "Password can only contain Latin letters."),
    }),
    onSubmit: function (values) {
      dispatch(
        registerAction(values.name, values.email.toLowerCase(), values.password)
      );
    },
  });

  return (
    <>
      <div className="z-10 flex h-screen items-center bg-[#f3f3f3]">
        <ThemeProvider theme={theme}>
          <Container
            sx={{
              backgroundColor: "#f3f3f3",
              p: 4,
              zIndex: "1",
              borderRadius: "20px",
            }}
            component="main"
            maxWidth="xs"
          >
            <CssBaseline />
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <img src="/images/logo.png" alt="logo" />

              <Typography
                component="h1"
                variant="h4"
                sx={{ fontWeight: "600", color: "#333" }}
              >
                Sign up
              </Typography>
              <Box
                component="form"
                noValidate
                onSubmit={formik.handleSubmit}
                sx={{ mt: 3 }}
              >
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <CssTextField
                      helperText={
                        formik.touched.name && formik.errors.name
                          ? formik.errors.name
                          : null
                      }
                      error={formik.touched.name && formik.errors.name}
                      onBlur={formik.handleBlur}
                      onChange={formik.handleChange}
                      value={formik.values.name}
                      InputLabelProps={{
                        style: { fontSize: "1.5rem", color: "#333" },
                      }}
                      inputProps={{
                        style: {
                          fontSize: "1.5rem",
                          color: "#333",
                          "&:active": { fontSize: "16px" },
                        },
                      }}
                      autoComplete="given-name"
                      name="name"
                      required
                      fullWidth
                      id="name"
                      label="Full name"
                      autoFocus
                      variant="standard"
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <CssTextField
                      className="active:text-xl"
                      error={formik.touched.email && formik.errors.email}
                      helperText={
                        formik.touched.email && formik.errors.email
                          ? formik.errors.email
                          : null
                      }
                      onBlur={formik.handleBlur}
                      onChange={formik.handleChange}
                      value={formik.values.email}
                      inputProps={{
                        style: { fontSize: "1.5rem", color: "#333" },
                      }}
                      InputLabelProps={{
                        style: {
                          fontSize: "1.5rem",
                          color: "#333",
                          "&:active": { fontSize: "16px" },
                        },
                      }}
                      required
                      fullWidth
                      id="email"
                      label="Email Address"
                      name="email"
                      autoComplete="email"
                      variant="standard"
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <CssTextField
                      className="active:text-xl"
                      onChange={formik.handleChange}
                      value={formik.values.password}
                      onBlur={formik.handleBlur}
                      error={formik.errors.password && formik.touched.password}
                      helperText={
                        formik.errors.password && formik.touched.password
                          ? formik.errors.password
                          : null
                      }
                      InputLabelProps={{
                        style: { fontSize: "1.5rem", color: "#333" },
                      }}
                      InputProps={{
                        style: {
                          fontSize: "1.5rem",
                          color: "#333",
                          "&:active": { fontSize: "16px" },
                        },
                        endAdornment: (
                          <InputAdornment position="end">
                            <IconButton
                              aria-label="toggle password visibility"
                              onClick={handleClickShowPassword}
                              onMouseDown={handleMouseDownPassword}
                            >
                              {showPassword ? (
                                <VisibilityIcon
                                  style={{ fontSize: "2rem", color: "#333" }}
                                />
                              ) : (
                                <VisibilityOffIcon
                                  style={{ fontSize: "2rem", color: "#333" }}
                                />
                              )}
                            </IconButton>
                          </InputAdornment>
                        ),
                      }}
                      type={showPassword ? "text" : "password"}
                      margin="normal"
                      required
                      fullWidth
                      name="password"
                      label="Password"
                      id="password"
                      autoComplete="current-password"
                      variant="standard"
                    />
                  </Grid>
                </Grid>
                <MuiThemeProvider theme={t}>
                  <Button
                    disabled={loading}
                    sx={{
                      mt: 3,
                      mb: 2,
                      fontSize: "1.5rem",
                      fontWeight: "300",
                      backgroundColor: "#F97230",
                      color: "#fff",
                      "&:hover": { backgroundColor: "#F96600" },
                    }}
                    type="submit"
                    fullWidth
                    variant="contained"
                  >
                    Sign Up
                  </Button>
                </MuiThemeProvider>
                {error && (
                  <Stack>
                    <Alert
                      sx={{ fontSize: "1.5rem", mb: 2 }}
                      variant="outlined"
                      severity="error"
                    >
                      {error}
                    </Alert>
                  </Stack>
                )}

                <Grid container justifyContent="flex-end">
                  <Grid item>
                    <LinkReact to="/login">
                      <Link
                        sx={{
                          mt: 3,
                          mb: 2,
                          color: "#333",
                          fontSize: "1.4rem",
                          "&:hover": { color: "#666" },
                        }}
                        href="#"
                        variant="body2"
                      >
                        Already have an account? Sign in
                      </Link>
                    </LinkReact>
                  </Grid>
                </Grid>
              </Box>
            </Box>
          </Container>
        </ThemeProvider>
      </div>
    </>
  );
}
