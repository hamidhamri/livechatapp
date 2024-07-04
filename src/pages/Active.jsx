import * as React from "react";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import { Link as LinkReact } from "react-router-dom";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { withStyles } from "@mui/styles";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import { InputAdornment, IconButton, Stack, Alert } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import { createMuiTheme } from "@mui/material";
import MuiThemeProvider from "@mui/material/styles/ThemeProvider";
import { updateUserToActiveAction } from "../actions/userAction";

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
    "& .MuiFormHelperText-root": {
      fontSize: "1.3rem",
    },
    "& .MuiInput-underline:after": {
      borderBottomColor: "#F97230",
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

export default function Active(props) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [showPassword, setShowPassword] = React.useState(false);
  const handleClickShowPassword = () => setShowPassword(!showPassword);
  const handleMouseDownPassword = () => setShowPassword(!showPassword);

  const { loading, success, error } = useSelector(
    (el) => el.updateUserToActive
  );
  const { userInfo } = useSelector((el) => el.userLogin);
  const { theme: themeColor } = useSelector((el) => el.theme);

  React.useEffect(() => {
    if (success) {
      dispatch({ type: "UPDATE_USER_TO_ACTIVE_RESET" });
    }
    if (!userInfo) return;
    navigate("/");
  }, [userInfo, success, navigate]);

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
      email: Yup.string().email("Invalid email address").required("Required"),
      password: Yup.string().required("No password provided."),
    }),
    onSubmit: (values) => {
      dispatch(updateUserToActiveAction(values.email, values.password));
    },
  });

  return (
    <>
      <div className="flex h-screen items-center bg-[#f3f3f3]">
        <ThemeProvider theme={theme}>
          <Container component="main" maxWidth="xs">
            <CssBaseline />
            <Box
              sx={{
                marginTop: "1rem",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <img src="/images/logo.png" alt="logo" className="" />

              <Typography
                sx={{ fontFamily: "Bebas Neue", color: "#F97230" }}
                fontWeight="600"
                component="h1"
                variant="h4"
              >
                Activate your Account
              </Typography>
              <Box
                component="form"
                onSubmit={formik.handleSubmit}
                noValidate
                sx={{ mt: 1 }}
              >
                <CssTextField
                  FormHelperTextProps={{ fontSize: "2rem" }}
                  helperText={
                    formik.touched.email && formik.errors.email
                      ? formik.errors.email
                      : null
                  }
                  onBlur={formik.handleBlur}
                  error={formik.touched.email && formik.errors.email}
                  onChange={formik.handleChange}
                  value={formik.values.email}
                  inputProps={{
                    style: { fontSize: "1.5rem" },
                  }}
                  InputLabelProps={{ style: { fontSize: "1.5rem" } }}
                  margin="normal"
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                  variant="standard"
                  autoFocus
                />
                <CssTextField
                  onChange={formik.handleChange}
                  value={formik.values.password}
                  onBlur={formik.handleBlur}
                  error={formik.errors.password && formik.touched.password}
                  helperText={
                    formik.errors.password && formik.touched.password
                      ? formik.errors.password
                      : null
                  }
                  InputLabelProps={{ style: { fontSize: "1.5rem" } }}
                  InputProps={{
                    style: { fontSize: "1.5rem" },
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle password visibility"
                          onClick={handleClickShowPassword}
                          onMouseDown={handleMouseDownPassword}
                        >
                          {showPassword ? (
                            <VisibilityIcon style={{ fontSize: "2rem" }} />
                          ) : (
                            <VisibilityOffIcon style={{ fontSize: "2rem" }} />
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
                <MuiThemeProvider theme={t}>
                  <Button
                    disabled={loading}
                    type="submit"
                    fullWidth
                    variant="contained"
                    sx={{
                      mt: 3,
                      mb: 1,
                      fontSize: "1.5rem",
                      backgroundColor: "#F97230",
                      "&:hover": { backgroundColor: "#F98239" },
                    }}
                  >
                    Activate
                  </Button>
                </MuiThemeProvider>
                {error && (
                  <Stack>
                    <Alert
                      sx={{ fontSize: "1.5rem", mb: 2 }}
                      variant="outlined"
                      severity="error"
                    >
                      <p>
                        {error === "Your account is already active" ? (
                          <>
                            {error}, please go to{" "}
                            <LinkReact to={`/${process.env.REACT_APP_REAL_URL}/login`}>
                              <span className=" border-b border-gray-500">
                                Login
                              </span>
                            </LinkReact>{" "}
                            to activate your account
                          </>
                        ) : (
                          error
                        )}
                      </p>
                    </Alert>
                  </Stack>
                )}
              </Box>
              <Grid container>
                <Grid item xs sx={{ mt: 2 }}>
                  <Link href="#" color={"#F97230"} variant="h6">
                    <LinkReact to="/login">Your account is active?</LinkReact>
                  </Link>
                </Grid>
              </Grid>
            </Box>
          </Container>
        </ThemeProvider>
      </div>
    </>
  );
}
